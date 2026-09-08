const UpstoxClient = require("upstox-js-sdk");

const MARKET_INSTRUMENTS = require("../config/marketInstruments");

let streamer = null;

const startMarketFeed = (io) => {
  try {
    const accessToken = process.env.UPSTOX_ACCESS_TOKEN;

    if (!accessToken) {
      console.error("❌ UPSTOX_ACCESS_TOKEN is missing in .env");
      return;
    }

    /* =========================
       UPSTOX AUTH
    ========================= */

    const defaultClient = UpstoxClient.ApiClient.instance;

    const OAUTH2 = defaultClient.authentications["OAUTH2"];

    OAUTH2.accessToken = accessToken;

    /* =========================
       INSTRUMENTS
    ========================= */

    const instrumentKeys = Object.values(MARKET_INSTRUMENTS);

    console.log("📊 Instruments:", instrumentKeys);

    /* =========================
       CREATE STREAMER
    ========================= */

    streamer = new UpstoxClient.MarketDataStreamerV3();

    /* =========================
       AUTO RECONNECT
    ========================= */

    streamer.autoReconnect(true, 10, 5);

    /* =========================
       OPEN
    ========================= */

    streamer.on("open", () => {
      console.log("🟢 Upstox Market WebSocket connected");

      streamer.subscribe(instrumentKeys, "ltpc");

      console.log(`📡 Subscribed to ${instrumentKeys.length} instruments`);
    });

    /* =========================
       MESSAGE
    ========================= */

    streamer.on("message", (data) => {
      try {
        if (!data) {
          return;
        }

        /*
         * IMPORTANT:
         * First inspect the SDK payload.
         */

        let feed = data;

        if (Buffer.isBuffer(data)) {
          const text = data.toString("utf8");

          try {
            feed = JSON.parse(text);
          } catch {
            console.log("⚠️ Received binary/non-JSON packet");

            return;
          }
        }

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
          console.log("⚠️ Feed received without feeds:", feed);

          return;
        }

        Object.entries(feed.feeds).forEach(
          ([instrumentKey, instrumentFeed]) => {
            let ltpc = instrumentFeed?.ltpc;

            /*
             * Full feed fallback
             */

            if (!ltpc) {
              ltpc = instrumentFeed?.firstLevelWithGreeks?.ltpc;
            }

            if (!ltpc) {
              ltpc = instrumentFeed?.fullFeed?.marketFF?.ltpc;
            }

            if (!ltpc) {
              return;
            }

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
      console.error("❌ Upstox WebSocket error:", error);
    });

    /* =========================
       CLOSE
    ========================= */

    streamer.on("close", () => {
      console.log("🔴 Upstox Market WebSocket closed");
    });

    /* =========================
       RECONNECT
    ========================= */

    streamer.on("reconnecting", () => {
      console.log("🔄 Reconnecting to Upstox...");
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
