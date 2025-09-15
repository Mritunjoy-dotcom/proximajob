import React from "react";

const AIResumeBuilder = () => (
  <section className="relative bg-gradient-to-br from-indigo-100 via-blue-100 to-cyan-100 py-20 overflow-hidden">
    {/* Decorative abstract shapes */}
    <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-400 to-purple-400 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full filter blur-3xl opacity-25 animate-blob"></div>
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent pointer-events-none"></div>

    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-12">
      {/* Left column with animated image */}
      <div className="md:w-1/2 relative flex justify-center items-center">
        <div className="w-[340px] h-[420px] rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-700 hover:scale-105 animate-float">
          <img
            src="./images/Resume builder.png"
            alt="AI Resume Builder Illustration"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* Right column with clear, sharp text */}
      <div className="md:w-1/2 space-y-6 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-[390px] mx-auto md:mx-0 bg-clip-text text-transparent bg-gradient-to-r from-[#7647ea] via-[#328eea] to-[#25c2f8] drop-shadow-md">
          Build Your <span className="text-indigo-600 bg-clip-text text-transparent bg-gradient-to-r from-[#af51fa] via-[#328eea] to-[#25c2f8]">AI-Powered</span> Resume Effortlessly
        </h2>
        <p className="text-lg md:text-xl max-w-md mx-auto md:mx-0 text-[#22346a] font-medium tracking-wide leading-relaxed drop-shadow-sm">
          Transform your career prospects with our <span className="font-semibold text-[#293e6a]">AI Resume Builder</span>. Tailor stunning resumes packed with keywords to pass any ATS screening, crafted in minutes using smart automation.
        </p>
        <button className="mt-4 inline-block bg-gradient-to-r from-[#6743d2] via-[#4574da] to-[#5dc8ca] hover:from-[#5283ea] hover:to-[#7452d8] active:scale-95 text-white font-bold px-12 py-4 rounded-full shadow-lg transition-transform duration-300 text-lg">
          Create Your Resume Now
        </button>
      </div>
    </div>

    {/* Animations definition */}
    <style>{`
      @keyframes blob {
        0%, 100% { transform: translateY(0) translateX(0) scale(1);}
        33% { transform: translateY(-15px) translateX(10px) scale(1.05);}
        66% { transform: translateY(15px) translateX(-10px) scale(0.95);}
      }
      .animate-blob {
        animation: blob 7s infinite ease-in-out;
      }
      .animation-delay-2000 {
        animation-delay: 2s;
      }
      .animate-float {
        animation: float 6s infinite ease-in-out;
      }
      @keyframes float {
        0%, 100% { transform: translateY(0);}
        50% { transform: translateY(-15px);}
      }
    `}</style>
  </section>
);

export default AIResumeBuilder;
