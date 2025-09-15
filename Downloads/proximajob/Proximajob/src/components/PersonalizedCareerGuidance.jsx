import React from "react";

const PersonalizedCareerGuidance = () => (
  <section className="relative bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 py-20 overflow-hidden">
    {/* Decorative floating blobs */}
    <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-tr from-blue-500 via-indigo-600 to-purple-600 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-3000"></div>
    <div className="absolute bottom-16 left-4 w-72 h-72 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full filter blur-3xl opacity-25 animate-blob animation-delay-5000"></div>
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/90 to-transparent pointer-events-none"></div>

    <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-6 gap-12">
      {/* Left side: Text content with fade-in */}
      <div className="md:w-1/2 text-center md:text-left space-y-6 animate-fadeInUp" style={{ animationFillMode: "forwards", animationDuration: "1s" }}>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-[420px] mx-auto md:mx-0 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 drop-shadow-lg">
          Personalized Career Guidance <br /> <span className="text-purple-700 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700">Curated According to Your Resume</span>
        </h2>
        <p className="text-lg md:text-xl max-w-md mx-auto md:mx-0 text-gray-800 font-semibold tracking-wide leading-relaxed drop-shadow-sm">
          Get expert, AI-powered career recommendations tailored precisely to your resume.  
          Unlock new opportunities with data-driven insights and personalized plans that boost your growth.
        </p>
        <button className="mt-4 px-14 py-4 rounded-full bg-gradient-to-tr from-purple-700 to-blue-600 hover:from-pink-600 hover:to-purple-700 text-white font-extrabold shadow-lg transition-transform duration-300 active:scale-95 hover:shadow-pink-500/60">
          Get Your Guidance
        </button>
      </div>

      {/* Right side: Video placeholder with float animation */}
      <div className="md:w-1/2">
        <div className="w-full rounded-3xl shadow-2xl overflow-hidden animate-float max-h-[410px]">
          {/* Replace 'your-video.mp4' with actual video source */}
          <video
            src="./images/career.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            aria-label="Personalized Career Guidance"
          />
        </div>
      </div>
    </div>

    {/* Animations */}
    <style>{`
      @keyframes blob {
        0%, 100% { transform: translateY(0) translateX(0) scale(1);}
        33% { transform: translateY(-15px) translateX(10px) scale(1.05);}
        66% { transform: translateY(15px) translateX(-10px) scale(0.95);}
      }
      .animate-blob {
        animation: blob 7s infinite ease-in-out;
      }
      .animation-delay-3000 {
        animation-delay: 3s;
      }
      .animation-delay-5000 {
        animation-delay: 5s;
      }
      @keyframes fadeInUp {
        0% { opacity: 0; transform: translateY(20px);}
        100% { opacity: 1; transform: translateY(0);}
      }
      .animate-fadeInUp {
        animation-name: fadeInUp;
        animation-duration: 1s;
        animation-fill-mode: forwards;
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

export default PersonalizedCareerGuidance;
