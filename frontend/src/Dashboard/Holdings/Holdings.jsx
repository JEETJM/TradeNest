import { useEffect, useState } from "react";

import { getTradeData } from "../../data/tradeStore";

import "./Holdings.css";

function Holdings() {
  const [holdings, setHoldings] = useState([]);

  const loadHoldings = () => {
    const data = getTradeData();

    setHoldings(data?.holdings || []);
  };

  useEffect(() => {
    loadHoldings();

    window.addEventListener("tradenest-update", loadHoldings);

    return () => {
      window.removeEventListener("tradenest-update", loadHoldings);
    };
  }, []);

  const money = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  return (
    <section className="holdingsPage">
      {/* Header */}

      <div className="holdingsPageHeader">
        <div>
          <h1>Holdings</h1>

          <p>Your current stock investments.</p>
        </div>

        <div className="holdingsCount">{holdings.length} Stocks</div>
      </div>

      {/* Empty State */}

      {holdings.length === 0 ?
        <div className="holdingsEmpty">
          <div className="holdingsEmptyIcon">📊</div>

          <h2>No holdings yet</h2>

          <p>Buy stocks from your Watchlist and they will appear here.</p>
        </div>
      : <div className="holdingsCard">
          <div className="holdingsTableWrapper">
            <table className="holdingsTable">
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Quantity</th>
                  <th>Avg. Price</th>
                  <th>Current Price</th>
                  <th>Invested</th>
                  <th>Current Value</th>
                  <th>P&L</th>
                </tr>
              </thead>

              <tbody>
                {holdings.map((stock) => {
                  const quantity = Number(stock.quantity || 0);

                  const avgPrice = Number(
                    stock.averagePrice || stock.avgPrice || 0,
                  );

                  const currentPrice = Number(
                    stock.currentPrice || stock.ltp || avgPrice,
                  );

                  const invested = quantity * avgPrice;

                  const currentValue = quantity * currentPrice;

                  const pnl = currentValue - invested;

                  const profit = pnl >= 0;

                  return (
                    <tr key={stock.symbol || stock.id}>
                      <td>
                        <div className="holdingStock">
                          <strong>{stock.symbol}</strong>

                          <small>{stock.company || "Stock"}</small>
                        </div>
                      </td>

                      <td>{quantity}</td>

                      <td>{money(avgPrice)}</td>

                      <td>{money(currentPrice)}</td>

                      <td>{money(invested)}</td>

                      <td>{money(currentValue)}</td>

                      <td className={profit ? "holdingProfit" : "holdingLoss"}>
                        {profit ? "+" : "-"}
                        {money(Math.abs(pnl))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      }
    </section>
  );
}

export default Holdings;
