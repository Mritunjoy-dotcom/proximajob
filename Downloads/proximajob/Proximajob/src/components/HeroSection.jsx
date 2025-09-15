import React from "react";
import Select from "react-select";

// Replace with your GIF or video URL
//const HERO_BG = "./images/download.gif"
//const HERO_BG = "./images/STAR.gif"
//const HERO_BG = ""
const HERO_BG = "./images/starry.mp4"
const experienceOptions = [
  { value: "", label: "Select experience", isDisabled: true },
  { value: "fresher", label: "Fresher" },
  { value: "1plus", label: "1+ year" },
  { value: "2plus", label: "2+ years" },
  { value: "5plus", label: "5+ years" },
];
const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: "2rem",
    backgroundColor: "#f4f6f8",
    minHeight: "48px",
    fontSize: "1.07rem",
    border: "none",
    boxShadow: "none",
    marginRight: "1rem",
    paddingLeft: "0.8rem",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? "#aaa" : "#132c34",
    backgroundColor: state.isSelected ? "#bae6fd" : "#fff",
    fontSize: "1.06rem",
    cursor: state.isDisabled ? "not-allowed" : "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#14447d",
    fontWeight: 600,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#bbb",
    fontWeight: 500,
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "1.5rem",
    boxShadow: "0 4px 22px rgba(60, 90, 140, 0.13)",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    paddingRight: "0.5rem",
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: 170,
    overflowY: "auto",
  }),
};

const HeroSection = () => (
  <section
    className="relative min-h-[480px] flex items-center justify-center overflow-hidden"
    style={{ background: "linear-gradient(130deg,#178ca2 70%,#b2e3ff 100%)" }}
  >
{/* BACKGROUND VIDEO */}
<div className="absolute inset-0 z-0 overflow-hidden">
  <video
    src={HERO_BG}
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover opacity-100"
  />
  <div className="absolute inset-0 bg-cyan-900/40"></div>
</div>


    {/* CONTENT GLASS */}
    <div className="relative z-10 w-full flex flex-col items-center max-w-4xl px-4 py-16">
      {/* HUGE animated heading */}
<h1
  className="text-5xl md:text-6xl font-black mb-4 leading-tight text-center"
  style={{
    color: '#fff',                      // Plain white text
    WebkitTextStroke: '1.5px #111',     // Thin black stroke
    textStroke: '1.5px #111',           // For some non-webkit browsers
    letterSpacing: '1px',
    fontFamily: 'Segoe UI, Arial, sans-serif' // Clean, professional sans-serif font
  }}
>
  Find your <span style={{ color: '#fff' }}>Dream Job</span> with Us
</h1>
      <p className="text-xl md:text-2xl font-semibold text-white/90 mb-6 text-center tracking-wide drop-shadow">
        <span className="text-[#bbd9c2] font-black mr-2">5 lakh+</span>
        jobs for you to explore!
      </p>
      {/* FROSTED/FLOATING SEARCH BAR */}
      <form
        className="w-[97%] max-w-[790px] mx-auto flex flex-col md:flex-row items-center justify-center gap-4 bg-white/75 shadow-[0_7px_38px_0_rgba(27,78,135,0.08)] backdrop-blur-[5px] rounded-2xl px-4 py-5"
        style={{
          border: "1.7px solid #e8f0fb",
        }}
        onSubmit={(e) => { e.preventDefault(); /* hook up your search logic */ }}
      >
        <input
          type="text"
          placeholder="Job Title or Keyword"
          className="flex-1 py-3 px-5 rounded-full text-lg shadow-sm outline-none border-none bg-[#f4f8fa] text-[#13458a] font-semibold focus:ring-2 focus:ring-[#36c9fa]"
          required
        />
        <div className="flex-1 min-w-[200px]">
          <Select
            options={experienceOptions}
            styles={customSelectStyles}
            isOptionDisabled={option => option.isDisabled}
            placeholder="Experience"
          />
        </div>
        <button
          type="submit"
          className="rounded-full px-8 py-3 min-w-[130px] font-bold shadow-lg bg-gradient-to-tr from-[#29cff2] via-[#4775ed] to-[#24eaff] text-white text-lg transition-all
          hover:brightness-110 hover:shadow-2xl self-stretch"
          style={{
            letterSpacing: "0.03em",
            boxShadow: "0 2px 24px 0 rgba(44,138,246,0.10)",
          }}
        >
          Search
        </button>
      </form>
    </div>
  </section>
);

export default HeroSection;
