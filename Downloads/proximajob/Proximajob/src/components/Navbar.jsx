import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Add this

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white shadow px-12 py-4 flex justify-between items-center z-50 relative">
      <div className="flex items-center gap-10">
        <img
          src="./images/portal logo-round.png"
          alt="jobsfind4u Logo"
          className="h-10 w-auto"
        />
        <nav className="flex gap-8 items-center font-[500]">
          {/* ✅ Jobs Link */}
          <Link
            to="/jobs"
            className="text-[#14447d] text-[18px] hover:text-blue-700 transition"
          >
            Jobs
          </Link>

          <div
            className="relative group"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="text-[#14447d] text-[18px] flex items-center gap-1 hover:text-blue-700 transition">
              Services
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div
                className="absolute left-[-60px] top-[36px] w-[680px] z-40 bg-white rounded-2xl shadow-2xl grid grid-cols-3 divide-x-[1.5px] divide-[#e3e7eb] px-7 py-7"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                {/* Column 1 */}
                <div className="pr-7 flex flex-col">
                  <div className="font-bold text-gray-900 text-[17px] mb-2">
                    Resume writing
                  </div>
                  <a href="#" className="mb-2 hover:underline text-[#14447d]">
                    Text resume
                  </a>
                  <a href="#" className="mb-2 hover:underline text-[#14447d]">
                    Visual resume
                  </a>
                  <a href="#" className="mb-4 hover:underline text-[#14447d]">
                    Resume critique
                  </a>
                  <div className="font-bold text-gray-900 text-[16px] mb-2">
                    Find Jobs
                  </div>
                  <a href="#" className="mb-2 hover:underline text-[#14447d]">
                    Jobs4u
                  </a>
                  <a href="#" className="mb-2 hover:underline text-[#14447d]">
                    Priority applicant
                  </a>
                  <a href="#" className="hover:underline text-[#14447d]">
                    Contact us
                  </a>
                </div>

                {/* Column 2 */}
                <div className="px-7 flex flex-col">
                  <div className="font-bold text-gray-900 text-[17px] mb-2">
                    Get recruiter's attention
                  </div>
                  <a href="#" className="mb-4 hover:underline text-[#14447d]">
                    Resume display
                  </a>
                  <div className="font-bold text-gray-900 text-[16px] mb-2">
                    Monthly subscriptions
                  </div>
                  <a href="#" className="mb-2 hover:underline text-[#14447d]">
                    Basic & premium plans
                  </a>
                </div>

                {/* Column 3 */}
                <div className="pl-7 flex flex-col">
                  <div className="font-bold text-gray-900 text-[17px] mb-2">
                    Free resume resources
                  </div>
                  <a href="#" className="mb-2 hover:underline text-[#14447d]">
                    Resume maker
                  </a>
                  <a href="#" className="mb-2 hover:underline text-[#14447d]">
                    Resume quality score
                  </a>
                  <a href="#" className="mb-2 hover:underline text-[#14447d]">
                    Resume samples
                  </a>
                  <a href="#" className="hover:underline text-[#14447d]">
                    Job letter samples
                  </a>
                </div>
              </div>
            )}
          </div>

          <a
            href="#"
            className="text-[#14447d] text-[18px] hover:text-blue-700 transition"
          >
            Recruiter
          </a>
        </nav>
      </div>

      <div className="flex gap-4 items-center">
        <a
          href="#"
          className="px-6 py-2 border-2 border-[#14447d] text-[#14447d] bg-white rounded-full font-semibold text-[17px] hover:bg-[#edf5fc] transition"
        >
          Login
        </a>
        <a
          href="#"
          className="px-6 py-2 border-2 border-[#14447d] text-[#14447d] bg-white rounded-full font-semibold text-[17px] hover:bg-[#edf5fc] transition"
        >
          Register
        </a>
      </div>
    </header>
  );
}

export default Navbar;
