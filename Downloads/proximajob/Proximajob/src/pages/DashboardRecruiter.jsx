import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FiMoon,
  FiSun,
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiUsers,
  FiBriefcase,
  FiCheck,
  FiX,
} from "react-icons/fi";

const initialJobs = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    description: "Build and optimize performant React apps using modern tooling.",
    location: "Remote / Bangalore",
    salary: "₹18–28 LPA",
    status: "Active",
    applicants: [
      { id: "a1", name: "Ayesha Khan", skills: ["React", "TypeScript", "Redux"], shortlisted: true },
      { id: "a2", name: "Rohit Verma", skills: ["React", "Tailwind", "Jest"], shortlisted: false },
    ],
  },
  {
    id: 2,
    title: "Backend Developer (Node.js)",
    description: "Design APIs, microservices, and databases with Node & PostgreSQL.",
    location: "Hyderabad",
    salary: "₹14–22 LPA",
    status: "Active",
    applicants: [
      { id: "b1", name: "Sneha Iyer", skills: ["Node", "PostgreSQL", "Docker"], shortlisted: false },
    ],
  },
  {
    id: 3,
    title: "Product Designer",
    description: "Craft user-centric flows, wireframes, and delightful UI.",
    location: "Mumbai",
    salary: "₹12–18 LPA",
    status: "Closed",
    applicants: [],
  },
];

export default function DashboardRecruiter() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("jf4u_dark");
    return saved ? JSON.parse(saved) : false;
  });

  const [jobForm, setJobForm] = useState({
    id: null,
    title: "",
    description: "",
    location: "",
    salary: "",
    status: "Active",
  });

  const [jobs, setJobs] = useState(initialJobs);
  const [editingId, setEditingId] = useState(null);
  const [showApplicantsFor, setShowApplicantsFor] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("jf4u_dark", JSON.stringify(dark));
  }, [dark]);

  const stats = useMemo(() => {
    const total = jobs.length;
    const active = jobs.filter((j) => j.status === "Active").length;
    const applicants = jobs.reduce((acc, j) => acc + (j.applicants?.length || 0), 0);
    const shortlisted = jobs.reduce(
      (acc, j) => acc + (j.applicants?.filter((a) => a.shortlisted)?.length || 0),
      0
    );
    return { total, active, applicants, shortlisted };
  }, [jobs]);

  const applicantsTrendData = useMemo(() => {
    // Mock last 6 weeks applicants trend
    const weeks = ["W-5", "W-4", "W-3", "W-2", "W-1", "Now"];
    return weeks.map((w, i) => ({ week: w, applicants: Math.max(2, (stats.applicants % 8) + i + 1) }));
  }, [stats.applicants]);

  const rolesBarData = useMemo(() => {
    const counts = {};
    jobs.forEach((j) => {
      const key = j.title.split(" ")[0]; // rough role bucket
      counts[key] = (counts[key] || 0) + (j.applicants?.length || 0);
    });
    return Object.entries(counts).map(([role, count]) => ({ role, count }));
  }, [jobs]);

  const resetForm = () => {
    setJobForm({ id: null, title: "", description: "", location: "", salary: "", status: "Active" });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobForm.title.trim() || !jobForm.description.trim()) return alert("Please fill required fields.");

    if (editingId) {
      setJobs((prev) => prev.map((j) => (j.id === editingId ? { ...j, ...jobForm } : j)));
    } else {
      const nextId = jobs.length ? Math.max(...jobs.map((j) => j.id)) + 1 : 1;
      setJobs((prev) => [
        ...prev,
        { ...jobForm, id: nextId, applicants: [] },
      ]);
    }
    resetForm();
  };

  const startEdit = (job) => {
    setEditingId(job.id);
    setJobForm({ id: job.id, title: job.title, description: job.description, location: job.location, salary: job.salary, status: job.status });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

 const removeJob = (id) => {
  if (window.confirm("Delete this job?")) {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    if (showApplicantsFor?.id === id) setShowApplicantsFor(null);
  }
};


  const toggleStatus = (id) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: j.status === "Active" ? "Closed" : "Active" } : j))
    );
  };

  const toggleShortlist = (jobId, applicantId) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id !== jobId
          ? j
          : {
              ...j,
              applicants: j.applicants.map((a) =>
                a.id === applicantId ? { ...a, shortlisted: !a.shortlisted } : a
              ),
            }
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b1220] transition-colors">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-40 bg-white/90 dark:bg-[#0e1730]/80 backdrop-blur border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/JobsFind4U-logo.svg" alt="Jobsfin4u" className="h-14" />
            
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-gray-700 dark:text-gray-200">
            <Link to="/employers" className="hover:text-blue-600 dark:hover:text-blue-300">Home</Link>
            <Link to="/candidates" className="hover:text-blue-600 dark:hover:text-blue-300">Candidates</Link>
            <Link to="/support" className="hover:text-blue-600 dark:hover:text-blue-300">Support</Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle dark mode"
              className="p-2 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200"
            >
              {dark ? <FiSun /> : <FiMoon />}
            </button>
            <button className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-xl shadow hover:opacity-90">
              <FiPlus /> Post Job
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        {/* Stats */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Jobs" value={stats.total} icon={<FiBriefcase />} />
          <StatCard label="Active Jobs" value={stats.active} icon={<FiCheck />} />
          <StatCard label="Applicants" value={stats.applicants} icon={<FiUsers />} />
          <StatCard label="Shortlisted" value={stats.shortlisted} icon={<FiCheck />} tone="green" />
        </section>

        {/* Form + List */}
        <section className="grid lg:grid-cols-2 gap-8">
          {/* Job Form */}
          <div className="bg-white dark:bg-[#0f1a36] border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {editingId ? "Update Job" : "Post a New Job"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Job Title *"
                value={jobForm.title}
                onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                className="w-full border border-gray-200 dark:border-white/10 bg-white dark:bg-transparent rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Job Description *"
                rows={4}
                value={jobForm.description}
                onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                className="w-full border border-gray-200 dark:border-white/10 bg-white dark:bg-transparent rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Location"
                  value={jobForm.location}
                  onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                  className="border border-gray-200 dark:border-white/10 bg-white dark:bg-transparent rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Salary (Optional)"
                  value={jobForm.salary}
                  onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                  className="border border-gray-200 dark:border-white/10 bg-white dark:bg-transparent rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={jobForm.status}
                  onChange={(e) => setJobForm({ ...jobForm, status: e.target.value })}
                  className="border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0f1a36] rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Active</option>
                  <option>Closed</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2.5 rounded-xl shadow hover:opacity-90"
                >
                  {editingId ? <FiEdit2 /> : <FiPlus />}
                  {editingId ? "Update Job" : "Post Job"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Jobs List */}
          <div className="bg-white dark:bg-[#0f1a36] border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">My Posted Jobs</h2>
            {jobs.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-300">No jobs posted yet.</p>
            ) : (
              <ul className="space-y-4">
                {jobs.map((j) => (
                  <li key={j.id} className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0c1530]">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{j.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{j.description}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">📍 {j.location || "Not specified"} • 💰 {j.salary || "Negotiable"}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Applicants: {j.applicants?.length || 0}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full border ${
                          j.status === "Active"
                            ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-900"
                            : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-900"
                        }`}>
                          {j.status}
                        </span>
                        <button
                          onClick={() => toggleStatus(j.id)}
                          className="text-xs px-3 py-1 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10"
                        >
                          Toggle
                        </button>
                        <button
                          onClick={() => setShowApplicantsFor(j)}
                          className="text-xs px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        >
                          View Applicants
                        </button>
                        <button
                          onClick={() => startEdit(j)}
                          className="p-2 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => removeJob(j.id)}
                          className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-900/20"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Analytics */}
        <section className="mt-8 grid lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-[#0f1a36] border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Applicants Trend (Last 6 Weeks)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={applicantsTrendData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey="week" tick={{ fill: "currentColor" }} />
                  <YAxis allowDecimals={false} tick={{ fill: "currentColor" }} />
                  <Tooltip contentStyle={{ background: "#111827", color: "#fff", borderRadius: 12 }} />
                  <Line type="monotone" dataKey="applicants" stroke="currentColor" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0f1a36] border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Most Applied Roles</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rolesBarData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey="role" tick={{ fill: "currentColor" }} />
                  <YAxis allowDecimals={false} tick={{ fill: "currentColor" }} />
                  <Tooltip contentStyle={{ background: "#111827", color: "#fff", borderRadius: 12 }} />
                  <Bar dataKey="count" fill="currentColor" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </main>

      {/* Applicants Drawer */}
      {showApplicantsFor && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowApplicantsFor(null)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-[#0f1a36] border-l border-gray-200 dark:border-white/10 shadow-xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Applicants – {showApplicantsFor.title}
              </h4>
              <button
                onClick={() => setShowApplicantsFor(null)}
                className="p-2 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10"
                title="Close"
              >
                <FiX />
              </button>
            </div>

            {showApplicantsFor.applicants?.length ? (
              <ul className="space-y-3">
                {showApplicantsFor.applicants.map((a) => (
                  <li key={a.id} className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0c1530]">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{a.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Skills: {a.skills.join(", ")}</p>
                      </div>
                      <button
                        onClick={() => toggleShortlist(showApplicantsFor.id, a.id)}
                        className={`px-3 py-1 text-xs rounded-lg border ${
                          a.shortlisted
                            ? "bg-green-600 text-white border-green-700 hover:bg-green-700"
                            : "border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200"
                        }`}
                      >
                        {a.shortlisted ? "Shortlisted" : "Shortlist"}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 dark:text-gray-300">No applicants yet.</p>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#001f4d] text-white py-12 mt-auto border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 items-center">
          <div>
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-gray-300 text-sm mt-2">
              Subscribe to get the latest <span className="text-blue-300 font-medium">hiring insights</span>,
              <span className="text-blue-300 font-medium"> recruitment tips</span> and
              <span className="text-blue-300 font-medium"> platform updates</span>.
            </p>
          </div>
          <div>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your work email"
                className="w-full px-4 py-2 rounded-l-lg focus:outline-none text-gray-900"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:opacity-90 px-5 rounded-r-lg transition text-white font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div className="text-sm text-blue-100">
            <p className="opacity-80">© 2025 Proxima. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ label, value, icon, tone = "blue" }) {
  const toneMap = {
    blue: "text-blue-700 bg-blue-50 border-blue-100 dark:text-blue-200 dark:bg-blue-900/20 dark:border-blue-900",
    green: "text-green-700 bg-green-50 border-green-100 dark:text-green-200 dark:bg-green-900/20 dark:border-green-900",
  };
  return (
    <div className={`rounded-2xl border ${toneMap[tone]} p-4 flex items-center gap-3`}> 
      <div className="text-2xl">{icon}</div>
      <div>
        <p className="text-xs opacity-70">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
