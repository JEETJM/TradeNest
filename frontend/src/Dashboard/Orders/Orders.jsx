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
    stocks.find((stock) => stock.symbol === stockSymbol) || stocks[0] || null;

  const [selectedStock, setSelectedStock] = useState(initialStock);

  const [orderType, setOrderType] = useState(
    action === "SELL" ? "SELL" : "BUY",
  );

  const [quantity, setQuantity] = useState(1);

  const [price, setPrice] = useState(initialStock?.currentPrice || 0);

  const [productType, setProductType] = useState("CNC");

  const [orderStatus, setOrderStatus] = useState("");

  // -----------------------------
  // Change Stock
  // -----------------------------

  const handleStockChange = (stock) => {
    setSelectedStock(stock);

    setPrice(stock.currentPrice);

    setOrderStatus("");
  };

  // -----------------------------
  // Change BUY / SELL
  // -----------------------------

  const handleOrderTypeChange = (type) => {
    setOrderType(type);

    setOrderStatus("");
  };

  // -----------------------------
  // Total Amount
  // -----------------------------

  const totalAmount = quantity * price;

  // -----------------------------
  // Place Order
  // -----------------------------

  const handlePlaceOrder = () => {
    if (!selectedStock) {
      return;
    }

    setOrderStatus(
      `${orderType} order placed successfully for ${quantity} ${selectedStock.symbol}`,
    );
  };

  // -----------------------------
  // No Stock
  // -----------------------------

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

  return (
    <section className="ordersPage">
      {/* =========================
          HEADER
      ========================== */}

      <div className="ordersHeader">
        <div>
          <h1>Orders</h1>

          <p>Place and manage your stock orders.</p>
        </div>
      </div>

      {/* =========================
          MAIN LAYOUT
      ========================== */}

      <div className="ordersLayout">
        {/* =========================
            STOCK LIST
        ========================== */}

        <div className="stockSelector">
          <div className="sectionTitle">
            <h2>Select Stock</h2>
          </div>

          {stocks.map((stock) => (
            <button
              key={stock.id}
              className={
                selectedStock.id === stock.id ?
                  "stockSelectorItem selected"
                : "stockSelectorItem"
              }
              onClick={() => handleStockChange(stock)}
            >
              <div>
                <strong>{stock.symbol}</strong>

                <small>{stock.company}</small>
              </div>

              <span>₹{stock.currentPrice.toLocaleString("en-IN")}</span>
            </button>
          ))}
        </div>

        {/* =========================
            ORDER CARD
        ========================== */}

        <div className="orderCard">
          {/* Stock Header */}

          <div className="orderStockHeader">
            <div>
              <h2>{selectedStock.symbol}</h2>

              <p>{selectedStock.company}</p>
            </div>

            <div className="currentPrice">
              ₹{selectedStock.currentPrice.toLocaleString("en-IN")}
            </div>
          </div>

          {/* =========================
              BUY / SELL
          ========================== */}

          <div className="orderTabs">
            <button
              className={orderType === "BUY" ? "buyActive" : ""}
              onClick={() => handleOrderTypeChange("BUY")}
            >
              BUY
            </button>

            <button
              className={orderType === "SELL" ? "sellActive" : ""}
              onClick={() => handleOrderTypeChange("SELL")}
            >
              SELL
            </button>
          </div>

          {/* =========================
              PRODUCT
          ========================== */}

          <div className="orderField">
            <label>Product</label>

            <div className="productButtons">
              <button
                className={productType === "CNC" ? "selectedProduct" : ""}
                onClick={() => setProductType("CNC")}
              >
                CNC
              </button>

              <button
                className={productType === "MIS" ? "selectedProduct" : ""}
                onClick={() => setProductType("MIS")}
              >
                MIS
              </button>
            </div>
          </div>

          {/* =========================
              QUANTITY
          ========================== */}

          <div className="orderField">
            <label>Quantity</label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => {
                const value = Number(e.target.value);

                setQuantity(value < 1 ? 1 : value);

                setOrderStatus("");
              }}
            />
          </div>

          {/* =========================
              PRICE
          ========================== */}

          <div className="orderField">
            <label>Price</label>

            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => {
                setPrice(Number(e.target.value));

                setOrderStatus("");
              }}
            />
          </div>

          {/* =========================
              ORDER TYPE
          ========================== */}

          <div className="orderField">
            <label>Order Type</label>

            <select>
              <option>MARKET</option>

              <option>LIMIT</option>

              <option>SL</option>

              <option>SL-M</option>
            </select>
          </div>

          {/* =========================
              ORDER SUMMARY
          ========================== */}

          <div className="orderSummary">
            <div>
              <span>Order</span>

              <strong>{orderType}</strong>
            </div>

            <div>
              <span>Product</span>

              <strong>{productType}</strong>
            </div>

            <div>
              <span>Quantity</span>

              <strong>{quantity}</strong>
            </div>

            <div>
              <span>Price</span>

              <strong>₹{price.toLocaleString("en-IN")}</strong>
            </div>

            <div className="totalRow">
              <span>Total Amount</span>

              <strong>
                ₹
                {totalAmount.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </strong>
            </div>
          </div>

          {/* =========================
              SUCCESS MESSAGE
          ========================== */}

          {orderStatus && <div className="orderSuccess">✓ {orderStatus}</div>}

          {/* =========================
              PLACE ORDER
          ========================== */}

          <button
            className={
              orderType === "BUY" ?
                "placeOrder buyOrder"
              : "placeOrder sellOrder"
            }
            onClick={handlePlaceOrder}
          >
            {orderType === "BUY" ? "Place Buy Order" : "Place Sell Order"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Orders;
