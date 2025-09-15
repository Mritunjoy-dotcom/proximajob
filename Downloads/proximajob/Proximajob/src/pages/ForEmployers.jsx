// src/pages/ForEmployers.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const ForEmployers = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Header (Fixed) */}
      <header className="bg-white shadow fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/images/JobsFind4U-logo.svg"
              alt="JobsFind4U Logo"
              className="h-14"
            />
          </Link>

          {/* Navigation */}
          <nav className="space-x-6 flex items-center">
            <Link to="/" className="font-medium hover:text-blue-800">
              Home
            </Link>
            

            {/* ✅ Recruiter Login/Register */}
            <Link
              to="/login/recruiter"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Employer Login
            </Link>
            <Link
              to="/register/recruiter"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Employer Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="text-center py-12 bg-cover bg-center mt-20" 
        // ⬆️ extra margin-top so content header er niche thake
        style={{ backgroundImage: "url('/images/job.jpg')" }}
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          Hire the Right Talent, Faster
        </h2>
        <p className="text-white font-medium mb-6">
          Post jobs, connect with top talent, and streamline your recruitment
          process.
        </p>
        <Link
          to="/dashboard/recruiter"
          className="bg-white text-blue-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          Post a Job Now
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose JobsFind4U for Recruitment?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white shadow-lg p-6 rounded-xl text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Talent Pool"
                className="h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                Access to Top Talent
              </h3>
              <p>
                Connect with qualified candidates across multiple industries and
                skill sets.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow-lg p-6 rounded-xl text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3595/3595455.png"
                alt="Easy Posting"
                className="h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Simple Job Posting</h3>
              <p>
                Post jobs easily and reach thousands of active job seekers
                instantly.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow-lg p-6 rounded-xl text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1828/1828673.png"
                alt="Recruitment Tools"
                className="h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                Advanced Recruitment Tools
              </h3>
              <p>
                Track applications, schedule interviews, and manage hiring all in
                one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Start Hiring Today</h2>
          <p className="mb-6">
            Post your first job in minutes and connect with the best candidates.
          </p>
          <Link
            to="/register/recruiter"
            className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800"
          >
            Create Employer Account
          </Link>
        </div>
      </section>

      {/* Footer */}
<footer className="bg-[#001f4d] text-white py-8">
  <div className="max-w-7xl mx-auto px-4 text-center">
    {/* Brand / Copyright */}
    <p className="mb-4">&copy; 2025 Proxima Skills. All rights reserved.</p>

    {/* Social Media Icons */}
    <div className="flex justify-center space-x-4">
      <a
        href="https://www.facebook.com/share/p/1724UQZu4s/?mibextid=wwXIfr"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-blue-600 transition"
      >
        <FaFacebookF />
      </a>
      <a
        href="https://www.instagram.com/proximaskills?igsh=a2RtaHpzeDNicXo0"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-pink-500 transition"
      >
        <FaInstagram />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-sky-500 transition"
      >
        <FaTwitter />
      </a>
      <a
        href="https://www.linkedin.com/posts/proxima-skills_ganeshchaturthi-ganeshpooja-activity-7366326925327282176-i-tR?utm_source=share&utm_medium=member_ios&rcm=ACoAAEwhTkgBHdIVgKdRBLt7Sd0WTRAKeadYXAo"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-blue-700 transition"
      >
        <FaLinkedinIn />
      </a>
    </div>
  </div>
</footer>
    </div>
  );
};

export default ForEmployers;
