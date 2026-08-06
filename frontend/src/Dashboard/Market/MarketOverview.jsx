import "./MarketOverview.css";

import dashboardData from "../../data/dashboard";

function MarketOverview() {
  const { indices } = dashboardData.market;

  return (
    <section className="marketOverview">
      <h2>Market Overview</h2>

      <div className="marketGrid">
        {indices.map((item) => (
          <div className="marketCard" key={item.id}>
            <h4>{item.name}</h4>

            <h3>{item.current.toLocaleString("en-IN")}</h3>

            <span className={item.positive ? "green" : "red"}>
              {item.positive ? "+" : ""}
              {item.changePercent}%
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MarketOverview;
