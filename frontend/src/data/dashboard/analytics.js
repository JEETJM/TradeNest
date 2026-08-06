const analytics = {
  portfolioPerformance: {
    today: {
      profit: 2350,
      percentage: 0.95,
      positive: true,
    },

    week: {
      profit: 5120,
      percentage: 2.14,
      positive: true,
    },

    month: {
      profit: 12150,
      percentage: 5.13,
      positive: true,
    },

    year: {
      profit: 38520,
      percentage: 18.34,
      positive: true,
    },
  },

  sectorAllocation: [
    {
      sector: "Banking",
      value: 28,
    },
    {
      sector: "Information Technology",
      value: 24,
    },
    {
      sector: "Oil & Gas",
      value: 18,
    },
    {
      sector: "Pharma",
      value: 12,
    },
    {
      sector: "Auto",
      value: 10,
    },
    {
      sector: "Others",
      value: 8,
    },
  ],

  topGainers: [
    {
      symbol: "RELIANCE",
      company: "Reliance Industries Ltd.",
      change: 2.35,
      positive: true,
    },

    {
      symbol: "TCS",
      company: "Tata Consultancy Services Ltd.",
      change: 1.84,
      positive: true,
    },

    {
      symbol: "HDFCBANK",
      company: "HDFC Bank Ltd.",
      change: 1.52,
      positive: true,
    },
  ],

  topLosers: [
    {
      symbol: "SBIN",
      company: "State Bank of India",
      change: -1.42,
      positive: false,
    },

    {
      symbol: "INFY",
      company: "Infosys Ltd.",
      change: -0.82,
      positive: false,
    },

    {
      symbol: "WIPRO",
      company: "Wipro Ltd.",
      change: -0.56,
      positive: false,
    },
  ],

monthlyReturns: [
  { month: "Jan", return: 2.5 },
  { month: "Feb", return: 1.8 },
  { month: "Mar", return: -0.6 },
  { month: "Apr", return: 3.1 },
  { month: "May", return: 4.5 },
  { month: "Jun", return: 2.9 },
  { month: "Jul", return: 3.7 },
],

portfolioGrowth: [
  { month: "Jan", value: 125000 },
  { month: "Feb", value: 132000 },
  { month: "Mar", value: 145000 },
  { month: "Apr", value: 171000 },
  { month: "May", value: 192000 },
  { month: "Jun", value: 221000 },
  { month: "Jul", value: 248520 },
],


  riskAnalysis: {
    score: 72,

    level: "Moderate",

    diversification: "Good",

    volatility: "Medium",

    recommendation:
      "Your portfolio is well diversified. Consider increasing exposure to defensive sectors.",
  },

  updatedAt: "2026-07-15T15:30:00",
};

export default analytics;
