import React from "react";
import { FaMicrophone, FaVolumeUp, FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp, FaPhone, FaEnvelope } from "react-icons/fa";


const AIAgent = () => (
  <section className="bg-gradient-to-br from-[#e4f1f9] via-[#cee4ef] to-[#f9f9fa] py-16 px-4">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-10">
      {/* Left side: Info */}
      <div className="lg:w-1/2 w-full flex flex-col gap-6 px-4">
        <h2 className="flex items-center gap-2 text-[1.95rem] md:text-[2.3rem] font-extrabold text-[#2056e1] mb-3">
          <FaPhoneAlt className="inline text-[#2056e1] mb-1" />
          For Recruiters <br></br>AI Calling Agent Interviews and Shortlists Candidates 24/7
        </h2>

<ul className="mb-4 max-w-xl mx-auto space-y-3 text-[#24355c]">
  <li className="font-semibold text-[1.25rem] leading-snug text-[#18345a]">
    Post a Premium Job with AI Calling Agent
  </li>
  <li className="font-medium text-lg leading-relaxed text-[#204183]">
    AI agent calls candidates on your behalf <span className="font-bold text-[#2563eb]">24/7.</span>
  </li>
  <li className="text-lg leading-relaxed">
    Follows up 5 times via:
    <div className="flex flex-col gap-2 mt-2 text-[#24355c]">
      <div className="flex items-center gap-2">
        <FaWhatsapp className="text-[#25d366] w-6 h-6" aria-label="WhatsApp" />
        <span>WhatsApp</span>
      </div>
      <div className="flex items-center gap-2">
        <FaPhone className="text-[#25d366] w-6 h-6" aria-label="Calling" />
        <span>Calling</span>
      </div>
      <div className="flex items-center gap-2">
        <FaEnvelope className="text-[#2563eb] w-6 h-6" aria-label="Email" />
        <span>Email</span>
      </div>
    </div>
    <span>Even after work hours.</span>
  </li>
  <li className="text-xl font-bold mt-6 mb-4 leading-snug text-[#1f4162]">
    Gives you a ready shortlist of top candidates
  </li>
</ul>


      <button className="bg-[#2196f3] hover:bg-blue-700 transition text-white text-lg font-bold rounded-lg px-7 py-3 w-fit shadow mt-2 mx-auto block">
  Post a job now
</button>

      </div>

      {/* Right side: Call Simulation */}
      <div className="bg-gradient-to-br from-[#eaf4fd] via-[#b3d8fa] to-[#c7eaff] rounded-3xl w-full lg:w-[490px] p-8 flex flex-col items-center shadow-xl">
        <div className="flex justify-between w-full mb-7 items-center">
        </div>
        <div className="flex items-center justify-center gap-10 mb-8 w-full">
          <div className="flex flex-col items-center gap-2">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#22c5ff] via-[#b2c3fd] to-[#e5f9ff] flex items-center justify-center shadow-lg overflow-hidden">
              <img
                src="./images/agent.png"
                alt="AI Agent"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-[#2062d9] font-bold text-base mt-2">AI Calling Agent</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-32 h-32 rounded-xl bg-gradient-to-tr from-[#aae3fa] via-[#dedcff] to-[#e7fafe] flex items-center justify-center shadow-lg overflow-hidden">
              <img
                src="./images/candidate1.png"
                alt="Candidate"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-[#254189] font-bold text-base mt-2">Candidate</div>
          </div>
        </div>
        <div className="flex justify-between w-full text-[#1f4173] font-semibold text-base mb-5 px-2">
          <span>00:08</span>
          <span className="flex items-center gap-2">
            <FaMicrophone className="inline mr-1" />
            Mute
          </span>
          <span className="flex items-center gap-2">
            <FaVolumeUp className="inline mr-1" />
            Speaker
          </span>
        </div>
        <button className="bg-[#fa4545] hover:bg-[#d32f2f] transition text-white font-bold px-6 py-2 mt-1 rounded-full shadow">
          End Call
        </button>
      </div>
    </div>
  </section>
);

export default AIAgent;
