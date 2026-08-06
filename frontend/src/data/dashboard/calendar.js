const calendar = {
  events: [
    {
      id: 1,

      type: "EARNINGS",

      company: "TCS",

      title: "Q1 FY27 Results",

      date: "2026-07-18",

      time: "04:00 PM",

      exchange: "NSE",

      status: "Upcoming",
    },

    {
      id: 2,

      type: "DIVIDEND",

      company: "HDFC Bank",

      title: "Dividend Record Date",

      date: "2026-07-22",

      amountPerShare: 22,

      status: "Upcoming",
    },

    {
      id: 3,

      type: "IPO",

      company: "FinNova Capital Ltd.",

      title: "IPO Opens",

      date: "2026-07-20",

      status: "Upcoming",
    },

    {
      id: 4,

      type: "BONUS",

      company: "Infosys",

      title: "Bonus Issue",

      ratio: "1:1",

      date: "2026-08-05",

      status: "Announced",
    },

    {
      id: 5,

      type: "SPLIT",

      company: "ABC Industries",

      title: "Stock Split",

      ratio: "1:5",

      date: "2026-08-15",

      status: "Upcoming",
    },

    {
      id: 6,

      type: "AGM",

      company: "Reliance Industries",

      title: "Annual General Meeting",

      date: "2026-08-25",

      time: "11:00 AM",

      status: "Scheduled",
    },

    {
      id: 7,

      type: "RBI",

      title: "RBI Monetary Policy Meeting",

      date: "2026-08-08",

      impact: "High",

      status: "Upcoming",
    },

    {
      id: 8,

      type: "FED",

      title: "US Federal Reserve Meeting",

      date: "2026-09-17",

      impact: "High",

      status: "Upcoming",
    },
  ],

  holidays: [
    {
      id: 1,

      name: "Independence Day",

      date: "2026-08-15",

      market: "NSE & BSE",
    },

    {
      id: 2,

      name: "Gandhi Jayanti",

      date: "2026-10-02",

      market: "NSE & BSE",
    },

    {
      id: 3,

      name: "Diwali Laxmi Pujan",

      date: "2026-11-08",

      market: "Muhurat Trading",
    },
  ],

  updatedAt: "2026-07-15T15:30:00",
};

export default calendar;
