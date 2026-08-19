import dashboardData from "../../data/dashboard";

import "./PortfolioPage.css";

function PortfolioPage() {
  const portfolio = dashboardData.portfolio || {};
  const summary = dashboardData.summary || {};

  // ================= HOLDINGS =================

  const holdings = dashboardData.holdings || [];

  // ================= SUMMARY DATA =================

  const totalInvested =
    summary.investedAmount?.value || summary.investedAmount || 0;

  const currentValue = summary.currentValue?.value || summary.currentValue || 0;

  const totalReturn =
    summary.overallReturn?.value || summary.overallReturn || 0;

  const returnPercentage = summary.overallReturn?.percentage || "0%";

  // ================= HOLDINGS STATS =================

  const totalStocks = holdings.length;

  const totalQuantity = holdings.reduce(
    (total, stock) => total + Number(stock.quantity || 0),
    0,
  );

  // ================= MONEY FORMAT =================

  const formatMoney = (value) => {
    if (typeof value === "string") {
      return value;
    }

    return `₹${Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <section className="portfolioPage">
      {/* ================= HEADER ================= */}

      <div className="portfolioHeader">
        <div>
          <h1>Portfolio</h1>

          <p>Track your investments and portfolio performance.</p>
        </div>

        <button className="portfolioReportBtn">View Report</button>
      </div>

      {/* ================= SUMMARY ================= */}

      <div className="portfolioStats">
        {/* Invested Amount */}

        <div className="portfolioStatCard">
          <span>Invested Amount</span>

          <h2>
            {formatMoney(summary.investedAmount?.formatted || totalInvested)}
          </h2>

          <small>Total amount invested</small>
        </div>

        {/* Current Value */}

        <div className="portfolioStatCard">
          <span>Current Value</span>

          <h2>
            {formatMoney(summary.currentValue?.formatted || currentValue)}
          </h2>

          <small>Current market value</small>
        </div>

        {/* Total Return */}

        <div className="portfolioStatCard">
          <span>Total Return</span>

          <h2 className="profitText">
            {formatMoney(summary.overallReturn?.formatted || totalReturn)}
          </h2>

          <small className="profitText">{returnPercentage}</small>
        </div>

        {/* Holdings */}

        <div className="portfolioStatCard">
          <span>Holdings</span>

          <h2>{totalStocks}</h2>

          <small>{totalQuantity} total shares</small>
        </div>
      </div>

      {/* ================= HOLDINGS ================= */}

      <div className="portfolioSection">
        <div className="portfolioSectionHeader">
          <div>
            <h2>Your Holdings</h2>

            <p>Current stocks in your portfolio.</p>
          </div>
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

                  const avgPrice = Number(
                    stock.averagePrice || stock.avgPrice || 0,
                  );

                  const currentPrice = Number(
                    stock.currentPrice || stock.ltp || avgPrice,
                  );

                  const invested = quantity * avgPrice;

                  const current = quantity * currentPrice;

                  const pnl = current - invested;

                  const positive = pnl >= 0;

                  return (
                    <tr key={stock.id || stock.symbol}>
                      {/* Stock */}

                      <td>
                        <div className="portfolioStock">
                          <strong>{stock.symbol}</strong>

                          <small>{stock.company || "Stock"}</small>
                        </div>
                      </td>

                      {/* Quantity */}

                      <td>{quantity}</td>

                      {/* Average Price */}

                      <td>{formatMoney(avgPrice)}</td>

                      {/* Current Price */}

                      <td>{formatMoney(currentPrice)}</td>

                      {/* Invested */}

                      <td>{formatMoney(invested)}</td>

                      {/* Current Value */}

                      <td>{formatMoney(current)}</td>

                      {/* P&L */}

                      <td className={positive ? "positive" : "negative"}>
                        {positive ? "+" : "-"}

                        {formatMoney(Math.abs(pnl))}
                      </td>
                    </tr>
                  );
                })
              : <tr>
                  <td colSpan="7" className="emptyPortfolio">
                    No holdings available.
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

            <p>Your portfolio growth over time.</p>
          </div>
        </div>

        <div className="performancePlaceholder">
          <h3>Portfolio Growth</h3>

          <p>
            {portfolio.monthlyGrowth?.length ?
              "Monthly portfolio growth data is available."
            : "Performance data will appear here."}
          </p>
        </div>
      </div>
    </section>
  );
}

export default PortfolioPage;
