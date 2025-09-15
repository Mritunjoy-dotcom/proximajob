import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Recruiter new job form
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    category: "",
    type: "",
    mode: "",
    experience: "",
    logo: "https://via.placeholder.com/60",
  });

  // Fetch jobs from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("❌ API Error:", err));
  }, []);

  // Handle new job post
  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/jobs", newJob);
      setJobs([res.data, ...jobs]); // Add new job to top
      setNewJob({
        title: "",
        company: "",
        location: "",
        salary: "",
        category: "",
        type: "",
        mode: "",
        experience: "",
        logo: "https://via.placeholder.com/60",
      });
      setShowForm(false);
    } catch (err) {
      alert("Failed to post job!");
    }
  };

  const categories = ["IT & Software", "Marketing", "Design", "Sales", "Finance", "Healthcare"];
  const jobTypes = ["Full-time", "Part-time", "Remote", "Internship"];
  const experienceLevels = ["Fresher", "1-3 years", "3-5 years", "5+ years"];
  const workModes = ["Onsite", "Remote", "Hybrid"];

  const filteredJobs = jobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLocation = location.trim() === "" || job.location.toLowerCase().includes(location.toLowerCase());
    const matchCategory = category === "" || job.category === category;
    return matchSearch && matchLocation && matchCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <img src="/image/logo.png" alt="Proxima Skills Logo" className="h-10 w-auto" />
          <nav className="flex space-x-8 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/jobs" className="text-blue-600 font-semibold">Jobs</Link>
            <Link to="/employers" className="hover:text-blue-600">For Employers</Link>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              + Post a Job
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content with flex-grow */}
      <main className="flex-grow mt-16">
        {/* Recruiter Job Post Form */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              >
                ✖
              </button>
              <h2 className="text-xl font-bold mb-4 text-blue-900">Post a New Job</h2>
              <form onSubmit={handlePostJob} className="space-y-4">
                <input
                  type="text"
                  placeholder="Job Title *"
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Company Name *"
                  value={newJob.company}
                  onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Location *"
                  value={newJob.location}
                  onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Salary"
                  value={newJob.salary}
                  onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <select
                  value={newJob.category}
                  onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}
                  className="w-full border px-3 py-2 rounded-lg"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <select
                  value={newJob.type}
                  onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                  className="w-full border px-3 py-2 rounded-lg"
                >
                  <option value="">Job Type</option>
                  {jobTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <select
                  value={newJob.mode}
                  onChange={(e) => setNewJob({ ...newJob, mode: e.target.value })}
                  className="w-full border px-3 py-2 rounded-lg"
                >
                  <option value="">Work Mode</option>
                  {workModes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <select
                  value={newJob.experience}
                  onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
                  className="w-full border px-3 py-2 rounded-lg"
                >
                  <option value="">Experience Level</option>
                  {experienceLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Post Job
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Job Search Section */}
        <section className="bg-[#001f4d] py-8 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Job title or keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border"
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Job Listings */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border flex gap-5 items-start mb-6"
              >
                <img src={job.logo} alt={job.company} className="rounded-lg h-16 w-16 border" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-900">{job.title}</h3>
                  <p className="text-gray-600">{job.company} • {job.location}</p>
                  <p className="text-green-600 font-medium mt-1">{job.salary}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {job.type && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">{job.type}</span>
                    )}
                    {job.category && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">{job.category}</span>
                    )}
                    {job.experience && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-600 text-xs font-medium rounded-full">{job.experience}</span>
                    )}
                    {job.mode && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-600 text-xs font-medium rounded-full">{job.mode}</span>
                    )}
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow-md font-medium">
                  Apply
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-10">No jobs found. Try adjusting filters.</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#001f4d] text-white py-6 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          <p>© 2025 Proxima Skills. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default JobsPage;

