import "./PortfolioGrowth.css";

import dashboardData from "../../data/dashboard";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function PortfolioGrowth() {
  const { investedAmount, currentValue, overallReturn } = dashboardData.summary;
const chartData = dashboardData.analytics.portfolioGrowth;
  // const chartData = dashboardData.analytics.portfolioGrowth;
  return (
    <div className="growthCard">
      <div className="growthHeader">
        <h2>Portfolio Growth</h2>

        <button>View Report</button>
      </div>

      <div className="growthStats">
        <div>
          <span>Invested</span>
          <h3>{investedAmount.formatted}</h3>
        </div>

        <div>
          <span>Current Value</span>
          <h3>{currentValue.formatted}</h3>
        </div>

        <div>
          <span>Total Return</span>

          <h3 className="profit">{overallReturn.formatted}</h3>

          <small>{overallReturn.percentage}</small>
        </div>
      </div>

      <div className="chartBox">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#387ed1"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PortfolioGrowth;
