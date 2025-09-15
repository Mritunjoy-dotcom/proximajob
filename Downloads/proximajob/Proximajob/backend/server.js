const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Jobseeker routes
const jobSeekerRoutes = require("./routes/jobSeeker");
const authJobSeekerRoutes = require("./routes/authJobSeeker");

// Recruiter routes ✅
const recruiterRoutes = require("./routes/recruiter");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/jobseeker", jobSeekerRoutes);
app.use("/api/auth/jobseeker", authJobSeekerRoutes);

// Recruiter routes ✅
app.use("/api/recruiter", recruiterRoutes);

// DB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

