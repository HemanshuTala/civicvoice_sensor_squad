import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

function Feedbacktab() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch feedbacks from the API
  const fetchFeedbacks = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8000/api/feedback/view", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      setFeedbacks(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch feedbacks on mount
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="min-h-screen py-8 px-6 font-poppins" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
        />
      </Helmet>

      <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
        Feedback Table
      </h1>
      <p className="text-lg text-gray-600 mb-6 text-center">Review and manage feedback submitted by users.</p>

      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 w-12 h-12"></div>
          <span>Loading feedback...</span>
        </div>
      ) : (
        // Feedback Table only shows when loading is false
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg max-w-7xl mx-auto">
          <table className="w-full text-sm table-auto">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-4 px-6 text-left">Name</th>
                <th className="py-4 px-6 text-left">Email</th>
                <th className="py-4 px-6 text-left">Feedback</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {Array.isArray(feedbacks) && feedbacks.length > 0 ? (
                feedbacks.map((feedback) => (
                  <tr key={feedback.id} className="hover:bg-blue-50 border-b transition-all duration-300">
                    <td className="py-4 px-6">{feedback.user.name}</td>
                    <td className="py-4 px-6">{feedback.user.email}</td>
                    <td className="py-4 px-6">
                      {feedback.feedback.length > 50
                        ? `${feedback.feedback.substring(0, 50)}...`
                        : feedback.feedback}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-6 text-center text-gray-500 flex justify-center items-center">
                    No feedback found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Feedbacktab;
