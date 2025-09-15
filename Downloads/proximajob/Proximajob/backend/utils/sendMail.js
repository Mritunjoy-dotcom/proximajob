const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send Email
 * @param {Object} options
 * @param {string} options.to - Receiver email
 * @param {string} options.subject - Subject of email
 * @param {string} options.html - HTML body
 */
async function sendMail({ to, subject, html }) {
  try {
    await transporter.sendMail({
      from: `"JobsFind4U" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`✅ Email sent to: ${to}`);
  } catch (err) {
    console.error("❌ Email error:", err.message);
  }
}

// ✅ Proper export
module.exports = { sendMail };
