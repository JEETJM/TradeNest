import { useCallback, useEffect, useMemo, useState } from "react";

import {
  marketSocket,
  connectMarketSocket,
  disconnectMarketSocket,
} from "../../services/marketSocket";

import "./Holdings.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

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

const getToken = () => {
  return (
    localStorage.getItem("tradenest_token") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("tradenest_token") ||
    sessionStorage.getItem("token")
  );
};

function Holdings() {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

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

      const response = await fetch(`${API_URL}/trades/holdings`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          "Server returned an invalid response. Please check the backend.",
        );
      }

      if (!response.ok) {
        throw new Error(data?.message || "Unable to load holdings.");
      }

      if (!data.success) {
        throw new Error(data?.message || "Unable to load holdings.");
      }

      setHoldings(Array.isArray(data.holdings) ? data.holdings : []);
    } catch (err) {
      console.error("Holdings loading error:", err);

      setError(err.message || "Unable to load holdings.");
      setHoldings([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  /* =========================
     INITIAL LOAD
  ========================= */

  useEffect(() => {
    loadHoldings();

    const handleTradeNestUpdate = () => {
      loadHoldings(true);
    };

    window.addEventListener("tradenest-update", handleTradeNestUpdate);

    return () => {
      window.removeEventListener("tradenest-update", handleTradeNestUpdate);
    };
  }, [loadHoldings]);

  /* =========================
     LIVE MARKET PRICE
  ========================= */

  useEffect(() => {
    if (holdings.length === 0) {
      return undefined;
    }

    connectMarketSocket();

    const handleMarketUpdate = (data) => {
      if (!data?.instrumentKey) return;

      const symbol = Object.keys(MARKET_INSTRUMENTS).find(
        (stockSymbol) => MARKET_INSTRUMENTS[stockSymbol] === data.instrumentKey,
      );

      if (!symbol) return;

      const livePrice = Number(data.ltp);

      if (!Number.isFinite(livePrice) || livePrice <= 0) {
        return;
      }

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

  /* =========================
     FORMATTERS
  ========================= */

  const money = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const numberFormat = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 4,
    });
  };

  /* =========================
     PORTFOLIO SUMMARY
  ========================= */

  const summary = useMemo(() => {
    return holdings.reduce(
      (result, holding) => {
        const quantity = Number(holding.quantity || 0);

        const averagePrice = Number(
          holding.averagePrice || holding.avgPrice || 0,
        );

        const currentPrice = Number(
          holding.currentPrice || holding.ltp || averagePrice,
        );

        const invested = quantity * averagePrice;
        const currentValue = quantity * currentPrice;
        const pnl = currentValue - invested;

        result.invested += invested;
        result.currentValue += currentValue;
        result.pnl += pnl;

        return result;
      },
      {
        invested: 0,
        currentValue: 0,
        pnl: 0,
      },
    );
  }, [holdings]);

  const totalReturn =
    summary.invested > 0 ? (summary.pnl / summary.invested) * 100 : 0;

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <section className="holdingsPage">
        <div className="holdingsPageHeader">
          <div>
            <span className="holdingsEyebrow">PORTFOLIO</span>
            <h1>Holdings</h1>
            <p>Your current stock investments.</p>
          </div>
        </div>

        <div className="holdingsLoadingCard">
          <div className="holdingsSpinner" />
          <h2>Loading holdings...</h2>
          <p>Fetching your investments from MongoDB.</p>
        </div>
      </section>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <section className="holdingsPage">
        <div className="holdingsPageHeader">
          <div>
            <span className="holdingsEyebrow">PORTFOLIO</span>
            <h1>Holdings</h1>
            <p>Your current stock investments.</p>
          </div>
        </div>

        <div className="holdingsEmpty holdingsErrorState">
          <div className="holdingsEmptyIcon">!</div>

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

  return (
    <section className="holdingsPage">
      {/* =========================
          HEADER
      ========================= */}

      <div className="holdingsPageHeader">
        <div>
          <span className="holdingsEyebrow">PORTFOLIO</span>

          <h1>Holdings</h1>

          <p>Track your investments, current value and portfolio P&L.</p>
        </div>

        <div className="holdingsHeaderActions">
          <div className="holdingsLiveBadge">
            <span className="holdingsLiveDot" />
            Market Live
          </div>

          <div className="holdingsCount">
            {holdings.length} {holdings.length === 1 ? "Stock" : "Stocks"}
          </div>

          <button
            type="button"
            className="refreshHoldingsBtn"
            onClick={() => loadHoldings(true)}
            disabled={refreshing}
          >
            <span
              className={refreshing ? "refreshIcon spinning" : "refreshIcon"}
            >
              ↻
            </span>

            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* =========================
          SUMMARY
      ========================= */}

      {holdings.length > 0 && (
        <div className="holdingsSummaryGrid">
          <div className="holdingsSummaryCard">
            <span className="summaryLabel">Invested Value</span>

            <strong>{money(summary.invested)}</strong>

            <small>Total amount invested</small>
          </div>

          <div className="holdingsSummaryCard">
            <span className="summaryLabel">Current Value</span>

            <strong>{money(summary.currentValue)}</strong>

            <small>Current market value</small>
          </div>

          <div
            className={`holdingsSummaryCard ${
              summary.pnl >= 0 ? "summaryProfit" : "summaryLoss"
            }`}
          >
            <span className="summaryLabel">Total P&L</span>

            <strong>
              {summary.pnl >= 0 ? "+" : "-"}
              {money(Math.abs(summary.pnl))}
            </strong>

            <small>
              {summary.pnl >= 0 ? "+" : ""}
              {totalReturn.toFixed(2)}% return
            </small>
          </div>
        </div>
      )}

      {/* =========================
          EMPTY STATE
      ========================= */}

      {
        holdings.length === 0 ?
          <div className="holdingsEmpty">
            <div className="holdingsEmptyIcon">▥</div>

            <h2>No holdings yet</h2>

            <p>Buy stocks from your Watchlist and they will appear here.</p>
          </div>
          /* =========================
           TABLE
        ========================= */
        : <div className="holdingsCard">
            <div className="holdingsCardHeader">
              <div>
                <h2>Your Investments</h2>
                <p>Live portfolio positions</p>
              </div>

              <span className="holdingsTableStatus">Live prices enabled</span>
            </div>

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

                    const invested = quantity * averagePrice;

                    const currentValue = quantity * currentPrice;

                    const pnl = currentValue - invested;

                    const pnlPercent =
                      invested > 0 ? (pnl / invested) * 100 : 0;

                    const isProfit = pnl >= 0;

                    return (
                      <tr key={holding._id || holding.symbol || Math.random()}>
                        <td>
                          <div className="holdingStock">
                            <div className="stockSymbolBox">
                              {holding.symbol?.slice(0, 1) || "S"}
                            </div>

                            <div>
                              <strong>{holding.symbol || "N/A"}</strong>

                              <small>{holding.company || "Equity Stock"}</small>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="tablePrimary">
                            {numberFormat(quantity)}
                          </span>
                        </td>

                        <td>{money(averagePrice)}</td>

                        <td>
                          <strong className="currentPrice">
                            {money(currentPrice)}
                          </strong>
                        </td>

                        <td>{money(invested)}</td>

                        <td>
                          <strong>{money(currentValue)}</strong>
                        </td>

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
