const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    companyWebsite: { type: String },
    industry: { type: String },
    companySize: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true, trim: true },   // ✅ Same as JobSeeker
    otp: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Recruiter || mongoose.model("Recruiter", recruiterSchema);
