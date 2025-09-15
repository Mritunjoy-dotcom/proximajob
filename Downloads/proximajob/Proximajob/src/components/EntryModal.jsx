import React from "react";
import { useNavigate } from "react-router-dom";

function EntryModal({ onClose }) {
  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
    onClose(); // Modal close after navigation
  };

  return (
    <div className="fixed inset-0 bg-[rgba(30,41,59,0.51)] backdrop-blur-[3.5px] flex items-center justify-center z-[3000] font-sans">
      <div className="bg-gradient-to-br from-[#80a5e0] via-[#395c86] to-[#84b8ca] rounded-3xl shadow-2xl px-14 py-10 w-[550px] max-w-[97vw] flex flex-col items-center relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-7 text-2xl text-white bg-transparent border-none cursor-pointer z-10 leading-none hover:text-red-300"
        >
          &times;
        </button>

        {/* Heading */}
        <h2 className="text-white font-extrabold text-2xl text-center mb-2 tracking-wide drop-shadow">
          WELCOME TO OUR JOB PORTAL
        </h2>
        <div className="text-white font-bold text-2xl mb-7 text-center drop-shadow">
          Who are you ?
        </div>

        {/* Cards Row */}
        <div className="flex gap-14 w-full justify-center mb-1">
          
          {/* Job Seeker Card */}
          <div
            className="flex flex-col items-center entry-modal-card-group cursor-pointer"
            onClick={() => goToPage("/register/jobseeker")}
          >
            <div
              className="
                bg-white rounded-xl flex items-center justify-center shadow-lg w-[110px] h-[110px]
                transition duration-300 hover:scale-110 hover:shadow-[0_0_25px_#4f9dff] hover:ring-4 hover:ring-[#4f9dff]/50
              "
            >
              <img
                src="./images/jobseeker.jpeg"
                alt="Job Seeker"
                className="w-full h-full object-contain rounded-md"
              />
            </div>
            <div className="mt-4 text-[#efeff1] font-bold text-lg tracking-wide">Job Seeker</div>
            <div className="text-[#f3f3f5] text-[15px] font-medium opacity-90">Seeking Job</div>
          </div>

          {/* Recruiter Card */}
          <div
            className="flex flex-col items-center entry-modal-card-group cursor-pointer"
            onClick={() => goToPage("/employers")}
          >
            <div
              className="
                bg-white rounded-xl flex items-center justify-center shadow-lg w-[110px] h-[110px]
                transition duration-300 hover:scale-110 hover:shadow-[0_0_25px_#4f9dff] hover:ring-4 hover:ring-[#4f9dff]/50
              "
            >
              <img
                src="./images/recruiter.jpeg"
                alt="Recruiter"
                className="w-full h-full object-contain rounded-md"
              />
            </div>
            <div className="mt-4 text-[#f6f7f9] font-bold text-lg tracking-wide">Recruiter</div>
            <div className="text-[#f4f4f6] text-[15px] font-medium opacity-90">Hire Talent</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntryModal;
