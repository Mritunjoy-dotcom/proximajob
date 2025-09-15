const express = require("express");
const JobSeeker = require("../models/JobSeeker");
const Otp = require("../models/otp");
const bcrypt = require("bcryptjs");

const router = express.Router();


// ✅ Get All JobSeekers
router.get("/", async (req, res) => {
  try {
    const jobSeekers = await JobSeeker.find();
    res.json(jobSeekers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get Single JobSeeker by ID
router.get("/:id", async (req, res) => {
  try {
    const jobSeeker = await JobSeeker.findById(req.params.id);
    if (!jobSeeker) return res.status(404).json({ message: "Jobseeker not found" });
    res.json(jobSeeker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update JobSeeker
router.put("/:id", async (req, res) => {
  try {
    const updatedJobSeeker = await JobSeeker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedJobSeeker) return res.status(404).json({ message: "Jobseeker not found" });
    res.json(updatedJobSeeker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Delete JobSeeker
router.delete("/:id", async (req, res) => {
  try {
    const deletedJobSeeker = await JobSeeker.findByIdAndDelete(req.params.id);
    if (!deletedJobSeeker) return res.status(404).json({ message: "Jobseeker not found" });
    res.json({ message: "Jobseeker deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ==========================================
// 🔹 Forgot Password Flow
// ==========================================

// ✅ Step 1: Request OTP for forgot password
router.post("/forgot-password", async (req, res) => {
  try {
    const { emailOrMobile } = req.body;
    const user = await JobSeeker.findOne({
      $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
    });

    if (!user) return res.status(404).json({ msg: "User not found." });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    const otp = new Otp({
      target: emailOrMobile,
      code: otpCode,
      purpose: "forgot-password",
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 mins
    });

    await otp.save();

    // এখানে চাইলে sendSms বা sendMail call করবে
    console.log("🔑 OTP for forgot password:", otpCode);

    res.json({ msg: "OTP sent successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error." });
  }
});

// ✅ Step 2: Reset Password with OTP
router.post("/reset-password", async (req, res) => {
  try {
    const { emailOrMobile, otp, newPassword } = req.body;

    const otpDoc = await Otp.findOne({
      target: emailOrMobile,
      code: otp,
      purpose: "forgot-password",
    });

    if (!otpDoc || otpDoc.expiresAt < Date.now()) {
      return res.status(400).json({ msg: "Invalid or expired OTP." });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await JobSeeker.findOneAndUpdate(
      { $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }] },
      { password: hashed }
    );

    await Otp.deleteOne({ _id: otpDoc._id });

    res.json({ msg: "Password reset successful." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error." });
  }
});

module.exports = router;
