import { useCallback, useEffect, useMemo, useState } from "react";

import {
  marketSocket,
  connectMarketSocket,
  disconnectMarketSocket,
} from "../../services/marketSocket";

import "./PortfolioPage.css";

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

function PortfolioPage() {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // ================= LOAD HOLDINGS =================

  const loadHoldings = useCallback(async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const token = getToken();

      if (!token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      console.log("📤 PORTFOLIO: Fetching holdings from MongoDB...");

      const response = await fetch(`${API_URL}/api/trades/holdings`, {
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
        console.error("❌ INVALID PORTFOLIO RESPONSE:", responseText);

        throw new Error(
          "Server returned an invalid response. Please check the backend.",
        );
      }

      console.log("📥 PORTFOLIO HOLDINGS:", data);

      if (!response.ok) {
        throw new Error(data?.message || "Unable to load portfolio.");
      }

      if (!data.success) {
        throw new Error(data?.message || "Unable to load portfolio.");
      }

      setHoldings(Array.isArray(data.holdings) ? data.holdings : []);
    } catch (err) {
      console.error("❌ PORTFOLIO ERROR:", err);

      setError(err.message || "Unable to load portfolio.");
      setHoldings([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // ================= INITIAL LOAD =================

  useEffect(() => {
    loadHoldings();

    const handleTradeNestUpdate = () => {
      console.log("🔄 Portfolio update detected...");
      loadHoldings(true);
    };

    window.addEventListener("tradenest-update", handleTradeNestUpdate);

    return () => {
      window.removeEventListener("tradenest-update", handleTradeNestUpdate);
    };
  }, [loadHoldings]);

  // ================= LIVE MARKET =================

  useEffect(() => {
    if (holdings.length === 0) {
      return undefined;
    }

    console.log("📡 Portfolio connecting to live market...");

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

      console.log("🔥 PORTFOLIO LIVE PRICE:", symbol, livePrice);

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

  // ================= MONEY FORMAT =================

  const formatMoney = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatNumber = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 4,
    });
  };

  // ================= PORTFOLIO CALCULATION =================

  const portfolioSummary = useMemo(() => {
    let investedAmount = 0;
    let currentValue = 0;
    let totalQuantity = 0;

    holdings.forEach((stock) => {
      const quantity = Number(stock.quantity || 0);

      const averagePrice = Number(stock.averagePrice || stock.avgPrice || 0);

      const currentPrice = Number(
        stock.currentPrice || stock.ltp || averagePrice,
      );

      investedAmount += quantity * averagePrice;

      currentValue += quantity * currentPrice;

      totalQuantity += quantity;
    });

    const totalReturn = currentValue - investedAmount;

    const returnPercentage =
      investedAmount > 0 ? (totalReturn / investedAmount) * 100 : 0;

    return {
      investedAmount,
      currentValue,
      totalReturn,
      returnPercentage,
      totalQuantity,
      totalStocks: holdings.length,
    };
  }, [holdings]);

  const positiveReturn = portfolioSummary.totalReturn >= 0;

  // ================= LOADING =================

  if (loading) {
    return (
      <section className="portfolioPage">
        <div className="portfolioLoading">
          <div className="portfolioLoader"></div>

          <h3>Loading Portfolio...</h3>

          <p>Fetching your holdings from MongoDB.</p>
        </div>
      </section>
    );
  }

  // ================= ERROR =================

  if (error) {
    return (
      <section className="portfolioPage">
        <div className="portfolioError">
          <div className="portfolioErrorIcon">⚠️</div>

          <h2>Unable to load portfolio</h2>

          <p>{error}</p>

          <button className="retryPortfolioBtn" onClick={() => loadHoldings()}>
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // ================= UI =================

  return (
    <section className="portfolioPage">
      {/* ================= HEADER ================= */}

      <div className="portfolioHeader">
        <div>
          <h1>Portfolio</h1>

          <p>Track your investments and portfolio performance.</p>
        </div>

        <div className="portfolioHeaderActions">
          <span className="portfolioLiveStatus">
            <span className="portfolioLiveDot"></span>
            Live
          </span>

          <button
            className="refreshPortfolioBtn"
            onClick={() => loadHoldings(true)}
            disabled={refreshing}
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* ================= SUMMARY ================= */}

      <div className="portfolioStats">
        {/* INVESTED */}

        <div className="portfolioStatCard">
          <span>Invested Amount</span>

          <h2>{formatMoney(portfolioSummary.investedAmount)}</h2>

          <small>Total amount invested</small>
        </div>

        {/* CURRENT VALUE */}

        <div className="portfolioStatCard">
          <span>Current Value</span>

          <h2>{formatMoney(portfolioSummary.currentValue)}</h2>

          <small>Current market value</small>
        </div>

        {/* TOTAL RETURN */}

        <div className="portfolioStatCard">
          <span>Total Return</span>

          <h2 className={positiveReturn ? "profitText" : "lossText"}>
            {positiveReturn ? "+" : "-"}
            {formatMoney(Math.abs(portfolioSummary.totalReturn))}
          </h2>

          <small className={positiveReturn ? "profitText" : "lossText"}>
            {positiveReturn ? "+" : ""}
            {portfolioSummary.returnPercentage.toFixed(2)}%
          </small>
        </div>

        {/* HOLDINGS */}

        <div className="portfolioStatCard">
          <span>Holdings</span>

          <h2>{portfolioSummary.totalStocks}</h2>

          <small>
            {formatNumber(portfolioSummary.totalQuantity)} total shares
          </small>
        </div>
      </div>

      {/* ================= HOLDINGS ================= */}

      <div className="portfolioSection">
        <div className="portfolioSectionHeader">
          <div>
            <h2>Your Holdings</h2>

            <p>Current stocks in your portfolio.</p>
          </div>

          <span className="portfolioHoldingCount">
            {portfolioSummary.totalStocks} Stocks
          </span>
        </div>

        <div className="portfolioTableWrapper">
          <table className="portfolioTable">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Qty</th>
                <th>Avg. Price</th>
                <th>LTP</th>
                <th>Invested</th>
                <th>Current Value</th>
                <th>P&L</th>
              </tr>
            </thead>

            <tbody>
              {holdings.length > 0 ?
                holdings.map((stock) => {
                  const quantity = Number(stock.quantity || 0);

                  const averagePrice = Number(
                    stock.averagePrice || stock.avgPrice || 0,
                  );

                  const currentPrice = Number(
                    stock.currentPrice || stock.ltp || averagePrice,
                  );

                  const invested = quantity * averagePrice;

                  const currentValue = quantity * currentPrice;

                  const pnl = currentValue - invested;

                  const pnlPercentage =
                    invested > 0 ? (pnl / invested) * 100 : 0;

                  const positive = pnl >= 0;

                  return (
                    <tr key={stock._id || stock.id || stock.symbol}>
                      {/* STOCK */}

                      <td>
                        <div className="portfolioStock">
                          <strong>{stock.symbol}</strong>

                          <small>{stock.company || "Stock"}</small>
                        </div>
                      </td>

                      {/* QUANTITY */}

                      <td>{formatNumber(quantity)}</td>

                      {/* AVG PRICE */}

                      <td>{formatMoney(averagePrice)}</td>

                      {/* LTP */}

                      <td>
                        <span className="portfolioLtp">
                          {formatMoney(currentPrice)}
                        </span>
                      </td>

                      {/* INVESTED */}

                      <td>{formatMoney(invested)}</td>

                      {/* CURRENT */}

                      <td>{formatMoney(currentValue)}</td>

                      {/* P&L */}

                      <td className={positive ? "positive" : "negative"}>
                        <strong>
                          {positive ? "+" : "-"}
                          {formatMoney(Math.abs(pnl))}
                        </strong>

                        <small className="pnlPercentage">
                          {positive ? "+" : ""}
                          {pnlPercentage.toFixed(2)}%
                        </small>
                      </td>
                    </tr>
                  );
                })
              : <tr>
                  <td colSpan="7" className="emptyPortfolio">
                    <div className="emptyPortfolioIcon">📊</div>

                    <strong>No holdings available</strong>

                    <p>Buy stocks from your Watchlist to see them here.</p>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= PERFORMANCE ================= */}

      <div className="portfolioSection">
        <div className="portfolioSectionHeader">
          <div>
            <h2>Portfolio Performance</h2>

            <p>Your current portfolio performance.</p>
          </div>
        </div>

        <div className="performancePlaceholder">
          <div className="performanceIcon">📈</div>

          <h3>
            {positiveReturn ? "Portfolio is in Profit" : "Portfolio is in Loss"}
          </h3>

          <p className={positiveReturn ? "profitText" : "lossText"}>
            {positiveReturn ? "+" : "-"}
            {formatMoney(Math.abs(portfolioSummary.totalReturn))} (
            {positiveReturn ? "+" : ""}
            {portfolioSummary.returnPercentage.toFixed(2)}
            %)
          </p>

          <small>
            Live portfolio value is calculated from your current holdings.
          </small>
        </div>
      </div>
    </section>
  );
}

export default PortfolioPage;
