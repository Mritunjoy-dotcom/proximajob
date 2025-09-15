import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: "easeOut" } }
};
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Only numbers, max 10 digits
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue.slice(0, 10),
      }));
    } else if (name === "name") {
      // Only letters and spaces allowed for name
      const stringValue = value.replace(/[^A-Za-z\s]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: stringValue
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    // Name: required, min 4 chars, letters & spaces only
    if (!formData.name.trim()) errors.name = "Name is required";
    else if (formData.name.trim().length < 4)
      errors.name = "Name must be at least 4 characters";
    else if (!/^[A-Za-z\s]+$/.test(formData.name.trim()))
      errors.name = "Name should only contain letters and spaces";

    if (!formData.email.trim()) errors.email = "Email is required";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) errors.email = "Invalid email address";
    }

    // Phone: required, exactly 10 digits, no other chars
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      errors.phone = "Phone number must be exactly 10 digits (numbers only)";

    if (!formData.message.trim()) errors.message = "Please enter a message";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        await axios.post("/api/contact", formData);
        setFormSubmitted(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } catch (error) {
        alert("Error submitting message. Please try again later.");
      }
    } else {
      setFormSubmitted(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen bg-gray-50">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {/* Contact Form */}
          <section className="bg-white rounded-lg shadow p-8">
            <h1 className="text-4xl font-extrabold text-blue-900 mb-6 text-center">Contact Us</h1>
            <p className="mb-6 text-gray-700">
              Have questions or want to work with us? Fill out the form below and we’ll get back to you promptly.
            </p>

            {formSubmitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                Thank you for reaching out! We will get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label htmlFor="name" className="block font-semibold mb-1">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    formErrors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your full name"
                  required
                />
                {formErrors.name && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block font-semibold mb-1">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    formErrors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="you@example.com"
                  required
                />
                {formErrors.email && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block font-semibold mb-1">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    formErrors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="only 10 digits"
                  required
                  maxLength={10}
                  inputMode="numeric"
                  pattern="\d{10}"
                  autoComplete="off"
                />
                {formErrors.phone && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block font-semibold mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="(Optional)"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block font-semibold mb-1">
                  Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    formErrors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Write your message here..."
                  required
                />
                {formErrors.message && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded transition"
              >
                Send Message
              </button>
            </form>
          </section>

          {/* Contact Info & Map */}
          <section className="bg-white rounded-lg shadow p-8 flex flex-col space-y-6">
            <h2 className="text-3xl font-bold text-blue-900 text-center">Get In Touch !</h2>
            <p className="text-gray-700">
              You can also reach us using the following contact details. We're here to help!
            </p>
            <address className="not-italic text-gray-700 space-y-3">
              <div>
                <strong>Address:</strong><br />
SIERRA CARTEL 1207/343, 9th Main Rd, 7th Sector, HSR Layout, Bengaluru - 560068
              </div>
              <div>
                <strong>Phone:</strong><br />
                +91-9900403990
              </div>
              <div>
                <strong>Email:</strong><br />
                <a href="mailto:contact@proximacorp.com" className="text-blue-700 hover:underline">
                  proximaskills.bng@gmail.com
                </a>
              </div>
              <div>
                <strong>Business Hours:</strong><br />
                Monday - Friday: 9AM - 6PM<br />
                Saturday: 10AM - 3PM<br />
                Sunday: Closed
              </div>
            </address>
{/* Updated Embedded Google Map */}
  <div className="flex-grow">
    <iframe
      title="Proxima Office Location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31186.857002788067!2d77.61086890973606!3d12.915213893503932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae11fc6f3f0e2f%3A0x37948434d5b5cfa3!2sSierra%20Cartel!5e0!3m2!1sen!2sin!4v1693936938841!5m2!1sen!2sin"
      width="100%"
      height="250"
      style={{ border: 0, borderRadius: "0.5rem" }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
          </section>
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default ContactUs;
