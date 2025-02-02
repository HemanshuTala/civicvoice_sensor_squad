import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Social Media Icons
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

      <footer className="bg-white text-gray-800 py-16">
        <div className="container mx-auto px-6 sm:px-12 lg:px-24">
          {/* Footer Content */}
          <div className="flex flex-col md:flex-row justify-between mb-16 space-y-12 md:space-y-0">
            {/* About Us Section */}
            <motion.div
              className="w-full md:w-1/3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="text-3xl font-semibold text-green-600 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                About Us
              </h4>
              <p
                className="text-lg text-gray-700 leading-relaxed mb-4"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  lineHeight: '1.6',
                  fontWeight: '400',
                  fontSize: '1rem',
                }}
              >
                We are a passionate team dedicated to creating innovative solutions that make a difference in the digital world. 
                Our expertise in web development ensures quality results that drive success.
              </p>
            </motion.div>

            {/* Contact Us Section */}
            <motion.div
              className="w-full md:w-1/3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-3xl font-semibold text-green-600 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Contact Us
              </h4>
              <p
                className="text-lg text-gray-700 mb-3"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  fontWeight: '400',
                }}
              >
                <strong>Email:</strong>{' '}
                <a href="mailto:info@reactapp.com" className="text-green-500 hover:text-green-600">
                 sensorsquad@gmail.com
                </a>
              </p>
              <p
                className="text-lg text-gray-700 mb-3"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  fontWeight: '400',
                }}
              >
                <strong>Phone:</strong> +6351937876
              </p>
              <p
                className="text-lg text-gray-700"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  fontWeight: '400',
                }}
              >
                <strong>Address:</strong> 123 React App St, React City, RX 12345
              </p>
            </motion.div>

            {/* Other Pages Section */}
            <motion.div
            
              className="w-full md:w-1/3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <h4 className="text-3xl font-semibold text-green-600 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Other Pages
              </h4>
              <ul className="space-y-4 text-lg text-gray-700"  style={{style: 'Poppins, sans-serif'}}>
                <li>
                  <Link  style={{style: 'Poppins, sans-serif'}}  to="/complaints" className="hover:text-green-600">
                    Complains
                  </Link>
                </li>
                <li>
                  <Link to="/my-complaints" className="hover:text-green-600">
                  My Complaints
                  </Link>
                </li>
                <li>
                  <Link to="/create-complaint" className="hover:text-green-600">
                  Create Complaint
                  </Link>
                </li>
                <li>
                  <Link to="/feedback" className="hover:text-green-600">
                    Feedback
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Footer Bottom */}
          <motion.div
            className="border-t border-gray-300 pt-8 mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div
              className="text-sm text-gray-500 mb-4"
              style={{
                fontFamily: 'Poppins, sans-serif',
                lineHeight: '1.6',
                fontWeight: '400',
                fontSize: '0.875rem',
              }}
            >
              <p>© 2025 React App. All rights reserved.</p>
              <p className="text-green-500 font-semibold hover:text-green-600">
                Designed by The Sensor Squad
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center space-x-8 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-3xl text-gray-700 hover:text-green-600" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-3xl text-gray-700 hover:text-green-600" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-3xl text-gray-700 hover:text-green-600" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-3xl text-gray-700 hover:text-green-600" />
              </a>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
