import React from 'react';
import { Helmet } from 'react-helmet';

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

      <footer className="bg-white text-gray-800 py-12 ">
        <div className="container mx-auto px-6 sm:px-12 lg:px-24">
          {/* Footer Content */}
          <div className="flex flex-col md:flex-row justify-between mb-12 space-y-8 md:space-y-0">
            {/* About Us Section */}
            <div className="w-full md:w-1/2">
              <h4
                className="text-3xl font-semibold text-green-600 mb-4"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                About Us
              </h4>
              <p
                className="text-lg text-gray-600 leading-relaxed"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                We are a passionate team dedicated to creating innovative solutions that make a difference in the digital world. Our expertise in web development ensures quality results that drive success.
              </p>
            </div>

            {/* Contact Us Section */}
            <div className="w-full md:w-1/2">
              <h4
                className="text-3xl font-semibold text-green-600 mb-4"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Contact Us
              </h4>
              <p
                className="text-lg text-gray-600 mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:info@reactapp.com"
                  className="text-green-500 hover:text-green-600"
                >
                  info@reactapp.com
                </a>
              </p>
              <p
                className="text-lg text-gray-600 mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <strong>Phone:</strong> +1 (234) 567-890
              </p>
              <p
                className="text-lg text-gray-600"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <strong>Address:</strong> 123 React App St, React City, RX 12345
              </p>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-200 pt-8 mt-12 text-center">
            <div
              className="text-sm text-gray-600"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <p>© 2025 React App. All rights reserved.</p>
              <p className="text-green-500 font-semibold">Designed by Sensor Squad</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
