// src/pages/DashboardJobSeeker.jsx — Professional Full Dashboard (Complete)
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import {
  FaBell,
  FaCheckCircle,
  FaClipboardList,
  FaDownload,
  FaExternalLinkAlt,
  FaFileAlt,
  FaGithub,
  FaLinkedin,
  FaPlus,
  FaSearch,
  FaTrash,
  FaUser,
  FaChartPie,
  FaStar,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

// PDF worker setup
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const STATUSES = ["Applied", "Interview", "Offer", "Hired", "Rejected"];
const PIE_COLORS = ["#3b82f6", "#f59e0b", "#8b5cf6", "#22c55e", "#ef4444"]; // blue, amber, violet, green, red

function SectionCard({ title, children, right }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        {right}
      </div>
      {children}
    </div>
  );
}

function StatBadge({ status }) {
  const map = {
    Applied: "bg-blue-100 text-blue-700",
    Interview: "bg-amber-100 text-amber-700",
    Offer: "bg-violet-100 text-violet-700",
    Hired: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}

function CircularProgress({ value = 0, size = 140, stroke = 12 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg width={size} height={size} className="block">
      <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} className="text-gray-200" stroke="currentColor" fill="transparent" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke}
        strokeLinecap="round"
        className={value >= 70 ? "text-green-500" : value >= 40 ? "text-amber-500" : "text-red-500"}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        stroke="currentColor"
        fill="transparent"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="font-bold" fontSize={size * 0.2}>
        {value}%
      </text>
    </svg>
  );
}

export default function DashboardJobSeeker() {
  // ----------------- Nav -----------------
  const [active, setActive] = useState("profile");

  // ----------------- Profile -----------------
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@email.com",
    skills: "React, Node.js, TailwindCSS",
    headline: "Frontend Developer",
    avatarUrl: "",
    linkedin: "",
    github: "",
    location: "Kolkata, IN",
  });
  const [isEditing, setIsEditing] = useState(false);

  // ----------------- Resume + ATS -----------------
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [score, setScore] = useState(null);
  const [missingKeywords, setMissingKeywords] = useState([]);
  const [matchedKeywords, setMatchedKeywords] = useState([]);

  // ----------------- Jobs -----------------
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    url: "",
    salary: "",
    status: "Applied",
    dateApplied: new Date().toISOString().slice(0, 10),
    notes: "",
    reminder: "",
  });

  // ----------------- Notifications -----------------
  const [notifications, setNotifications] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const bellRef = useRef(null);

  const addNotification = (message, type = "info") => {
    const item = { id: Date.now(), type, message, read: false, time: new Date().toLocaleString() };
    setNotifications((prev) => [item, ...prev].slice(0, 40));
  };
  const unreadCount = notifications.filter((n) => !n.read).length;
  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const clearNotifications = () => setNotifications([]);

  // Close notif dropdown on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (notifOpen && bellRef.current && !bellRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [notifOpen]);

  // ----------------- Persistence -----------------
  useEffect(() => {
    try {
      const p = localStorage.getItem("jf4u_profile");
      const r = localStorage.getItem("jf4u_resume");
      const j = localStorage.getItem("jf4u_jobs");
      const n = localStorage.getItem("jf4u_notifications");
      if (p) setProfile(JSON.parse(p));
      if (r) setResumeText(r);
      if (j) setJobs(JSON.parse(j));
      if (n) setNotifications(JSON.parse(n));
    } catch (e) {
      console.warn("Failed to load from localStorage", e);
    }
  }, []);
  useEffect(() => {
    try { localStorage.setItem("jf4u_profile", JSON.stringify(profile)); } catch {}
  }, [profile]);
  useEffect(() => {
    try { localStorage.setItem("jf4u_resume", resumeText); } catch {}
  }, [resumeText]);
  useEffect(() => {
    try { localStorage.setItem("jf4u_jobs", JSON.stringify(jobs)); } catch {}
  }, [jobs]);
  useEffect(() => {
    try { localStorage.setItem("jf4u_notifications", JSON.stringify(notifications)); } catch {}
  }, [notifications]);

  // ----------------- Derived -----------------
  const profileCompletion = useMemo(() => {
    const fields = ["name", "email", "skills", "headline", "avatarUrl"];
    const filled = fields.filter((k) => String(profile[k] || "").trim().length > 0).length;
    return Math.round((filled / fields.length) * 100);
  }, [profile]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const okStatus = statusFilter === "All" || j.status === statusFilter;
      const q = search.trim().toLowerCase();
      const okSearch =
        !q || [j.title, j.company, j.location, j.notes].filter(Boolean).some((v) => String(v).toLowerCase().includes(q));
      return okStatus && okSearch;
    });
  }, [jobs, statusFilter, search]);

  // ----------------- ATS -----------------
  const normalizeWords = (text) =>
    text
      .toLowerCase()
      .replace(/\n/g, " ")
      .replace(/[^a-z0-9+#. ]/g, " ")
      .split(/\s+/)
      .filter(Boolean);

  const uniqueKeywords = (text) => {
    const stop = new Set(["and", "or", "the", "a", "an", "to", "for", "of", "in", "on", "with", "is", "are", "as", "by", "at", "from", "this", "that", "be", "you", "your", "we", "our"]);
    const words = normalizeWords(text);
    return Array.from(new Set(words.filter((w) => w.length > 2 && !stop.has(w)))).map((w) => w.trim());
  };

  const checkATSScore = () => {
    if (!resumeText || !jobDescription) {
      alert("Please upload resume and paste job description.");
      return;
    }
    const resumeWords = uniqueKeywords(resumeText);
    const jdWords = uniqueKeywords(jobDescription);
    const resSet = new Set(resumeWords);
    const matched = jdWords.filter((w) => resSet.has(w));
    const missing = jdWords.filter((w) => !resSet.has(w));
    const percentage = Math.round((matched.length / Math.max(jdWords.length, 1)) * 100);
    setScore(percentage);
    setMissingKeywords(missing.slice(0, 40));
    setMatchedKeywords(matched.slice(0, 40));
    addNotification(`ATS checked: ${percentage}% match`, percentage >= 70 ? "success" : percentage >= 40 ? "warn" : "info");
  };

  // ----------------- Resume Upload -----------------
  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (event) => setResumeText(String(event.target?.result || ""));
      reader.readAsText(file);
    } else if (file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = async function () {
        const typedArray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          content.items.forEach((s) => {
            text += s.str + " ";
          });
        }
        setResumeText(text);
        addNotification("Resume parsed successfully", "success");
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Please upload only TXT or PDF files.");
    }
  };

  // ----------------- Profile Photo Upload -----------------
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setProfile((prev) => ({ ...prev, avatarUrl: String(reader.result) }));
    reader.readAsDataURL(file);
    addNotification("Profile photo updated", "success");
  };

  // ----------------- Jobs CRUD -----------------
  const handleAddJob = (e) => {
    e.preventDefault();
    if (!newJob.title || !newJob.company) return;
    const item = { ...newJob, id: Date.now() };
    setJobs((prev) => [item, ...prev]);
    setNewJob({ title: "", company: "", location: "", url: "", salary: "", status: "Applied", dateApplied: new Date().toISOString().slice(0, 10), notes: "", reminder: "" });
    addNotification(`Job added: ${item.title} @ ${item.company}`, "success");
  };
  const updateJob = (id, patch) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...patch } : j)));
  };
  const deleteJob = (id) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    addNotification("Job removed", "warn");
  };

  const exportCSV = () => {
    const headers = ["title","company","location","url","salary","status","dateApplied","notes","reminder"];
    const rows = [headers.join(",")].concat(
      jobs.map((j) => headers.map((h) => `"${String(j[h] ?? "").replace(/"/g, '"')}"`).join(","))
    );
    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "jobs.csv";
    link.click();
  };

  // ----------------- Analytics -----------------
  const pieData = useMemo(() => {
    const counts = STATUSES.reduce((acc, s) => ({ ...acc, [s]: 0 }), {});
    jobs.forEach((j) => {
      counts[j.status] = (counts[j.status] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [jobs]);

  const weeklySeries = useMemo(() => {
    const weeks = {};
    jobs.forEach((j) => {
      const d = new Date(j.dateApplied || Date.now());
      const day = (d.getDay() + 6) % 7; // Mon..Sun
      const monday = new Date(d);
      monday.setDate(d.getDate() - day);
      monday.setHours(0, 0, 0, 0);
      const key = monday.toISOString().slice(0, 10);
      weeks[key] = (weeks[key] || 0) + 1;
    });
    return Object.entries(weeks)
      .map(([week, applications]) => ({ week, applications }))
      .sort((a, b) => new Date(a.week) - new Date(b.week))
      .slice(-12);
  }, [jobs]);

  // ----------------- Reviews (simple) -----------------
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ company: "", rating: 5, comment: "" });
  const addReview = (e) => {
    e.preventDefault();
    if (!newReview.company || !newReview.comment) return;
    setReviews((prev) => [{ id: Date.now(), ...newReview }, ...prev]);
    setNewReview({ company: "", rating: 5, comment: "" });
    addNotification("Review added", "success");
  };
  const deleteReview = (id) => setReviews((prev) => prev.filter((r) => r.id !== id));

  // ----------------- UI -----------------
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
<header className="bg-white/80 backdrop-blur border-b fixed top-0 left-0 w-full z-50">
  <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
    {/* Logo + Home */}
    <div className="flex items-center gap-6">
      <img src="/images/JobsFind4U-logo.svg" alt="Logo" className="h-12" />
      <a href="/" className="text-gray-700 font-medium hover:text-blue-600 transition">
        Home
      </a>
    </div>

    <div className="flex items-center gap-4">
      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-2">
        <FaSearch className="text-gray-500" />
        <input
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none py-2"
        />
      </div>

      {/* Notifications */}
      <div className="relative" ref={bellRef}>
        <button
          onClick={() => setNotifOpen((v) => !v)}
          className="relative p-2 rounded-full hover:bg-gray-100"
        >
          <FaBell className="text-xl" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
        {notifOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b">
              <span className="font-medium">Notifications</span>
              <div className="flex gap-2">
                <button
                  onClick={markAllRead}
                  className="text-xs px-2 py-1 rounded bg-gray-100"
                >
                  Mark all read
                </button>
                <button
                  onClick={clearNotifications}
                  className="text-xs px-2 py-1 rounded bg-red-100 text-red-700"
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="max-h-80 overflow-auto">
              {notifications.length === 0 ? (
                <p className="p-3 text-sm text-gray-500">No notifications yet.</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-3 py-2 text-sm border-b ${
                      n.read ? "bg-white" : "bg-blue-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{n.message}</span>
                      <span className="text-[11px] text-gray-500">{n.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* User mini card */}
      <div className="flex items-center gap-2">
        <img
          src={profile.avatarUrl || "https://i.pravatar.cc/60"}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="hidden md:block">
          <p className="text-sm font-medium leading-none">{profile.name}</p>
          <p className="text-xs text-gray-500">{profile.email}</p>
        </div>
      </div>
    </div>
  </div>
</header>

<div className="flex-1 flex flex-col md:flex-row mt-20">

        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-blue-700 text-white p-6 space-y-2 md:sticky md:top-20 h-max">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          {[
            { key: "profile", label: "Profile", icon: <FaUser /> },
            { key: "resume", label: "Resume", icon: <FaFileAlt /> },
            { key: "ats", label: "ATS Checker", icon: <FaCheckCircle /> },
            { key: "jobs", label: "Job Tracking", icon: <FaClipboardList /> },
            { key: "analytics", label: "Analytics", icon: <FaChartPie /> },
            { key: "reviews", label: "Reviews", icon: <FaStar /> },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition text-left ${active === item.key ? "bg-white text-blue-700" : "hover:bg-blue-600"}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 md:p-8 space-y-8">
          {/* PROFILE */}
          {active === "profile" && (
            <SectionCard
              title="Profile"
              right={
                isEditing ? (
                  <button onClick={() => setIsEditing(false)} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Save</button>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Edit Profile</button>
                )
              }
            >
              <div className="grid md:grid-cols-3 gap-6">
                <div className="col-span-1 flex flex-col items-center text-center">
                  <img src={profile.avatarUrl || "https://i.pravatar.cc/150"} alt="Avatar" className="w-28 h-28 rounded-full object-cover shadow" />
                  <label className="mt-3 inline-block">
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    <span className="cursor-pointer bg-gray-800 text-white text-sm px-3 py-1 rounded">Upload Photo</span>
                  </label>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div className="h-2 rounded-full bg-blue-600" style={{ width: `${profileCompletion}%` }}></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Profile completion: {profileCompletion}%</p>
                </div>

                <div className="col-span-2 space-y-3">
                  {isEditing ? (
                    <>
                      <div className="grid md:grid-cols-2 gap-3">
                        <input name="name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Full Name" className="border w-full p-3 rounded" />
                        <input name="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} placeholder="Email" type="email" className="border w-full p-3 rounded" />
                        <input name="headline" value={profile.headline} onChange={(e) => setProfile({ ...profile, headline: e.target.value })} placeholder="Headline e.g. Frontend Developer" className="border w-full p-3 rounded" />
                        <input name="location" value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} placeholder="Location" className="border w-full p-3 rounded" />
                      </div>
                      <input name="linkedin" value={profile.linkedin} onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })} placeholder="LinkedIn URL" className="border w-full p-3 rounded" />
                      <input name="github" value={profile.github} onChange={(e) => setProfile({ ...profile, github: e.target.value })} placeholder="GitHub URL" className="border w-full p-3 rounded" />
                      <textarea name="skills" value={profile.skills} onChange={(e) => setProfile({ ...profile, skills: e.target.value })} placeholder="Skills (comma separated)" rows={3} className="border w-full p-3 rounded" />
                    </>
                  ) : (
                    <div className="space-y-1">
                      <p><strong>Name:</strong> {profile.name}</p>
                      <p><strong>Email:</strong> {profile.email}</p>
                      <p><strong>Headline:</strong> {profile.headline}</p>
                      <p><strong>Location:</strong> {profile.location || "—"}</p>
                      <p><strong>Skills:</strong> {profile.skills}</p>
                      <div className="flex gap-3 pt-2">
                        {profile.linkedin && (
                          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">
                            <FaLinkedin /> LinkedIn <FaExternalLinkAlt />
                          </a>
                        )}
                        {profile.github && (
                          <a href={profile.github} target="_blank" rel="noreferrer" className="text-gray-800 hover:underline inline-flex items-center gap-1">
                            <FaGithub /> GitHub <FaExternalLinkAlt />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </SectionCard>
          )}

          {/* RESUME */}
          {active === "resume" && (
            <SectionCard
              title="Resume"
              right={resumeText ? (
                <button onClick={() => {
                  const blob = new Blob([resumeText], { type: "text/plain" });
                  const link = document.createElement("a");
                  link.href = window.URL.createObjectURL(blob);
                  link.download = "resume.txt";
                  link.click();
                }} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"><FaDownload /> Download</button>
              ) : null}
            >
              <div className="space-y-4">
                <input type="file" accept=".txt,application/pdf" onChange={handleResumeUpload} className="mb-2" />
                {resumeText ? (
                  <details className="rounded border bg-gray-50 p-4">
                    <summary className="cursor-pointer select-none text-gray-700">Preview extracted text</summary>
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 mt-3 max-h-80 overflow-auto">{resumeText}</pre>
                  </details>
                ) : (
                  <p className="text-sm text-gray-600">Upload a TXT or PDF resume to parse and use with the ATS checker.</p>
                )}
              </div>
            </SectionCard>
          )}

          {/* ATS CHECKER */}
          {active === "ats" && (
            <SectionCard title="ATS Resume Checker" right={<button onClick={checkATSScore} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Check Score</button>}>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-3">
                  <textarea className="w-full border p-3 rounded min-h-44" placeholder="Paste Job Description here..." rows={8} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
                  <p className="text-xs text-gray-500">Tip: Include responsibilities and required skills for best results.</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <CircularProgress value={score ?? 0} />
                  <p className="mt-2 text-sm text-gray-600">ATS Match Score</p>
                </div>
              </div>
              {score !== null && (
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-semibold mb-2">Matched Keywords ({matchedKeywords.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {matchedKeywords.length ? matchedKeywords.map((k) => (
                        <span key={k} className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">{k}</span>
                      )) : <p className="text-sm text-gray-500">No matches found yet.</p>}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Missing Keywords ({missingKeywords.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {missingKeywords.length ? missingKeywords.map((k) => (
                        <span key={k} className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">{k}</span>
                      )) : <p className="text-sm text-gray-500">Looks good! 🎉</p>}
                    </div>
                    {missingKeywords.length > 0 && (
                      <p className="text-sm text-gray-600 mt-3">Suggestion: Weave these terms naturally into your summary, experience bullet points, or skills section if they truly reflect your experience.</p>
                    )}
                  </div>
                </div>
              )}
            </SectionCard>
          )}

          {/* JOB TRACKING */}
          {active === "jobs" && (
            <SectionCard
              title="Job Application Tracking"
              right={
                <div className="flex items-center gap-2">
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border p-2 rounded-lg">
                    <option>All</option>
                    {STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <button onClick={exportCSV} className="bg-gray-800 text-white px-3 py-2 rounded-lg hover:bg-black">Export CSV</button>
                </div>
              }
            >
              <form onSubmit={handleAddJob} className="grid md:grid-cols-8 gap-3 mb-4">
                <input className="border p-2 rounded md:col-span-2" placeholder="Job Title" value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} required />
                <input className="border p-2 rounded md:col-span-2" placeholder="Company" value={newJob.company} onChange={(e) => setNewJob({ ...newJob, company: e.target.value })} required />
                <input className="border p-2 rounded md:col-span-2" placeholder="Location" value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} />
                <input className="border p-2 rounded md:col-span-2" placeholder="Job URL" value={newJob.url} onChange={(e) => setNewJob({ ...newJob, url: e.target.value })} />
                <input className="border p-2 rounded md:col-span-2" placeholder="Salary (optional)" value={newJob.salary} onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })} />
                <select className="border p-2 rounded md:col-span-2" value={newJob.status} onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}>
                  {STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <input className="border p-2 rounded md:col-span-2" type="date" value={newJob.dateApplied} onChange={(e) => setNewJob({ ...newJob, dateApplied: e.target.value })} />
                <input className="border p-2 rounded md:col-span-2" placeholder="Reminder (e.g. 2025-09-05)" value={newJob.reminder} onChange={(e) => setNewJob({ ...newJob, reminder: e.target.value })} />
                <input className="border p-2 rounded md:col-span-4" placeholder="Notes" value={newJob.notes} onChange={(e) => setNewJob({ ...newJob, notes: e.target.value })} />
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 md:col-span-2 flex items-center justify-center gap-2"><FaPlus /> Add Job</button>
              </form>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="p-3 border">Job Title</th>
                      <th className="p-3 border">Company</th>
                      <th className="p-3 border">Status</th>
                      <th className="p-3 border">Applied</th>
                      <th className="p-3 border">Location</th>
                      <th className="p-3 border">Notes</th>
                      <th className="p-3 border text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50">
                        <td className="p-3 border">
                          {job.url ? (
                            <a href={job.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{job.title}</a>
                          ) : (
                            job.title
                          )}
                        </td>
                        <td className="p-3 border">{job.company}</td>
                        <td className="p-3 border">
                          <div className="flex items-center gap-2">
                            <StatBadge status={job.status} />
                            <select value={job.status} onChange={(e) => updateJob(job.id, { status: e.target.value })} className="border p-1 rounded">
                              {STATUSES.map((s) => (
                                <option key={s}>{s}</option>
                              ))}
                            </select>
                          </div>
                        </td>
                        <td className="p-3 border">{job.dateApplied || "—"}</td>
                        <td className="p-3 border">{job.location || "—"}</td>
                        <td className="p-3 border">
                          <input className="border p-1 rounded w-full" value={job.notes || ""} onChange={(e) => updateJob(job.id, { notes: e.target.value })} />
                        </td>
                        <td className="p-3 border text-center">
                          <button onClick={() => deleteJob(job.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 inline-flex items-center gap-1">
                            <FaTrash /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredJobs.length === 0 && (
                      <tr>
                        <td colSpan="7" className="text-center text-gray-500 p-4">No jobs found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          )}

          {/* ANALYTICS */}
          {active === "analytics" && (
            <div className="grid md:grid-cols-2 gap-8">
              <SectionCard title="Applications by Status">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie dataKey="value" data={pieData} innerRadius={50} outerRadius={90} paddingAngle={3}>
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <ReTooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </SectionCard>
              <SectionCard title="Weekly Applications">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklySeries} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis allowDecimals={false} />
                      <ReTooltip />
                      <Legend />
                      <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2} dot />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </SectionCard>
            </div>
          )}

          {/* REVIEWS */}
          {active === "reviews" && (
            <SectionCard
              title="Company Reviews (Personal Notes)"
              right={null}
            >
              <form onSubmit={addReview} className="grid md:grid-cols-6 gap-3 mb-4">
                <input className="border p-2 rounded md:col-span-2" placeholder="Company" value={newReview.company} onChange={(e) => setNewReview({ ...newReview, company: e.target.value })} required />
                <select className="border p-2 rounded md:col-span-1" value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}>
                  {[5,4,3,2,1].map((r) => (
                    <option key={r} value={r}>{r} ★</option>
                  ))}
                </select>
                <input className="border p-2 rounded md:col-span-3" placeholder="Comment" value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} required />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 md:col-span-1">Add</button>
              </form>
              <div className="space-y-3">
                {reviews.length === 0 ? (
                  <p className="text-sm text-gray-600">No reviews added yet.</p>
                ) : (
                  reviews.map((r) => (
                    <div key={r.id} className="border rounded-xl p-3 flex items-start justify-between">
                      <div>
                        <p className="font-medium">{r.company} — {"★".repeat(r.rating)}</p>
                        <p className="text-sm text-gray-700">{r.comment}</p>
                      </div>
                      <button onClick={() => deleteReview(r.id)} className="text-red-600 hover:underline">Delete</button>
                    </div>
                  ))
                )}
              </div>
            </SectionCard>
          )}
        </main>
      </div>

     {/* Footer */}
<footer className="bg-blue-900 border-t mt-10">
  <div className="max-w-7xl mx-auto p-4 flex flex-col items-center text-gray-300 gap-3">
    <p className="text-center">
      © {new Date().getFullYear()} JobsFind4U. All rights reserved.
    </p>
    <div className="flex items-center gap-4">
      {profile.linkedin && (
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 hover:text-blue-400"
        >
          <FaLinkedin /> LinkedIn
        </a>
      )}
      {profile.github && (
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 hover:text-white"
        >
          <FaGithub /> GitHub
        </a>
      )}
    </div>
  </div>
</footer>

    </div>
  );
}
