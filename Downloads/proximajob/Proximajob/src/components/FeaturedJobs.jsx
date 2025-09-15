import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const featuredJobs = [
  {
    logo: "./images/amazonlogo.png",
    role: "Software Engineer",
    company: "Amazon",
    location: "Bangalore, India",
    salary: "₹10–15 LPA",
  },
  {
    logo: "./images/accenturelogo1.png",
    role: "Marketing Manager",
    company: "Accenture",
    location: "Mumbai, India",
    salary: "₹8–12 LPA",
  },
  {
    logo: "./images/tcslogo.png",
    role: "Data Scientist",
    company: "TCS",
    location: "Hyderabad, India",
    salary: "₹12–18 LPA",
  },
  {
    logo: "./images/cognizantlogo.png",
    role: "Software Engineer",
    company: "Cognizant",
    location: "Bangalore, India",
    salary: "₹10–15 LPA",
  },
  {
    logo: "./images/capegemini logo.png",
    role: "Marketing Manager",
    company: "Capgemini",
    location: "Mumbai, India",
    salary: "₹8–12 LPA",
  },
  {
    logo: "./images/flipkartlogo.jpeg",
    role: "Cloud Engineer",
    company: "Flipkart",
    location: "Redmond, USA",
    salary: "₹110K–₹140K",
  },
  {
    logo: "./images/wipro logo.png",
    role: "Frontend Developer",
    company: "Wipro",
    location: "Menlo Park, USA",
    salary: "₹90–115K",
  },
  {
    logo: "./images/deloittelogo.png",
    role: "Data Analyst",
    company: "Deloitte",
    location: "Sunnyvale, USA",
    salary: "₹85–₹105K",
  },
  /*{
    logo: "./images/microsoftlogo.png",
    role: "iOS Developer",
    company: "Microsoft",
    location: "Cupertino, USA",
    salary: "₹120–₹150K",
  }
*/
];
const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 6500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: 'linear',
  arrows: false,
  pauseOnHover: false,
  swipe: false,
  touchMove: false,
  responsive: [
    {
      breakpoint: 1100,
      settings: { slidesToShow: 2 }
    },
    {
      breakpoint: 700,
      settings: { slidesToShow: 1 }
    }
  ]
};

function FeaturedJobs() {
  return (
    <section className="bg-white py-16">
      <h2 className="text-4xl font-extrabold text-center text-[#19416a] mb-12">
        Featured Jobs
      </h2>
      <div className="max-w-7xl mx-auto px-4">
        <Slider {...sliderSettings}>
          {featuredJobs.map((job, idx) => (
            <div key={idx} className="px-3">
<div className="flex flex-col items-center bg-white rounded-3xl shadow-lg p-7 w-[280px] h-[320px] border border-gray-300">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-16 h-16 mb-4 object-contain"
                />
                <a href="#" className="text-blue-600 text-lg mb-2 hover:underline">{job.role}</a>
                <div className="font-bold text-center mb-1">Company: {job.company}</div>
                <div className="text-gray-600 text-center mb-1">
                  Location: {job.location}
                </div>
                <div className="text-gray-600 text-center mb-6">
                  Salary: {job.salary}
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full w-full transition-colors">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default FeaturedJobs;
