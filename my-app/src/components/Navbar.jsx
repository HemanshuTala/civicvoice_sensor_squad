import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaEnvelope, FaBars, FaTimes, FaRegClipboard, FaCog, FaListAlt, FaSignOutAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';
import * as jwt_decode from 'jwt-decode';

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);


  // Check if the token is available in cookies
  useEffect(() => {
    const token = Cookies.get('token'); // Get the token from cookies
    if (token) {
      if (jwt_decode.jwtDecode(Cookies.get('token')).role === "admin") {
        setIsAdmin(true);
      } else if(jwt_decode.jwtDecode(Cookies.get('token')).role === "superadmin"){
        setIsSuperAdmin(true);
      }
      setIsLoggedIn(true); // If token exists, user is logged in
    } else {
      setIsLoggedIn(false); // Otherwise, the user is not logged in
    }
  }, []); // Empty dependency array to run this effect only once when the component mounts



  const handleLinkClick = (e) => {
    if (!isLoggedIn) {
      // Prevent navigation if not logged in and redirect to login
      e.preventDefault();
      navigate('/login');
    }
    if (isDrawerOpen) {
      setIsDrawerOpen(false);
    }
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Check if the user is logged in
    if (Cookies.get('token')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <nav className="bg-white shadow-lg w-full z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-6">
              <span
                className="text-3xl font-semibold text-green-600 tracking-wide hover:text-green-700 transition-all duration-300 ease-in-out"
                style={{ fontFamily: 'Poppins', fontWeight: 600 }}
              >
                CivicVoice
              </span>
            </div>

            {/* Hamburger icon (Mobile view) */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="text-gray-800 focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-110"
              >
                {isDrawerOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-6 items-center">
              <Link
                to="/"
                onClick={handleLinkClick}
                className="text-gray-800 hover:text-green-600 transition-all duration-300 ease-in-out transform hover:scale-105"
                style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '18px' }}
              >
                <FaHome className="inline mr-2" /> Home
              </Link>

              {/* Dropdown Menu */}
              <div className="relative group">
                <button
                  className="text-gray-800 hover:text-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center text-lg"
                  style={{ fontFamily: 'Poppins', fontWeight: 500 }}
                >
                  <FaListAlt className="mr-2" /> Complaints
                </button>
                <div className="absolute left-0 mt-2 w-56 bg-white border rounded-lg shadow-xl z-30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                  <Link
                  onClick={handleLinkClick}
                    to="/complaints"
                    className="flex items-center px-5 py-3 text-gray-700 hover:text-green-600 hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105"
                    style={{ fontFamily: 'Poppins' }}
                  >
                    <FaRegClipboard className="mr-2" />
                    Complaints
                  </Link>
                  <Link

                    to="/create-complaint"
                    className="flex items-center px-5 py-3 text-gray-700 hover:text-green-600 hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105"
                    style={{ fontFamily: 'Poppins' }}
                  >
                    <FaCog className="mr-2" />
                    Create Complaint
                  </Link>
                  <Link
                  onClick={handleLinkClick}
                    to="/my-complaints"
                    className="flex items-center px-5 py-3 text-gray-700 hover:text-green-600 hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105"
                    style={{ fontFamily: 'Poppins' }}
                  >
                    <FaListAlt className="mr-2" />
                    My Complaints
                  </Link>
                </div>
              </div>

              <Link
                to="/feedback"
                onClick={handleLinkClick}
                className="text-gray-800 hover:text-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 text-lg"
                style={{ fontFamily: 'Poppins', fontWeight: 500 }}
              >
                <FaEnvelope className="inline mr-2" /> Feedback
              </Link>

              {isAdmin && 
              <Link
              to="/admin/dashboard"
              onClick={handleLinkClick}
              className="text-gray-800 hover:text-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 text-lg"
              style={{ fontFamily: 'Poppins', fontWeight: 500 }}
            >
              <FaEnvelope className="inline mr-2" /> Admin
            </Link>}

            {isSuperAdmin && 
              <Link
              to="/admin/dashboard"
              onClick={handleLinkClick}
              className="text-gray-800 hover:text-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 text-lg"
              style={{ fontFamily: 'Poppins', fontWeight: 500 }}
            >
              <FaEnvelope className="inline mr-2" /> Super Admin
            </Link>}
            </div>

            {/* Login/Logout Button */}
            <div className="hidden md:block">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                  className="bg-green-600 text-white bold-400 px-6 py-3 rounded-lg shadow-lg hover:bg-green-500 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={handleLinkClick}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-500 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center"
                  style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '18px' }}
                >
                  <FaSignInAlt className="mr-2" /> Login
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-all duration-300 ease-in-out transform ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex flex-col space-y-6 bg-white px-6 py-4 w-full h-full transition-all duration-300 ease-in-out">
            {/* Close Button */}
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="self-end text-gray-800"
            >
              <FaTimes size={30} />
            </button>

            <Link
              to="/"
              onClick={handleLinkClick}
              className="text-gray-800 hover:text-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center text-lg"
            >
              <FaHome className="mr-2" /> Home
            </Link>

            <Link
              to="/complaints"
              onClick={handleLinkClick}
              className="text-gray-800 hover:text-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center text-lg"
            >
              <FaRegClipboard className="mr-2" />
              Complaints
            </Link>
            <Link
              to="/create-complaint"
              onClick={handleLinkClick}
              className="text-gray-800 hover:text-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center text-lg"
            >
              <FaCog className="mr-2" />
              Create Complaint
            </Link>
            <Link
              to="/my-complaints"
              onClick={handleLinkClick}
              className="text-gray-800 hover:text-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center text-lg"
            >
              <FaListAlt className="mr-2" />
              My Complaints
            </Link>

            <Link
              to="/feedback"
              onClick={handleLinkClick}
              className="text-gray-800 hover:text-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center text-lg"
            >
              <FaEnvelope className="mr-2" /> Feedback
            </Link>

            <Link
              to="/login"
              style={{ fontFamily: "Poppins, sans-serif" }}
              onClick={handleLinkClick}
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-500 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center text-lg"
            >
              <FaSignInAlt className="mr-2" /> Login
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
