const market = {
  indices: [
    {
      id: 1,
      symbol: "NIFTY50",
      name: "NIFTY 50",
      exchange: "NSE",

      current: 25184.6,

      previousClose: 24978.4,

      change: 206.2,

      changePercent: 0.83,

      dayHigh: 25235.45,

      dayLow: 25082.3,

      yearHigh: 26312.8,

      yearLow: 21281.45,

      positive: true,
    },

    {
      id: 2,

      symbol: "BANKNIFTY",

      name: "NIFTY BANK",

      exchange: "NSE",

      current: 56874.2,

      previousClose: 56640.0,

      change: 234.2,

      changePercent: 0.41,

      dayHigh: 56990,

      dayLow: 56582,

      yearHigh: 57890,

      yearLow: 46310,

      positive: true,
    },

    {
      id: 3,

      symbol: "SENSEX",

      name: "BSE SENSEX",

      exchange: "BSE",

      current: 82456.3,

      previousClose: 82105.6,

      change: 350.7,

      changePercent: 0.43,

      dayHigh: 82560,

      dayLow: 82140,

      yearHigh: 85890,

      yearLow: 70620,

      positive: true,
    },

    {
      id: 4,

      symbol: "MIDCAP",

      name: "NIFTY MIDCAP 100",

      exchange: "NSE",

      current: 59875,

      previousClose: 60120,

      change: -245,

      changePercent: -0.41,

      dayHigh: 60210,

      dayLow: 59780,

      yearHigh: 62400,

      yearLow: 48600,

      positive: false,
    },

    {
      id: 5,

      symbol: "SMALLCAP",

      name: "NIFTY SMALLCAP 100",

      exchange: "NSE",

      current: 18745,

      previousClose: 18652,

      change: 93,

      changePercent: 0.5,

      dayHigh: 18780,

      dayLow: 18610,

      yearHigh: 19210,

      yearLow: 15230,

      positive: true,
    },

    {
      id: 6,

      symbol: "VIX",

      name: "INDIA VIX",

      exchange: "NSE",

      current: 12.45,

      previousClose: 12.72,

      change: -0.27,

      changePercent: -2.12,

      dayHigh: 12.9,

      dayLow: 12.3,

      positive: false,
    },
  ],

  commodities: [
    {
      id: 1,

      symbol: "GOLD",

      name: "Gold",

      current: 98750,

      change: 420,

      changePercent: 0.43,

      positive: true,
    },

    {
      id: 2,

      symbol: "SILVER",

      name: "Silver",

      current: 112350,

      change: -180,

      changePercent: -0.16,

      positive: false,
    },

    {
      id: 3,

      symbol: "CRUDE",

      name: "Crude Oil",

      current: 6920,

      change: 45,

      changePercent: 0.65,

      positive: true,
    },
  ],

  currencies: [
    {
      id: 1,

      pair: "USD/INR",

      current: 86.15,

      change: 0.08,

      changePercent: 0.09,

      positive: true,
    },

    {
      id: 2,

      pair: "EUR/INR",

      current: 101.28,

      change: -0.22,

      changePercent: -0.21,

      positive: false,
    },
  ],

  updatedAt: "2026-07-15T15:30:00",
};

export default market;
