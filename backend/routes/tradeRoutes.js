const express = require("express");

const {
  placeOrder,
  getOrders,
  getHoldings,
} = require("../controllers/tradeController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

/* PLACE BUY / SELL ORDER */
router.post(
  "/orders",
  protect,
  placeOrder
);

/* GET USER ORDERS */
router.get(
  "/orders",
  protect,
  getOrders
);

/* GET USER HOLDINGS */
router.get(
  "/holdings",
  protect,
  getHoldings
);

module.exports = router;