const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const { verifyMailConnection } = require("./config/mail");

const authRoutes = require("./routes/authRoutes");
const tradeRoutes = require("./routes/tradeRoutes");
const marketRoutes = require("./routes/marketRoutes");
const fundRoutes = require("./routes/fundRoutes");

const { startMarketFeed } = require("./services/marketFeed");

/* =========================
   DATABASE
========================= */

connectDB();

/* =========================
   EXPRESS APP
========================= */

const app = express();

/* =========================
   CORS
========================= */

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://project-libraries.dal6m33tjspby.amplifyapp.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an Origin header
      // such as Postman/server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS blocked origin:", origin);

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,

    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

/* =========================
   PREFLIGHT
========================= */

app.options("*", cors());

/* =========================
   BODY PARSER
========================= */

app.use(express.json());

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TradeNest API is running 🚀",
  });
});

/* =========================
   API ROUTES
========================= */

app.use("/api/auth", authRoutes);

app.use("/api/trades", tradeRoutes);

app.use("/api/market", marketRoutes);

app.use("/api/funds", fundRoutes);

/* =========================
   HTTP SERVER
========================= */

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

/* =========================
   SOCKET.IO
========================= */

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,

    methods: ["GET", "POST"],

    credentials: true,
  },
});

/* =========================
   SOCKET CONNECTION
========================= */

io.on("connection", (socket) => {
  console.log("🟢 React client connected:", socket.id);

  socket.on("disconnect", (reason) => {
    console.log("🔴 React client disconnected:", socket.id, reason);
  });
});

/* =========================
   ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  console.error("❌ Server error:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal server error.",
  });
});

/* =========================
   START SERVER
========================= */

server.listen(PORT, async () => {
  console.log(`🚀 TradeNest backend running on port ${PORT}`);

  console.log("🌐 Allowed origins:", allowedOrigins);

  console.log("SMTP USER exists:", Boolean(process.env.SMTP_USER));

  console.log("SMTP PASS exists:", Boolean(process.env.SMTP_PASS));

  console.log("EMAIL FROM:", process.env.EMAIL_FROM);

  await verifyMailConnection();

  console.log("📡 Starting TradeNest live market feed...");

  startMarketFeed(io);
});
