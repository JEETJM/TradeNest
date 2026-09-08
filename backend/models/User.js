const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    /* =========================
       BASIC USER INFO
    ========================= */

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    /* =========================
       PROFILE IMAGE
    ========================= */

    profileImage: {
      type: String,
      default: "",
    },

    cloudinaryPublicId: {
      type: String,
      default: "",
    },

    /* =========================
       TRADING FUNDS
    ========================= */

    availableBalance: {
      type: Number,
      default: 25000,
      min: 0,
    },

    usedMargin: {
      type: Number,
      default: 0,
      min: 0,
    },

    /* =========================
       PASSWORD RESET
    ========================= */

    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpire: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
