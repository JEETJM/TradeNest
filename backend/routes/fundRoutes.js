const express = require("express");

const {
  getFunds,
  addMoney,
  withdrawMoney,
} = require("../controllers/fundsController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

/* =====================================================
   GET CURRENT FUNDS
   GET /api/funds
===================================================== */

router.get(
  "/",
  protect,
  getFunds
);

/* =====================================================
   ADD MONEY
   POST /api/funds/add
===================================================== */

router.post(
  "/add",
  protect,
  addMoney
);

/* =====================================================
   WITHDRAW MONEY
   POST /api/funds/withdraw
===================================================== */

router.post(
  "/withdraw",
  protect,
  withdrawMoney
);

module.exports = router;