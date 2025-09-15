const companies = [
  {
    logo: './imges/wipro logo.png',
    name: 'Wipro',
    rating: 4.0,
    reviews: '216',
    description: "Together let's pursue even better."
  },
  {
    logo: './images/tcslogo.png',
    name: 'Tata Consultancy Services',
    rating: 3.5,
    reviews: '101.1K+',
    description: "Explore challenging and exciting opportunities at TCS."
  },
  {
    logo: './images/flipkartlogo.jpeg',
    name: 'Flipkart',
    rating: 4.2,
    reviews: '27.2K+',
    description: "True 5G is here to unlock the limitless era."
  },
  {
    logo: './images/deloittelogo.png',
    name: 'Intellect Design Arena',
    rating: 3.9,
    reviews: '2.2K+',
    description: "World's largest, future-ready Enterprise FinTech Company."
  },
  {
    logo: '/logos/datatmatics.png',
    name: 'Datamatics',
    rating: 3.4,
    reviews: '1.8K+',
    description: "Global digital technology company."
  }
];

const FeaturedCompanies = () => (
  <section className="py-16 px-8 text-center">
    <h2 className="font-extrabold text-[#0c243c] text-[2.5rem] mb-8">
      Featured Companies Actively Hiring
    </h2>
    <div className="flex justify-center gap-8 flex-wrap mb-6">
      {companies.map((comp, i) => (
        <div key={comp.name} className="bg-white rounded-xl p-6 w-[220px] shadow-[0_4px_15px_rgba(32,86,225,0.15)] text-center">
          <img src={comp.logo} alt={comp.name} className="max-w-[80px] mx-auto mb-4" />
          <h3 className="font-bold mb-1">{comp.name}</h3>
          <p className="mb-2 font-semibold text-[#0c243c]">
            ★ {comp.rating} · {comp.reviews} reviews
          </p>
          <p className="mb-2 font-semibold text-[#0c243c]">{comp.description}</p>
          <button className="bg-[#d9e9ff] border-none rounded-[1.25rem] px-5 py-2 font-semibold cursor-pointer text-[#2056e1] transition hover:bg-[#c0d1fa]">
            View jobs
          </button>
        </div>
      ))}
    </div>
    <button className="border-[1.5px] border-[#2056e1] bg-transparent text-[#2056e1] px-6 py-3 rounded-[1.7rem] cursor-pointer font-bold text-[1rem] transition-colors hover:bg-[#2056e1] hover:text-white mt-3">
      View all companies
    </button>
  </section>
);

export default FeaturedCompanies;
