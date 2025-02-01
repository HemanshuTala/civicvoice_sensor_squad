import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FaEnvelope, FaRegComment, FaPaperPlane } from "react-icons/fa"; // Import icons

function Feedback() {
  const [formData, setFormData] = useState({
    district: "",
    email: "",
    feedback: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send the data to a backend)
    console.log("Form submitted", formData);
  };

  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div className="flex items-center justify-center w-full h-screen bg-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Feedback</h1>

          <form onSubmit={handleSubmit}>
            {/* District Dropdown */}
            <div className="mb-4 relative">
              <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
                District
              </label>
              <select
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="" disabled>
                  Select your district
                </option>
                <option value="district1">District 1</option>
                <option value="district2">District 2</option>
                <option value="district3">District 3</option>
                <option value="district4">District 4</option>
                <option value="district5">District 5</option>
              </select>
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
                <FaEnvelope className="ml-4 text-gray-500" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 pl-10 bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Feedback Input */}
            <div className="mb-4">
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                Feedback
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
                <FaRegComment className="ml-4 mb-17 text-gray-500" />
                <textarea
                  id="feedback"
                  name="feedback"
                  placeholder="Enter your feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 pl-10 bg-white focus:outline-none focus:border-none"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
              >
                <FaPaperPlane className="text-white" />
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Feedback;