import React from "react";
import '@fontsource/poppins'; // Default weight: 400

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Complaints from "./pages/Complaints";
import MyComplaints from "./pages/MyComplaints";
import CreateComplaint from "./pages/CreateComplaint";
import Feedback from "./pages/Feeedback";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full">
        {/* Navbar */}
        <header className="w-full">
          <Navbar />
        </header>

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/my-complaints" element={<MyComplaints />} />
            <Route path="/create-complaint" element={<CreateComplaint />} />
            <Route path="/feedback" element={<Feedback/>} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="w-full bg-gray-800 text-white">
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
