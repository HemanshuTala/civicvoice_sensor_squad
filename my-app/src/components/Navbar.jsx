import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaEnvelope, FaBars, FaTimes, FaClipboardList, FaPlusCircle, FaListAlt, FaSignOutAlt, FaCrown, FaCog, FaLeaf } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';
import * as jwt_decode from 'jwt-decode';

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const navigate = useNavigate();

  // Scroll effect to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check login status and user role from cookies
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
      try {
        const decodedToken = jwt_decode.jwtDecode(token);
        if (decodedToken.role === "admin") {
          setIsAdmin(true);
        }
        if (decodedToken.role === "superadmin") {
          setIsSuperAdmin(true);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        Cookies.remove('token');
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
      setIsSuperAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsSuperAdmin(false);
    navigate('/login');
  };

  const closeDrawerAndDropdown = () => {
    setIsDrawerOpen(false);
    setIsDropdownOpen(false);
  };

  // Framer Motion Variants for animations
  const menuVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.12 
      } 
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: { 
      scale: 1.08, 
      y: -3, 
      transition: { type: "spring", stiffness: 400, damping: 15 } 
    },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      } 
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  const logoVariants = {
    hover: {
      scale: 1.1,
      rotate: 2,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Desktop Navbar */}
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={menuVariants}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-green-100' 
            : 'bg-white shadow-lg'
        }`}
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="flex justify-between items-center h-18 py-2 md:py-0">
            {/* Enhanced Logo */}
            <motion.div variants={linkVariants} whileHover="hover">
              <Link to="/" className="flex items-center space-x-3 sm:space-x-4 group">
                <motion.div 
                  variants={logoVariants}
                  whileHover="hover"
                  className="relative"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-green-500 flex items-center justify-center text-white font-bold">CV</div>
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'Outfit' }}>
                    Civic<span className="text-green-600">Voice</span>
                  </span>
                  <div className="h-0.5 bg-gradient-to-r from-green-500 to-green-300 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <motion.div variants={linkVariants} whileHover="hover">
                <Link 
                  to="/" 
                  onClick={closeDrawerAndDropdown} 
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600 font-semibold text-base transition-all duration-300 relative group"
                >
                  <FaHome className="text-lg" />
                  <span>Home</span>
                  <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></div>
                </Link>
              </motion.div>

              <motion.div variants={linkVariants} whileHover="hover">
                <Link 
                  to="/about" 
                  onClick={closeDrawerAndDropdown} 
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600 font-semibold text-base transition-all duration-300 relative group"
                >
                  <FaUser className="text-lg" />
                  <span>About</span>
                  <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></div>
                </Link>
              </motion.div>

              {/* Enhanced Complaints Dropdown */}
              <motion.div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                variants={linkVariants} 
                whileHover="hover"
              >
                <button className="flex items-center space-x-2 text-gray-700 hover:text-green-600 font-semibold text-base transition-all duration-300 focus:outline-none relative group">
                  <FaClipboardList className="text-lg" />
                  <span>Complaints</span>
                  <motion.div
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-current"
                  />
                  <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></div>
                </button>
                
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-72 bg-white border border-green-100 rounded-2xl shadow-2xl overflow-hidden"
                    >
                      <div className="p-2">
                        <Link 
                          to="/complaints" 
                          onClick={closeDrawerAndDropdown} 
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 group"
                        >
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                            <FaListAlt className="text-green-600" />
                          </div>
                          <div>
                            <div className="font-semibold">View Complaints</div>
                            <div className="text-xs text-gray-500">Browse all complaints</div>
                          </div>
                        </Link>
                        
                        <Link 
                          to="/create-complaint" 
                          onClick={closeDrawerAndDropdown} 
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 group"
                        >
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                            <FaPlusCircle className="text-green-600" />
                          </div>
                          <div>
                            <div className="font-semibold">Create Complaint</div>
                            <div className="text-xs text-gray-500">Submit new complaint</div>
                          </div>
                        </Link>
                        
                        <Link 
                          to="/my-complaints" 
                          onClick={closeDrawerAndDropdown} 
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 group"
                        >
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                            <FaClipboardList className="text-green-600" />
                          </div>
                          <div>
                            <div className="font-semibold">My Complaints</div>
                            <div className="text-xs text-gray-500">Track your submissions</div>
                          </div>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={linkVariants} whileHover="hover">
                <Link 
                  to="/feedback" 
                  onClick={closeDrawerAndDropdown} 
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600 font-semibold text-base transition-all duration-300 relative group"
                >
                  <FaEnvelope className="text-lg" />
                  <span>Feedback</span>
                  <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></div>
                </Link>
              </motion.div>
              
              {(isAdmin || isSuperAdmin) && (
                <motion.div variants={linkVariants} whileHover="hover">
                  <Link 
                    to="/admin/dashboard" 
                    onClick={closeDrawerAndDropdown} 
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600 font-semibold text-base transition-all duration-300 relative group"
                  >
                    <FaCog className="text-lg" />
                    <span>Admin</span>
                    <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></div>
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Enhanced Login/Logout Button */}
            <div className="hidden md:block">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {isLoggedIn ? (
                  <button 
                    onClick={handleLogout} 
                    className="flex items-center space-x-2 bg-gradient-to-r from-gray-800 to-black text-white px-5 py-3 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <FaSignOutAlt className="relative z-10" />
                    <span className="relative z-10">Logout</span>
                  </button>
                ) : (
                  <Link 
                    to="/login" 
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-3 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <FaUser className="relative z-10" />
                    <span className="relative z-10">Login</span>
                  </Link>
                )}
              </motion.div>
            </div>

            {/* Enhanced Mobile hamburger button */}
            <div className="md:hidden">
              <motion.button 
                onClick={() => setIsDrawerOpen(true)} 
                className="text-gray-800 p-3 rounded-xl hover:bg-green-50 transition-all duration-300 relative group"
                whileTap={{ scale: 0.9 }}
                aria-label="Open menu"
              >
                <FaBars size={22} className="group-hover:text-green-600 transition-colors" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Mobile Drawer Menu */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ 
              type: "spring", 
              stiffness: 120, 
              damping: 25,
              mass: 0.8
            }}
            className="fixed top-0 left-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl overflow-y-auto border-r border-green-100"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            {/* Drawer Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <FaLeaf className="text-white text-lg" />
                  </div>
                  <span className="text-xl font-bold">CivicVoice</span>
                </div>
                <motion.button 
                  onClick={() => setIsDrawerOpen(false)} 
                  className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-200"
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close menu"
                >
                  <FaTimes size={20} />
                </motion.button>
              </div>
              <div className="h-px bg-white/20"></div>
            </div>

            {/* Navigation Links */}
            <div className="p-6">
              <div className="flex flex-col space-y-2">
                {[
                  { to: "/", icon: FaHome, label: "Home" },
                  { to: "/about", icon: FaUser, label: "About" },
                  { to: "/complaints", icon: FaClipboardList, label: "View Complaints" },
                  { to: "/create-complaint", icon: FaPlusCircle, label: "Create Complaint" },
                  { to: "/my-complaints", icon: FaListAlt, label: "My Complaints" },
                  { to: "/feedback", icon: FaEnvelope, label: "Feedback" },
                ].map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      to={item.to} 
                      onClick={closeDrawerAndDropdown} 
                      className="flex items-center space-x-4 text-gray-700 hover:text-green-600 hover:bg-green-50 p-4 rounded-xl transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 bg-gray-100 group-hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors">
                        <item.icon className="text-lg group-hover:text-green-600" />
                      </div>
                      <span className="text-lg font-semibold">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}

                {(isAdmin || isSuperAdmin) && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Link 
                      to="/admin/dashboard" 
                      onClick={closeDrawerAndDropdown} 
                      className="flex items-center space-x-4 text-gray-700 hover:text-green-600 hover:bg-green-50 p-4 rounded-xl transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 bg-gray-100 group-hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors">
                        <FaCog className="text-lg group-hover:text-green-600" />
                      </div>
                      <span className="text-lg font-semibold">Admin</span>
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Login/Logout Button */}
            <div className="p-6 mt-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {isLoggedIn ? (
                  <button 
                    onClick={handleLogout} 
                    className="flex items-center justify-center space-x-3 w-full bg-gradient-to-r from-gray-800 to-black text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                ) : (
                  <Link 
                    to="/login" 
                    onClick={closeDrawerAndDropdown} 
                    className="flex items-center justify-center space-x-3 w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <FaUser />
                    <span>Login</span>
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Drawer Overlay */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;