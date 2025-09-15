const express = require("express");
const router = express.Router();

// Dummy jobs data 
let jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "New York, USA",
    salary: "$60k - $80k/year",
    category: "IT & Software",
    type: "Full-time",
    logo: "https://via.placeholder.com/60",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "London, UK",
    salary: "£40k - £55k/year",
    category: "Design",
    type: "Remote",
    logo: "https://via.placeholder.com/60",
  },
  {
    id: 3,
    title: "Digital Marketing Manager",
    company: "Growth Agency",
    location: "Mumbai, India",
    salary: "₹8L - ₹12L/year",
    category: "Marketing",
    type: "Full-time",
    logo: "https://via.placeholder.com/60",
  },
];

// ✅ GET all jobs
router.get("/", (req, res) => {
  res.json(jobs);
});

// ✅ GET job by ID
router.get("/:id", (req, res) => {
  const jobId = parseInt(req.params.id);
  const job = jobs.find((j) => j.id === jobId);

  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ message: "Job not found" });
  }
});

// ✅ POST new job
router.post("/", (req, res) => {
  const newJob = req.body;

  // Add unique ID
  newJob.id = jobs.length + 1;

  // Add default logo if not provided
  if (!newJob.logo) {
    newJob.logo = "https://via.placeholder.com/60";
  }

  jobs.push(newJob);

  res.status(201).json(newJob);
});

module.exports = router;
