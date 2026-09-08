const User = require("../models/User");

/* =====================================================
   GET FUNDS
===================================================== */

const getFunds = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "availableBalance usedMargin"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const availableBalance = Number(
      user.availableBalance || 0
    );

    const usedMargin = Number(
      user.usedMargin || 0
    );

    const totalBalance =
      availableBalance + usedMargin;

    return res.status(200).json({
      success: true,

      funds: {
        totalBalance,
        availableBalance,
        usedMargin,
        withdrawable: availableBalance,
      },
    });
  } catch (error) {
    console.error("❌ GET FUNDS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch funds.",
    });
  }
};

/* =====================================================
   ADD MONEY
===================================================== */

const addMoney = async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid amount.",
      });
    }

    if (amount > 10000000) {
      return res.status(400).json({
        success: false,
        message: "Maximum deposit limit exceeded.",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.availableBalance =
      Number(user.availableBalance || 0) + amount;

    await user.save();

    const availableBalance =
      Number(user.availableBalance || 0);

    const usedMargin =
      Number(user.usedMargin || 0);

    return res.status(200).json({
      success: true,

      message: `₹${amount.toLocaleString(
        "en-IN"
      )} added successfully.`,

      funds: {
        totalBalance:
          availableBalance + usedMargin,

        availableBalance,

        usedMargin,

        withdrawable:
          availableBalance,
      },
    });
  } catch (error) {
    console.error("❌ ADD MONEY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to add money.",
    });
  }
};

/* =====================================================
   WITHDRAW MONEY
===================================================== */

const withdrawMoney = async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid amount.",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const availableBalance =
      Number(user.availableBalance || 0);

    if (amount > availableBalance) {
      return res.status(400).json({
        success: false,
        message: "Insufficient available balance.",
      });
    }

    user.availableBalance =
      availableBalance - amount;

    await user.save();

    const newAvailableBalance =
      Number(user.availableBalance || 0);

    const usedMargin =
      Number(user.usedMargin || 0);

    return res.status(200).json({
      success: true,

      message: `₹${amount.toLocaleString(
        "en-IN"
      )} withdrawn successfully.`,

      funds: {
        totalBalance:
          newAvailableBalance + usedMargin,

        availableBalance:
          newAvailableBalance,

        usedMargin,

        withdrawable:
          newAvailableBalance,
      },
    });
  } catch (error) {
    console.error("❌ WITHDRAW ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to withdraw money.",
    });
  }
};

/* =====================================================
   EXPORT
===================================================== */

module.exports = {
  getFunds,
  addMoney,
  withdrawMoney,
};