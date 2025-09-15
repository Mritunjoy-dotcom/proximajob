const express = require("express");
const { registerRecruiter, verifyOtp } = require("../controllers/recruiterController");

const router = express.Router();

router.post("/register", registerRecruiter);
router.post("/verify-otp", verifyOtp);

module.exports = router;
