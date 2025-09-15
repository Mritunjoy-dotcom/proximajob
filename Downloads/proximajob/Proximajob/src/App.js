import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import RegisterJobSeeker from "./pages/RegisterJobSeeker";
import RegisterRecruiter from "./pages/RegisterRecruiter";
import LoginJobSeeker from "./pages/LoginJobSeeker"; 
import LoginRecruiter from "./pages/LoginRecruiter";
import DashboardJobSeeker from "./pages/DashboardJobSeeker";   
import DashboardRecruiter from "./pages/DashboardRecruiter";   
import ForEmployers from "./pages/ForEmployers";

// ✅ Jobs Page import
import JobsPage from "./pages/JobsPage";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Homepage />} />

        {/* Jobs Page */}
        <Route path="/jobs" element={<JobsPage />} />

        {/* Job Seeker Routes */}
        <Route path="/register/jobseeker" element={<RegisterJobSeeker />} />
        <Route path="/login/jobseeker" element={<LoginJobSeeker />} />
        <Route path="/dashboard/jobseeker" element={<DashboardJobSeeker />} />

        {/* Recruiter Routes */}
        <Route path="/register/recruiter" element={<RegisterRecruiter />} />
        <Route path="/login/recruiter" element={<LoginRecruiter />} /> 
        <Route path="/dashboard/recruiter" element={<DashboardRecruiter />} /> 

        {/* Employers Page */}
        <Route path="/employers" element={<ForEmployers />} />

        {/* Contact Page */}
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
