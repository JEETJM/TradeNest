const express = require("express");

const {
  signup,
  login,
  getMe,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

/* =====================================================
   PUBLIC ROUTES
===================================================== */

router.post("/signup", signup);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.post("/verify-reset-otp", verifyResetOTP);

router.post("/reset-password", resetPassword);

/* =====================================================
   PROTECTED ROUTES
===================================================== */

router.get("/me", protect, getMe);

module.exports = router;
