import { useCallback, useEffect, useState } from "react";

import {
  marketSocket,
  connectMarketSocket,
  disconnectMarketSocket,
} from "../../services/marketSocket";

import "./Holdings.css";

const API_URL = "http://localhost:5000";

/* =====================================================
   UPSTOX INSTRUMENT MAPPING
===================================================== */

const MARKET_INSTRUMENTS = {
  INFY: "NSE_EQ|INE009A01021",
  TCS: "NSE_EQ|INE467B01029",
  RELIANCE: "NSE_EQ|INE002A01018",
  HDFCBANK: "NSE_EQ|INE040A01034",
  SBIN: "NSE_EQ|INE062A01020",
  ICICIBANK: "NSE_EQ|INE090A01021",
  ITC: "NSE_EQ|INE154A01025",
  WIPRO: "NSE_EQ|INE075A01022",
  AXISBANK: "NSE_EQ|INE238A01034",
  KOTAKBANK: "NSE_EQ|INE237A01036",
};

/* =====================================================
   GET TOKEN
===================================================== */

const getToken = () => {
  return (
    localStorage.getItem("tradenest_token") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("tradenest_token") ||
    sessionStorage.getItem("token")
  );
};

/* =====================================================
   HOLDINGS
===================================================== */

function Holdings() {
  const [holdings, setHoldings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  /* =====================================================
     LOAD HOLDINGS FROM MONGODB
  ===================================================== */

  const loadHoldings = useCallback(async (showRefreshLoader = false) => {
    try {
      if (showRefreshLoader) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const token = getToken();

      if (!token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      console.log("📤 Fetching holdings from MongoDB...");

      const response = await fetch(`${API_URL}/api/trades/holdings`, {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      /* =========================================
           SAFE RESPONSE
        ========================================= */

      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        console.error("❌ INVALID HOLDINGS RESPONSE:", responseText);

        throw new Error(
          "Server returned an invalid response. Please check the backend.",
        );
      }

      console.log("📥 HOLDINGS FROM BACKEND:", data);

      if (!response.ok) {
        throw new Error(data.message || "Unable to load holdings.");
      }

      if (!data.success) {
        throw new Error(data.message || "Unable to load holdings.");
      }

      const serverHoldings = Array.isArray(data.holdings) ? data.holdings : [];

      setHoldings(serverHoldings);
    } catch (err) {
      console.error("❌ HOLDINGS LOADING ERROR:", err);

      setError(err.message || "Unable to load holdings.");

      setHoldings([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  /* =====================================================
     INITIAL LOAD + AUTO REFRESH
  ===================================================== */

  useEffect(() => {
    loadHoldings();

    const handleTradeNestUpdate = () => {
      console.log("🔄 TradeNest update detected. Refreshing holdings...");

      loadHoldings(true);
    };

    window.addEventListener("tradenest-update", handleTradeNestUpdate);

    return () => {
      window.removeEventListener("tradenest-update", handleTradeNestUpdate);
    };
  }, [loadHoldings]);

  /* =====================================================
     LIVE MARKET SOCKET
  ===================================================== */

  useEffect(() => {
    if (holdings.length === 0) {
      return undefined;
    }

    console.log("📡 Holdings connecting to live market...");

    connectMarketSocket();

    const handleMarketUpdate = (data) => {
      if (!data?.instrumentKey) {
        return;
      }

      const symbol = Object.keys(MARKET_INSTRUMENTS).find(
        (stockSymbol) => MARKET_INSTRUMENTS[stockSymbol] === data.instrumentKey,
      );

      if (!symbol) {
        return;
      }

      const livePrice = Number(data.ltp);

      if (!Number.isFinite(livePrice) || livePrice <= 0) {
        return;
      }

      console.log("🔥 HOLDING LIVE PRICE:", symbol, livePrice);

      setHoldings((previousHoldings) =>
        previousHoldings.map((holding) => {
          if (holding.symbol?.toUpperCase() !== symbol) {
            return holding;
          }

          return {
            ...holding,
            currentPrice: livePrice,
          };
        }),
      );
    };

    marketSocket.on("market:update", handleMarketUpdate);

    return () => {
      marketSocket.off("market:update", handleMarketUpdate);

      disconnectMarketSocket();
    };
  }, [holdings.length]);

  /* =====================================================
     MONEY FORMAT
  ===================================================== */

  const money = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  /* =====================================================
     NUMBER FORMAT
  ===================================================== */

  const numberFormat = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 4,
    });
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <section className="holdingsPage">
        <div className="holdingsPageHeader">
          <div>
            <h1>Holdings</h1>

            <p>Your current stock investments.</p>
          </div>
        </div>

        <div className="holdingsEmpty">
          <div className="holdingsEmptyIcon">⏳</div>

          <h2>Loading holdings...</h2>

          <p>Fetching your investments from MongoDB.</p>
        </div>
      </section>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error) {
    return (
      <section className="holdingsPage">
        <div className="holdingsPageHeader">
          <div>
            <h1>Holdings</h1>

            <p>Your current stock investments.</p>
          </div>
        </div>

        <div className="holdingsEmpty">
          <div className="holdingsEmptyIcon">⚠️</div>

          <h2>Unable to load holdings</h2>

          <p>{error}</p>

          <button
            type="button"
            className="retryHoldingsBtn"
            onClick={() => loadHoldings(true)}
            disabled={refreshing}
          >
            {refreshing ? "Refreshing..." : "Try Again"}
          </button>
        </div>
      </section>
    );
  }

  /* =====================================================
     MAIN UI
  ===================================================== */

  return (
    <section className="holdingsPage">
      {/* =========================================
          HEADER
      ========================================= */}

      <div className="holdingsPageHeader">
        <div>
          <h1>Holdings</h1>

          <p>Your current stock investments.</p>
        </div>

        <div className="holdingsHeaderActions">
          <div className="holdingsCount">
            {holdings.length} {holdings.length === 1 ? "Stock" : "Stocks"}
          </div>

          <button
            type="button"
            className="refreshHoldingsBtn"
            onClick={() => loadHoldings(true)}
            disabled={refreshing}
          >
            {refreshing ? "Refreshing..." : "↻ Refresh"}
          </button>
        </div>
      </div>

      {/* =========================================
          EMPTY STATE
      ========================================= */}

      {
        holdings.length === 0 ?
          <div className="holdingsEmpty">
            <div className="holdingsEmptyIcon">📊</div>

            <h2>No holdings yet</h2>

            <p>Buy stocks from your Watchlist and they will appear here.</p>
          </div>
          /* =========================================
           HOLDINGS TABLE
        ========================================= */
        : <div className="holdingsCard">
            <div className="holdingsTableWrapper">
              <table className="holdingsTable">
                <thead>
                  <tr>
                    <th>Stock</th>

                    <th>Quantity</th>

                    <th>Avg. Price</th>

                    <th>Current Price</th>

                    <th>Invested</th>

                    <th>Current Value</th>

                    <th>P&L</th>
                  </tr>
                </thead>

                <tbody>
                  {holdings.map((holding) => {
                    const quantity = Number(holding.quantity || 0);

                    const averagePrice = Number(
                      holding.averagePrice || holding.avgPrice || 0,
                    );

                    const currentPrice = Number(
                      holding.currentPrice || holding.ltp || averagePrice,
                    );

                    /* =================================
                     CALCULATIONS
                  ================================= */

                    const invested = quantity * averagePrice;

                    const currentValue = quantity * currentPrice;

                    const pnl = currentValue - invested;

                    const pnlPercent =
                      invested > 0 ? (pnl / invested) * 100 : 0;

                    const isProfit = pnl >= 0;

                    return (
                      <tr key={holding._id || holding.symbol}>
                        {/* STOCK */}

                        <td>
                          <div className="holdingStock">
                            <strong>{holding.symbol}</strong>

                            <small>{holding.company || "Stock"}</small>
                          </div>
                        </td>

                        {/* QUANTITY */}

                        <td>{numberFormat(quantity)}</td>

                        {/* AVERAGE PRICE */}

                        <td>{money(averagePrice)}</td>

                        {/* CURRENT PRICE */}

                        <td>
                          <strong>{money(currentPrice)}</strong>
                        </td>

                        {/* INVESTED */}

                        <td>{money(invested)}</td>

                        {/* CURRENT VALUE */}

                        <td>
                          <strong>{money(currentValue)}</strong>
                        </td>

                        {/* P&L */}

                        <td
                          className={isProfit ? "holdingProfit" : "holdingLoss"}
                        >
                          <strong>
                            {isProfit ? "+" : "-"}
                            {money(Math.abs(pnl))}
                          </strong>

                          <small className="pnlPercent">
                            {isProfit ? "+" : ""}
                            {pnlPercent.toFixed(2)}%
                          </small>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

      }
    </section>
  );
}

export default Holdings;
