const JobCard = ({ logo, role, company, location, salary }) => (
  <div className="bg-white shadow-[0_4px_15px_rgba(32,86,225,0.2)] rounded-[1rem] p-6 max-w-[250px] text-center flex flex-col items-center">
    <img src={logo} alt={company} className="w-[60px] mb-4" />
    <div className="text-[#2056e1] mb-3">{role}</div>
    <div className="font-semibold">Company: {company}</div>
    <div className="text-[#555] mt-1">Location: {location}</div>
    <div className="text-[#555] mt-1">Salary: {salary}</div>
    <button className="mt-4 bg-[#2056e1] text-white rounded-[1.5rem] py-2 px-6 font-bold text-[1rem] cursor-pointer w-full transition-colors duration-300 hover:bg-[#0b40bb]">
      Apply
    </button>
  </div>
);

export default JobCard;
