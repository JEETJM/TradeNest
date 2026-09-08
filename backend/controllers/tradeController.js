const mongoose = require("mongoose");
const Order = require("../models/Order");
const Holding = require("../models/Holding");
const User = require("../models/User");

/* =====================================================
   PLACE BUY / SELL ORDER
===================================================== */

const placeOrder = async (req, res) => {
  const session = await mongoose.startSession();

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

    /* =====================================================
       VALIDATION
    ===================================================== */

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

    if (!Number.isFinite(cleanQuantity) || cleanQuantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0.",
      });
    }

    if (!Number.isFinite(cleanPrice) || cleanPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0.",
      });
    }

    const totalAmount = cleanQuantity * cleanPrice;

    /* =====================================================
       START TRANSACTION
    ===================================================== */

    session.startTransaction();

    /* =====================================================
       FIND USER
    ===================================================== */

    const user = await User.findById(userId).session(session);

    if (!user) {
      throw new Error("User not found.");
    }

    /* =====================================================
       INITIALIZE OLD USER BALANCE
    ===================================================== */

    if (user.availableBalance === undefined) {
      user.availableBalance = 25000;
    }

    if (user.usedMargin === undefined) {
      user.usedMargin = 0;
    }

    let existingHolding = null;

    /* =====================================================
       SELL → FIND HOLDING
    ===================================================== */

    if (cleanSide === "SELL") {
      existingHolding = await Holding.findOne({
        user: userId,
        symbol: cleanSymbol,
      }).session(session);

      if (!existingHolding) {
        throw new Error(`You do not own ${cleanSymbol}.`);
      }

      if (Number(existingHolding.quantity) < cleanQuantity) {
        throw new Error(
          `Insufficient quantity. You own ${existingHolding.quantity} ${cleanSymbol} shares.`,
        );
      }
    }

    /* =====================================================
       BUY → CHECK FUNDS
    ===================================================== */

    if (cleanSide === "BUY") {
      const availableBalance = Number(user.availableBalance || 0);

      if (availableBalance < totalAmount) {
        throw new Error(
          `Insufficient funds. Available balance is ₹${availableBalance.toLocaleString(
            "en-IN",
          )}.`,
        );
      }

      /* -----------------------------------------------
         AVAILABLE → USED MARGIN
      ------------------------------------------------ */

      user.availableBalance = availableBalance - totalAmount;

      user.usedMargin = Number(user.usedMargin || 0) + totalAmount;

      console.log("💰 BUY BALANCE UPDATED");
      console.log("Available:", user.availableBalance);
      console.log("Used Margin:", user.usedMargin);
    }

    /* =====================================================
       SELL → UPDATE FUNDS
    ===================================================== */

    if (cleanSide === "SELL") {
      const averagePrice = Number(existingHolding.averagePrice);

      /* Original investment cost of sold shares */
      const investedCost = cleanQuantity * averagePrice;

      /* Actual sale amount */
      const saleAmount = totalAmount;

      /* Add money received from selling */
      user.availableBalance = Number(user.availableBalance || 0) + saleAmount;

      /* Release original invested amount */
      user.usedMargin = Math.max(
        0,
        Number(user.usedMargin || 0) - investedCost,
      );

      console.log("💰 SELL BALANCE UPDATED");
      console.log("Available:", user.availableBalance);
      console.log("Used Margin:", user.usedMargin);
    }

    /* =====================================================
       SAVE USER
    ===================================================== */

    await user.save({ session });

    /* =====================================================
       CREATE ORDER
    ===================================================== */

    const orderData = {
      user: userId,
      symbol: cleanSymbol,
      company: cleanCompany,
      side: cleanSide,
      quantity: cleanQuantity,
      price: cleanPrice,

      productType: productType === "MIS" ? "MIS" : "CNC",

      orderType:
        ["MARKET", "LIMIT", "SL", "SL-M"].includes(orderType) ? orderType : (
          "MARKET"
        ),

      totalAmount,
      status: "COMPLETED",
    };

    const [order] = await Order.create([orderData], { session });

    console.log("✅ ORDER CREATED:", order._id.toString());

    /* =====================================================
       BUY → CREATE / UPDATE HOLDING
    ===================================================== */

    if (cleanSide === "BUY") {
      let holding = await Holding.findOne({
        user: userId,
        symbol: cleanSymbol,
      }).session(session);

      /* -----------------------------------------------
         CREATE NEW HOLDING
      ------------------------------------------------ */

      if (!holding) {
        holding = new Holding({
          user: userId,
          symbol: cleanSymbol,
          company: cleanCompany,

          quantity: cleanQuantity,

          averagePrice: cleanPrice,

          currentPrice: cleanPrice,

          investedAmount: totalAmount,
        });

        await holding.save({ session });

        console.log("✅ NEW HOLDING CREATED:", holding._id.toString());
      } else {

      /* -----------------------------------------------
         UPDATE EXISTING HOLDING
      ------------------------------------------------ */
        const oldQuantity = Number(holding.quantity);

        const oldAveragePrice = Number(holding.averagePrice);

        const newQuantity = oldQuantity + cleanQuantity;

        const newInvestedAmount = oldQuantity * oldAveragePrice + totalAmount;

        const newAveragePrice = newInvestedAmount / newQuantity;

        holding.quantity = newQuantity;

        holding.averagePrice = newAveragePrice;

        holding.currentPrice = cleanPrice;

        holding.investedAmount = newInvestedAmount;

        holding.company = cleanCompany;

        await holding.save({ session });

        console.log("✅ HOLDING UPDATED:", holding._id.toString());
      }
    }

    /* =====================================================
       SELL → UPDATE / DELETE HOLDING
    ===================================================== */

    if (cleanSide === "SELL") {
      const holding = existingHolding;

      const remainingQuantity = Number(holding.quantity) - cleanQuantity;

      /* -----------------------------------------------
         ALL SHARES SOLD
      ------------------------------------------------ */

      if (remainingQuantity === 0) {
        await Holding.deleteOne(
          {
            _id: holding._id,
          },
          { session },
        );

        console.log("✅ HOLDING DELETED - ALL SHARES SOLD");
      } else {

      /* -----------------------------------------------
         PARTIAL SELL
      ------------------------------------------------ */
        holding.quantity = remainingQuantity;

        holding.currentPrice = cleanPrice;

        holding.investedAmount =
          remainingQuantity * Number(holding.averagePrice);

        await holding.save({ session });

        console.log("✅ HOLDING UPDATED AFTER SELL:", holding._id.toString());
      }
    }

    /* =====================================================
       COMMIT TRANSACTION
    ===================================================== */

    await session.commitTransaction();

    console.log("✅ TRANSACTION COMMITTED SUCCESSFULLY");

    /* =====================================================
       FINAL FUNDS
    ===================================================== */

    const availableBalance = Number(user.availableBalance || 0);

    const usedMargin = Number(user.usedMargin || 0);

    const totalBalance = availableBalance + usedMargin;

    return res.status(201).json({
      success: true,

      message: `${cleanSide} order placed successfully.`,

      order,

      funds: {
        totalBalance,
        availableBalance,
        usedMargin,
        withdrawable: availableBalance,
      },
    });
  } catch (error) {
    /* =====================================================
       ROLLBACK
    ===================================================== */

    try {
      await session.abortTransaction();
    } catch (abortError) {
      console.error("❌ TRANSACTION ABORT ERROR:", abortError);
    }

    console.error("❌ PLACE ORDER ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Unable to place order.",
    });
  } finally {
    await session.endSession();
  }
};

/* =====================================================
   GET ORDERS
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
    console.error("❌ GET ORDERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch orders.",
    });
  }
};

/* =====================================================
   GET HOLDINGS
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
    console.error("❌ GET HOLDINGS ERROR:", error);

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
