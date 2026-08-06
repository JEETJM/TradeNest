import dashboardData from "../../data/dashboard";

function Indices() {
  const indices = dashboardData.market.indices;

  return (
    <div className="analyticsCard">
      <h3>Market Indices 📊</h3>

      {indices.map((item) => (
        <div key={item.id} className="stockRow">
          <div>
            <strong>{item.name}</strong>
            <p>{item.exchange}</p>
          </div>

          <div style={{ textAlign: "right" }}>
            <strong>{item.current}</strong>

            <p className={item.positive ? "profit" : "loss"}>
              {item.change > 0 ? "+" : ""}
              {item.change} ({item.changePercent}%)
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Indices;