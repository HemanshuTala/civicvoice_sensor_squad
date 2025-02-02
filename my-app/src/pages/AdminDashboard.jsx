import React, { useState, useEffect } from "react";
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
import { Helmet } from "react-helmet";
import { FaCheckCircle, FaExclamationCircle, FaHourglassHalf, FaChartBar, FaClipboardList } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  // State for stats
  const [stats, setStats] = useState({
    solved: 0,
    pending: 0,
    unsolved: 0,
  });
  const [error, setError] = useState("");

  // Mock data for charts
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Complaints",
        data: [12, 19, 8, 15, 6, 10, 22, 18, 14, 20, 11, 16],
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const categoryChartData = {
    labels: ["Technical", "Hostel", "Mess", "Library", "Academics", "Others"],
    datasets: [
      {
        label: "Category Complaints",
        data: [25, 40, 30, 15, 20, 10],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  // Fetch stats from API
  const fetchStats = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/complain/get-stats");
      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }
      const data = await response.json();
      setStats(data.data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Fetch stats when the component mounts
  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`body { font-family: 'Poppins', sans-serif; }`}</style>
      </Helmet>
      <div className="space-y-8 bg-gray-100 min-h-screen p-6">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-8 rounded-2xl shadow-lg text-white flex flex-col md:flex-row justify-between items-center animate-fade-in-down">
          <div>
            <h1 className="text-4xl font-bold">Welcome, Admin!</h1>
            <p className="text-lg mt-2">Manage complaints and analyze insights in real-time.</p>
          </div>
         
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-100 p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <FaCheckCircle className="text-green-600 text-5xl mx-auto" />
            <h3 className="text-xl font-semibold text-green-600 mt-4">Total Complaints</h3>
            <p className="text-4xl font-extrabold text-green-700">{stats.total}</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <FaHourglassHalf className="text-yellow-600 text-5xl mx-auto" />
            <h3 className="text-xl font-semibold text-yellow-600 mt-4">Pending Complaints</h3>
            <p className="text-4xl font-extrabold text-yellow-700">{stats.pending}</p>
          </div>
          <div className="bg-red-100 p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <FaExclamationCircle className="text-red-600 text-5xl mx-auto" />
            <h3 className="text-xl font-semibold text-red-600 mt-4">Solved   Complaints</h3>
            <p className="text-4xl font-extrabold text-red-700">{stats.completed}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Complaints */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FaChartBar /> Monthly Complaints
            </h2>
            <Bar data={chartData} options={{ responsive: true }} />
          </div>

          {/* Complaints by Category */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FaClipboardList /> Complaints by Category
            </h2>
            <Bar data={categoryChartData} options={{ responsive: true }} />
          </div>
        </div>

        
      </div>
    </>
  );
};

export default AdminDashboard;
