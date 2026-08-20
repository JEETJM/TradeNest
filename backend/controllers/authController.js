const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/User");

const { sendEmail } = require("../config/mail");

/* =====================================================
   CREATE JWT
===================================================== */

const generateToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

/* =====================================================
   SIGNUP
===================================================== */

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      phone: phone?.trim() || "",
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",

      token,

      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during signup.",
    });
  }
};

/* =====================================================
   LOGIN
===================================================== */

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful.",

      token,

      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during login.",
    });
  }
};

/* =====================================================
   GET CURRENT USER
===================================================== */

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get user error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

/* =====================================================
   FORGOT PASSWORD
   GENERATE 6 DIGIT OTP
===================================================== */

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    /* ---------- Validation ---------- */

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter your email address.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    /* ---------- Find User ---------- */

    const user = await User.findOne({
      email: normalizedEmail,
    });

    /*
      Security:
      Don't reveal whether account exists.
    */

    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If an account exists with this email, an OTP has been sent.",
      });
    }

    /* =================================================
       GENERATE 6 DIGIT OTP
    ================================================= */

    const otp = crypto.randomInt(100000, 1000000).toString();

    console.log("🔐 OTP generated for:", user.email);

    /* =================================================
       HASH OTP
    ================================================= */

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    /* =================================================
       SAVE OTP
       Valid for 10 minutes
    ================================================= */

    user.resetPasswordToken = hashedOTP;

    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    /* =================================================
       OTP EMAIL
    ================================================= */
    const html = `
<!DOCTYPE html>
<html>
<head>

  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <meta
    name="color-scheme"
    content="light"
  >

  <title>TradeNest Verification Code</title>

</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f3f6fa;
    font-family:Arial,Helvetica,sans-serif;
    color:#172033;
  "
>

<!-- =====================================================
     MAIN WRAPPER
===================================================== -->

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    background:#f3f6fa;
    padding:40px 16px;
  "
>

<tr>
<td align="center">

<!-- =====================================================
     EMAIL CARD
===================================================== -->

<table
  width="600"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    max-width:600px;
    width:100%;
    background:#ffffff;
    border-radius:18px;
    overflow:hidden;
    border:1px solid #e5e9f0;
  "
>

<!-- =====================================================
     BRAND HEADER
===================================================== -->

<tr>

<td
  align="center"
  style="
    background:#387ed1;
    padding:32px 20px 30px;
  "
>

<!-- LOGO -->

<table
  cellpadding="0"
  cellspacing="0"
  border="0"
>

<tr>

<td
  align="center"
  valign="middle"
  style="
    width:52px;
    height:52px;
    background:#ffffff;
    border-radius:14px;
    color:#387ed1;
    font-size:22px;
    font-weight:700;
    line-height:52px;
  "
>
  TN
</td>

</tr>

</table>

<!-- BRAND NAME -->

<div
  style="
    margin-top:12px;
    color:#ffffff;
    font-size:27px;
    font-weight:700;
    letter-spacing:-0.5px;
  "
>
  TradeNest
</div>

<!-- TAGLINE -->

<div
  style="
    margin-top:5px;
    color:#dbeafe;
    font-size:13px;
    line-height:20px;
  "
>
  Trade smarter. Invest better.
</div>

</td>

</tr>

<!-- =====================================================
     CONTENT
===================================================== -->

<tr>

<td
  style="
    padding:40px 42px 35px;
  "
>

<!-- TITLE -->

<h1
  style="
    margin:0;
    text-align:center;
    font-size:26px;
    line-height:34px;
    font-weight:700;
    color:#111827;
  "
>
  Verify your account
</h1>

<!-- SUBTITLE -->

<p
  style="
    margin:12px 0 0;
    text-align:center;
    font-size:15px;
    line-height:24px;
    color:#667085;
  "
>
  Use the verification code below to continue
  resetting your TradeNest password.
</p>

<!-- =====================================================
     USER GREETING
===================================================== -->

<p
  style="
    margin:30px 0 0;
    font-size:15px;
    line-height:24px;
    color:#344054;
  "
>
  Hi
  <strong style="color:#111827;">
    ${user.firstName}
  </strong>,
</p>

<p
  style="
    margin:8px 0 0;
    font-size:14px;
    line-height:23px;
    color:#667085;
  "
>
  We received a request to reset the password
  associated with your TradeNest account.
</p>

<!-- =====================================================
     OTP SECTION
===================================================== -->

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    margin-top:28px;
    background:#f7faff;
    border:1px solid #dbeafe;
    border-radius:14px;
  "
>

<tr>

<td
  align="center"
  style="
    padding:25px 15px 26px;
  "
>

<div
  style="
    font-size:12px;
    font-weight:600;
    color:#667085;
    text-transform:uppercase;
    letter-spacing:1px;
  "
>
  Your verification code
</div>

<div
  style="
    margin-top:12px;
    font-size:36px;
    line-height:45px;
    font-weight:700;
    letter-spacing:9px;
    color:#2563eb;
  "
>
  ${otp}
</div>

</td>

</tr>

</table>

<!-- =====================================================
     EXPIRY
===================================================== -->

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    margin-top:18px;
    background:#fff8eb;
    border:1px solid #fedf89;
    border-radius:10px;
  "
>

<tr>

<td
  style="
    padding:13px 15px;
    font-size:13px;
    line-height:21px;
    color:#92400e;
  "
>
  ⏱️
  <strong>
    This verification code expires in 10 minutes.
  </strong>
</td>

</tr>

</table>

<!-- =====================================================
     SECURITY MESSAGE
===================================================== -->

<div
  style="
    margin-top:28px;
    padding-top:25px;
    border-top:1px solid #eaecf0;
  "
>

<p
  style="
    margin:0;
    font-size:14px;
    line-height:23px;
    color:#475467;
  "
>
  <strong style="color:#111827;">
    Didn't request this?
  </strong>
</p>

<p
  style="
    margin:6px 0 0;
    font-size:13px;
    line-height:22px;
    color:#667085;
  "
>
  If you didn't request a password reset,
  you can safely ignore this email.
  Your account remains secure.
</p>

<p
  style="
    margin:15px 0 0;
    font-size:13px;
    line-height:22px;
    color:#667085;
  "
>
  🔐 Never share this verification code with anyone,
  including TradeNest support.
</p>

</div>

</td>

</tr>

<!-- =====================================================
     FOOTER
===================================================== -->

<tr>

<td
  align="center"
  style="
    padding:25px 20px;
    background:#f8fafc;
    border-top:1px solid #eaecf0;
  "
>

<div
  style="
    font-size:14px;
    font-weight:700;
    color:#344054;
  "
>
  TradeNest
</div>

<div
  style="
    margin-top:6px;
    font-size:12px;
    line-height:20px;
    color:#98a2b3;
  "
>
  Trade smarter. Invest better.
</div>

<div
  style="
    margin-top:14px;
    font-size:11px;
    line-height:18px;
    color:#b0b8c4;
  "
>
  © ${new Date().getFullYear()} TradeNest.
  This is an automated email.
</div>

</td>

</tr>

</table>

<!-- =====================================================
     OUTSIDE FOOTER
===================================================== -->

<div
  style="
    max-width:600px;
    margin-top:16px;
    text-align:center;
    font-size:11px;
    line-height:18px;
    color:#98a2b3;
  "
>
  Please do not reply directly to this email.
</div>

</td>
</tr>

</table>

</body>
</html>
`;

    /* =================================================
       SEND EMAIL
    ================================================= */

    await sendEmail({
      to: user.email,

      subject: "TradeNest 🔐 Your Password Reset OTP",

      html,
    });

    /* =================================================
       RESPONSE
    ================================================= */

    return res.status(200).json({
      success: true,
      message: "If an account exists with this email, an OTP has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to send password reset OTP.",
    });
  }
};

/* =====================================================
   VERIFY RESET OTP
===================================================== */

const verifyResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    /* ---------- Validation ---------- */

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    /* ---------- OTP format ---------- */

    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: "OTP must be a 6-digit number.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    /* =================================================
       HASH RECEIVED OTP
    ================================================= */

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    /* =================================================
       FIND USER
    ================================================= */

    const user = await User.findOne({
      email: normalizedEmail,

      resetPasswordToken: hashedOTP,

      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    /* ---------- Invalid OTP ---------- */

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP.",
      });
    }

    /* =================================================
       IMPORTANT
       Do NOT delete OTP here.
       ResetPassword needs it.
    ================================================= */

    console.log("✅ OTP verified successfully:", user.email);

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
    });
  } catch (error) {
    console.error("Verify OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to verify OTP.",
    });
  }
};

/* =====================================================
   RESET PASSWORD
   USING VERIFIED OTP
===================================================== */

const resetPassword = async (req, res) => {
  try {
    const { email, otp, password, newPassword } = req.body;

    /*
      Support both:
      password
      newPassword
    */

    const finalPassword = newPassword || password;

    /* ---------- Validation ---------- */

    if (!email || !otp || !finalPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP and new password are required.",
      });
    }

    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP format.",
      });
    }

    if (finalPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    /* =================================================
       HASH OTP
    ================================================= */

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    /* =================================================
       FIND USER
    ================================================= */

    const user = await User.findOne({
      email: normalizedEmail,

      resetPasswordToken: hashedOTP,

      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    /* ---------- Invalid / expired OTP ---------- */

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "OTP is invalid or has expired.",
      });
    }

    /* =================================================
       HASH NEW PASSWORD
    ================================================= */

    user.password = await bcrypt.hash(finalPassword, 12);

    /* =================================================
       CLEAR RESET DATA
    ================================================= */

    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;

    await user.save();

    /* =================================================
       RESPONSE
    ================================================= */

    console.log("✅ Password reset successfully:", user.email);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. You can now login.",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to reset password.",
    });
  }
};

/* =====================================================
   EXPORT
===================================================== */

module.exports = {
  signup,
  login,
  getMe,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
};
