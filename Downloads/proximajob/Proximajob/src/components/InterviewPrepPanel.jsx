import React, { useState } from "react";

const carouselCards = [
  {
    //logo: "images/infosys.png",
    company: "Accenture",
    role: "Software Engineer",
    profile: "./images/accenturelogo.png",
    btn: "Practice Interview",
    subtitle: "10 min AI Interview",
    gradient: "from-[#1e3a8a] via-[#2563eb] to-[#38bdf8]",
    button: "from-[#745cf5] to-[#5ccaee]",
  },
  {
    //logo: "images/spacex.png",
    company: "Microsoft",
    role: "Frontend Developer",
    profile: "./images/microsoftlogo.png",
    btn: "Practice Interview",
    subtitle: "10 min AI Interview",
    gradient: "from-[#8b5cf6] via-[#38bdf8] to-[#5eead4]",
    button: "from-[#8e8cf6] to-[#61e7ea]",
  },
  {
   // logo: "images/tesla.png",
    company: "Flipkart",
    role: "Backend Developer",
    profile: "./images/flipkartlogo.jpeg",
    btn: "Practice Interview",
    subtitle: "10 min AI Interview",
    gradient: "from-[#be6cf7] via-[#667eea] to-[#64d8cb]",
    button: "from-[#a44bf8] to-[#50ded2]",
  },
];

export default function PracticeMockAIInterviews() {
  const [current, setCurrent] = useState(0);
  const n = carouselCards.length;

  // Index helpers
  const leftIdx = (current + n - 1) % n;
  const rightIdx = (current + 1) % n;

  return (
    <section className="bg-[#f6f9fe] py-16 px-0">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 px-6">
        {/* Left: Hero text */}
        <div className="flex-1 min-w-[320px] max-w-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-gradient-to-tr from-[#89abe8] via-[#c798fd] to-[#80eaff] text-white font-bold px-6 py-2 rounded-2xl text-lg shadow">
              AI
            </span>
          </div>
          <h2 className="font-extrabold text-[3rem] text-[#502fe7] mb-2 leading-tight">
            Job Preparation
          </h2>
          <p className="text-[1.9rem] text-[#283664] mb-2 max-w-xl">
            Practice Mock Interviews with our <span className="font-black text-black">Free AI Interview Coach</span>
          </p>
          <button className="mt-8 rounded-full bg-gradient-to-tr from-[#38bdf8] to-[#6366f1] text-white font-semibold text-lg px-8 py-3 hover:from-[#4f5cfa] hover:to-[#40e0ff] transition shadow">
            View All Prep &gt;
          </button>
        </div>

        {/* Right: Carousel */}
        <div className="flex-1 min-w-[360px] flex items-center justify-center relative" style={{ minHeight: 390 }}>
          {/* Left BG card */}
          <div className={`
            absolute top-1/2 left-2 -translate-y-1/2 rounded-[38px]
            w-[350px] h-[350px] z-0 opacity-70 scale-90 blur-[3px]
            bg-gradient-to-br ${carouselCards[leftIdx].gradient}
            pointer-events-none transition-all duration-500
          `}></div>

          {/* Right BG card */}
          <div className={`
            absolute top-1/2 right-2 -translate-y-1/2 rounded-[38px]
            w-[350px] h-[350px] z-0 opacity-70 scale-90 blur-[3px]
            bg-gradient-to-br ${carouselCards[rightIdx].gradient}
            pointer-events-none transition-all duration-500
          `}></div>

          {/* Middle: Sharp Main Card */}
          <div className={`
            relative z-10 flex flex-col items-center justify-between px-10 py-10 w-[375px] h-[380px] bg-gradient-to-br ${carouselCards[current].gradient} rounded-[38px] shadow-2xl transition-all duration-500
          `}>
            {/* Logo 
            <img
              src={carouselCards[current].logo}
              alt={carouselCards[current].company}
              className="w-14 h-14 object-contain bg-white rounded-xl shadow mb-3"
            /> */}
            {/* Company name */}
            <div className="text-white font-semibold text-lg mb-1">{carouselCards[current].company}</div>
            {/* Role/title */}
            <h3 className="text-white text-[1.75rem] font-extrabold mb-5 text-center leading-tight">
              {carouselCards[current].role}
            </h3>
{/* Center profile badge */}
<div className="flex w-full justify-center items-center mb-4">
  <div className="w-[150px] h-[150px] rounded-full bg-white flex items-center justify-center shadow border border-white overflow-hidden">
    <img
      src={carouselCards[current].profile}
      alt="Profile"
      className="w-full h-full object-cover rounded-full"
    />
  </div>
</div>

            {/* Button */}
            <button className={`
              rounded-full bg-gradient-to-tr ${carouselCards[current].button}
              text-white font-bold text-lg w-full py-3 mb-3 mt-auto
              transition hover:from-[#1d0d7b] hover:to-[#3c3954] shadow
            `}>
              {carouselCards[current].btn}
            </button>
            {/* Subtitle */}
            <div className="w-full text-center text-white font-medium text-[15px] opacity-90">
              {carouselCards[current].subtitle}
            </div>
          </div>

          {/* Carousel navigation arrows */}
          <button
            onClick={() => setCurrent((c) => (c + n - 1) % n)}
            aria-label="Previous"
            className="absolute left-[-36px] top-1/2 -translate-y-1/2 z-20 rounded-full bg-white shadow text-[#4e62c4] hover:bg-blue-50 font-bold text-2xl w-12 h-12 flex items-center justify-center focus:outline-none"
          >&lt;</button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % n)}
            aria-label="Next"
            className="absolute right-[-36px] top-1/2 -translate-y-1/2 z-20 rounded-full bg-white shadow text-[#4e62c4] hover:bg-blue-50 font-bold text-2xl w-12 h-12 flex items-center justify-center focus:outline-none"
          >&gt;</button>
        </div>
      </div>
    </section>
  );
}
