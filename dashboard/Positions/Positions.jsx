import "./Positions.css";
import dashboardData from "../../data/dashboard";

function Positions() {
  const positions = dashboardData.positions;

  return (
    <section className="positionsCard">
      <div className="positionsHeader">
        <h2>Open Positions</h2>

        <button>View All</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Avg</th>
            <th>LTP</th>
            <th>P&L</th>
          </tr>
        </thead>

        <tbody>
          {positions.map((position) => (
            <tr key={position.id}>
              <td>
                <strong>{position.symbol}</strong>
              </td>

              <td>{position.product}</td>

              <td>{position.quantity}</td>

              <td>₹{position.averagePrice}</td>

              <td>₹{position.ltp}</td>

              <td className={position.positive ? "profit" : "loss"}>
                {position.positive ? "+" : "-"}₹{Math.abs(position.pnl)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Positions;
