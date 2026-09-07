const jwt = require("jsonwebtoken");

/* =====================================================
   PROTECT AUTHENTICATED ROUTES
===================================================== */

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    /* =========================
       CHECK AUTH HEADER
    ========================= */

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login.",
      });
    }

    /* =========================
       GET TOKEN
    ========================= */

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing.",
      });
    }

    /* =========================
       VERIFY TOKEN
    ========================= */

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    /* =========================
       ATTACH USER TO REQUEST
    ========================= */

    req.user = decoded;

    next();

  } catch (error) {
    console.error(
      "Auth middleware error:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = protect;