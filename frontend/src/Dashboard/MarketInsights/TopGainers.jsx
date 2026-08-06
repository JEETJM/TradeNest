import dashboardData from "../../data/dashboard";

function TopGainers() {

  const gainers = dashboardData.analytics.topGainers;

  return (

    <div className="analyticsCard">

      <h3>Top Gainers 🚀</h3>

      {gainers.map((stock) => (

        <div
          key={stock.symbol}
          className="stockRow"
        >

          <div>

            <strong>{stock.symbol}</strong>

            <p>{stock.company}</p>

          </div>

          <span className="profit">

            +{stock.change}%

          </span>

        </div>

      ))}

    </div>

  );

}

export default TopGainers;