import { useState } from "react";

import dashboardData from "../../data/dashboard";

import TradeModal from "../Trading/TradeModal";

import "./Watchlist.css";

function Watchlist() {
  const watchlist = dashboardData.watchlist || [];

  const [trade, setTrade] = useState(null);

  const openTrade = (stock, side) => {
    setTrade({
      stock,
      side,
    });
  };

  const closeTrade = () => {
    setTrade(null);
  };

  
  return (
    <section className="watchlistPage">
      <div className="watchlistHeader">
        <div>
          <h1>Watchlist</h1>

          <p>Track your favourite stocks and place orders.</p>
        </div>
      </div>

      <div className="watchlistTableWrapper">
        <table className="watchlistTable">
          <thead>
            <tr>
              <th>Stock</th>

              <th>Price</th>

              <th>Change</th>

              <th>Day High</th>

              <th>Day Low</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {watchlist.map((stock) => {
              const positive = Number(stock.changePercent) >= 0;

              return (
                <tr key={stock.id}>
                  <td>
                    <div className="watchStock">
                      <strong>{stock.symbol}</strong>

                      <small>{stock.company}</small>
                    </div>
                  </td>

                  <td>
                    ₹
                    {Number(stock.currentPrice).toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  <td className={positive ? "watchPositive" : "watchNegative"}>
                    {positive ? "+" : ""}
                    {stock.changePercent}%
                  </td>

                  <td>₹{Number(stock.dayHigh).toLocaleString("en-IN")}</td>

                  <td>₹{Number(stock.dayLow).toLocaleString("en-IN")}</td>

                  <td>
                    <div className="watchActions">
                      <button
                        className="buyBtn"
                        onClick={() => openTrade(stock, "BUY")}
                      >
                        Buy
                      </button>

                      <button
                        className="sellBtn"
                        onClick={() => openTrade(stock, "SELL")}
                      >
                        Sell
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {trade && (
        <TradeModal
          stock={trade.stock}
          side={trade.side}
          onClose={closeTrade}
          onSuccess={() => {
            window.dispatchEvent(new Event("tradenest-update"));
          }}
        />
      )}
    </section>
  );
}

export default Watchlist;
