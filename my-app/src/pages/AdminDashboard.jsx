import React, { useState, useEffect, useMemo } from "react";
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
import Cookies from "js-cookie";
import * as jwt_decode from "jwt-decode";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  // State for stats
  const [stats, setStats] = useState({
    solved: 0,
    pending: 0,
    unsolved: 0,
    total: 0,
    completed: 0,
  });
  const [error, setError] = useState("");

  // Role parsing (kept for future, not used now)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  // Timeframe filters
  const [timeframe, setTimeframe] = useState("Monthly"); // Monthly | Quarterly | Yearly
  const [year, setYear] = useState(new Date().getFullYear());

  // Base data (can be replaced with API data if available)
  const monthlyCounts = useMemo(() => ([12, 19, 8, 15, 6, 10, 22, 18, 14, 20, 11, 16]), []);
  const months = useMemo(() => (["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]), []);

  // Aggregations for different timeframes
  const quarterlyCounts = useMemo(() => {
    const q = [0, 0, 0, 0];
    for (let i = 0; i < 12; i++) {
      q[Math.floor(i / 3)] += monthlyCounts[i];
    }
    return q;
  }, [monthlyCounts]);

  const yearlyCounts = useMemo(() => {
    // Example of last 5 years rolling data based on monthlyCounts sum
    const base = monthlyCounts.reduce((a, b) => a + b, 0);
    return [base - 40, base - 20, base - 10, base, base + 15];
  }, [monthlyCounts]);

  const chartLabels = useMemo(() => {
    if (timeframe === "Monthly") return months;
    if (timeframe === "Quarterly") return ["Q1", "Q2", "Q3", "Q4"];
    return [year - 4, year - 3, year - 2, year - 1, year].map(String);
  }, [months, timeframe, year]);

  const chartValues = useMemo(() => {
    if (timeframe === "Monthly") return monthlyCounts;
    if (timeframe === "Quarterly") return quarterlyCounts;
    return yearlyCounts;
  }, [timeframe, monthlyCounts, quarterlyCounts, yearlyCounts]);

  const chartData = useMemo(() => ({
    labels: chartLabels,
    datasets: [
      {
        label: "Complaints",
        data: chartValues,
        backgroundColor: "rgba(16, 185, 129, 0.7)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  }), [chartLabels, chartValues]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#eef2ff" }, ticks: { precision: 0 } }
    }
  }), []);

  const categoryChartData = {
    labels: ["Technical", "Hostel", "Mess", "Library", "Academics", "Others"],
    datasets: [
      {
        label: "Category Complaints",
        data: [25, 40, 30, 15, 20, 10],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(234, 88, 12, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(99, 102, 241, 0.7)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(234, 88, 12, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(99, 102, 241, 1)",
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
      setStats({
        solved: data?.data?.completed || 0,
        pending: data?.data?.pending || 0,
        unsolved: (data?.data?.total || 0) - (data?.data?.completed || 0),
        total: data?.data?.total || 0,
        completed: data?.data?.completed || 0,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwt_decode.jwtDecode(token);
        setIsSuperAdmin(decoded?.role === "superadmin");
      } catch (e) {
        setIsSuperAdmin(false);
      }
    }
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
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 md:p-8 rounded-2xl shadow-lg text-white flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Welcome, Admin!</h1>
            <p className="text-base md:text-lg mt-2 opacity-90">Manage complaints and analyze insights in real-time.</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg text-white border border-white/30 focus:outline-none"
            >
              <option className="text-black" value="Monthly">Monthly</option>
              <option className="text-black" value="Quarterly">Quarterly</option>
              <option className="text-black" value="Yearly">Yearly</option>
            </select>
            {timeframe === "Yearly" && (
              <select
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value, 10))}
                className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg text-white border border-white/30 focus:outline-none"
              >
                {[0,1,2,3,4].map((i) => (
                  <option className="text-black" key={i} value={new Date().getFullYear() - i}>
                    {new Date().getFullYear() - i}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border border-green-100">
            <FaCheckCircle className="text-green-600 text-5xl mx-auto" />
            <h3 className="text-xl font-semibold text-gray-700 mt-4">Total Complaints</h3>
            <p className="text-4xl font-extrabold text-green-700">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border border-yellow-100">
            <FaHourglassHalf className="text-yellow-600 text-5xl mx-auto" />
            <h3 className="text-xl font-semibold text-gray-700 mt-4">Pending Complaints</h3>
            <p className="text-4xl font-extrabold text-yellow-700">{stats.pending}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300 border border-red-100">
            <FaExclamationCircle className="text-red-600 text-5xl mx-auto" />
            <h3 className="text-xl font-semibold text-gray-700 mt-4">Solved Complaints</h3>
            <p className="text-4xl font-extrabold text-red-700">{stats.completed}</p>
          </div>
        </div>

        {/* Administrative Map */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Administrative Map</h2>
          <p className="text-sm text-gray-500 mb-4">Gujarat (hardcoded)</p>
          <div className="w-full h-64 md:h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full flex flex-col md:flex-row">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <rect x="0" y="0" width="400" height="300" fill="#f8fafc" />
                <text x="200" y="24" textAnchor="middle" fontSize="14" fill="#64748b">Gujarat (segmented)</text>
                {/* Segmented simplified Gujarat silhouette */}
                <path d="M70,170 C100,120 160,100 210,120 C250,140 280,170 255,205 C230,240 170,245 120,225 C95,215 55,205 70,170 Z" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                {/* Regions */}
                <path d="M110,155 L150,140 L180,150 L170,180 L130,185 Z" fill="#bae6fd" stroke="#3b82f6" strokeWidth="1" />
                <path d="M150,140 L200,135 L220,155 L200,175 L170,180 L180,150 Z" fill="#93c5fd" stroke="#3b82f6" strokeWidth="1" />
                <path d="M120,185 L170,180 L200,175 L195,205 L150,210 L125,200 Z" fill="#60a5fa" stroke="#3b82f6" strokeWidth="1" />
                <path d="M75,178 L110,155 L130,185 L125,200 L95,195 Z" fill="#3b82f6" opacity="0.85" stroke="#1d4ed8" strokeWidth="1" />
                <path d="M200,175 L225,160 L245,175 L235,195 L205,205 Z" fill="#2563eb" opacity="0.85" stroke="#1d4ed8" strokeWidth="1" />
              </svg>
              {/* Legend */}
              <div className="p-4 md:w-56 border-t md:border-t-0 md:border-l border-gray-200 bg-white/60">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Legend (hardcoded)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2"><span className="inline-block w-4 h-4 bg-[#bae6fd] border border-[#3b82f6]"></span> Region A</div>
                  <div className="flex items-center gap-2"><span className="inline-block w-4 h-4 bg-[#93c5fd] border border-[#3b82f6]"></span> Region B</div>
                  <div className="flex items-center gap-2"><span className="inline-block w-4 h-4 bg-[#60a5fa] border border-[#3b82f6]"></span> Region C</div>
                  <div className="flex items-center gap-2"><span className="inline-block w-4 h-4 bg-[#3b82f6] border border-[#1d4ed8]"></span> Region D</div>
                  <div className="flex items-center gap-2"><span className="inline-block w-4 h-4 bg-[#2563eb] border border-[#1d4ed8]"></span> Region E</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Timeframe Complaints */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FaChartBar /> Complaints ({timeframe})
            </h2>
            <Bar data={chartData} options={chartOptions} />
          </div>

          {/* Complaints by Category */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FaClipboardList /> Complaints by Category
            </h2>
            <Bar data={categoryChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
