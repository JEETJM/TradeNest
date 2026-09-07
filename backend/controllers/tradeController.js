const Order = require("../models/Order");
const Holding = require("../models/Holding");

/* =====================================================
   PLACE BUY / SELL ORDER
===================================================== */

const placeOrder = async (req, res) => {
  try {
    console.log("=================================");
    console.log("📥 PLACE ORDER API CALLED");
    console.log("USER:", req.user);
    console.log("BODY:", req.body);
    console.log("=================================");

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User authentication failed.",
      });
    }

    const userId = req.user.id;

    const {
      symbol,
      company,
      side,
      quantity,
      price,
      productType = "CNC",
      orderType = "MARKET",
    } = req.body;

    /* =========================
       VALIDATION
    ========================= */

    if (
      !symbol ||
      !company ||
      !side ||
      quantity === undefined ||
      price === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all order details.",
      });
    }

    const cleanSymbol = String(symbol).trim().toUpperCase();
    const cleanCompany = String(company).trim();
    const cleanSide = String(side).trim().toUpperCase();

    const cleanQuantity = Number(quantity);
    const cleanPrice = Number(price);

    if (!["BUY", "SELL"].includes(cleanSide)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order side.",
      });
    }

    if (
      !Number.isFinite(cleanQuantity) ||
      cleanQuantity <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0.",
      });
    }

    if (
      !Number.isFinite(cleanPrice) ||
      cleanPrice <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0.",
      });
    }

    const totalAmount =
      cleanQuantity * cleanPrice;

    /* =========================
       SELL VALIDATION
    ========================= */

    let existingHolding = null;

    if (cleanSide === "SELL") {
      existingHolding = await Holding.findOne({
        user: userId,
        symbol: cleanSymbol,
      });

      if (!existingHolding) {
        return res.status(400).json({
          success: false,
          message: `You do not own ${cleanSymbol}.`,
        });
      }

      if (
        Number(existingHolding.quantity) <
        cleanQuantity
      ) {
        return res.status(400).json({
          success: false,
          message: `Insufficient quantity. You own ${existingHolding.quantity} ${cleanSymbol} shares.`,
        });
      }
    }

    /* =========================
       CREATE ORDER
    ========================= */

    const order = await Order.create({
      user: userId,
      symbol: cleanSymbol,
      company: cleanCompany,
      side: cleanSide,
      quantity: cleanQuantity,
      price: cleanPrice,
      productType:
        productType === "MIS" ? "MIS" : "CNC",
      orderType: [
        "MARKET",
        "LIMIT",
        "SL",
        "SL-M",
      ].includes(orderType)
        ? orderType
        : "MARKET",
      totalAmount,
      status: "COMPLETED",
    });

    console.log(
      "✅ ORDER SAVED:",
      order._id.toString()
    );

    /* =================================================
       BUY
    ================================================= */

    if (cleanSide === "BUY") {
      let holding = await Holding.findOne({
        user: userId,
        symbol: cleanSymbol,
      });

      /* =========================
         FIRST BUY
      ========================= */

      if (!holding) {
        holding = await Holding.create({
          user: userId,
          symbol: cleanSymbol,
          company: cleanCompany,
          quantity: cleanQuantity,
          averagePrice: cleanPrice,
          currentPrice: cleanPrice,
          investedAmount: totalAmount,
        });

        console.log(
          "✅ NEW HOLDING CREATED:",
          holding._id.toString()
        );
      }

      /* =========================
         ADD TO EXISTING HOLDING
      ========================= */

      else {
        const oldQuantity =
          Number(holding.quantity);

        const oldAveragePrice =
          Number(holding.averagePrice);

        const newQuantity =
          oldQuantity + cleanQuantity;

        const newInvestedAmount =
          oldQuantity * oldAveragePrice +
          totalAmount;

        const newAveragePrice =
          newInvestedAmount / newQuantity;

        holding.quantity = newQuantity;
        holding.averagePrice = newAveragePrice;
        holding.currentPrice = cleanPrice;
        holding.investedAmount =
          newInvestedAmount;
        holding.company = cleanCompany;

        await holding.save();

        console.log(
          "✅ HOLDING UPDATED:",
          holding._id.toString()
        );
      }
    }

    /* =================================================
       SELL
    ================================================= */

    if (cleanSide === "SELL") {
      const holding = existingHolding;

      const remainingQuantity =
        Number(holding.quantity) -
        cleanQuantity;

      /* =========================
         SELL EVERYTHING
      ========================= */

      if (remainingQuantity === 0) {
        await Holding.deleteOne({
          _id: holding._id,
        });

        console.log(
          "✅ HOLDING DELETED - ALL SHARES SOLD"
        );
      }

      /* =========================
         PARTIAL SELL
      ========================= */

      else {
        holding.quantity =
          remainingQuantity;

        holding.currentPrice =
          cleanPrice;

        holding.investedAmount =
          remainingQuantity *
          Number(holding.averagePrice);

        await holding.save();

        console.log(
          "✅ HOLDING UPDATED AFTER SELL:",
          holding._id.toString()
        );
      }
    }

    /* =========================
       SUCCESS RESPONSE
    ========================= */

    return res.status(201).json({
      success: true,
      message:
        `${cleanSide} order placed successfully.`,
      order,
    });
  } catch (error) {
    console.error(
      "❌ PLACE ORDER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Server error while placing order.",
    });
  }
};

/* =====================================================
   GET USER ORDERS
===================================================== */

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(
      "❌ GET ORDERS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch orders.",
    });
  }
};

/* =====================================================
   GET USER HOLDINGS
===================================================== */

const getHoldings = async (req, res) => {
  try {
    const holdings = await Holding.find({
      user: req.user.id,
      quantity: {
        $gt: 0,
      },
    }).sort({
      symbol: 1,
    });

    return res.status(200).json({
      success: true,
      holdings,
    });
  } catch (error) {
    console.error(
      "❌ GET HOLDINGS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch holdings.",
    });
  }
};

module.exports = {
  placeOrder,
  getOrders,
  getHoldings,
};