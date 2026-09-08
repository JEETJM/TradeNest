const axios = require("axios");

const getLivePrice = async (instrumentKey) => {
  try {
    const response = await axios.get(
      "https://api.upstox.com/v3/market-quote/ltp",
      {
        params: {
          instrument_key: instrumentKey,
        },
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.UPSTOX_ACCESS_TOKEN}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(
      "❌ Upstox API Error:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

module.exports = {
  getLivePrice,
};