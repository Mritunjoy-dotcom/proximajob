const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JobSeeker = require("../models/JobSeeker");
const Otp = require("../models/otp");
const { sendSms } = require("../utils/sendSms");
const { sendMail } = require("../utils/sendMail");

// 🔹 OTP generate helper (6-digit)
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();


// =============================
// Step 1: Register Request (Send OTP)
// =============================
router.post("/register", async (req, res) => {
  try {
    const { name, email, mobile, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // check if user already exists
    const existing = await JobSeeker.findOne({ $or: [{ email }, { mobile }] });
    if (existing) {
      return res
        .status(400)
        .json({ error: "Email or mobile already registered" });
    }

    // OTP generate
    const code = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minute
    const targetValue = mobile || email;

    // old OTP delete
    await Otp.deleteMany({ target: targetValue, purpose: "register" });

    // new OTP save 
    await Otp.create({
      target: targetValue,
      code,
      purpose: "register",
      expiresAt,
      data: { name, email, mobile, password },
    });

    console.log("✅ Generated OTP:", code, "for", targetValue);

    // ✅ SMS send
    let smsStatus = null;
    if (mobile) {
      try {
        smsStatus = await sendSms(
          mobile,
          `Your JobsFind4U OTP is ${code}. It will expire in 10 minutes.`
        );
        console.log("📩 SMS sent:", smsStatus);
      } catch (err) {
        console.error("❌ SMS failed:", err.message);
      }
    }

    // ✅ Email send
    if (email) {
      try {
        await sendMail({
          to: email,
          subject: "Jobseeker OTP Verification",
          html: `<p>Hello <b>${name}</b>,</p>
                 <p>Your jobseeker OTP is: <b>${code}</b></p>
                 <p>It will expire in 10 minutes.</p>`,
        });
        console.log("📧 Email sent to:", email);
      } catch (err) {
        console.error("❌ Email failed:", err.message);
      }
    }

    res.json({
      message: "OTP sent successfully",
      otp: code, 
      smsStatus,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =============================
// Step 2: Verify OTP (Complete Registration)
// =============================
router.post("/verify-otp", async (req, res) => {
  try {
    const { emailOrMobile, otp } = req.body;

    // OTP find
    const otpDoc = await Otp.findOne({
      target: emailOrMobile,
      code: otp,
      purpose: "register",
    });

    if (!otpDoc) {
      return res.status(400).json({ error: "Invalid OTP" });
    }
    if (otpDoc.expiresAt < new Date()) {
      return res.status(400).json({ error: "OTP expired" });
    }

    // user data OTP 
    const { name, email, mobile, password } = otpDoc.data;

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    //  JobSeeker 
    const newJobSeeker = new JobSeeker({
      name,
      email,
      mobile,
      password: hashed,
      isVerified: true,
    });

    await newJobSeeker.save();

    // OTP use 
    await Otp.deleteOne({ _id: otpDoc._id });

    res.json({
      message: "OTP verified successfully. Registration complete!",
      user: {
        id: newJobSeeker._id,
        name: newJobSeeker.name,
        email: newJobSeeker.email,
        mobile: newJobSeeker.mobile,
        isVerified: newJobSeeker.isVerified,
      },
    });
  } catch (err) {
    console.error("❌ Verify OTP Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// =============================
// Step 3: Login
// =============================
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body; // email or mobile

    const jobseeker = await JobSeeker.findOne({
      $or: [{ email: identifier }, { mobile: identifier }],
    });

    if (!jobseeker) {
      return res.status(400).json({ error: "Invalid email/mobile or password" });
    }

    const isMatch = await bcrypt.compare(password, jobseeker.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email/mobile or password" });
    }

    // JWT token
    const token = jwt.sign(
      { id: jobseeker._id, email: jobseeker.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: pwd, ...userData } = jobseeker._doc;

    res.json({ message: "Login successful", token, user: userData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
