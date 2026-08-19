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

    return JSON.parse(saved);
  } catch (error) {
    console.error("Trade data error:", error);

    return defaultData;
  }
}

export function saveTradeData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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
      const oldQuantity = Number(existing.quantity);

      const oldAverage = Number(existing.averagePrice);

      const newQuantity = oldQuantity + qty;

      const newAverage =
        (oldQuantity * oldAverage + qty * orderPrice) / newQuantity;

      existing.quantity = newQuantity;

      existing.averagePrice = newAverage;

      existing.currentPrice = orderPrice;

      existing.invested = newQuantity * newAverage;
    } else {
      data.holdings.push({
        id: Date.now(),

        symbol,

        company,

        quantity: qty,

        averagePrice: orderPrice,

        currentPrice: orderPrice,

        invested: orderValue,
      });
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

    if (Number(existing.quantity) < qty) {
      return {
        success: false,
        message: "Not enough shares to sell.",
      };
    }

    existing.quantity -= qty;

    data.funds.availableBalance += orderValue;

    data.funds.usedMargin -= existing.averagePrice * qty;

    if (existing.quantity === 0) {
      data.holdings = data.holdings.filter((item) => item.symbol !== symbol);
    } else {
      existing.invested = existing.quantity * existing.averagePrice;

      existing.currentPrice = orderPrice;
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
