import { useCallback, useEffect, useMemo, useState } from "react";

import {
  marketSocket,
  connectMarketSocket,
  disconnectMarketSocket,
} from "../../services/marketSocket";

import "./AnalyticsPage.css";

const API_URL = "http://localhost:5000";

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

function AnalyticsPage() {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // FETCH HOLDINGS
  // =========================================================

  const loadAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        throw new Error(
          "Authentication token not found. Please login again."
        );
      }

      const response = await fetch(
        `${API_URL}/api/trades/holdings`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server returned an invalid response.");
      }

      if (!response.ok) {
        throw new Error(
          data?.message || "Unable to load analytics."
        );
      }

      if (!data.success) {
        throw new Error(
          data?.message || "Unable to load analytics."
        );
      }

      setHoldings(
        Array.isArray(data.holdings)
          ? data.holdings
          : []
      );
    } catch (err) {
      console.error("❌ ANALYTICS ERROR:", err);

      setError(
        err.message || "Unable to load analytics."
      );

      setHoldings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // =========================================================
  // INITIAL LOAD + TRADE UPDATE
  // =========================================================

  useEffect(() => {
    loadAnalytics();

    const handleUpdate = () => {
      loadAnalytics();
    };

    window.addEventListener(
      "tradenest-update",
      handleUpdate
    );

    return () => {
      window.removeEventListener(
        "tradenest-update",
        handleUpdate
      );
    };
  }, [loadAnalytics]);

  // =========================================================
  // LIVE MARKET PRICE
  // =========================================================

  useEffect(() => {
    if (holdings.length === 0) {
      return undefined;
    }

    connectMarketSocket();

    const handleMarketUpdate = (data) => {
      if (!data?.instrumentKey) {
        return;
      }

      const symbol = Object.keys(MARKET_INSTRUMENTS).find(
        (stockSymbol) =>
          MARKET_INSTRUMENTS[stockSymbol] ===
          data.instrumentKey
      );

      if (!symbol) {
        return;
      }

      const livePrice = Number(data.ltp);

      if (!Number.isFinite(livePrice) || livePrice <= 0) {
        return;
      }

      setHoldings((previous) =>
        previous.map((holding) => {
          if (
            holding.symbol?.toUpperCase() !==
            symbol
          ) {
            return holding;
          }

          return {
            ...holding,
            currentPrice: livePrice,
          };
        })
      );
    };

    marketSocket.on(
      "market:update",
      handleMarketUpdate
    );

    return () => {
      marketSocket.off(
        "market:update",
        handleMarketUpdate
      );

      disconnectMarketSocket();
    };
  }, [holdings.length]);

  // =========================================================
  // ANALYTICS CALCULATIONS
  // =========================================================

  const analytics = useMemo(() => {
    let invested = 0;
    let current = 0;
    let quantity = 0;

    const stocks = holdings.map((stock) => {
      const qty = Number(stock.quantity || 0);

      const avgPrice = Number(
        stock.averagePrice ||
          stock.avgPrice ||
          0
      );

      const currentPrice = Number(
        stock.currentPrice ||
          stock.ltp ||
          avgPrice
      );

      const investedAmount =
        qty * avgPrice;

      const currentValue =
        qty * currentPrice;

      const pnl =
        currentValue - investedAmount;

      const pnlPercent =
        investedAmount > 0
          ? (pnl / investedAmount) * 100
          : 0;

      invested += investedAmount;
      current += currentValue;
      quantity += qty;

      return {
        ...stock,
        qty,
        avgPrice,
        currentPrice,
        investedAmount,
        currentValue,
        pnl,
        pnlPercent,
      };
    });

    const totalPnl =
      current - invested;

    const totalPnlPercent =
      invested > 0
        ? (totalPnl / invested) * 100
        : 0;

    const bestStock =
      stocks.length > 0
        ? [...stocks].sort(
            (a, b) =>
              b.pnlPercent - a.pnlPercent
          )[0]
        : null;

    const worstStock =
      stocks.length > 0
        ? [...stocks].sort(
            (a, b) =>
              a.pnlPercent - b.pnlPercent
          )[0]
        : null;

    return {
      stocks,
      invested,
      current,
      totalPnl,
      totalPnlPercent,
      quantity,
      totalStocks: stocks.length,
      bestStock,
      worstStock,
    };
  }, [holdings]);

  // =========================================================
  // FORMATTERS
  // =========================================================

  const money = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const number = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <section className="analyticsPage">
        <div className="analyticsLoading">
          <div className="analyticsLoader"></div>

          <h3>Loading Analytics...</h3>

          <p>
            Calculating your portfolio performance.
          </p>
        </div>
      </section>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <section className="analyticsPage">
        <div className="analyticsError">
          <div>⚠️</div>

          <h2>Unable to load analytics</h2>

          <p>{error}</p>

          <button onClick={loadAnalytics}>
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const profitable =
    analytics.totalPnl >= 0;

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <section className="analyticsPage">

      {/* HEADER */}

      <div className="analyticsHeader">
        <div>
          <h1>Analytics</h1>

          <p>
            Analyze your portfolio performance
            and returns.
          </p>
        </div>

        <div className="analyticsLive">
          <span></span>
          Live Market
        </div>
      </div>


      {/* SUMMARY CARDS */}

      <div className="analyticsCards">

        <div className="analyticsCard">
          <span>Invested</span>

          <h2>
            {money(analytics.invested)}
          </h2>

          <small>
            Total capital invested
          </small>
        </div>


        <div className="analyticsCard">
          <span>Current Value</span>

          <h2>
            {money(analytics.current)}
          </h2>

          <small>
            Live market value
          </small>
        </div>


        <div className="analyticsCard">
          <span>Total P&amp;L</span>

          <h2
            className={
              profitable
                ? "analyticsProfit"
                : "analyticsLoss"
            }
          >
            {profitable ? "+" : "-"}
            {money(
              Math.abs(
                analytics.totalPnl
              )
            )}
          </h2>

          <small
            className={
              profitable
                ? "analyticsProfit"
                : "analyticsLoss"
            }
          >
            {profitable ? "+" : ""}
            {analytics.totalPnlPercent.toFixed(2)}
            %
          </small>
        </div>


        <div className="analyticsCard">
          <span>Total Holdings</span>

          <h2>
            {analytics.totalStocks}
          </h2>

          <small>
            {number(analytics.quantity)} shares
          </small>
        </div>

      </div>


      {/* BEST / WORST */}

      <div className="analyticsHighlightGrid">

        <div className="highlightCard bestCard">

          <div className="highlightIcon">
            🏆
          </div>

          <div>
            <span>
              Best Performer
            </span>

            {analytics.bestStock ? (
              <>
                <h3>
                  {analytics.bestStock.symbol}
                </h3>

                <strong>
                  +
                  {analytics.bestStock.pnlPercent.toFixed(
                    2
                  )}
                  %
                </strong>
              </>
            ) : (
              <h3>No holdings</h3>
            )}
          </div>

        </div>


        <div className="highlightCard worstCard">

          <div className="highlightIcon">
            📉
          </div>

          <div>
            <span>
              Worst Performer
            </span>

            {analytics.worstStock ? (
              <>
                <h3>
                  {analytics.worstStock.symbol}
                </h3>

                <strong>
                  {analytics.worstStock.pnlPercent >= 0
                    ? "+"
                    : ""}
                  {analytics.worstStock.pnlPercent.toFixed(
                    2
                  )}
                  %
                </strong>
              </>
            ) : (
              <h3>No holdings</h3>
            )}
          </div>

        </div>

      </div>


      {/* STOCK PERFORMANCE */}

      <div className="analyticsSection">

        <div className="analyticsSectionHeader">

          <div>
            <h2>
              Stock Performance
            </h2>

            <p>
              Performance of each stock
              in your portfolio.
            </p>
          </div>

        </div>


        {analytics.stocks.length > 0 ? (

          <div className="analyticsTableWrapper">

            <table className="analyticsTable">

              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Invested</th>
                  <th>Current Value</th>
                  <th>P&amp;L</th>
                  <th>Return</th>
                </tr>
              </thead>


              <tbody>

                {analytics.stocks.map(
                  (stock) => {

                    const positive =
                      stock.pnl >= 0;

                    return (
                      <tr
                        key={
                          stock._id ||
                          stock.symbol
                        }
                      >

                        <td>

                          <div className="analyticsStock">

                            <strong>
                              {stock.symbol}
                            </strong>

                            <small>
                              {stock.company ||
                                "Stock"}
                            </small>

                          </div>

                        </td>


                        <td>
                          {money(
                            stock.investedAmount
                          )}
                        </td>


                        <td>
                          {money(
                            stock.currentValue
                          )}
                        </td>


                        <td
                          className={
                            positive
                              ? "analyticsProfit"
                              : "analyticsLoss"
                          }
                        >
                          {positive
                            ? "+"
                            : "-"}

                          {money(
                            Math.abs(
                              stock.pnl
                            )
                          )}
                        </td>


                        <td
                          className={
                            positive
                              ? "analyticsProfit"
                              : "analyticsLoss"
                          }
                        >
                          {positive
                            ? "+"
                            : ""}

                          {stock.pnlPercent.toFixed(
                            2
                          )}
                          %
                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="analyticsEmpty">

            <div>📊</div>

            <h3>
              No Analytics Available
            </h3>

            <p>
              Buy some stocks to start
              analyzing your portfolio.
            </p>

          </div>

        )}

      </div>


      {/* PORTFOLIO ALLOCATION */}

      <div className="analyticsSection">

        <div className="analyticsSectionHeader">

          <div>
            <h2>
              Portfolio Allocation
            </h2>

            <p>
              Distribution of your invested
              capital across stocks.
            </p>
          </div>

        </div>


        {analytics.stocks.length > 0 ? (

          <div className="allocationList">

            {analytics.stocks.map(
              (stock) => {

                const allocation =
                  analytics.invested > 0
                    ? (
                        stock.investedAmount /
                        analytics.invested
                      ) * 100
                    : 0;

                return (
                  <div
                    className="allocationItem"
                    key={stock.symbol}
                  >

                    <div className="allocationTop">

                      <strong>
                        {stock.symbol}
                      </strong>

                      <span>
                        {allocation.toFixed(2)}%
                      </span>

                    </div>


                    <div className="allocationBar">

                      <div
                        className="allocationFill"
                        style={{
                          width: `${Math.min(
                            allocation,
                            100
                          )}%`,
                        }}
                      ></div>

                    </div>


                    <small>
                      {money(
                        stock.investedAmount
                      )}
                    </small>

                  </div>
                );
              }
            )}

          </div>

        ) : (

          <div className="analyticsEmpty">
            No allocation data available.
          </div>

        )}

      </div>

    </section>
  );
}

export default AnalyticsPage;