import { useEffect, useState } from "react";

import "./OrdersPage.css";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =====================================================
     LOAD ORDERS FROM MONGODB
  ===================================================== */

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("tradenest_token") ||
        sessionStorage.getItem("tradenest_token");

      if (!token) {
        setError("Please login again.");
        setLoading(false);
        return;
      }

      console.log("📤 Fetching orders from MongoDB...");

      const response = await fetch(
        "http://localhost:5000/api/trades/orders",
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("📥 ORDERS FROM BACKEND:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to fetch orders."
        );
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error(
        "❌ LOAD ORDERS ERROR:",
        error
      );

      setError(error.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     INITIAL LOAD
  ===================================================== */

  useEffect(() => {
    loadOrders();

    const refreshOrders = () => {
      loadOrders();
    };

    window.addEventListener(
      "tradenest-update",
      refreshOrders
    );

    return () => {
      window.removeEventListener(
        "tradenest-update",
        refreshOrders
      );
    };
  }, []);

  /* =====================================================
     MONEY
  ===================================================== */

  const formatMoney = (value) =>
    `₹${Number(value || 0).toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 2,
      }
    )}`;

  /* =====================================================
     DATE
  ===================================================== */

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <section className="ordersPage">
        <div className="ordersHeader">
          <div>
            <h1>Orders</h1>
            <p>
              View and track all your trading orders.
            </p>
          </div>

          <div className="orderCount">
            Loading...
          </div>
        </div>

        <div className="ordersCard">
          <div className="emptyOrders">
            <div className="emptyOrderIcon">
              ⏳
            </div>

            <h2>Loading orders...</h2>

            <p>
              Fetching your orders from MongoDB.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error) {
    return (
      <section className="ordersPage">
        <div className="ordersHeader">
          <div>
            <h1>Orders</h1>

            <p>
              View and track all your trading orders.
            </p>
          </div>
        </div>

        <div className="ordersCard">
          <div className="emptyOrders">
            <div className="emptyOrderIcon">
              ⚠️
            </div>

            <h2>Unable to load orders</h2>

            <p>{error}</p>

            <button
              type="button"
              onClick={loadOrders}
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <section className="ordersPage">

      {/* HEADER */}

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

      {/* TABLE */}

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

                  <tr
                    key={order._id || order.id}
                  >

                    <td>
                      <strong>
                        {String(
                          order._id ||
                          order.id
                        ).slice(-8)}
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
                        order.price
                      )}
                    </td>

                    <td>
                      {formatMoney(
                        order.totalAmount
                      )}
                    </td>

                    <td>

                      <span className="completedStatus">
                        {order.status}
                      </span>

                    </td>

                    <td>
                      {formatDate(
                        order.createdAt
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