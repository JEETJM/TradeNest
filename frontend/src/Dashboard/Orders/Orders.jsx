import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import dashboardData from "../../data/dashboard";

import "./Orders.css";

function Orders() {
  const [searchParams] = useSearchParams();

  const stockSymbol = searchParams.get("stock");
  const action = searchParams.get("action");

  const stocks = dashboardData.watchlist || [];

  const initialStock =
    stocks.find((stock) => stock.symbol === stockSymbol) ||
    stocks[0] ||
    null;

  const [selectedStock, setSelectedStock] =
    useState(initialStock);

  const [orderType, setOrderType] = useState(
    action === "SELL" ? "SELL" : "BUY"
  );

  const [quantity, setQuantity] = useState(1);

  const [price, setPrice] = useState(
    initialStock?.currentPrice || 0
  );

  const [productType, setProductType] =
    useState("CNC");

  const [selectedOrderType, setSelectedOrderType] =
    useState("MARKET");

  const [orderStatus, setOrderStatus] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* =====================================================
     CHANGE STOCK
  ===================================================== */

  const handleStockChange = (stock) => {
    setSelectedStock(stock);
    setPrice(stock.currentPrice || 0);
    setOrderStatus("");
  };

  /* =====================================================
     CHANGE BUY / SELL
  ===================================================== */

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
    setOrderStatus("");
  };

  /* =====================================================
     TOTAL
  ===================================================== */

  const totalAmount =
    Number(quantity || 0) * Number(price || 0);

  /* =====================================================
     PLACE BUY / SELL ORDER
  ===================================================== */

  const handlePlaceOrder = async () => {
    if (!selectedStock) {
      setOrderStatus("❌ Please select a stock.");
      return;
    }

    if (loading) return;

    const cleanQuantity = Number(quantity);
    const cleanPrice = Number(price);

    /* =========================
       VALIDATE QUANTITY
    ========================= */

    if (
      !Number.isFinite(cleanQuantity) ||
      cleanQuantity <= 0
    ) {
      setOrderStatus(
        "❌ Quantity must be greater than 0."
      );
      return;
    }

    /* =========================
       VALIDATE PRICE
    ========================= */

    if (
      !Number.isFinite(cleanPrice) ||
      cleanPrice <= 0
    ) {
      setOrderStatus(
        "❌ Price must be greater than 0."
      );
      return;
    }

    /* =========================
       GET JWT TOKEN
    ========================= */

    const token =
      localStorage.getItem("tradenest_token") ||
      sessionStorage.getItem("tradenest_token");

    if (!token) {
      setOrderStatus(
        "❌ Login session expired. Please login again."
      );
      return;
    }

    /* =========================
       REQUEST BODY
    ========================= */

    const orderData = {
      symbol: selectedStock.symbol,
      company: selectedStock.company,
      side: orderType,
      quantity: cleanQuantity,
      price: cleanPrice,
      productType: productType,
      orderType: selectedOrderType,
    };

    console.log(
      "📤 TRADE REQUEST:",
      orderData
    );

    try {
      setLoading(true);
      setOrderStatus("Placing order...");

      /* =========================
         CALL BACKEND
      ========================= */

      const response = await fetch(
        "http://localhost:5000/api/trades/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      console.log(
        "📥 TRADE RESPONSE:",
        data
      );

      /* =========================
         BACKEND ERROR
      ========================= */

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to place order."
        );
      }

      /* =========================
         SUCCESS
      ========================= */

      setOrderStatus(
        `✓ ${data.message}`
      );

      /* =========================
         REFRESH DASHBOARD DATA
      ========================= */

      window.dispatchEvent(
        new Event("tradenest-update")
      );

      console.log(
        "✅ ORDER SUCCESSFULLY SENT TO BACKEND"
      );

    } catch (error) {
      console.error(
        "❌ PLACE ORDER ERROR:",
        error
      );

      setOrderStatus(
        `❌ ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     NO STOCK
  ===================================================== */

  if (!selectedStock) {
    return (
      <section className="ordersPage">
        <div className="ordersHeader">
          <h1>Orders</h1>

          <p>No stocks available.</p>
        </div>
      </section>
    );
  }

  /* =====================================================
     UI
  ===================================================== */

  return (
    <section className="ordersPage">

      {/* HEADER */}

      <div className="ordersHeader">
        <div>
          <h1>Orders</h1>

          <p>
            Place and manage your stock orders.
          </p>
        </div>
      </div>

      {/* MAIN LAYOUT */}

      <div className="ordersLayout">

        {/* STOCK LIST */}

        <div className="stockSelector">

          <div className="sectionTitle">
            <h2>Select Stock</h2>
          </div>

          {stocks.map((stock) => (
            <button
              type="button"
              key={stock.id || stock.symbol}
              className={
                selectedStock.symbol ===
                stock.symbol
                  ? "stockSelectorItem selected"
                  : "stockSelectorItem"
              }
              onClick={() =>
                handleStockChange(stock)
              }
            >
              <div>
                <strong>
                  {stock.symbol}
                </strong>

                <small>
                  {stock.company}
                </small>
              </div>

              <span>
                ₹
                {Number(
                  stock.currentPrice || 0
                ).toLocaleString("en-IN")}
              </span>
            </button>
          ))}

        </div>

        {/* ORDER CARD */}

        <div className="orderCard">

          {/* STOCK HEADER */}

          <div className="orderStockHeader">

            <div>
              <h2>
                {selectedStock.symbol}
              </h2>

              <p>
                {selectedStock.company}
              </p>
            </div>

            <div className="currentPrice">
              ₹
              {Number(
                selectedStock.currentPrice || 0
              ).toLocaleString("en-IN")}
            </div>

          </div>

          {/* BUY / SELL */}

          <div className="orderTabs">

            <button
              type="button"
              className={
                orderType === "BUY"
                  ? "buyActive"
                  : ""
              }
              onClick={() =>
                handleOrderTypeChange("BUY")
              }
            >
              BUY
            </button>

            <button
              type="button"
              className={
                orderType === "SELL"
                  ? "sellActive"
                  : ""
              }
              onClick={() =>
                handleOrderTypeChange("SELL")
              }
            >
              SELL
            </button>

          </div>

          {/* PRODUCT */}

          <div className="orderField">

            <label>
              Product
            </label>

            <div className="productButtons">

              <button
                type="button"
                className={
                  productType === "CNC"
                    ? "selectedProduct"
                    : ""
                }
                onClick={() =>
                  setProductType("CNC")
                }
              >
                CNC
              </button>

              <button
                type="button"
                className={
                  productType === "MIS"
                    ? "selectedProduct"
                    : ""
                }
                onClick={() =>
                  setProductType("MIS")
                }
              >
                MIS
              </button>

            </div>
          </div>

          {/* QUANTITY */}

          <div className="orderField">

            <label>
              Quantity
            </label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => {
                const value =
                  Number(e.target.value);

                setQuantity(
                  value < 1 ? 1 : value
                );

                setOrderStatus("");
              }}
            />

          </div>

          {/* PRICE */}

          <div className="orderField">

            <label>
              Price
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => {
                setPrice(
                  Number(e.target.value)
                );

                setOrderStatus("");
              }}
            />

          </div>

          {/* ORDER TYPE */}

          <div className="orderField">

            <label>
              Order Type
            </label>

            <select
              value={selectedOrderType}
              onChange={(e) => {
                setSelectedOrderType(
                  e.target.value
                );

                setOrderStatus("");
              }}
            >
              <option value="MARKET">
                MARKET
              </option>

              <option value="LIMIT">
                LIMIT
              </option>

              <option value="SL">
                SL
              </option>

              <option value="SL-M">
                SL-M
              </option>
            </select>

          </div>

          {/* ORDER SUMMARY */}

          <div className="orderSummary">

            <div>
              <span>
                Order
              </span>

              <strong>
                {orderType}
              </strong>
            </div>

            <div>
              <span>
                Product
              </span>

              <strong>
                {productType}
              </strong>
            </div>

            <div>
              <span>
                Quantity
              </span>

              <strong>
                {quantity}
              </strong>
            </div>

            <div>
              <span>
                Price
              </span>

              <strong>
                ₹
                {Number(price).toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 2,
                  }
                )}
              </strong>
            </div>

            <div className="totalRow">

              <span>
                Total Amount
              </span>

              <strong>
                ₹
                {totalAmount.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 2,
                  }
                )}
              </strong>

            </div>

          </div>

          {/* STATUS */}

          {orderStatus && (
            <div
              className={
                orderStatus.startsWith("❌")
                  ? "orderError"
                  : "orderSuccess"
              }
            >
              {orderStatus}
            </div>
          )}

          {/* PLACE ORDER */}

          <button
            type="button"
            disabled={loading}
            className={
              orderType === "BUY"
                ? "placeOrder buyOrder"
                : "placeOrder sellOrder"
            }
            onClick={handlePlaceOrder}
          >
            {loading
              ? "Placing Order..."
              : orderType === "BUY"
                ? "Place Buy Order"
                : "Place Sell Order"}
          </button>

        </div>
      </div>
    </section>
  );
}

export default Orders;