const STORAGE_KEY = "tradenest_trade_data";

const defaultData = {
  orders: [],
  holdings: [],
  funds: {
    availableBalance: 100000,
    usedMargin: 0,
  },
};

export function getTradeData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return defaultData;
    }

    const data = JSON.parse(saved);

    return {
      orders: data.orders || [],
      holdings: data.holdings || [],
      funds: {
        availableBalance: Number(data.funds?.availableBalance || 0),

        usedMargin: Number(data.funds?.usedMargin || 0),
      },
    };
  } catch (error) {
    console.error("Trade data error:", error);

    return defaultData;
  }
}

export function saveTradeData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  window.dispatchEvent(new Event("tradenest-update"));
}

export function placeOrder({ symbol, company, side, quantity, price }) {
  const data = getTradeData();

  const qty = Number(quantity);
  const orderPrice = Number(price);

  if (!symbol || !side || qty <= 0 || orderPrice <= 0) {
    return {
      success: false,
      message: "Invalid order details.",
    };
  }

  const orderValue = qty * orderPrice;

  /* ================= BUY ================= */

  if (side === "BUY") {
    if (data.funds.availableBalance < orderValue) {
      return {
        success: false,
        message: "Insufficient funds.",
      };
    }

    data.funds.availableBalance -= orderValue;

    data.funds.usedMargin += orderValue;

    const existing = data.holdings.find((item) => item.symbol === symbol);

    if (existing) {
      const oldQuantity = Number(existing.quantity || 0);

      const oldAverage = Number(existing.averagePrice || 0);

      const newQuantity = oldQuantity + qty;

      const newAverage =
        (oldQuantity * oldAverage + qty * orderPrice) / newQuantity;

      existing.quantity = newQuantity;

      existing.averagePrice = newAverage;

      /*
       * IMPORTANT:
       * Don't make current price equal
       * to buy price.
       */
      existing.currentPrice = Number(
        existing.currentPrice || existing.ltp || orderPrice,
      );

      updateHoldingValues(existing);
    } else {
      const holding = {
        id: Date.now(),

        symbol,

        company,

        quantity: qty,

        averagePrice: orderPrice,

        currentPrice: orderPrice,
      };

      updateHoldingValues(holding);

      data.holdings.push(holding);
    }
  }

  /* ================= SELL ================= */

  if (side === "SELL") {
    const existing = data.holdings.find((item) => item.symbol === symbol);

    if (!existing) {
      return {
        success: false,
        message: `You don't own ${symbol}.`,
      };
    }

    const existingQuantity = Number(existing.quantity || 0);

    if (existingQuantity < qty) {
      return {
        success: false,
        message: "Not enough shares to sell.",
      };
    }

    existing.quantity = existingQuantity - qty;

    data.funds.availableBalance += orderValue;

    data.funds.usedMargin -= Number(existing.averagePrice || 0) * qty;

    data.funds.usedMargin = Math.max(0, data.funds.usedMargin);

    if (existing.quantity === 0) {
      data.holdings = data.holdings.filter((item) => item.symbol !== symbol);
    } else {
      /*
       * Keep average buy price.
       *
       * Current price remains the
       * existing market price.
       */
      updateHoldingValues(existing);
    }
  }

  /* ================= ORDER ================= */

  const order = {
    id: `ORD${Date.now()}`,

    symbol,

    company,

    side,

    quantity: qty,

    price: orderPrice,

    total: orderValue,

    status: "COMPLETED",

    createdAt: new Date().toISOString(),
  };

  data.orders.unshift(order);

  saveTradeData(data);

  return {
    success: true,

    message:
      side === "BUY" ?
        `${symbol} bought successfully.`
      : `${symbol} sold successfully.`,

    order,
  };
}

/* =================================================
   HOLDING CALCULATIONS
================================================= */

function updateHoldingValues(holding) {
  const quantity = Number(holding.quantity || 0);

  const averagePrice = Number(holding.averagePrice || 0);

  const currentPrice = Number(
    holding.currentPrice || holding.ltp || averagePrice || 0,
  );

  const investedValue = quantity * averagePrice;

  const currentValue = quantity * currentPrice;

  const totalPnL = currentValue - investedValue;

  const totalPnLPercent =
    investedValue > 0 ? (totalPnL / investedValue) * 100 : 0;

  holding.quantity = quantity;

  holding.averagePrice = averagePrice;

  holding.currentPrice = currentPrice;

  holding.ltp = currentPrice;

  holding.invested = investedValue;

  holding.investedValue = investedValue;

  holding.currentValue = currentValue;

  holding.totalPnL = totalPnL;

  holding.totalPnLPercent = totalPnLPercent;

  holding.positive = totalPnL >= 0;
}
