import React from "react";
import '@fontsource/poppins'; // Default weight: 400
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Complaints from "./pages/Complaints";
import MyComplaints from "./pages/MyComplaints";
import CreateComplaint from "./pages/CreateComplaint";
import Feedback from "./pages/Feeedback";
import Admin from "./pages/AdminPanel"; // Import Admin layout
import AdminDashBoard from "./pages/AdminDashboard"; // Admin Dashboard page
import AdminComplaint from "./pages/AdminComplaints"; // Admin Complaints page
import CompletedComplaints from "./pages/CompletedComplaints";
import OverdueComplaints from "./pages/OverdueComplaints";
import PendingComplaints from "./pages/PendingComplaints";
import NotAccepted from "./pages/NotAccepted";
import ViewPage from "./pages/ViewPage";
import RejectedComplaints from "./pages/RejectedComplaints";
import AddAdmin from "./pages/AddAdmin";
import AcceptApproval from "./pages/AcceptApproval";
import CompleteApproval from "./pages/CompleteApproval";

import Feedbacktab from "./pages/Feedbacktab";

function App() {
  const location = useLocation();

  // Check if the current route is under "admin" to conditionally render Navbar and Footer
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Show Navbar only if not on admin routes */}
      {!isAdminRoute && (
        <header className="w-full">
          <Navbar />
        </header>
      )}

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/my-complaints" element={<MyComplaints />} />
          <Route path="/create-complaint" element={<CreateComplaint />} />
          <Route path="/feedback" element={<Feedback />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />}>
            <Route path="dashboard" element={<AdminDashBoard />} />
            <Route path="add" element={<AddAdmin />} />
            <Route path="approval" element={< AcceptApproval/>} />
            <Route path="completeApproval" element={< CompleteApproval/>} />
            <Route path="complaints" element={<AdminComplaint />} />
            <Route path="complaints/completed" element={<CompletedComplaints />} />
            <Route path="complaints/overdue" element={<OverdueComplaints />} />
            <Route path="complaints/pending" element={<PendingComplaints />} />
            <Route path="complaints/notaccepted" element={<NotAccepted />} />
            <Route path="complaints/rejected" element={<RejectedComplaints />} />
            <Route path="complaints/view" element={<ViewPage />} />
            <Route path="feedback" element={<Feedbacktab />} />
          </Route>
        </Routes>
      </main>

      {/* Show Footer only if not on admin routes */}
      {!isAdminRoute && (
        <footer className="w-full bg-gray-800 text-white">
          <Footer />
        </footer>
      )}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;