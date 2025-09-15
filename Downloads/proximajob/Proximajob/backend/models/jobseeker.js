const mongoose = require("mongoose");

const jobSeekerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true, trim: true },
    otp: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    resume: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.models.JobSeeker || mongoose.model("JobSeeker", jobSeekerSchema);
