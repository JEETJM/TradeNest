const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

const verifyMailConnection = async () => {
  try {
    await transporter.verify();

    console.log("✅ Brevo SMTP connected successfully");
  } catch (error) {
    console.error("❌ Brevo SMTP connection failed:", error);
  }
};

const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: {
        name: "TradeNest",
        address: process.env.EMAIL_FROM,
      },

      to: {
        name: "TradeNest User",
        address: to,
      },

      subject,
      html,
    });

    console.log("=================================");
    console.log("📧 EMAIL SENT");
    console.log("Message ID:", info.messageId);
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);
    console.log("Response:", info.response);
    console.log("=================================");

    return info;
  } catch (error) {
    console.error("❌ EMAIL SEND ERROR");
    console.error(error);

    throw error;
  }
};

module.exports = {
  transporter,
  verifyMailConnection,
  sendEmail,
};
