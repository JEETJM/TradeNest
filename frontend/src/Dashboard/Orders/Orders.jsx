import "./Orders.css";
import dashboardData from "../../data/dashboard";

function Orders() {
  const orders = dashboardData.orders;

  return (
    <section className="ordersCard">
      <div className="ordersHeader">
        <h2>Recent Orders</h2>

        <button>View All</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Stock</th>
            <th>Type</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <strong>{order.symbol}</strong>
              </td>

              <td>
                <span
                  className={order.type === "BUY" ? "buyBadge" : "sellBadge"}
                >
                  {order.type}
                </span>
              </td>

              <td>{order.quantity}</td>

              <td>₹{order.price}</td>

              <td>
                <span
                  className={
                    order.status === "Completed" ? "completed" : "pending"
                  }
                >
                  {order.status}
                </span>
              </td>

              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Orders;
