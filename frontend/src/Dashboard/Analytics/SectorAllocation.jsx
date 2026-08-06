import "./SectorAllocation.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import dashboardData from "../../data/dashboard";

const COLORS = [
  "#387ed1",
  "#18a558",
  "#ff9800",
  "#e53935",
  "#8e24aa",
  "#607d8b",
];

function SectorAllocation() {

  const data = dashboardData.analytics.sectorAllocation;

  return (
    <div className="sectorCard">

      <h2>Sector Allocation</h2>

      <div className="sectorChart">

        <ResponsiveContainer width="100%" height={280}>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="sector"
              outerRadius={95}
              innerRadius={45}
              paddingAngle={2}
            >

              {data.map((item, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="sectorList">

        {data.map((item, index) => (

          <div className="sectorItem" key={index}>

            <div className="sectorLeft">

              <span
                className="sectorDot"
                style={{
                  background: COLORS[index],
                }}
              ></span>

              <p>{item.sector}</p>

            </div>

            <strong>{item.value}%</strong>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SectorAllocation;