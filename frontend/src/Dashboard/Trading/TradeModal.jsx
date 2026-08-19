import { useState } from "react";

import { placeOrder } from "../../data/tradeStore";

import "./TradeModal.css";

function TradeModal({ stock, side, onClose, onSuccess }) {
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(false);

  if (!stock) {
    return null;
  }

  const price = Number(stock.currentPrice || stock.ltp || stock.price || 0);

  const total = Number(quantity || 0) * price;

  const handleOrder = () => {
    setLoading(true);

    const result = placeOrder({
      symbol: stock.symbol,

      company: stock.company || stock.name || stock.symbol,

      side,

      quantity,

      price,
    });

    setLoading(false);

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert(result.message);

    onSuccess?.(result.order);

    onClose();
  };

  return (
    <div className="tradeModalOverlay" onClick={onClose}>
      <div className="tradeModal" onClick={(e) => e.stopPropagation()}>
        <div className="tradeModalHeader">
          <div>
            <h2>
              {side === "BUY" ? "Buy" : "Sell"} {stock.symbol}
            </h2>

            <p>{stock.company || stock.name}</p>
          </div>

          <button className="closeTradeBtn" onClick={onClose}>
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
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
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
          className={side === "BUY" ? "placeBuyBtn" : "placeSellBtn"}
          onClick={handleOrder}
          disabled={loading}
        >
          {loading ?
            "Processing..."
          : side === "BUY" ?
            "Confirm Buy"
          : "Confirm Sell"}
        </button>
      </div>
    </div>
  );
}

export default TradeModal;
