import "./PerformanceCard.css";

import dashboardData from "../../data/dashboard";

function PerformanceCard() {
  const performance = dashboardData.analytics.portfolioPerformance;
  const risk = dashboardData.analytics.riskAnalysis;

  return (
    <div className="performanceCard">
      <h2>Performance</h2>

      <div className="performanceItem">
        <span>Today</span>

        <strong className={performance.today.positive ? "profit" : "loss"}>
          ₹{performance.today.profit}
        </strong>

        <small>{performance.today.percentage}%</small>
      </div>

      <div className="performanceItem">
        <span>This Week</span>

        <strong className={performance.week.positive ? "profit" : "loss"}>
          ₹{performance.week.profit}
        </strong>

        <small>{performance.week.percentage}%</small>
      </div>

      <div className="performanceItem">
        <span>This Month</span>

        <strong className={performance.month.positive ? "profit" : "loss"}>
          ₹{performance.month.profit}
        </strong>

        <small>{performance.month.percentage}%</small>
      </div>

      <div className="performanceItem">
        <span>This Year</span>

        <strong className={performance.year.positive ? "profit" : "loss"}>
          ₹{performance.year.profit}
        </strong>

        <small>{performance.year.percentage}%</small>
      </div>

      <hr />

      <div className="riskBox">
        <h3>Risk Analysis</h3>

        <p>
          <strong>Score:</strong> {risk.score}
        </p>

        <p>
          <strong>Level:</strong> {risk.level}
        </p>

        <p>
          <strong>Diversification:</strong> {risk.diversification}
        </p>

        <p>
          <strong>Volatility:</strong> {risk.volatility}
        </p>
      </div>
    </div>
  );
}

export default PerformanceCard;