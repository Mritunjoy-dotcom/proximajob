const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

// ✅ GET all contact messages (for Admin Dashboard)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 }); // ✅ fixed: sort by submittedAt
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// ✅ POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // 1️⃣ Save to MongoDB
    const newContact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
       submittedAt: new Date(),
    });
    await newContact.save();

    // 2️⃣ Send Email (optional)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // .env file
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER, // admin inbox
      subject: subject || "New Contact Form Submission",
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
    });

    res
      .status(201)
      .json({ message: "Contact saved and email sent successfully!" });
  } catch (error) {
    console.error("Error in contact route:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
