import { useCallback, useEffect, useState } from "react";
import "./OrdersPage.css";

const API_URL = "http://localhost:5000";

/* =====================================================
   GET TOKEN
===================================================== */

const getToken = () => {
  return (
    localStorage.getItem("tradenest_token") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("tradenest_token") ||
    sessionStorage.getItem("token")
  );
};

/* =====================================================
   ORDERS PAGE
===================================================== */

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  /* =====================================================
     LOAD ORDERS
  ===================================================== */

  const loadOrders = useCallback(async (showRefreshLoader = false) => {
    try {
      if (showRefreshLoader) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const token = getToken();

      if (!token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      console.log("📤 Fetching orders from MongoDB...");

      const response = await fetch(`${API_URL}/api/trades/orders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("❌ INVALID ORDERS RESPONSE:", responseText);

        throw new Error(
          "Server returned an invalid response. Please check the backend.",
        );
      }

      console.log("📥 ORDERS FROM BACKEND:", data);

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch orders.");
      }

      if (!data.success) {
        throw new Error(data.message || "Unable to fetch orders.");
      }

      setOrders(Array.isArray(data.orders) ? data.orders : []);
    } catch (error) {
      console.error("❌ LOAD ORDERS ERROR:", error);

      setError(error.message || "Unable to load orders.");
      setOrders([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  /* =====================================================
     INITIAL LOAD + AUTO REFRESH
  ===================================================== */

  useEffect(() => {
    loadOrders();

    const refreshOrders = () => {
      console.log("🔄 TradeNest update detected. Refreshing orders...");
      loadOrders(true);
    };

    window.addEventListener("tradenest-update", refreshOrders);

    return () => {
      window.removeEventListener("tradenest-update", refreshOrders);
    };
  }, [loadOrders]);

  /* =====================================================
     MONEY FORMAT
  ===================================================== */

  const formatMoney = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  /* =====================================================
     DATE FORMAT
  ===================================================== */

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
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
            <p>View and track all your trading orders.</p>
          </div>

          <div className="orderCount">Loading...</div>
        </div>

        <div className="ordersCard">
          <div className="emptyOrders">
            <div className="emptyOrderIcon">⏳</div>

            <h2>Loading orders...</h2>

            <p>Fetching your orders from MongoDB.</p>
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
            <p>View and track all your trading orders.</p>
          </div>
        </div>

        <div className="ordersCard">
          <div className="emptyOrders">
            <div className="emptyOrderIcon">⚠️</div>

            <h2>Unable to load orders</h2>

            <p>{error}</p>

            <button
              type="button"
              className="retryOrdersBtn"
              onClick={() => loadOrders(true)}
              disabled={refreshing}
            >
              {refreshing ? "Refreshing..." : "Try Again"}
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
      <div className="ordersHeader">
        <div>
          <h1>Orders</h1>

          <p>View and track all your trading orders.</p>
        </div>

        <div className="ordersHeaderActions">
          <div className="orderCount">
            {orders.length}{" "}
            {orders.length === 1 ? "Order" : "Orders"}
          </div>

          <button
            type="button"
            className="refreshOrdersBtn"
            onClick={() => loadOrders(true)}
            disabled={refreshing}
          >
            {refreshing ? "Refreshing..." : "↻ Refresh"}
          </button>
        </div>
      </div>

      <div className="ordersCard">
        {orders.length === 0 ? (
          <div className="emptyOrders">
            <div className="emptyOrderIcon">📋</div>

            <h2>No orders yet</h2>

            <p>
              Your completed Buy and Sell orders will appear here.
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
                  <th>Product</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => {
                  const orderId = order._id || order.id || "";

                  const side = String(
                    order.side || "",
                  ).toUpperCase();

                  const status = String(
                    order.status || "UNKNOWN",
                  ).toUpperCase();

                  const productType =
                    order.productType || "CNC";

                  return (
                    <tr key={orderId}>
                      {/* ORDER ID */}
                      <td>
                        <strong className="orderId">
                          {String(orderId).slice(-8)}
                        </strong>
                      </td>

                      {/* STOCK */}
                      <td>
                        <div className="orderStock">
                          <strong>{order.symbol || "-"}</strong>

                          <small>
                            {order.company || "-"}
                          </small>
                        </div>
                      </td>

                      {/* BUY / SELL */}
                      <td>
                        <span
                          className={
                            side === "BUY"
                              ? "buyType"
                              : side === "SELL"
                                ? "sellType"
                                : "unknownType"
                          }
                        >
                          {side || "-"}
                        </span>
                      </td>

                      {/* QUANTITY */}
                      <td>
                        {Number(
                          order.quantity || 0,
                        ).toLocaleString("en-IN")}
                      </td>

                      {/* PRICE */}
                      <td>{formatMoney(order.price)}</td>

                      {/* TOTAL */}
                      <td>
                        <strong>
                          {formatMoney(order.totalAmount)}
                        </strong>
                      </td>

                      {/* PRODUCT */}
                      <td>
                        <span className="productType">
                          {productType}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td>
                        <span
                          className={
                            status === "COMPLETED"
                              ? "completedStatus"
                              : status === "CANCELLED"
                                ? "cancelledStatus"
                                : "pendingStatus"
                          }
                        >
                          {status}
                        </span>
                      </td>

                      {/* DATE */}
                      <td>{formatDate(order.createdAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default OrdersPage;