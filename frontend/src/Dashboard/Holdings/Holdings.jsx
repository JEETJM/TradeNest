import "./Holdings.css";

function Holdings({ holdings }) {
  return (
    <div className="holdingsCard">
      <div className="holdingHeader">
        <h2>My Holdings</h2>

        <button>View All</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Symbol</th>

            <th>Company</th>

            <th>Qty</th>

            <th>Avg Price</th>

            <th>LTP</th>

            <th>Total P&L</th>
          </tr>
        </thead>

        <tbody>
          {holdings.map((item) => (
            <tr key={item.id}>
              <td>
                <strong>{item.symbol}</strong>
              </td>

              <td>{item.company}</td>

              <td>{item.quantity}</td>

              <td>₹{item.averagePrice}</td>

              <td>₹{item.ltp}</td>

              <td className={item.positive ? "profit" : "loss"}>
                {item.positive ? "+" : "-"}₹{Math.abs(item.totalPnL)}
                <br />
                <small>
                  {item.totalPnLPercent > 0 ? "+" : ""}
                  {item.totalPnLPercent}%
                </small>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Holdings;
