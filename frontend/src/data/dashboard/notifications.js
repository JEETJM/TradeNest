const notifications = [
  {
    id: 1,

    type: "ORDER",

    title: "Order Executed",

    message: "Your BUY order for RELIANCE has been successfully executed.",

    priority: "HIGH",

    read: false,

    action: "/orders",

    createdAt: "2026-07-15T09:20:00",
  },

  {
    id: 2,

    type: "FUND",

    title: "Funds Added",

    message: "₹10,000 has been added successfully to your trading account.",

    priority: "MEDIUM",

    read: true,

    action: "/funds",

    createdAt: "2026-07-14T17:20:00",
  },

  {
    id: 3,

    type: "MARKET",

    title: "Price Alert",

    message: "TCS crossed your target price of ₹4,100.",

    priority: "HIGH",

    read: false,

    action: "/watchlist",

    createdAt: "2026-07-15T11:15:00",
  },

  {
    id: 4,

    type: "IPO",

    title: "IPO Open",

    message: "ABC Technologies IPO is now open for subscription.",

    priority: "LOW",

    read: false,

    action: "/ipo",

    createdAt: "2026-07-15T08:00:00",
  },

  {
    id: 5,

    type: "DIVIDEND",

    title: "Dividend Credited",

    message: "₹1,250 dividend credited from HDFC Bank.",

    priority: "LOW",

    read: true,

    action: "/portfolio",

    createdAt: "2026-07-10T14:30:00",
  },
];

export default notifications;
