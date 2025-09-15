const axios = require("axios");

async function sendSms(to, message) {
  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",              // Quick transactional route
        sender_id: "TXTIND",     // Default sender ID
        message: message,
        language: "english",
        numbers: to,
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("📩 Fast2SMS Response:", response.data);
    return response.data;
  } catch (err) {
    console.error("❌ Fast2SMS Error:", err.response?.data || err.message);
    return null;
  }
}

module.exports = { sendSms }; 