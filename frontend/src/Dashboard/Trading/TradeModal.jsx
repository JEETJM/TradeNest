import { useEffect, useState } from "react";

import {
  marketSocket,
  connectMarketSocket,
  disconnectMarketSocket,
} from "../../services/marketSocket";

import "./TradeModal.css";

/* =====================================================
   API
===================================================== */

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/* =====================================================
   UPSTOX INSTRUMENT MAPPING
===================================================== */

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
   TRADE MODAL
===================================================== */

function TradeModal({ stock, side, onClose, onSuccess }) {
  const [quantity, setQuantity] = useState(1);

  const [livePrice, setLivePrice] = useState(
    Number(stock?.currentPrice || stock?.ltp || stock?.price || 0),
  );

  const [availableBalance, setAvailableBalance] = useState(null);

  const [loading, setLoading] = useState(false);
  const [fundLoading, setFundLoading] = useState(true);

  const [error, setError] = useState("");

  /* =====================================================
     INITIAL PRICE
  ===================================================== */

  useEffect(() => {
    if (!stock) {
      return;
    }

    const initialPrice = Number(
      stock.currentPrice || stock.ltp || stock.price || 0,
    );

    setLivePrice(initialPrice);
  }, [stock]);

  /* =====================================================
     LIVE MARKET PRICE
  ===================================================== */

  useEffect(() => {
    if (!stock?.symbol) {
      return;
    }

    connectMarketSocket();

    const handleMarketUpdate = (data) => {
      if (!data?.instrumentKey) {
        return;
      }

      const liveSymbol = Object.keys(MARKET_INSTRUMENTS).find(
        (symbol) => MARKET_INSTRUMENTS[symbol] === data.instrumentKey,
      );

      if (!liveSymbol) {
        return;
      }

      if (liveSymbol !== stock.symbol?.toUpperCase()) {
        return;
      }

      const price = Number(data.ltp);

      if (!Number.isFinite(price) || price <= 0) {
        return;
      }

      setLivePrice(price);
    };

    marketSocket.on("market:update", handleMarketUpdate);

    return () => {
      marketSocket.off("market:update", handleMarketUpdate);

      disconnectMarketSocket();
    };
  }, [stock?.symbol]);

  /* =====================================================
     LOAD FUNDS
  ===================================================== */

  useEffect(() => {
    const loadFunds = async () => {
      try {
        setFundLoading(true);
        setError("");

        const token = getToken();

        if (!token) {
          throw new Error("Authentication token not found.");
        }

        const response = await fetch(`${API_URL}/funds`, {
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
          console.error("FUNDS RAW RESPONSE:", responseText);

          throw new Error(
            "Server returned an invalid response while loading funds.",
          );
        }

        if (!response.ok) {
          throw new Error(data.message || "Unable to load funds.");
        }

        setAvailableBalance(Number(data.funds?.availableBalance || 0));
      } catch (error) {
        console.error("Trade funds error:", error);

        setError(error.message || "Unable to load available balance.");
      } finally {
        setFundLoading(false);
      }
    };

    loadFunds();
  }, []);

  /* =====================================================
     CALCULATIONS
  ===================================================== */

  const numericQuantity = Number(quantity || 0);

  const total = numericQuantity * livePrice;

  const isBuy = side === "BUY";

  const hasInsufficientFunds =
    isBuy && availableBalance !== null && total > availableBalance;

  /* =====================================================
     FORMAT MONEY
  ===================================================== */

  const formatMoney = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  /* =====================================================
     PLACE ORDER
  ===================================================== */

  const handleOrder = async () => {
    setError("");

    /* Quantity validation */

    if (!Number.isFinite(numericQuantity) || numericQuantity <= 0) {
      setError("Please enter a valid quantity.");
      return;
    }

    /* Price validation */

    if (!Number.isFinite(livePrice) || livePrice <= 0) {
      setError("Invalid live stock price.");
      return;
    }

    /* Funds validation */

    if (isBuy && availableBalance !== null && total > availableBalance) {
      setError(
        `Insufficient funds. Available balance is ${formatMoney(
          availableBalance,
        )}.`,
      );

      return;
    }

    /* Token */

    const token = getToken();

    if (!token) {
      setError("You are not logged in. Please login again.");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        symbol: stock.symbol,

        company: stock.company || stock.name || stock.symbol,

        side,

        quantity: numericQuantity,

        price: Number(livePrice),

        productType: "CNC",

        orderType: "MARKET",
      };

      const response = await fetch(`${API_URL}/trades/orders`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(orderData),
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
        throw new Error(data.message || "Failed to place order.");
      }

      if (!data.success) {
        throw new Error(data.message || "Order placement failed.");
      }

      /* Update balance */

      if (data.funds) {
        setAvailableBalance(Number(data.funds.availableBalance || 0));
      }

      /* Notify dashboard pages */

      window.dispatchEvent(new Event("tradenest-update"));

      window.dispatchEvent(new Event("tradenest-funds-update"));

      /* Send order to parent */

      onSuccess?.(data.order);

      /* Success */

      alert(
        `${
          isBuy ? "Buy" : "Sell"
        } order placed successfully for ${numericQuantity} ${stock.symbol}.`,
      );

      onClose();
    } catch (error) {
      console.error("TRADE ERROR:", error);

      setError(
        error.message || "Something went wrong while placing the order.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     NO STOCK
  ===================================================== */

  if (!stock) {
    return null;
  }

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="tradeModalOverlay" onClick={onClose}>
      <div className="tradeModal" onClick={(event) => event.stopPropagation()}>
        {/* Header */}

        <div className="tradeModalHeader">
          <div className="tradeModalTitle">
            <span
              className={`tradeSideBadge ${
                isBuy ? "buySideBadge" : "sellSideBadge"
              }`}
            >
              {isBuy ? "BUY" : "SELL"}
            </span>

            <h2>{stock.symbol}</h2>

            <p>{stock.company || stock.name || stock.symbol}</p>
          </div>

          <button
            className="closeTradeBtn"
            onClick={onClose}
            disabled={loading}
            aria-label="Close trade modal"
          >
            ×
          </button>
        </div>

        {/* Live price */}

        <div className="tradePriceBox">
          <div>
            <span className="tradeLabel">Live Market Price</span>

            <strong className="tradeLivePrice">{formatMoney(livePrice)}</strong>
          </div>

          <div className="livePriceStatus">
            <span className="liveDot" />
            Live
          </div>
        </div>

        {/* Available balance */}

        <div className="tradeBalance">
          <span>Available Balance</span>

          <strong>
            {fundLoading ? "Loading..." : formatMoney(availableBalance)}
          </strong>
        </div>

        {/* Quantity */}

        <div className="tradeField">
          <label htmlFor="tradeQuantity">Quantity</label>

          <input
            id="tradeQuantity"
            type="number"
            min="1"
            step="1"
            value={quantity}
            disabled={loading}
            onChange={(event) => {
              const value = event.target.value;

              if (value === "") {
                setQuantity("");
                return;
              }

              const numberValue = Number(value);

              if (Number.isFinite(numberValue) && numberValue >= 1) {
                setQuantity(Math.floor(numberValue));
              }
            }}
          />
        </div>

        {/* Order value */}

        <div className="tradeSummary">
          <span>Order Value</span>

          <strong>{formatMoney(total)}</strong>
        </div>

        {/* Insufficient funds */}

        {hasInsufficientFunds && (
          <div className="tradeWarning">
            <strong>Insufficient funds</strong>

            <span>
              You need {formatMoney(total)} but only have{" "}
              {formatMoney(availableBalance)}.
            </span>
          </div>
        )}

        {/* Error */}

        {error && <div className="tradeError">{error}</div>}

        {/* Confirm */}

        <button
          className={isBuy ? "placeBuyBtn" : "placeSellBtn"}
          onClick={handleOrder}
          disabled={
            loading || fundLoading || !livePrice || hasInsufficientFunds
          }
        >
          {loading ?
            "Processing..."
          : isBuy ?
            "Confirm Buy"
          : "Confirm Sell"}
        </button>

        <p className="tradeDisclaimer">
          Market order • CNC • Executed at available market price
        </p>
      </div>
    </div>
  );
}

export default TradeModal;
