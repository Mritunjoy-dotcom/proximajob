const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Recruiter = require("../models/recruiter");
const sendSms = require("../utils/sendSms");
const { sendMail } = require("../utils/sendMail"); // ✅ Add this

// ======================= REGISTER =======================
const registerRecruiter = async (req, res) => {
  try {
    const {
      fullName,
      companyName,
      companyWebsite,
      industry,
      companySize,
      email,
      password,
      phoneCode,
      mobile,
    } = req.body;

    if (!fullName || !companyName || !mobile || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // check recruiter exists
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({ message: "Recruiter already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // generate otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const fullMobile = phoneCode + mobile;

    // create recruiter
    const recruiter = new Recruiter({
      fullName,
      companyName,
      companyWebsite,
      industry,
      companySize,
      email,
      password: hashedPassword,
      mobile: fullMobile,
      otp,
      isVerified: false,
    });

    await recruiter.save();

    // ✅ Send OTP via SMS
    await sendSms(fullMobile, `Your recruiter OTP is: ${otp}`);

    // ✅ Send OTP via Email
await sendMail({
  to: email,
  subject: "Your Recruiter OTP",
  html: `<p>Hello ${fullName},</p><p>Your OTP is <b>${otp}</b></p>`,
});


    return res
      .status(201)
      .json({ message: "OTP sent to your mobile & email." });
  } catch (err) {
    console.error("❌ Error in registerRecruiter:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// ======================= VERIFY OTP =======================
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      return res.status(400).json({ message: "Recruiter not found" });
    }

    if (recruiter.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // mark verified
    recruiter.isVerified = true;
    recruiter.otp = null;
    await recruiter.save();

    // ✅ generate JWT token
    const token = jwt.sign(
      { id: recruiter._id, email: recruiter.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "OTP verified successfully. Account activated.",
      token,
      recruiter: {
        id: recruiter._id,
        fullName: recruiter.fullName,
        companyName: recruiter.companyName,
        email: recruiter.email,
        mobile: recruiter.mobile,
        isVerified: recruiter.isVerified,
      },
    });
  } catch (err) {
    console.error("❌ Error in verifyOtp:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerRecruiter, verifyOtp };
