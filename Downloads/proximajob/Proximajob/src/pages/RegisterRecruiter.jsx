import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

function RegisterRecruiter() {
  const navigate = useNavigate();

  // 🔹 State for form data
  const [formData, setFormData] = useState({
    fullName: "",              // recruiter name
    companyName: "",
    companyWebsite: "",
    industry: "",
    companySize: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneCode: "+91",
    phone: "",
  });

  // 🔹 Extra state for OTP
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ================= Handle Registration =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }

    const payload = {
      fullName: formData.fullName,
      companyName: formData.companyName,
      companyWebsite: formData.companyWebsite,
      industry: formData.industry,
      companySize: formData.companySize,
      email: formData.email,
      password: formData.password,
      mobile: formData.phone,
      phoneCode: formData.phoneCode,
    };

    try {
      const res = await fetch("http://localhost:5000/api/recruiter/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setMessage("✅ Registration successful! OTP sent to your phone.");
      } else {
        setMessage("❌ " + (data.message || "Something went wrong"));
      }
    } catch (error) {
      setMessage("⚠️ Server error: " + error.message);
    }
  };

  // ================= Handle OTP Verification =================
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const payload = {
      email: formData.email,
      otp: otp,
    };

    try {
      const res = await fetch("http://localhost:5000/api/recruiter/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        // ✅ Save token
        localStorage.setItem("recruiterToken", data.token);

        setMessage("✅ OTP verified! Redirecting to Dashboard...");

        // ✅ Redirect after 1s
        setTimeout(() => {
          navigate("/dashboard/recruiter");
        }, 1000);
      } else {
        setMessage("❌ " + (data.message || "Invalid OTP"));
      }
    } catch (error) {
      setMessage("⚠️ Server error: " + error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-gradient-to-br from-[#f0f6ff] to-[#dbeafe] overflow-hidden">
      {/* ===== Top Wave Shape ===== */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-0">
        <svg
          className="relative block w-full h-[120px] md:h-[180px]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1920 250"
        >
          <path
            fill="#ffffff"
            d="M0,160L80,138.7C160,117,320,75,480,85.3C640,96,800,160,960,170.7C1120,181,1280,139,1440,117.3C1600,96,1760,96,1840,96L1920,96L1920,0L1840,0C1760,0,1600,0,1440,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* ===== Fixed Header ===== */}
      <header className="bg-white shadow-md fixed top-0 left-0 w-full z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/images/JobsFind4U-logo.svg" alt="Logo" className="h-14" />
          </Link>

          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            <Link to="/about" className="hover:text-blue-600 transition">About</Link>
            <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
          </nav>
        </div>
      </header>

      {/* ===== Main Content ===== */}
      <main className="flex flex-1 relative z-10 pt-24">
        {/* Left Section */}
        <div className="hidden md:flex w-1/2 flex-col justify-center px-12">
          <h1 className="text-5xl font-bold leading-snug">
            Find & hire the <span className="text-blue-600">right talent</span> with us
          </h1>
          <p className="mt-6 text-gray-600 text-lg">
            Trusted by 9 Cr+ candidates | 5 Lakh+ employers
          </p>

          <div className="flex mt-8 space-x-3">
            <img className="w-14 h-14 rounded-full border-2 border-white shadow-lg"
              src="https://randomuser.me/api/portraits/men/32.jpg" alt="user1" />
            <img className="w-14 h-14 rounded-full border-2 border-white shadow-lg"
              src="https://randomuser.me/api/portraits/women/44.jpg" alt="user2" />
            <img className="w-14 h-14 rounded-full border-2 border-white shadow-lg"
              src="https://randomuser.me/api/portraits/men/45.jpg" alt="user3" />
            <img className="w-14 h-14 rounded-full border-2 border-white shadow-lg"
              src="https://randomuser.me/api/portraits/women/50.jpg" alt="user4" />
          </div>
        </div>

        {/* Right Section (Form + OTP) */}
        <div className="flex w-full md:w-1/2 justify-center items-center">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">
              Register as Employer
            </h2>

            {!otpSent ? (
              // 🔹 Registration Form
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Recruiter Full Name */}
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your Full Name"
                  className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                {/* Company Details */}
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange}
                  placeholder="Company Name" className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />

                <input type="url" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange}
                  placeholder="Company Website" className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />

                <select name="industry" value={formData.industry} onChange={handleChange}
                  className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Industry</option>
                  <option>Information Technology</option>
                  <option>Finance</option>
                  <option>Healthcare</option>
                  <option>Education</option>
                  <option>Manufacturing</option>
                  <option>Other</option>
                </select>

                <select name="companySize" value={formData.companySize} onChange={handleChange}
                  className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Company Size</option>
                  <option>1 - 10 employees</option>
                  <option>11 - 50 employees</option>
                  <option>51 - 200 employees</option>
                  <option>201 - 500 employees</option>
                  <option>500+ employees</option>
                </select>

                {/* Recruiter Account Info */}
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="Email" className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />

                <input type="password" name="password" value={formData.password} onChange={handleChange}
                  placeholder="Password" className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />

                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                  placeholder="Confirm Password" className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />

                <div className="flex">
                  <select name="phoneCode" value={formData.phoneCode} onChange={handleChange}
                    className="border rounded-l-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>+91</option>
                    <option>+1</option>
                    <option>+44</option>
                  </select>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange}
                    placeholder="Enter mobile number" className="w-full border rounded-r-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>

                <div className="flex items-start">
                  <input type="checkbox" className="mr-2 mt-1" required />
                  <p className="text-sm text-gray-600">
                    I agree to the{" "}
                    <Link to="/privacy" className="text-blue-600 underline">Privacy Policy</Link> and{" "}
                    <Link to="/terms" className="text-blue-600 underline">Terms & Conditions</Link>
                  </p>
                </div>

                <button type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-md hover:opacity-90 transition transform hover:-translate-y-0.5 shadow-lg">
                  Register
                </button>
              </form>
            ) : (
              // 🔹 OTP Verification Form
              <form className="space-y-4" onSubmit={handleVerifyOtp}>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-md hover:opacity-90 transition shadow-lg"
                >
                  Verify OTP
                </button>
              </form>
            )}

            {/* 🔹 Show Message */}
            {message && <p className="mt-4 text-center text-sm">{message}</p>}

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login/recruiter" className="text-blue-600 font-medium hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* ===== Footer ===== */}
      <div className="relative z-0">
        <div className="absolute top-[-100px] left-0 w-full overflow-hidden leading-[0] rotate-180">
          <svg className="relative block w-full h-[120px] md:h-[180px]"
            xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1920 250">
            <path fill="#001f4d"
              d="M0,160L80,138.7C160,117,320,75,480,85.3C640,96,800,160,960,170.7C1120,181,1280,139,1440,117.3C1600,96,1760,96,1840,96L1920,96L1920,0L1840,0C1760,0,1600,0,1440,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" />
          </svg>
        </div>

        <footer className="bg-[#001f4d] text-white py-12 relative">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 items-center">
            <div>
              <h3 className="text-lg font-semibold">Stay Updated</h3>
              <p className="text-gray-300 text-sm mt-2">
                Subscribe to get the latest{" "}
                <span className="text-blue-400 font-medium">hiring insights</span>,{" "}
                <span className="text-blue-400 font-medium">recruitment tips</span> and{" "}
                <span className="text-blue-400 font-medium">platform updates</span>.
              </p>
            </div>

            <div>
              <form className="flex">
                <input type="email" placeholder="Enter your work email"
                  className="w-full px-4 py-2 rounded-l-md focus:outline-none text-gray-900" required />
                <button type="submit"
                  className="bg-gradient-to-r from-blue-600 to-blue-800 hover:opacity-90 px-5 rounded-r-md transition text-white font-medium">
                  Subscribe
                </button>
              </form>
            </div>

            <div className="flex justify-center md:justify-end space-x-4 text-2xl">
              <a href="#" className="hover:text-blue-400 transition"><FaFacebookF /></a>
              <a href="#" className="hover:text-blue-400 transition"><FaTwitter /></a>
              <a href="#" className="hover:text-blue-400 transition"><FaLinkedinIn /></a>
              <a href="#" className="hover:text-blue-400 transition"><FaInstagram /></a>
            </div>
          </div>

          <div className="text-center text-gray-400 text-sm mt-10">
            &copy; 2025 Jobsfin4u. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}

export default RegisterRecruiter;
