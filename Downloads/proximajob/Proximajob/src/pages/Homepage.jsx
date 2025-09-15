import React, { useState } from "react";

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturedJobs from '../components/FeaturedJobs';
import InterviewPrepPanel from '../components/InterviewPrepPanel';
import Footer from '../components/Footer';
import EntryModal from '../components/EntryModal';
import JobMaterial from "../components/JobMaterial";
import AIAgent from "../components/AIAgent";
import AIAgentFeatures from "../components/AIAgentFeatures";
import AIResumeBuilder from "../components/AIResumeBuilder";
import PersonalizedCareerGuidance from "../components/PersonalizedCareerGuidance";
const Homepage = () => {
  const [showModal, setShowModal] = useState(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturedJobs />
      <InterviewPrepPanel />
      {showModal && <EntryModal onClose={handleModalClose} />}
      <AIResumeBuilder/>
      <PersonalizedCareerGuidance/>
      <JobMaterial />
      <AIAgent />
      <AIAgentFeatures/>
      <Footer />
    </>
  );
};

export default Homepage;
