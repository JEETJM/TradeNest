import "./Holdings.css";

function Holdings({ holdings }) {
  return (
    <div className="holdingsCard">
      <div className="holdingHeader">
        <h2>Holdings</h2>

        <button>View All</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Stock</th>

            <th>Qty</th>

            <th>Avg Price</th>

            <th>LTP</th>

            <th>P&L</th>
          </tr>
        </thead>

        <tbody>
          {holdings.map((item) => (
            <tr key={item.id}>
              <td>{item.stock}</td>

              <td>{item.qty}</td>

              <td>{item.avgPrice}</td>

              <td>{item.ltp}</td>

              <td className={item.profit ? "profit" : "loss"}>{item.pnl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Holdings;
