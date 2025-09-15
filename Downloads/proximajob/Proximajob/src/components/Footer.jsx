import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#062c5d] text-white pt-10 pb-5 px-12 font-sans text-[16px]">
      {/* Main Row */}
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-0 pb-1 items-start">
        {/* Far left brand column */}
        <div className="col-span-3 flex flex-col items-start">
          <img
            src="./images/proximalogo.svg"
            alt="proxima logo"
            className="w-44 mb-4"
          />
          <p className="mb-4 leading-normal">
            Connecting talent with opportunity through trusted and innovative career solutions.
          </p>
          <div className="flex gap-4 mb-4">
            <a
              href="#"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[#184c78] hover:bg-white hover:text-[#184c78] text-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[#184c78] hover:bg-white hover:text-[#184c78] text-white transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[#184c78] hover:bg-white hover:text-[#184c78] text-white transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[#184c78] hover:bg-white hover:text-[#184c78] text-white transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Center 3 columns of links */}
        <div className="col-span-2 flex flex-col">
          <Link to="/about" className="mb-2 hover:underline">About us</Link>
          <Link to="/employer" className="mb-2 hover:underline">Employer Home</Link>
          <Link to="/careers" className="mb-2 hover:underline">Careers</Link>
          <Link to="/contact" className="mb-2 hover:underline">Contact Us</Link>
        </div>

        <div className="col-span-2 flex flex-col">
          <Link to="/help" className="mb-2 hover:underline">Help center</Link>
          <Link to="/grievances" className="mb-2 hover:underline">Grievances</Link>
          <Link to="/report" className="mb-2 hover:underline">Report issue</Link>
          <Link to="/notices" className="mb-2 hover:underline">Summons/Notices</Link>
        </div>

        <div className="col-span-2 flex flex-col">
          <Link to="/privacy" className="mb-2 hover:underline">Privacy policy</Link>
          <Link to="/terms" className="mb-2 hover:underline">Terms & Conditions</Link>
          <Link to="/fraud" className="mb-2 hover:underline">Fraud alert</Link>
          <Link to="/safety" className="mb-2 hover:underline">Trust & Safety</Link>
        </div>

        {/* Far right app column */}
        <div className="col-span-3 flex flex-col items-start">
          <span className="font-semibold mb-1 mt-2 text-[17px]">Apply on the go</span>
          <span className="block mb-2 opacity-90 text-[15px]">
            Get real-time job updates on our App
          </span>
          <div className="flex gap-2 mt-2">
            <a href="#">
              <img
                src="/google-play-badge.png"
                alt="Get on Google Play"
                className="h-9"
              />
            </a>
            <a href="#">
              <img
                src="/app-store-badge.png"
                alt="Download on App Store"
                className="h-9"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#235796] mt-8 mb-3"></div>

      {/* Bottom section */}
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between py-2">
        {/* Left: Proxima logo + text */}
        <div className="flex items-center gap-2">
          <img src="./images/proxima.svg" alt="Proxima Logo" className="h-7" />
          <span className="font-semibold text-base text-[#c7e2ff]">
            A product of PROXIMA
          </span>
        </div>

        {/* Right: Copyright, terms, privacy */}
        <div className="flex gap-3 items-center text-[#c7e2ff] text-[15px]">
          <span>© 2025 Proxima – All Rights Reserved</span>
          <Link to="/terms" className="hover:underline text-[#aee2ff]">Terms</Link>
          <Link to="/privacy" className="hover:underline text-[#aee2ff]">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
