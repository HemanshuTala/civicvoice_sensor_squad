import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

  // Simple monthly aggregation (assuming feedback item has createdAt)
  const monthlyCounts = useMemo(() => {
    const counts = new Array(12).fill(0);
    feedbacks.forEach((f) => {
      const d = new Date(f.createdAt || Date.now());
      counts[d.getMonth()] += 1;
    });
    return counts;
  }, [feedbacks]);

  const months = useMemo(() => (["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]), []);

  const chartData = useMemo(() => ({
    labels: months,
    datasets: [
      {
        label: "Feedback Count",
        data: monthlyCounts,
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  }), [months, monthlyCounts]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-poppins" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
        />
      </Helmet>

      <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-3 text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
        Feedback Table
      </h1>
      <p className="text-base sm:text-lg text-gray-600 mb-6 text-center">Review and manage feedback submitted by users.</p>

      {/* Chart Summary */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Monthly Feedback</h2>
        <div className="w-full">
          <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center gap-3">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 w-10 h-10"></div>
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
                feedbacks.map((feedback, idx) => (
                  <tr key={idx} className="hover:bg-green-50 border-b transition-all duration-300">
                    <td className="py-4 px-6">{feedback.user?.name || "-"}</td>
                    <td className="py-4 px-6">{feedback.user?.email || "-"}</td>
                    <td className="py-4 px-6">
                      {feedback.feedback?.length > 50
                        ? `${feedback.feedback.substring(0, 50)}...`
                        : feedback.feedback}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-6 text-center text-gray-500">
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
