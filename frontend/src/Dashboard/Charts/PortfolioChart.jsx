import "./PortfolioChart.css";

import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";

const data = [
  { month: "Jan", value: 80000 },
  { month: "Feb", value: 95000 },
  { month: "Mar", value: 90000 },
  { month: "Apr", value: 120000 },
  { month: "May", value: 135000 },
  { month: "Jun", value: 148000 },
  { month: "Jul", value: 165000 },
];

function PortfolioChart() {
  return (
    <div className="chartCard">
      <h2>Portfolio Growth</h2>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <XAxis dataKey="month" />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#387ed1"
            fill="#387ed1"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PortfolioChart;
