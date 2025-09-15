import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginJobSeeker = () => {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔹 Normal Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/jobseeker/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: emailOrMobile, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("✅ Login successful!");
        navigate("/dashboard/jobseeker");
      } else {
        alert(data.error || "❌ Login failed.");
      }
    } catch (err) {
      console.error(err);
      alert("⚠ Server error. Please try again.");
    }
  };

  // 🔹 OTP Login
  const handleOtpLogin = async () => {
    const mobile = prompt("📱 Enter your registered mobile number:");
    if (!mobile) return;

    try {
      // Step 1: Request OTP
      const res = await fetch("http://localhost:5000/api/auth/jobseeker/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "❌ OTP request failed.");
        return;
      }

      // Step 2: Verify OTP
      const otp = prompt("Enter the OTP sent to your mobile:");
      if (!otp) return;

      const verifyRes = await fetch("http://localhost:5000/api/auth/jobseeker/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, code: otp }),
      });

      const verifyData = await verifyRes.json();

      if (verifyRes.ok) {
        localStorage.setItem("token", verifyData.token);
        localStorage.setItem("user", JSON.stringify(verifyData.user));
        alert("✅ OTP Login successful!");
        navigate("/dashboard");
      } else {
        alert(verifyData.error || "❌ OTP verification failed.");
      }
    } catch (err) {
      console.error(err);
      alert("⚠ Server error. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HEADER SECTION */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-2 px-6">
          <div className="flex items-center gap-2">
            <img src="/images/JobsFind4U-logo.svg" alt="Logo" className="h-14" />
          </div>

          <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium text-sm">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/jobs" className="hover:text-blue-600">Jobs</Link>
            <Link to="/companies" className="hover:text-blue-600">Companies</Link>
            <Link to="/services" className="hover:text-blue-600">Services</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login/jobseeker"
              className="px-3 py-1 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50"
            >
              Login
            </Link>
            <Link
              to="/register/jobseeker"
              className="px-3 py-1 bg-red-500 text-white rounded-full text-sm hover:bg-red-600"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* LOGIN SECTION */}
      <div className="flex justify-center items-center py-12 pt-24"> 
        <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full overflow-hidden">
          {/* Left Section */}
          <div className="w-1/2 bg-white p-8 flex flex-col justify-center">
            <img src="/images/login.png" alt="login" className="mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              New to jobsfind4u
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start"><span className="text-blue-600 mr-2">✔</span> One click apply using your profile.</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">✔</span> Get relevant job recommendations.</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">✔</span> Showcase profile to top companies.</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">✔</span> Track application status easily.</li>
            </ul>
            <Link
              to="/register/jobseeker"
              className="mt-6 border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-600 hover:text-white transition text-center"
            >
              Register for Free
            </Link>
          </div>

          {/* Right Section */}
          <div className="w-1/2 bg-gray-50 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-1">Email ID / Mobile</label>
                <input
                  type="text"
                  value={emailOrMobile}
                  onChange={(e) => setEmailOrMobile(e.target.value)}
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  placeholder="Enter Email or Mobile"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  placeholder="Enter Password"
                />
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline block mt-1"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Login
              </button>

              <div className="text-center text-gray-500">Or</div>

              <button
                type="button"
                className="w-full border rounded py-2 flex items-center justify-center gap-2 hover:bg-gray-100 transition"
              >
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign in with Google
              </button>

              <button
                type="button"
                onClick={handleOtpLogin}
                className="w-full border rounded py-2 text-blue-600 hover:bg-blue-50 transition"
              >
                Use OTP to Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginJobSeeker;
