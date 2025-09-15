import React from "react";
import { FaPhoneAlt, FaChartLine, FaHourglassHalf, FaTags, FaCheckCircle } from "react-icons/fa";

const features = [
  {
    icon: <FaPhoneAlt size={24} />,
    title: "Inbound & Outbound AI Calling",
    desc: "AI interviews all job applicants 24/7 & shortlists only the best candidates",
  },
  {
    icon: <FaChartLine size={24} />,
    title: "80% response rate with AI",
    desc: "Compared to just 30% call connection rate in manual hiring.",
  },
  {
    icon: <FaHourglassHalf size={24} />,
    title: "Reduce hiring time by 50%",
    desc: "AI does initial screening & shortlisting of candidates for final interview",
  },
  {
    icon: <FaTags size={24} />,
    title: "Cost-Effective Feature",
    desc: "Amazing offers for recruiters to hire smarter and save budget",
  },
  {
    icon: <FaCheckCircle size={24} />,
    title: "Reliable Candidate Matching",
    desc: "AI matches candidates precisely based on skills and job requirements",
  },
];

const AIAgentFeatures = () => (
  <section className="w-full bg-white rounded-3xl py-8 px-4">
    <h2 className="text-4xl font-extrabold text-center text-[#19416a] mb-12">
      WHY USE OUR AI CALLING AGENT ?
    </h2>
    <div className="max-w-7xl mx-auto flex flex-row justify-center items-stretch gap-4 px-2 overflow-x-auto">
      {features.map((feat, idx) => (
        <div
          key={idx}
          className="
            flex flex-col items-center bg-white border border-blue-200 rounded-2xl
            px-4 py-6 w-[200px] min-h-[150px] shadow
            transition-all duration-200
            hover:-translate-y-2 hover:shadow-xl hover:border-blue-400
            hover:bg-gradient-to-br hover:from-[#e4f6ff] hover:to-[#fafdff]
            cursor-pointer
            flex-shrink-0
          "
        >
          <div className="mb-2 text-blue-600 transition-colors duration-150">
            {feat.icon}
          </div>
          <div className="font-bold text-[1rem] text-[#2366ae] mb-2 text-center transition-colors duration-150">
            {feat.title}
          </div>
          <div className="text-[#4978b6] text-[0.9rem] text-center">
            {feat.desc}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default AIAgentFeatures;
