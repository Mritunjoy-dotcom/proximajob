import React from "react";

const companies = [
  { name: "Accenture", logo: "./images/accenturelogo1.png", count: "2K+ Interviews" },
  { name: "Cognizant", logo: "./images/cognizantlogo.png", count: "1.6K+ Interviews" },
  { name: "Deloitte", logo: "./images/deloittelogo.png", count: "816 Interviews" },
  { name: "Flipkart", logo: "./images/flipkartlogo.jpeg", count: "488 Interviews" },
   { name: "TCS", logo: "./images/tcslogo.png", count: "2.5K+ Interviews" },
  { name: "Capgemini", logo: "./images/capegemini logo.png", count: "2.5K+ Interviews" },
  //{ name: "Microsoft", logo: "./images/microsoftlogo.png", count: "488 Interviews" },
  { name: "Amazon", logo: "./images/amazonlogo.png", count: "2.5K+ Interviews" },
  { name: "Deloitte", logo: "./images/deloittelogo.png", count: "816 Interviews" },
];
const roles = [
  { role: "Software Engineer", cnt: "7.2K+" },
  { role: "Business Analyst", cnt: "2.8K+" },
  { role: "Consultant", cnt: "2.4K+" },
  { role: "Financial Analyst", cnt: "894" },
  { role: "Sales & Marketing", cnt: "991" },
  { role: "Quality Engineer", cnt: "1.3K+" },
    { role: "Software Tester", cnt: "7.2K+" },
  { role: "Business Consultant", cnt: "2.8K+" },
];

const JobMaterial = () => (
  <section className="w-full bg-[#f6f9fe] py-14 px-3">
    <h3 className="text-4xl font-extrabold text-center text-[#19416a] mb-12 ">Prepare For Your Next Interview</h3>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left card with fade-in-left */}
<style>
  {`
    @keyframes float {
      0%   { transform: translateY(0); }
      50%  { transform: translateY(-12px); }
      100% { transform: translateY(0); }
    }
    .float-animation {
      animation: float 2.5s ease-in-out infinite;
    }
  `}
</style>
<div className="rounded-2xl p-7 flex flex-col items-center md:items-start h-full animate-fadeInLeft bg-transparent">
  <img
    src="./images/jobbg.jpeg"
    alt="Interview illustration"
    className="w-full max-w-[600px] mx-auto rounded-2xl shadow-2xl float-animation"
    style={{
      boxShadow: '0 8px 40px 0 rgba(40, 73, 165, 0.22)', // Optional soft shadow
    }}
  />
</div>

      {/* Middle card with fadeInUp and hover effects on logos */}
      <div className="bg-[#eaf2fb] rounded-3xl p-7 flex flex-col h-full animate-fadeInUp">
        <h3 className="text-lg font-semibold text-[#203255] mb-5 text-center">Interview Questions By Company</h3>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {companies.map((comp, index) => (
            <div
              key={comp.name}
              className="flex items-center gap-3 px-3 py-2 bg-white rounded-xl shadow-sm hover:bg-[#f2f7fe] hover:scale-105 transition-transform duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <img
                src={comp.logo}
                alt={comp.name}
                className="w-8 h-8 object-contain rounded transition-transform duration-300 hover:scale-110"
              />
              <div>
                <div className="font-semibold text-[#283a68] text-sm">{comp.name}</div>
                <div className="text-gray-500 text-xs">{comp.count}</div>
              </div>
            </div>
          ))}
        </div>
        <a href="#" className="text-[#2563eb] font-semibold text-sm hover:underline pl-1 mt-auto transition-colors duration-150">
          View all companies →
        </a>
      </div>

      {/* Right card with fadeInUp and smooth hover highlight on list */}
      <div className="bg-[#eaf2fb] rounded-3xl p-7 flex flex-col h-full animate-fadeInUp" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
        <h3 className="text-lg font-semibold text-[#203255] mb-5 text-center">Interview Questions By Role</h3>
        <ul className="mb-5">
          {roles.map((r, idx) => (
            <li
              key={r.role}
              className="flex justify-between py-1 text-[#25305d] font-medium text-base px-1 cursor-pointer hover:text-[#2563eb] hover:font-bold transition-colors duration-300"
              style={{ animationDelay: `${idx * 80}ms`, animationFillMode: 'forwards' }}
            >
              <span>{r.role}</span>
              <span className="text-[#7b8fbd] font-bold">({r.cnt})</span>
            </li>
          ))}
        </ul>
        <a href="#" className="text-[#2563eb] font-semibold text-sm hover:underline pl-1 mt-auto transition-colors duration-150">
          View all roles →
        </a>
      </div>
    </div>

    {/* Animation styles */}
    <style>{`
      @keyframes fadeInLeft {
        0% {
          opacity: 0;
          transform: translateX(-20px);
        }
        100% {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @keyframes fadeInUp {
        0% {
          opacity: 0;
          transform: translateY(20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fadeInLeft {
        animation: fadeInLeft 700ms ease forwards;
      }
      .animate-fadeInUp {
        animation: fadeInUp 700ms ease forwards;
      }
    `}</style>
  </section>
);

export default JobMaterial;
