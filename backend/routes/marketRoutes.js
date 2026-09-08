const express = require("express");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Market route working 🚀",
  });
});

module.exports = router;