import { useCallback, useEffect, useMemo, useState } from "react";

import {
  marketSocket,
  connectMarketSocket,
  disconnectMarketSocket,
} from "../../services/marketSocket";

import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaChartLine,
  FaCircleCheck,
  FaCoins,
  FaRotate,
  FaTriangleExclamation,
} from "react-icons/fa6";

import "./AnalyticsPage.css";

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

function AnalyticsPage() {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  /* =====================================================
     FETCH ANALYTICS DATA
  ===================================================== */

  const loadAnalytics = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
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

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server returned an invalid response.");
      }

      if (!response.ok) {
        throw new Error(data?.message || "Unable to load analytics.");
      }

      if (!data.success) {
        throw new Error(data?.message || "Unable to load analytics.");
      }

      setHoldings(Array.isArray(data.holdings) ? data.holdings : []);
    } catch (err) {
      console.error("❌ ANALYTICS ERROR:", err);

      setError(err.message || "Unable to load analytics.");

      setHoldings([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  /* =====================================================
     INITIAL LOAD + TRADE UPDATE
  ===================================================== */

  useEffect(() => {
    loadAnalytics();

    const handleUpdate = () => {
      loadAnalytics(true);
    };

    window.addEventListener("tradenest-update", handleUpdate);

    return () => {
      window.removeEventListener("tradenest-update", handleUpdate);
    };
  }, [loadAnalytics]);

  /* =====================================================
     LIVE MARKET PRICE
  ===================================================== */

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
        (stockSymbol) => MARKET_INSTRUMENTS[stockSymbol] === data.instrumentKey,
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
     CALCULATIONS
  ===================================================== */

  const analytics = useMemo(() => {
    let invested = 0;
    let current = 0;
    let quantity = 0;

    const stocks = holdings.map((stock) => {
      const qty = Number(stock.quantity || 0);

      const avgPrice = Number(stock.averagePrice || stock.avgPrice || 0);

      const currentPrice = Number(stock.currentPrice || stock.ltp || avgPrice);

      const investedAmount = qty * avgPrice;

      const currentValue = qty * currentPrice;

      const pnl = currentValue - investedAmount;

      const pnlPercent = investedAmount > 0 ? (pnl / investedAmount) * 100 : 0;

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

    const totalPnl = current - invested;

    const totalPnlPercent = invested > 0 ? (totalPnl / invested) * 100 : 0;

    const bestStock =
      stocks.length > 0 ?
        [...stocks].sort((a, b) => b.pnlPercent - a.pnlPercent)[0]
      : null;

    const worstStock =
      stocks.length > 0 ?
        [...stocks].sort((a, b) => a.pnlPercent - b.pnlPercent)[0]
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

  /* =====================================================
     FORMATTERS
  ===================================================== */

  const money = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const number = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <section className="analyticsPage">
        <div className="analyticsStateCard">
          <div className="analyticsLoader"></div>

          <h3>Loading Analytics</h3>

          <p>Calculating your portfolio performance.</p>
        </div>
      </section>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error) {
    return (
      <section className="analyticsPage">
        <div className="analyticsStateCard analyticsError">
          <div className="analyticsStateIcon error">
            <FaTriangleExclamation />
          </div>

          <h2>Unable to load analytics</h2>

          <p>{error}</p>

          <button
            className="analyticsRetryButton"
            onClick={() => loadAnalytics(true)}
          >
            <FaRotate />
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const profitable = analytics.totalPnl >= 0;

  /* =====================================================
     MAIN UI
  ===================================================== */

  return (
    <section className="analyticsPage">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="analyticsHeader">
        <div className="analyticsTitleBlock">
          <span className="analyticsEyebrow">PORTFOLIO INSIGHTS</span>

          <h1>Analytics</h1>

          <p>
            Analyze your portfolio performance, returns and capital allocation.
          </p>
        </div>

        <div className="analyticsHeaderActions">
          <div className="analyticsLive">
            <span className="analyticsLiveDot"></span>

            <span>Live Market</span>
          </div>

          <button
            className={`analyticsRefreshButton ${
              refreshing ? "isRefreshing" : ""
            }`}
            onClick={() => loadAnalytics(true)}
            disabled={refreshing}
          >
            <FaRotate />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="analyticsCards">
        <article className="analyticsCard investedCard">
          <div className="analyticsCardTop">
            <div className="analyticsCardIcon">
              <FaCoins />
            </div>

            <span className="analyticsCardLabel">Invested</span>
          </div>

          <h2>{money(analytics.invested)}</h2>

          <p>Total capital invested</p>
        </article>

        <article className="analyticsCard valueCard">
          <div className="analyticsCardTop">
            <div className="analyticsCardIcon">
              <FaChartLine />
            </div>

            <span className="analyticsCardLabel">Current Value</span>
          </div>

          <h2>{money(analytics.current)}</h2>

          <p>Live market value</p>
        </article>

        <article className="analyticsCard pnlCard">
          <div className="analyticsCardTop">
            <div className="analyticsCardIcon">
              {profitable ?
                <FaArrowTrendUp />
              : <FaArrowTrendDown />}
            </div>

            <span className="analyticsCardLabel">Total P&amp;L</span>
          </div>

          <h2 className={profitable ? "analyticsProfit" : "analyticsLoss"}>
            {profitable ? "+" : "-"}
            {money(Math.abs(analytics.totalPnl))}
          </h2>

          <p className={profitable ? "analyticsProfit" : "analyticsLoss"}>
            {profitable ? "+" : ""}
            {analytics.totalPnlPercent.toFixed(2)}% overall return
          </p>
        </article>

        <article className="analyticsCard holdingsCountCard">
          <div className="analyticsCardTop">
            <div className="analyticsCardIcon">
              <FaCircleCheck />
            </div>

            <span className="analyticsCardLabel">Total Holdings</span>
          </div>

          <h2>{analytics.totalStocks}</h2>

          <p>{number(analytics.quantity)} shares</p>
        </article>
      </div>

      {/* =================================================
          BEST / WORST
      ================================================= */}

      <div className="analyticsHighlightGrid">
        <article className="highlightCard bestCard">
          <div className="highlightIcon">
            <FaArrowTrendUp />
          </div>

          <div className="highlightContent">
            <span>Best Performer</span>

            {analytics.bestStock ?
              <>
                <h3>{analytics.bestStock.symbol}</h3>

                <strong>+{analytics.bestStock.pnlPercent.toFixed(2)}%</strong>
              </>
            : <h3>No holdings</h3>}
          </div>

          <div className="highlightBadge">TOP</div>
        </article>

        <article className="highlightCard worstCard">
          <div className="highlightIcon">
            <FaArrowTrendDown />
          </div>

          <div className="highlightContent">
            <span>Lowest Performer</span>

            {analytics.worstStock ?
              <>
                <h3>{analytics.worstStock.symbol}</h3>

                <strong>
                  {analytics.worstStock.pnlPercent >= 0 ? "+" : ""}
                  {analytics.worstStock.pnlPercent.toFixed(2)}%
                </strong>
              </>
            : <h3>No holdings</h3>}
          </div>

          <div className="highlightBadge">WATCH</div>
        </article>
      </div>

      {/* =================================================
          STOCK PERFORMANCE
      ================================================= */}

      <div className="analyticsSection">
        <div className="analyticsSectionHeader">
          <div>
            <span className="sectionEyebrow">PERFORMANCE</span>

            <h2>Stock Performance</h2>

            <p>Performance of each stock in your portfolio.</p>
          </div>

          <div className="sectionCount">
            {analytics.totalStocks}{" "}
            {analytics.totalStocks === 1 ? "Stock" : "Stocks"}
          </div>
        </div>

        {analytics.stocks.length > 0 ?
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
                {analytics.stocks.map((stock) => {
                  const positive = stock.pnl >= 0;

                  return (
                    <tr key={stock._id || stock.symbol}>
                      <td>
                        <div className="analyticsStock">
                          <div className="stockSymbol">
                            {stock.symbol?.charAt(0) || "S"}
                          </div>

                          <div className="stockDetails">
                            <strong>{stock.symbol}</strong>

                            <small>{stock.company || "Stock"}</small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="tableMoney">
                          {money(stock.investedAmount)}
                        </span>
                      </td>

                      <td>
                        <span className="tableMoney">
                          {money(stock.currentValue)}
                        </span>
                      </td>

                      <td
                        className={
                          positive ? "analyticsProfit" : "analyticsLoss"
                        }
                      >
                        <strong>
                          {positive ? "+" : "-"}
                          {money(Math.abs(stock.pnl))}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`returnBadge ${
                            positive ? "positive" : "negative"
                          }`}
                        >
                          {positive ? "+" : ""}
                          {stock.pnlPercent.toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        : <div className="analyticsEmpty">
            <div className="analyticsEmptyIcon">
              <FaChartLine />
            </div>

            <h3>No Analytics Available</h3>

            <p>Buy some stocks to start analyzing your portfolio.</p>
          </div>
        }
      </div>

      {/* =================================================
          PORTFOLIO ALLOCATION
      ================================================= */}

      <div className="analyticsSection allocationSection">
        <div className="analyticsSectionHeader">
          <div>
            <span className="sectionEyebrow">CAPITAL MIX</span>

            <h2>Portfolio Allocation</h2>

            <p>Distribution of invested capital across stocks.</p>
          </div>
        </div>

        {analytics.stocks.length > 0 ?
          <div className="allocationList">
            {analytics.stocks.map((stock) => {
              const allocation =
                analytics.invested > 0 ?
                  (stock.investedAmount / analytics.invested) * 100
                : 0;

              return (
                <div className="allocationItem" key={stock.symbol}>
                  <div className="allocationTop">
                    <div className="allocationName">
                      <span className="allocationDot"></span>

                      <strong>{stock.symbol}</strong>
                    </div>

                    <span className="allocationPercentage">
                      {allocation.toFixed(2)}%
                    </span>
                  </div>

                  <div className="allocationBar">
                    <div
                      className="allocationFill"
                      style={{
                        width: `${Math.min(allocation, 100)}%`,
                      }}
                    ></div>
                  </div>

                  <div className="allocationBottom">
                    <small>{money(stock.investedAmount)}</small>

                    <small>{number(stock.qty)} shares</small>
                  </div>
                </div>
              );
            })}
          </div>
        : <div className="analyticsEmpty allocationEmpty">
            No allocation data available.
          </div>
        }
      </div>
    </section>
  );
}

export default AnalyticsPage;
