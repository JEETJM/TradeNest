import "./MarketOverview.css";

const market = [
  {
    name: "NIFTY 50",
    value: "25,184.60",
    change: "+0.82%",
    positive: true,
  },
  {
    name: "SENSEX",
    value: "82,456.30",
    change: "+0.75%",
    positive: true,
  },
  {
    name: "BANK NIFTY",
    value: "56,874.20",
    change: "-0.34%",
    positive: false,
  },
  {
    name: "FINNIFTY",
    value: "24,365.55",
    change: "+1.12%",
    positive: true,
  },
];

function MarketOverview() {
  return (
    <section className="marketOverview">
      <h2>Market Overview</h2>

      <div className="marketGrid">
        {market.map((item, index) => (
          <div className="marketCard" key={index}>
            <h4>{item.name}</h4>

            <h3>{item.value}</h3>

            <span className={item.positive ? "green" : "red"}>
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MarketOverview;
