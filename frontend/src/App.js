import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// --- PUBLIC PAGES ---
import Home from "./pages/Home.jsx";
import VisionMission from "./pages/VisionMission.jsx";
import PrincipalMessage from "./pages/PrincipalMessage.jsx";
import AdmissionCriteria from "./pages/AdmissionCriteria.jsx";
import FeeStructure from "./pages/FeeStructure.jsx";
import Departments from "./pages/Departments.jsx";
import Research from "./pages/Research.jsx";
import NewsEvents from "./pages/NewsEvents.jsx";
import Notifications from "./pages/Notifications.jsx";
import Downloads from "./pages/Downloads.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import TermsConditions from "./pages/TermsConditions.jsx";

// Faculty Pages (Capitalized for React standards)
import FacultyOfBasicSciences from "./pages/FacultyOfBasicSciences.jsx";
import FacultyOfClinicalSciences from "./pages/FacultyOfClinicalSciences.jsx";
import ConvocationForm from "./pages/ConvocationForm.jsx";

// --- ADMIN PAGES ---
import AdminLogin from "./admin/Auth.jsx";
import AdminSignup from "./admin/Signup.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import SliderSettings from "./admin/SliderSettings.jsx";
import NewsAdmin from "./admin/NewsAdmin.jsx";
import DownloadsAdmin from "./admin/DownloadsAdmin.jsx";
import NotificationsAdmin from "./admin/NotificationsAdmin.jsx";
import FacultyManager from "./admin/FacultyManager.jsx";
import DepartmentsAdmin from "./admin/DepartmentsAdmin.jsx";
import ResearchAdmin from "./admin/ResearchAdmin.jsx";
import SiteSettings from "./admin/SiteSettings.jsx";
import AdminProfile from "./admin/AdminProfile.jsx";
import ProtectedRoute from "./admin/ProtectedRoute.jsx";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* --- ROOT REDIRECT --- */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* --- PUBLIC ROUTES --- */}
          <Route path="/home" element={<Home />} />
          <Route
            path="/about-us"
            element={<Navigate to="/vision-mission" replace />}
          />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/principal-message" element={<PrincipalMessage />} />
          <Route path="/admission-criteria" element={<AdmissionCriteria />} />
          <Route path="/fee-structure" element={<FeeStructure />} />

          {/* Departments Overview */}
          <Route path="/departments" element={<Departments />} />

          {/* Faculty Specific Routes (D1 & D2) */}
          <Route
            path="/faculty-basic-sciences"
            element={<FacultyOfBasicSciences />}
          />
          <Route
            path="/faculty-clinical-sciences"
            element={<FacultyOfClinicalSciences />}
          />

          <Route path="/research" element={<Research />} />
          <Route path="/news-events" element={<NewsEvents />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/convocation" element={<ConvocationForm />} />
          <Route path="/contact-us" element={<ContactUs />} />

          {/* Legal Pages */}
          <Route path="/terms-conditions" element={<TermsConditions />} />

          {/* --- AUTH ROUTES --- */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />

          {/* --- PROTECTED ADMIN PANEL --- */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="slider" element={<SliderSettings />} />
            <Route path="news" element={<NewsAdmin />} />
            <Route path="downloads" element={<DownloadsAdmin />} />
            <Route path="notifications" element={<NotificationsAdmin />} />
            <Route path="faculty" element={<FacultyManager />} />
            <Route path="departments" element={<DepartmentsAdmin />} />
            <Route path="research" element={<ResearchAdmin />} />
            <Route path="settings" element={<SiteSettings />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>

          {/* --- 404 PAGE --- */}
          <Route
            path="*"
            element={
              <div style={{ padding: "100px 20px", textAlign: "center" }}>
                <h1 style={{ color: "#8B0000", fontSize: "3rem" }}>404</h1>
                <p style={{ fontSize: "1.2rem", color: "#666" }}>
                  Oops! Page not found.
                </p>
                <button
                  onClick={() => (window.location.href = "/home")}
                  style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#8B0000",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Go Back Home
                </button>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
