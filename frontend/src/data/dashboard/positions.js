const positions = {
  openPositions: [
    {
      id: 1,

      symbol: "RELIANCE",

      company: "Reliance Industries Ltd.",

      exchange: "NSE",

      product: "MIS",

      transactionType: "BUY",

      quantity: 20,

      buyPrice: 2965,

      sellPrice: 0,

      averagePrice: 2965,

      ltp: 2985,

      invested: 59300,

      currentValue: 59700,

      unrealizedPnL: 400,

      realizedPnL: 0,

      totalPnL: 400,

      mtm: 400,

      positive: true,

      updatedAt: "2026-07-15T15:30:00",
    },

    {
      id: 2,

      symbol: "TCS",

      company: "Tata Consultancy Services Ltd.",

      exchange: "NSE",

      product: "MIS",

      transactionType: "SELL",

      quantity: 10,

      buyPrice: 0,

      sellPrice: 4125,

      averagePrice: 4125,

      ltp: 4105,

      invested: 41250,

      currentValue: 41050,

      unrealizedPnL: 200,

      realizedPnL: 0,

      totalPnL: 200,

      mtm: 200,

      positive: true,

      updatedAt: "2026-07-15T15:30:00",
    },
  ],

  closedPositions: [
    {
      id: 101,

      symbol: "SBIN",

      company: "State Bank of India",

      exchange: "NSE",

      product: "MIS",

      quantity: 50,

      buyPrice: 825,

      sellPrice: 838,

      realizedPnL: 650,

      brokerage: 20,

      charges: 8.5,

      closedAt: "2026-07-14T14:45:00",

      positive: true,
    },
  ],

  summary: {
    openCount: 2,

    closedCount: 1,

    totalMTM: 600,

    realizedPnL: 650,

    unrealizedPnL: 600,

    totalPnL: 1250,

    positive: true,
  },
};

export default positions;
