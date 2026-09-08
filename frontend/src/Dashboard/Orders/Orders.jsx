import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import dashboardData from "../../data/dashboard";

import {
  marketSocket,
  connectMarketSocket,
  disconnectMarketSocket,
} from "../../services/marketSocket";

import "./Orders.css";

/* =================================
   UPSTOX INSTRUMENTS
================================= */

const MARKET_INSTRUMENTS = {
  INFY: "NSE_EQ|INE009A01021",
  TCS: "NSE_EQ|INE467B01029",
  RELIANCE: "NSE_EQ|INE002A01018",
  HDFCBANK: "NSE_EQ|INE040A01034",
  SBIN: "NSE_EQ|INE062A01020",
  ICICIBANK: "NSE_EQ|INE090A01021",
  ITC: "NSE_EQ|INE154A01025",
  WIPRO: "NSE_EQ|INE075A01022",
  AXISBANK: "NSE_EQ|INE238A01034",
  KOTAKBANK: "NSE_EQ|INE237A01036",
};

const API_URL = "http://localhost:5000";

function Orders() {
  const [searchParams] = useSearchParams();

  const stockSymbol = searchParams.get("stock");
  const action = searchParams.get("action");

  const stocks = dashboardData.watchlist || [];

  /* =================================
     INITIAL STOCK
  ================================= */

  const initialStock =
    stocks.find(
      (stock) => stock.symbol?.toUpperCase() === stockSymbol?.toUpperCase(),
    ) ||
    stocks[0] ||
    null;

  /* =================================
     STATES
  ================================= */

  const [selectedStock, setSelectedStock] = useState(initialStock);

  const [orderType, setOrderType] = useState(
    action === "SELL" ? "SELL" : "BUY",
  );

  const [quantity, setQuantity] = useState(1);

  const [price, setPrice] = useState(Number(initialStock?.currentPrice || 0));

  const [productType, setProductType] = useState("CNC");

  const [selectedOrderType, setSelectedOrderType] = useState("MARKET");

  const [orderStatus, setOrderStatus] = useState("");

  const [loading, setLoading] = useState(false);

  /* =================================
     LIVE PRICE SOCKET
  ================================= */

  useEffect(() => {
    connectMarketSocket();

    const handleMarketUpdate = (data) => {
      if (!data?.instrumentKey) {
        return;
      }

      const symbol = Object.keys(MARKET_INSTRUMENTS).find(
        (stockSymbol) => MARKET_INSTRUMENTS[stockSymbol] === data.instrumentKey,
      );

      if (!symbol) {
        return;
      }

      const livePrice = Number(data.ltp);

      if (!Number.isFinite(livePrice) || livePrice <= 0) {
        return;
      }

      console.log("🔥 ORDER LIVE PRICE:", symbol, livePrice);

      /*
       * Update selected stock only if
       * this is the currently selected symbol.
       */
      setSelectedStock((previous) => {
        if (!previous || previous.symbol?.toUpperCase() !== symbol) {
          return previous;
        }

        return {
          ...previous,
          currentPrice: livePrice,
        };
      });

      /*
       * MARKET order should always
       * use latest live price.
       */
      setSelectedStock((previous) => {
        if (!previous || previous.symbol?.toUpperCase() !== symbol) {
          return previous;
        }

        return previous;
      });

      /*
       * Price update is handled using
       * current selected stock symbol.
       */
      setPrice((previousPrice) => {
        return previousPrice;
      });
    };

    marketSocket.on("market:update", handleMarketUpdate);

    return () => {
      marketSocket.off("market:update", handleMarketUpdate);

      disconnectMarketSocket();
    };
  }, []);

  /* =================================
     SYNC MARKET PRICE
  ================================= */

  useEffect(() => {
    if (selectedOrderType === "MARKET" && selectedStock?.currentPrice) {
      setPrice(Number(selectedStock.currentPrice));
    }
  }, [selectedStock?.currentPrice, selectedOrderType]);

  /* =================================
     CHANGE STOCK
  ================================= */

  const handleStockChange = (stock) => {
    setSelectedStock(stock);

    setPrice(Number(stock.currentPrice || 0));

    setOrderStatus("");
  };

  /* =================================
     BUY / SELL
  ================================= */

  const handleOrderTypeChange = (type) => {
    setOrderType(type);

    setOrderStatus("");
  };

  /* =================================
     TOTAL
  ================================= */

  const totalAmount = Number(quantity || 0) * Number(price || 0);

  /* =================================
     PLACE ORDER
  ================================= */

  const handlePlaceOrder = async () => {
    if (!selectedStock) {
      setOrderStatus("❌ Please select a stock.");
      return;
    }

    if (loading) {
      return;
    }

    const cleanQuantity = Number(quantity);
    const cleanPrice = Number(price);

    /* =========================
       QUANTITY VALIDATION
    ========================= */

    if (!Number.isFinite(cleanQuantity) || cleanQuantity <= 0) {
      setOrderStatus("❌ Quantity must be greater than 0.");

      return;
    }

    if (!Number.isInteger(cleanQuantity)) {
      setOrderStatus("❌ Quantity must be a whole number.");

      return;
    }

    /* =========================
       PRICE VALIDATION
    ========================= */

    if (!Number.isFinite(cleanPrice) || cleanPrice <= 0) {
      setOrderStatus("❌ Price must be greater than 0.");

      return;
    }

    /* =========================
       TOKEN
    ========================= */

    const token =
      localStorage.getItem("tradenest_token") ||
      sessionStorage.getItem("tradenest_token") ||
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (!token) {
      setOrderStatus("❌ Login session expired. Please login again.");

      return;
    }

    /* =========================
       ORDER DATA
    ========================= */

    const orderData = {
      symbol: selectedStock.symbol,

      company: selectedStock.company || selectedStock.symbol,

      side: orderType,

      quantity: cleanQuantity,

      price: cleanPrice,

      productType,

      orderType: selectedOrderType,
    };

    console.log("📤 TRADE REQUEST:", orderData);

    try {
      setLoading(true);

      setOrderStatus("Placing order...");

      /* =========================
         BACKEND REQUEST
      ========================= */

      const response = await fetch(`${API_URL}/api/trades/orders`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      console.log("📥 TRADE RESPONSE:", data);

      /* =========================
         BACKEND ERROR
      ========================= */

      if (!response.ok) {
        throw new Error(data?.message || "Unable to place order.");
      }

      /* =========================
         SUCCESS
      ========================= */

      setOrderStatus(`✓ ${data?.message || "Order placed successfully."}`);

      /* =========================
         REFRESH DASHBOARD DATA
      ========================= */

      window.dispatchEvent(new Event("tradenest-update"));

      window.dispatchEvent(new Event("tradenest-funds-update"));

      console.log("✅ ORDER SUCCESSFULLY SENT TO BACKEND");
    } catch (error) {
      console.error("❌ PLACE ORDER ERROR:", error);

      setOrderStatus(`❌ ${error.message || "Unable to place order."}`);
    } finally {
      setLoading(false);
    }
  };

  /* =================================
     NO STOCK
  ================================= */

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

  /* =================================
     UI
  ================================= */

  return (
    <section className="ordersPage">
      {/* HEADER */}

      <div className="ordersHeader">
        <div>
          <h1>Orders</h1>

          <p>Place and manage your stock orders.</p>
        </div>
      </div>

      {/* MAIN */}

      <div className="ordersLayout">
        {/* =================================
            STOCK SELECTOR
        ================================= */}

        <div className="stockSelector">
          <div className="sectionTitle">
            <h2>Select Stock</h2>
          </div>

          {stocks.map((stock) => (
            <button
              type="button"
              key={stock.id || stock.symbol}
              className={
                selectedStock.symbol === stock.symbol ?
                  "stockSelectorItem selected"
                : "stockSelectorItem"
              }
              onClick={() => handleStockChange(stock)}
            >
              <div>
                <strong>{stock.symbol}</strong>

                <small>{stock.company}</small>
              </div>

              <span>
                ₹
                {Number(stock.currentPrice || 0).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </button>
          ))}
        </div>

        {/* =================================
            ORDER CARD
        ================================= */}

        <div className="orderCard">
          {/* STOCK HEADER */}

          <div className="orderStockHeader">
            <div>
              <h2>{selectedStock.symbol}</h2>

              <p>{selectedStock.company}</p>
            </div>

            <div className="currentPrice">
              ₹
              {Number(selectedStock.currentPrice || price || 0).toLocaleString(
                "en-IN",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              )}
            </div>
          </div>

          {/* LIVE INDICATOR */}

          <div className="livePriceIndicator">
            <span className="liveDot"></span>
            Live market price
          </div>

          {/* BUY / SELL */}

          <div className="orderTabs">
            <button
              type="button"
              className={orderType === "BUY" ? "buyActive" : ""}
              onClick={() => handleOrderTypeChange("BUY")}
            >
              BUY
            </button>

            <button
              type="button"
              className={orderType === "SELL" ? "sellActive" : ""}
              onClick={() => handleOrderTypeChange("SELL")}
            >
              SELL
            </button>
          </div>

          {/* PRODUCT */}

          <div className="orderField">
            <label>Product</label>

            <div className="productButtons">
              <button
                type="button"
                className={productType === "CNC" ? "selectedProduct" : ""}
                onClick={() => setProductType("CNC")}
              >
                CNC
              </button>

              <button
                type="button"
                className={productType === "MIS" ? "selectedProduct" : ""}
                onClick={() => setProductType("MIS")}
              >
                MIS
              </button>
            </div>
          </div>

          {/* QUANTITY */}

          <div className="orderField">
            <label>Quantity</label>

            <input
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(e) => {
                const value = Number(e.target.value);

                setQuantity(value < 1 ? 1 : Math.floor(value));

                setOrderStatus("");
              }}
            />
          </div>

          {/* PRICE */}

          <div className="orderField">
            <label>Price</label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              disabled={selectedOrderType === "MARKET"}
              onChange={(e) => {
                setPrice(Number(e.target.value));

                setOrderStatus("");
              }}
            />

            {selectedOrderType === "MARKET" && (
              <small className="priceHint">
                Market order uses the current live price.
              </small>
            )}
          </div>

          {/* ORDER TYPE */}

          <div className="orderField">
            <label>Order Type</label>

            <select
              value={selectedOrderType}
              onChange={(e) => {
                const type = e.target.value;

                setSelectedOrderType(type);

                if (type === "MARKET") {
                  setPrice(Number(selectedStock.currentPrice || 0));
                }

                setOrderStatus("");
              }}
            >
              <option value="MARKET">MARKET</option>

              <option value="LIMIT">LIMIT</option>

              <option value="SL">SL</option>

              <option value="SL-M">SL-M</option>
            </select>
          </div>

          {/* SUMMARY */}

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

              <strong>
                ₹
                {Number(price || 0).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </strong>
            </div>

            <div className="totalRow">
              <span>Total Amount</span>

              <strong>
                ₹
                {totalAmount.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </strong>
            </div>
          </div>

          {/* STATUS */}

          {orderStatus && (
            <div
              className={
                orderStatus.startsWith("❌") ? "orderError" : "orderSuccess"
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
              orderType === "BUY" ?
                "placeOrder buyOrder"
              : "placeOrder sellOrder"
            }
            onClick={handlePlaceOrder}
          >
            {loading ?
              "Placing Order..."
            : orderType === "BUY" ?
              "Place Buy Order"
            : "Place Sell Order"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Orders;
