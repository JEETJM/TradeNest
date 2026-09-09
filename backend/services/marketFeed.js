const UpstoxClient = require("upstox-js-sdk");

const MARKET_INSTRUMENTS = require("../config/marketInstruments");

let streamer = null;

const startMarketFeed = (io) => {
  try {
    const accessToken = process.env.UPSTOX_ACCESS_TOKEN?.trim();

    /* =========================
       TOKEN CHECK
    ========================= */

    if (!accessToken) {
      console.error("❌ UPSTOX_ACCESS_TOKEN is missing in .env");
      return;
    }

    console.log(
      "🔐 Upstox access token loaded:",
      `${accessToken.substring(0, 8)}...`,
    );

    /* =========================
       UPSTOX AUTH
    ========================= */

    const defaultClient = UpstoxClient.ApiClient.instance;

    const oauth2 = defaultClient.authentications["OAUTH2"];

    if (!oauth2) {
      console.error("❌ Upstox OAUTH2 authentication object not found.");
      return;
    }

    oauth2.accessToken = accessToken;

    console.log("✅ Upstox OAuth2 token configured");

    /* =========================
       INSTRUMENTS
    ========================= */

    const instrumentKeys = Object.values(MARKET_INSTRUMENTS);

    if (!instrumentKeys.length) {
      console.error("❌ No market instruments found.");
      return;
    }

    console.log("📊 Instruments:", instrumentKeys);

    /* =========================
       CREATE STREAMER
       Official V3 pattern:
       instruments + mode
    ========================= */

    streamer = new UpstoxClient.MarketDataStreamerV3(instrumentKeys, "ltpc");

    /* =========================
       IMPORTANT
       Disable SDK reconnect initially.

       We don't want:
       401 → reconnect → 401 → SDK crash
    ========================= */

    streamer.autoReconnect(false);

    /* =========================
       OPEN
    ========================= */

    streamer.on("open", () => {
      console.log("🟢 Upstox Market WebSocket connected");

      console.log(
        `📡 Market feed ready for ${instrumentKeys.length} instruments`,
      );
    });

    /* =========================
       MESSAGE
    ========================= */

    streamer.on("message", (data) => {
      try {
        if (!data) {
          return;
        }

        let feed = data;

        /* =========================
           BUFFER
        ========================= */

        if (Buffer.isBuffer(data)) {
          const text = data.toString("utf8");

          try {
            feed = JSON.parse(text);
          } catch {
            console.log("⚠️ Received binary protobuf packet.");

            return;
          }
        }

        /* =========================
           STRING
        ========================= */

        if (typeof feed === "string") {
          try {
            feed = JSON.parse(feed);
          } catch {
            return;
          }
        }

        if (!feed) {
          return;
        }

        /* =========================
           MARKET STATUS
        ========================= */

        if (feed.type === "market_info") {
          console.log("ℹ️ Market status received");
          return;
        }

        /* =========================
           FEEDS
        ========================= */

        if (!feed.feeds) {
          return;
        }

        Object.entries(feed.feeds).forEach(
          ([instrumentKey, instrumentFeed]) => {
            try {
              let ltpc = instrumentFeed?.ltpc;

              /* =========================
                 FALLBACK 1
              ========================= */

              if (!ltpc) {
                ltpc = instrumentFeed?.firstLevelWithGreeks?.ltpc;
              }

              /* =========================
                 FALLBACK 2
              ========================= */

              if (!ltpc) {
                ltpc = instrumentFeed?.fullFeed?.marketFF?.ltpc;
              }

              if (!ltpc) {
                return;
              }

              /* =========================
                 PRICE
              ========================= */

              const ltp = Number(ltpc.ltp);

              const closePrice = Number(ltpc.cp);

              if (!Number.isFinite(ltp)) {
                return;
              }

              /* =========================
                 NORMALIZED DATA
              ========================= */

              const marketUpdate = {
                instrumentKey,

                ltp,

                closePrice: Number.isFinite(closePrice) ? closePrice : null,

                lastTradeTime: ltpc.ltt || null,

                lastTradeQuantity: Number(ltpc.ltq || 0),

                timestamp: Number(feed.currentTs || Date.now()),
              };

              console.log("📈 LIVE:", instrumentKey, "₹", ltp);

              /* =========================
                 SEND TO REACT
              ========================= */

              io.emit("market:update", marketUpdate);
            } catch (error) {
              console.error("❌ Instrument processing error:", error.message);
            }
          },
        );
      } catch (error) {
        console.error("❌ Market data processing error:", error.message);
      }
    });

    /* =========================
       ERROR
    ========================= */

    streamer.on("error", (error) => {
      console.error("❌ Upstox WebSocket error:", error?.message || error);
    });

    /* =========================
       CLOSE
    ========================= */

    streamer.on("close", () => {
      console.log("🔴 Upstox Market WebSocket closed");

      console.log("ℹ️ Auto reconnect is currently disabled.");
    });

    /* =========================
       RECONNECT STOPPED
    ========================= */

    streamer.on("autoReconnectStopped", (data) => {
      console.log("⛔ Upstox auto reconnect stopped:", data);
    });

    /* =========================
       CONNECT
    ========================= */

    console.log("📡 Connecting to Upstox Market Feed...");

    streamer.connect();
  } catch (error) {
    console.error("❌ Market feed startup failed:", error);
  }
};

module.exports = {
  startMarketFeed,
};
