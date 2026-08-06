const ipo = {
  upcoming: [
    {
      id: 1,

      ipoId: "IPO24001",

      company: "ABC Technologies Ltd.",

      symbol: "ABCTECH",

      logo: "/logos/abctech.png",

      industry: "Technology",

      exchange: "NSE",

      openDate: "2026-07-20",

      closeDate: "2026-07-23",

      allotmentDate: "2026-07-25",

      listingDate: "2026-07-28",

      priceBand: {
        min: 450,
        max: 470,
      },

      lotSize: 30,

      minimumInvestment: 14100,

      issueSize: "₹850 Cr",

      issueType: "Book Built",

      retailSubscription: 0,

      qibSubscription: 0,

      niiSubscription: 0,

      totalSubscription: 0,

      gmp: 0,

      listingGainEstimate: "N/A",

      status: "Upcoming",

      applyEnabled: false,
    },

    {
      id: 2,

      ipoId: "IPO24002",

      company: "FinNova Capital Ltd.",

      symbol: "FINNOVA",

      logo: "/logos/finnova.png",

      industry: "Financial Services",

      exchange: "NSE",

      openDate: "2026-07-18",

      closeDate: "2026-07-21",

      allotmentDate: "2026-07-23",

      listingDate: "2026-07-26",

      priceBand: {
        min: 210,
        max: 225,
      },

      lotSize: 65,

      minimumInvestment: 14625,

      issueSize: "₹520 Cr",

      issueType: "Book Built",

      retailSubscription: 8.3,

      qibSubscription: 12.4,

      niiSubscription: 6.8,

      totalSubscription: 9.5,

      gmp: 35,

      listingGainEstimate: "15%",

      status: "Open",

      applyEnabled: true,
    },
  ],

  applied: [
    {
      id: 101,

      applicationId: "APP458963",

      company: "Green Energy Power Ltd.",

      symbol: "GREEN",

      appliedLots: 2,

      amountBlocked: 29800,

      upiId: "jeet@upi",

      applicationDate: "2026-07-05",

      allotmentStatus: "Pending",

      refundStatus: "Pending",
    },
  ],

  statistics: {
    totalUpcoming: 2,

    totalOpen: 1,

    totalApplied: 1,

    totalInvestmentBlocked: 29800,
  },

  updatedAt: "2026-07-15T15:30:00",
};

export default ipo;
