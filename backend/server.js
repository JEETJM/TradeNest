const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

dotenv.config();

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
    origin: "http://localhost:3000",
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

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`TradeNest backend running on http://localhost:${PORT}`);
});
