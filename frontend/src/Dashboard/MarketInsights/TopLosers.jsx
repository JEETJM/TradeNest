import dashboardData from "../../data/dashboard";

function TopLosers() {

  const losers = dashboardData.analytics.topLosers;

  return (

    <div className="analyticsCard">

      <h3>Top Losers 📉</h3>

      {losers.map((stock) => (

        <div
          key={stock.symbol}
          className="stockRow"
        >

          <div>

            <strong>{stock.symbol}</strong>

            <p>{stock.company}</p>

          </div>

          <span className="loss">

            {stock.change}%

          </span>

        </div>

      ))}

    </div>

  );

}

export default TopLosers;