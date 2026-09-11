import "./AssetAllocation.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#387ed1",
  "#18a558",
  "#ff9800",
  "#9c27b0",
];

function AssetAllocation() {
  const data = [
    {
      name: "Stocks",
      value: 75,
    },
    {
      name: "ETF",
      value: 10,
    },
    {
      name: "Mutual Fund",
      value: 10,
    },
    {
      name: "Cash",
      value: 5,
    },
  ];

  return (
    <div className="assetCard">
      <h2>Asset Allocation</h2>

      <div className="assetContent">

        <ResponsiveContainer
          width="100%"
          height={250}
        >
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

        <div className="assetLegend">

          {data.map((item, index) => (
            <div
              className="legendItem"
              key={item.name}
            >
              <span
                className="colorDot"
                style={{
                  background:
                    COLORS[index],
                }}
              />

              <p>{item.name}</p>

              <strong>
                {item.value}%
              </strong>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default AssetAllocation;