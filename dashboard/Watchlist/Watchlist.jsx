import "./Watchlist.css";
import dashboardData from "../../data/dashboard";

function Watchlist() {
  const watchlist = dashboardData.watchlist;

  return (
    <section className="watchlistCard">
      <div className="watchlistHeader">
        <h2>Watchlist</h2>

        <button>View All</button>
      </div>

      {watchlist.map((stock) => (
        <div className="watchlistItem" key={stock.id}>
          <div>
            <h4>{stock.symbol}</h4>
            <small>{stock.company}</small>
          </div>

          <div className="watchlistRight">
            <h4>₹{stock.price}</h4>

            <span className={stock.positive ? "watchProfit" : "watchLoss"}>
              {stock.positive ? "+" : ""}
              {stock.changePercent}%
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Watchlist;
