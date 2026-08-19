import { useEffect, useState } from "react";

import { getTradeData } from "../../data/tradeStore";

import "./OrdersPage.css";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    const data = getTradeData();

    setOrders(data.orders || []);
  };

  useEffect(() => {
    loadOrders();

    window.addEventListener(
      "tradenest-update",
      loadOrders,
    );

    return () => {
      window.removeEventListener(
        "tradenest-update",
        loadOrders,
      );
    };
  }, []);

  const formatMoney = (value) =>
    `₹${Number(value || 0).toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 2,
      },
    )}`;

  const formatDate = (date) => {
    return new Date(date).toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      },
    );
  };

  return (
    <section className="ordersPage">

      {/* Header */}

      <div className="ordersHeader">

        <div>
          <h1>Orders</h1>

          <p>
            View and track all your trading orders.
          </p>
        </div>

        <div className="orderCount">
          {orders.length} Orders
        </div>

      </div>

      {/* Table */}

      <div className="ordersCard">

        {orders.length === 0 ? (
          <div className="emptyOrders">

            <div className="emptyOrderIcon">
              📋
            </div>

            <h2>No orders yet</h2>

            <p>
              Your completed Buy and Sell orders
              will appear here.
            </p>

          </div>
        ) : (

          <div className="ordersTableWrapper">

            <table className="ordersTable">

              <thead>

                <tr>
                  <th>Order ID</th>
                  <th>Stock</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>

              </thead>

              <tbody>

                {orders.map((order) => (

                  <tr key={order.id}>

                    <td>
                      <strong>
                        {order.id}
                      </strong>
                    </td>

                    <td>

                      <div className="orderStock">

                        <strong>
                          {order.symbol}
                        </strong>

                        <small>
                          {order.company}
                        </small>

                      </div>

                    </td>

                    <td>

                      <span
                        className={
                          order.side === "BUY"
                            ? "buyType"
                            : "sellType"
                        }
                      >
                        {order.side}
                      </span>

                    </td>

                    <td>
                      {order.quantity}
                    </td>

                    <td>
                      {formatMoney(
                        order.price,
                      )}
                    </td>

                    <td>
                      {formatMoney(
                        order.total,
                      )}
                    </td>

                    <td>

                      <span className="completedStatus">
                        {order.status}
                      </span>

                    </td>

                    <td>
                      {formatDate(
                        order.createdAt,
                      )}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </section>
  );
}

export default OrdersPage;