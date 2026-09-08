const express = require("express");

const {
  signup,
  login,
  getMe,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
  updateProfile,
  changePassword,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

/* =====================================================
   PUBLIC ROUTES
===================================================== */

// Signup
router.post(
  "/signup",
  signup
);

// Login
router.post(
  "/login",
  login
);

// Forgot Password → Send OTP
router.post(
  "/forgot-password",
  forgotPassword
);

// Verify Reset OTP
router.post(
  "/verify-reset-otp",
  verifyResetOTP
);

// Reset Password
router.post(
  "/reset-password",
  resetPassword
);

/* =====================================================
   PROTECTED ROUTES
   JWT authentication required
===================================================== */

// Get current logged-in user
router.get(
  "/me",
  protect,
  getMe
);

/* =====================================================
   UPDATE PROFILE
===================================================== */

router.put(
  "/profile",
  protect,
  upload.single("profileImage"),
  updateProfile
);

/* =====================================================
   CHANGE PASSWORD
===================================================== */

router.put(
  "/change-password",
  protect,
  changePassword
);

/* =====================================================
   EXPORT ROUTER
===================================================== */

module.exports = router;