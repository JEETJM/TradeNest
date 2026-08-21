const express = require("express");

const {
  signup,
  login,
  getMe,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
  updateProfile,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

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

/* =====================================================
   UPDATE PROFILE
===================================================== */

router.put(
  "/profile",
  protect,
  upload.single("profileImage"),
  updateProfile,
);

module.exports = router;