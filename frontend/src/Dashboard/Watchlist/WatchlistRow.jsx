import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

function WatchlistRow({ stock }) {
  return (
    <div className="watchRow">
      <div className="watchInfo">
        <h4>{stock.symbol}</h4>
        <p>{stock.company}</p>
      </div>

      <div className="watchPrice">
        <h3>₹ {stock.price}</h3>

        <span className={stock.positive ? "profit" : "loss"}>
          {stock.positive ? (
            <FaArrowTrendUp />
          ) : (
            <FaArrowTrendDown />
          )}

          {stock.change}%
        </span>
      </div>

      <div className="watchBtns">
        <button className="buyBtn">Buy</button>

        <button className="sellBtn">Sell</button>
      </div>
    </div>
  );
}

export default WatchlistRow;