import { useCallback, useEffect, useMemo, useState } from "react";

import "./OrdersPage.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const getToken = () => {
  return (
    localStorage.getItem("tradenest_token") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("tradenest_token") ||
    sessionStorage.getItem("token")
  );
};

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");

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

      const response = await fetch(`${API_URL}/trades/orders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          "Server returned an invalid response. Please check the backend.",
        );
      }

      if (!response.ok) {
        throw new Error(data?.message || "Unable to fetch orders.");
      }

      if (!data.success) {
        throw new Error(data?.message || "Unable to fetch orders.");
      }

      setOrders(Array.isArray(data.orders) ? data.orders : []);
    } catch (err) {
      console.error("LOAD ORDERS ERROR:", err);

      setError(err.message || "Unable to load orders.");

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
      loadOrders(true);
    };

    window.addEventListener("tradenest-update", refreshOrders);

    return () => {
      window.removeEventListener("tradenest-update", refreshOrders);
    };
  }, [loadOrders]);

  /* =====================================================
     FORMATTERS
  ===================================================== */

  const formatMoney = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatQuantity = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 4,
    });
  };

  const formatDate = (date) => {
    if (!date) return "-";

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
     ORDER FILTER
  ===================================================== */

  const filteredOrders = useMemo(() => {
    if (filter === "ALL") {
      return orders;
    }

    return orders.filter(
      (order) => String(order.side || "").toUpperCase() === filter,
    );
  }, [orders, filter]);

  /* =====================================================
     SUMMARY
  ===================================================== */

  const summary = useMemo(() => {
    let buyCount = 0;
    let sellCount = 0;
    let completedCount = 0;
    let totalValue = 0;

    orders.forEach((order) => {
      const side = String(order.side || "").toUpperCase();

      const status = String(order.status || "").toUpperCase();

      if (side === "BUY") {
        buyCount += 1;
      }

      if (side === "SELL") {
        sellCount += 1;
      }

      if (status === "COMPLETED") {
        completedCount += 1;
      }

      totalValue += Number(order.totalAmount || 0);
    });

    return {
      buyCount,
      sellCount,
      completedCount,
      totalValue,
    };
  }, [orders]);

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <section className="ordersPage">
        <div className="ordersHeader">
          <div>
            <span className="ordersEyebrow">TRADE HISTORY</span>

            <h1>Orders</h1>

            <p>View and track all your trading orders.</p>
          </div>
        </div>

        <div className="ordersLoadingCard">
          <div className="ordersSpinner" />

          <h2>Loading orders...</h2>

          <p>Fetching your orders from MongoDB.</p>
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
            <span className="ordersEyebrow">TRADE HISTORY</span>

            <h1>Orders</h1>

            <p>View and track all your trading orders.</p>
          </div>
        </div>

        <div className="ordersEmpty ordersErrorState">
          <div className="emptyOrderIcon">!</div>

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
      </section>
    );
  }

  return (
    <section className="ordersPage">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="ordersHeader">
        <div>
          <span className="ordersEyebrow">TRADE HISTORY</span>

          <h1>Orders</h1>

          <p>View and track all your trading orders.</p>
        </div>

        <div className="ordersHeaderActions">
          <div className="ordersLiveBadge">
            <span className="ordersLiveDot" />
            Trading History
          </div>

          <div className="orderCount">
            {orders.length} {orders.length === 1 ? "Order" : "Orders"}
          </div>

          <button
            type="button"
            className="refreshOrdersBtn"
            onClick={() => loadOrders(true)}
            disabled={refreshing}
          >
            <span
              className={
                refreshing ? "refreshOrderIcon spinning" : "refreshOrderIcon"
              }
            >
              ↻
            </span>

            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* =================================================
          SUMMARY
      ================================================= */}

      {orders.length > 0 && (
        <div className="ordersSummaryGrid">
          <div className="ordersSummaryCard">
            <span>BUY Orders</span>

            <strong className="buySummary">{summary.buyCount}</strong>

            <small>Total purchase orders</small>
          </div>

          <div className="ordersSummaryCard">
            <span>SELL Orders</span>

            <strong className="sellSummary">{summary.sellCount}</strong>

            <small>Total sell orders</small>
          </div>

          <div className="ordersSummaryCard">
            <span>Completed</span>

            <strong>{summary.completedCount}</strong>

            <small>Successfully completed</small>
          </div>

          <div className="ordersSummaryCard">
            <span>Total Order Value</span>

            <strong>{formatMoney(summary.totalValue)}</strong>

            <small>Combined order amount</small>
          </div>
        </div>
      )}

      {/* =================================================
          ORDER CARD
      ================================================= */}

      <div className="ordersCard">
        <div className="ordersCardHeader">
          <div>
            <h2>Order History</h2>

            <p>Your recent BUY and SELL activity</p>
          </div>

          <div className="orderFilters">
            <button
              type="button"
              className={
                filter === "ALL" ? "orderFilter active" : "orderFilter"
              }
              onClick={() => setFilter("ALL")}
            >
              All
            </button>

            <button
              type="button"
              className={
                filter === "BUY" ?
                  "orderFilter buyFilter active"
                : "orderFilter buyFilter"
              }
              onClick={() => setFilter("BUY")}
            >
              Buy
            </button>

            <button
              type="button"
              className={
                filter === "SELL" ?
                  "orderFilter sellFilter active"
                : "orderFilter sellFilter"
              }
              onClick={() => setFilter("SELL")}
            >
              Sell
            </button>
          </div>
        </div>

        {/* =================================================
            EMPTY
        ================================================= */}

        {orders.length === 0 ?
          <div className="ordersEmpty">
            <div className="emptyOrderIcon">▤</div>

            <h2>No orders yet</h2>

            <p>Your completed Buy and Sell orders will appear here.</p>
          </div>
        : filteredOrders.length === 0 ?
          <div className="ordersFilteredEmpty">
            <div className="emptyOrderIcon">⌕</div>

            <h3>No {filter} orders found</h3>

            <p>Try another order filter.</p>
          </div>
          /* =================================================
             TABLE
          ================================================= */
        : <div className="ordersTableWrapper">
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
                {filteredOrders.map((order) => {
                  const orderId = order._id || order.id || "";

                  const side = String(order.side || "").toUpperCase();

                  const status = String(
                    order.status || "UNKNOWN",
                  ).toUpperCase();

                  const productType = order.productType || "CNC";

                  return (
                    <tr key={orderId || `${order.symbol}-${order.createdAt}`}>
                      {/* ORDER ID */}

                      <td>
                        <span className="orderId">
                          #{String(orderId).slice(-8)}
                        </span>
                      </td>

                      {/* STOCK */}

                      <td>
                        <div className="orderStock">
                          <div className="orderStockIcon">
                            {order.symbol?.slice(0, 1) || "S"}
                          </div>

                          <div>
                            <strong>{order.symbol || "-"}</strong>

                            <small>{order.company || "Equity Stock"}</small>
                          </div>
                        </div>
                      </td>

                      {/* BUY / SELL */}

                      <td>
                        <span
                          className={
                            side === "BUY" ? "buyType"
                            : side === "SELL" ?
                              "sellType"
                            : "unknownType"
                          }
                        >
                          {side || "-"}
                        </span>
                      </td>

                      {/* QUANTITY */}

                      <td>
                        <span className="tableValue">
                          {formatQuantity(order.quantity)}
                        </span>
                      </td>

                      {/* PRICE */}

                      <td>{formatMoney(order.price)}</td>

                      {/* TOTAL */}

                      <td>
                        <strong className="orderTotal">
                          {formatMoney(order.totalAmount)}
                        </strong>
                      </td>

                      {/* PRODUCT */}

                      <td>
                        <span className="productType">{productType}</span>
                      </td>

                      {/* STATUS */}

                      <td>
                        <span
                          className={
                            status === "COMPLETED" ? "completedStatus"
                            : status === "CANCELLED" ?
                              "cancelledStatus"
                            : "pendingStatus"
                          }
                        >
                          <span className="statusDot" />
                          {status}
                        </span>
                      </td>

                      {/* DATE */}

                      <td>
                        <span className="orderDate">
                          {formatDate(order.createdAt)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        }
      </div>
    </section>
  );
}

export default OrdersPage;
