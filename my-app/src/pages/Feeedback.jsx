import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FaEnvelope, FaRegComment, FaPaperPlane, FaImage, FaExclamationCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from 'sweetalert2'
function Feedback() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, SetFeedback] = useState("");

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/feedback/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({feedback}),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error("Failed to submit complaint");
      }

      const result = await response.json();
      SetFeedback("");  
      Swal.fire({
        title: "Success!",
        text: "Complaint submitted successfully",
        icon: "success"
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex items-center justify-center w-full h-screen bg-gray-100"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6"
        >
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold text-gray-900 text-center mb-2 relative"
          >
            📢 Share Your Feedback
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
              className="block w-32 h-1 bg-green-500 mx-auto mt-2"
            ></motion.span>
          </motion.h1>
          <p className="text-gray-600 text-center mb-6 text-lg">
            Your input helps us improve and serve you better.
          </p>

          <motion.form onSubmit={handleSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>


            {/* Feedback Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Feedback</label>
              <textarea
                name="feedback"
                placeholder="Enter your feedback"
                value={feedback}
                onChange={(e) => { SetFeedback(e.target.value) }}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              ></textarea>
              {errors.feedback && <p className="text-red-500 text-sm flex items-center mt-1"><FaExclamationCircle className="mr-1" /> {errors.feedback}</p>}
            </div>

            {/* Submit Button */}
            <motion.div className="mb-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full flex justify-center items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
              >
                <FaPaperPlane className="text-white" />
                Submit Feedback
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </>
  );
}

export default Feedback;