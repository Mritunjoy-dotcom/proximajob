// src/pages/LoginRecruiter.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginRecruiter = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/employers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("employerToken", data.token); // recruiter token save
        alert("✅ Login successful!");
        navigate("/recruiter/dashboard"); // redirect to recruiter dashboard
      } else {
        alert(data.message || "❌ Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("⚠ Server error");
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          Employer / Recruiter Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register/recruiter"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginRecruiter;
