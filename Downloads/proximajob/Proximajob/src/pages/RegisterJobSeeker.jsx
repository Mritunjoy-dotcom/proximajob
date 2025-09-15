// src/pages/RegisterJobSeeker.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterJobSeeker = () => {
  const [step, setStep] = useState("register"); // register | otp | done
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [registeredTarget, setRegisteredTarget] = useState(""); // ✅ emailOrMobile
  const navigate = useNavigate();

  // ✅ Base API URL
  const API_BASE = "http://localhost:5000/api";

  // Input change handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Register submit
  const handleRegister = async (e) => {
    e.preventDefault();

    let mobile = formData.mobile.trim();
    if (mobile.startsWith("+91")) {
      mobile = mobile.replace("+91", "").trim();
    }

    if (formData.password !== formData.confirmPassword) {
      setMsg("❌ Password & Confirm Password do not match!");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/jobseeker/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullname,
          email: formData.email,
          mobile: mobile,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await res.json();
      setMsg(data.msg || data.message || data.error || "Registered successfully!");

      if (res.ok) {
        // ✅ OTP verify এর জন্য email বা mobile save করো
        setRegisteredTarget(mobile || formData.email);
        setStep("otp");
      }
    } catch (err) {
      console.error(err);
      setMsg("⚠️ Server error. Please try again.");
    }
  };

  // ✅ OTP verify
  const handleOtpVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/auth/jobseeker/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailOrMobile: registeredTarget, // ✅ backend এর সাথে match
          otp, // ✅ backend এর সাথে match
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep("done");
        setMsg("✅ OTP verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login/jobseeker"), 2000);
      } else {
        setMsg(data.msg || data.error || "❌ Invalid OTP. Try again.");
      }
    } catch (err) {
      console.error(err);
      setMsg("⚠️ Server error. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
          <div className="flex items-center space-x-2">
            <img src="/images/JobsFind4U-logo.svg" alt="Logo" className="h-14" />
          </div>
          <div>
            <p className="text-gray-800 text-sm">
              Already Registered?{" "}
              <Link
                to="/login/jobseeker"
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </Link>{" "}
              here
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row mt-24 bg-white shadow rounded-lg overflow-hidden">
        {/* Left Info */}
        <div className="md:w-1/3 bg-white p-8 border-r">
          <img src="/images/register.png" alt="Illustration" className="mb-6" />
          <h2 className="text-lg font-semibold mb-4">On registering, you can</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">✔</span> Build your
              profile and let recruiters find you
            </li>
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">✔</span> Get job
              postings delivered right to your email
            </li>
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">✔</span> Find a job
              and grow your career
            </li>
          </ul>
        </div>

        {/* Right Forms */}
        <div className="md:w-2/3 p-8">
          {/* Register */}
          {step === "register" && (
            <form onSubmit={handleRegister} className="space-y-5">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Create your JobsFind4u profile
              </h2>
              <p className="text-gray-500 mb-6">
                Search & apply to jobs from India's No.1 Job Site
              </p>

              {/* Full name */}
              <div>
                <label className="block mb-1 font-medium">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 font-medium">
                  Email ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block mb-1 font-medium">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    required
                    className="w-full border border-gray-300 rounded-r-lg p-3"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 font-medium">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              {/* Confirm password */}
              <div>
                <label className="block mb-1 font-medium">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Register
              </button>
            </form>
          )}

          {/* OTP verify */}
          {step === "otp" && (
            <form onSubmit={handleOtpVerify} className="space-y-4">
              <label className="block mb-1 font-medium">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit OTP"
                required
                className="w-full border border-gray-300 rounded-lg p-3"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white p-2 rounded hover:bg-green-700"
                >
                  Verify OTP
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
                  onClick={() => setStep("register")}
                >
                  Back
                </button>
              </div>
            </form>
          )}

          {/* Done */}
          {step === "done" && (
            <p className="text-green-600 font-medium text-center">
              ✅ Registration completed! Redirecting...
            </p>
          )}

          {/* Message */}
          {msg && (
            <p className="mt-4 text-center font-medium text-red-500">{msg}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterJobSeeker;
