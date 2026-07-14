import "./Orders.css";

function Orders({ orders }) {
  return (
    <div className="ordersCard">
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
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.stock}</td>

              <td>{order.type}</td>

              <td>{order.qty}</td>

              <td>{order.price}</td>

              <td>
                <span
                  className={
                    order.status === "Completed" ? "completed" : "pending"
                  }
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
