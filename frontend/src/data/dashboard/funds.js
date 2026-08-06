const funds = {
  wallet: {
    availableBalance: 52450.75,

    withdrawableBalance: 48750.75,

    cashBalance: 32450.75,

    collateralBalance: 20000,

    openingBalance: 50000,

    closingBalance: 52450.75,
  },

  margin: {
    totalMargin: 125000,

    usedMargin: 42500,

    availableMargin: 82500,

    intradayMargin: 75000,

    deliveryMargin: 50000,
  },

  deposits: {
    totalDeposited: 350000,

    lastDeposit: {
      amount: 10000,

      method: "UPI",

      referenceId: "DEP240715001",

      date: "2026-07-15",

      status: "SUCCESS",
    },
  },

  withdrawals: {
    totalWithdrawn: 85000,

    lastWithdrawal: {
      amount: 5000,

      method: "Bank Transfer",

      referenceId: "WDL240710001",

      date: "2026-07-10",

      status: "COMPLETED",
    },
  },

  brokerage: {
    todaysBrokerage: 40,

    monthlyBrokerage: 865,

    yearlyBrokerage: 9540,
  },

  charges: {
    gst: 165,

    sebiCharges: 24,

    stampDuty: 95,

    transactionCharges: 82,
  },

  updatedAt: "2026-07-15T15:30:00",
};

export default funds;
