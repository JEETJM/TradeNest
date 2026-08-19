const express = require("express");

const { signup, login, getMe } = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================
   PUBLIC
========================= */

router.post("/signup", signup);

router.post("/login", login);

/* =========================
   PROTECTED
========================= */

router.get("/me", protect, getMe);

module.exports = router;
