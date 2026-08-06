const transactions = [
  {
    id: 1,

    transactionId: "TXN240715001",

    type: "BUY",

    category: "Equity",

    symbol: "RELIANCE",

    company: "Reliance Industries Ltd.",

    quantity: 15,

    price: 2985,

    amount: 44775,

    brokerage: 20,

    exchangeCharges: 5,

    sebiCharges: 1,

    gst: 4.68,

    stampDuty: 6,

    stt: 18,

    netAmount: 44829.68,

    paymentMethod: "Trading Balance",

    status: "SUCCESS",

    date: "2026-07-15",

    time: "09:20 AM"
  },

  {
    id: 2,

    transactionId: "TXN240715002",

    type: "SELL",

    category: "Equity",

    symbol: "TCS",

    company: "Tata Consultancy Services Ltd.",

    quantity: 5,

    price: 4125,

    amount: 20625,

    brokerage: 20,

    exchangeCharges: 5,

    sebiCharges: 1,

    gst: 4.68,

    stampDuty: 0,

    stt: 21,

    netAmount: 20573.32,

    paymentMethod: "Trading Balance",

    status: "SUCCESS",

    date: "2026-07-15",

    time: "10:42 AM"
  },

  {
    id: 3,

    transactionId: "TXN240715003",

    type: "DEPOSIT",

    category: "Fund",

    amount: 10000,

    paymentMethod: "UPI",

    referenceNumber: "UPI98452361",

    status: "SUCCESS",

    date: "2026-07-14",

    time: "05:15 PM"
  },

  {
    id: 4,

    transactionId: "TXN240715004",

    type: "WITHDRAW",

    category: "Fund",

    amount: 5000,

    paymentMethod: "Bank Transfer",

    referenceNumber: "BNK45219863",

    status: "PROCESSING",

    date: "2026-07-13",

    time: "11:10 AM"
  },

  {
    id: 5,

    transactionId: "TXN240715005",

    type: "DIVIDEND",

    category: "Corporate Action",

    symbol: "HDFCBANK",

    company: "HDFC Bank Ltd.",

    amount: 1250,

    status: "CREDITED",

    date: "2026-07-10",

    time: "02:30 PM"
  }
];

export default transactions;