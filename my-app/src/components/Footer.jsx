import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa'; // Social Media Icons
import { Link } from 'react-router-dom'; // For internal page links

function Footer() {
  return (
    <>
      <Helmet>
        {/* Adding Google Fonts for Poppins */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <footer className="bg-white text-black py-16 md:py-20">
        <div className="container mx-auto px-6 sm:px-12 lg:px-24">
          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-16">
            {/* About CivicVoice Section */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">CV</span>
                </div>
                <h4 className="text-3xl font-bold text-black" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Civic<span className="text-green-500">Voice</span>
                </h4>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Empowering citizens to voice their concerns and bridge the gap between communities and local authorities. 
                Built during a hackathon to foster transparency and engagement in civic governance.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold">
                  Hackathon Winner
                </div>
                <div className="bg-gray-100 text-black border border-gray-300 px-4 py-2 rounded-lg font-semibold">
                  Open Source
                </div>
              </div>
            </motion.div>

            {/* Quick Links Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-2xl font-bold text-black mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Quick Links
              </h4>
              <ul className="space-y-4">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'About', path: '/about' },
                  { name: 'Complaints', path: '/complaints' },
                  { name: 'My Complaints', path: '/my-complaints' },
                  { name: 'Create Complaint', path: '/create-complaint' },
                  { name: 'Feedback', path: '/feedback' }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path} 
                      className="text-gray-600 hover:text-green-500 transition-colors duration-300 flex items-center group"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-2xl font-bold text-black mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Get in Touch
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">@</span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <a href="mailto:sensorsquad@gmail.com" className="text-black hover:text-green-500 transition-colors duration-300">
                      sensorsquad@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">#</span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Phone</p>
                    <p className="text-black">+91 6351937876</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">📍</span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Location</p>
                    <p className="text-black">Gujarat, India</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Bottom */}
          <motion.div
            className="border-t border-gray-200 pt-8 mt-10 md:mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-600 text-center md:text-left" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <p>© 2025 CivicVoice. All rights reserved.</p>
                <p className="text-green-500 font-semibold">
                  Built with ❤️ by The Sensor Squad
                </p>
              </div>

              {/* Social Media Icons */}
              <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
                <a 
                  href="https://github.com/HemanshuTala/civicvoice_sensor_squad" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-green-500 transition-all duration-300 group"
                  aria-label="GitHub"
                >
                  <FaGithub className="text-xl text-gray-600 group-hover:text-white" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-green-500 transition-all duration-300 group"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-xl text-gray-600 group-hover:text-white" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-green-500 transition-all duration-300 group"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="text-xl text-gray-600 group-hover:text-white" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-green-500 transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-xl text-gray-600 group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Additional Footer Info */}
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                <Link to="/privacy" className="hover:text-green-500 transition-colors duration-300">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-green-500 transition-colors duration-300">Terms of Service</Link>
                <Link to="/support" className="hover:text-green-500 transition-colors duration-300">Support</Link>
                <Link to="/about" className="hover:text-green-500 transition-colors duration-300">About Us</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
}

export default Footer;