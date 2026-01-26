import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// For Public
import TermsConditions from "./pages/TermsConditions.jsx";
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

// For Admin
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
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/about-us"
            element={<Navigate to="/vision-mission" replace />}
          />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/principal-message" element={<PrincipalMessage />} />
          <Route path="/admission-criteria" element={<AdmissionCriteria />} />
          <Route path="/fee-structure" element={<FeeStructure />} />
          <Route path="/departments" element={<Departments />} />
          {/* <Route path="/department-of-physical-therapy" element={<Departmentn1 />} />
          <Route path="/department-of-allied-health-sciences" element={<Departmentn2 />} />
          <Route path="/department-of-food-and-nutrition-sciences" element={<Departmentn3 />} />
          <Route path="/department-of-applied-sciences" element={<Departmentn4 />} /> */}
          <Route path="/research" element={<Research />} />
          <Route path="/news-events" element={<NewsEvents />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/contact-us" element={<ContactUs />} />

          {/* INDUSTRY BEST PRACTICE: Legal pages at root level */}
          <Route path="/terms-conditions" element={<TermsConditions />} />

          {/* --- AUTH ROUTES --- */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />

          {/* --- PROTECTED ADMIN ROUTES --- */}
          {/* ProtectedRoute ko uncomment kar diya taake warning khatam ho aur security bani rahe */}
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

          {/* --- 404 NOT FOUND --- */}
          <Route
            path="*"
            element={
              <div
                style={{ padding: 100, textAlign: "center", fontSize: "2rem" }}
              >
                404 - Page not found
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
