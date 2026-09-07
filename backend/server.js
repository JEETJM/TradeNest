const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const { verifyMailConnection } = require("./config/mail");

const authRoutes = require("./routes/authRoutes");
const tradeRoutes = require("./routes/tradeRoutes");

/* =========================
   DATABASE
========================= */

connectDB();

/* =========================
   APP
========================= */

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

/* =========================
   ROUTES
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "TradeNest API is running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/trades", tradeRoutes);

/* =========================
   ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  console.error("Server error:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal server error.",
  });
});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(
    `TradeNest backend running on http://localhost:${PORT}`,
  );

  console.log(
    "SMTP USER exists:",
    Boolean(process.env.SMTP_USER),
  );

  console.log(
    "SMTP PASS exists:",
    Boolean(process.env.SMTP_PASS),
  );

  console.log("EMAIL FROM:", process.env.EMAIL_FROM);

  await verifyMailConnection();
});