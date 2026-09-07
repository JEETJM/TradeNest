import { useState } from "react";

import "./TradeModal.css";

function TradeModal({ stock, side, onClose, onSuccess }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!stock) {
    return null;
  }

  const price = Number(
    stock.currentPrice || stock.ltp || stock.price || 0
  );

  const total = Number(quantity || 0) * price;

  const handleOrder = async () => {
    if (!quantity || Number(quantity) <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (!price || price <= 0) {
      alert("Invalid stock price.");
      return;
    }

    // Get JWT token
    const token =
      localStorage.getItem("tradenest_token") ||
      sessionStorage.getItem("tradenest_token");

    if (!token) {
      alert("You are not logged in. Please login again.");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        symbol: stock.symbol,
        company: stock.company || stock.name || stock.symbol,
        side: side,
        quantity: Number(quantity),
        price: Number(price),
        productType: "CNC",
        orderType: "MARKET",
      };

      console.log("📤 TRADE REQUEST:", orderData);

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

      console.log("📥 TRADE RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to place order."
        );
      }

      if (!data.success) {
        throw new Error(
          data.message || "Order placement failed."
        );
      }

      // Notify other dashboard pages
      window.dispatchEvent(
        new Event("tradenest-update")
      );

      // Send created order to parent
      onSuccess?.(data.order);

      alert(
        `${side === "BUY" ? "Buy" : "Sell"} order placed successfully for ${quantity} ${stock.symbol}.`
      );

      onClose();
    } catch (error) {
      console.error("❌ TRADE ERROR:", error);

      alert(
        error.message ||
          "Something went wrong while placing the order."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="tradeModalOverlay"
      onClick={onClose}
    >
      <div
        className="tradeModal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tradeModalHeader">
          <div>
            <h2>
              {side === "BUY" ? "Buy" : "Sell"}{" "}
              {stock.symbol}
            </h2>

            <p>
              {stock.company || stock.name}
            </p>
          </div>

          <button
            className="closeTradeBtn"
            onClick={onClose}
            disabled={loading}
          >
            ×
          </button>
        </div>

        <div className="tradePrice">
          <span>Market Price</span>

          <strong>
            ₹
            {price.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </strong>
        </div>

        <div className="tradeField">
          <label>Quantity</label>

          <input
            type="number"
            min="1"
            value={quantity}
            disabled={loading}
            onChange={(e) => {
              const value = Number(e.target.value);

              setQuantity(
                Number.isFinite(value) && value >= 1
                  ? value
                  : 1
              );
            }}
          />
        </div>

        <div className="tradeSummary">
          <span>Order Value</span>

          <strong>
            ₹
            {total.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </strong>
        </div>

        <button
          className={
            side === "BUY"
              ? "placeBuyBtn"
              : "placeSellBtn"
          }
          onClick={handleOrder}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : side === "BUY"
              ? "Confirm Buy"
              : "Confirm Sell"}
        </button>
      </div>
    </div>
  );
}

export default TradeModal;  