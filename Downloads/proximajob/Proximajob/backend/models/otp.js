const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  target: { type: String, required: true },
  code: { type: String, required: true },
  purpose: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  data: { type: Object },
});

module.exports = mongoose.model("Otp", otpSchema);
