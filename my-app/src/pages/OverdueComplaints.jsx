import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaPen, FaMapMarkedAlt, FaRegEnvelope, FaListAlt, FaImage, FaRegComment, FaPaperPlane, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import * as jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
function CompletedComplaints() {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newStatus, setNewStatus] = useState("");

  // Popup state
  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [newDeadline, setNewDeadline] = useState("");

  // timeframe filters
  const [quickRange, setQuickRange] = useState("All"); // All, 7d, 30d, YTD
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const token = Cookies.get("token"); // Get the token from cookies
    if (token) {
      if (jwt_decode.jwtDecode(token).role === "superadmin") {
        setIsSuperAdmin(true);
      }
    }
  }, []);
  // Function to handle extending the deadline
  const handleExtendDeadline = async () => {
    if (!newDeadline || !selectedComplaint) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/complain/extend-deadline`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ complainNo: selectedComplaint.complainNo, date: newDeadline }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data.success) {
        alert("Deadline extended successfully!");
        window.location.reload();
        fetchComplaints(); // Reload complaints after extending the deadline
      } else {
        alert("Failed to extend deadline");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setShowModal(false); // Close the modal after submission
    }
  };

  // Fetch complaints from API
  const fetchComplaints = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`http://localhost:8000/api/complain/get-overdue-complain`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setComplaints(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch complaints on mount
  useEffect(() => {
    fetchComplaints();
  }, []);

  const withinDateRange = (dateStr) => {
    const created = new Date(dateStr);
    const now = new Date();
    if (quickRange === "7d") {
      const cutoff = new Date();
      cutoff.setDate(now.getDate() - 7);
      if (created < cutoff) return false;
    } else if (quickRange === "30d") {
      const cutoff = new Date();
      cutoff.setDate(now.getDate() - 30);
      if (created < cutoff) return false;
    } else if (quickRange === "YTD") {
      const cutoff = new Date(now.getFullYear(), 0, 1);
      if (created < cutoff) return false;
    }
    if (fromDate) {
      const from = new Date(fromDate);
      if (created < from) return false;
    }
    if (toDate) {
      const to = new Date(toDate);
      to.setHours(23, 59, 59, 999);
      if (created > to) return false;
    }
    return true;
  };

  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch = c.name?.toLowerCase().includes(search.toLowerCase()) || c.complainNo?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    const dateField = c.deadline || c.createdAt || c.updatedAt || new Date().toISOString();
    const matchesDate = dateField ? withinDateRange(dateField) : true;
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 font-poppins" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
        />
      </Helmet>

      <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-2 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Overdue Complaints
      </h1>
      <p className="text-base sm:text-lg text-gray-600 mb-6 text-center">
        Review, manage, and resolve user complaints effectively.
      </p>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Name or Complaint No"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="All">All Statuses</option>
            <option value="Overdue">Overdue</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            value={quickRange}
            onChange={(e) => setQuickRange(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="All">All Time</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="YTD">Year to date</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
          <span className="text-gray-500">to</span>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
        </div>
      </div>

      {/* Complaints Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg max-w-6xl mx-auto">
        <table className="min-w-full text-sm table-auto">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-4 px-6 text-left">Name</th>
              <th className="py-4 px-6 text-left">Description</th>
              <th className="py-4 px-6 text-left">Image</th>
              <th className="py-4 px-6 text-left">Deadline</th>
              <th className="py-4 px-6 text-left">Status</th>
              <th className="py-4 px-6 text-left">Votes</th>
              <th className="py-4 px-6 text-left">Complaint No.</th>
              <th className="py-4 px-6 text-left">Action by SA</th>
              <th className="py-4 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {Array.isArray(filteredComplaints) && filteredComplaints.length > 0 ? (
              filteredComplaints.map((complaint) => (
                <tr
                  key={complaint.complainNo}
                  className="hover:bg-green-50 border-b transition-all duration-300"
                >
                  <td className="py-4 px-6">{complaint.name}</td>
                  <td className="py-4 px-6">{complaint.description.length > 50
                    ? `${complaint.description.substring(0, 50)}...`
                    : complaint.description}</td>
                  <td className="py-4 px-6">
                    <img
                      src={`http://localhost:8000/${complaint.image.replace("public\\", "")}`}
                      alt="complaint"
                      className="w-12 h-12 rounded-full object-cover shadow-lg"
                    />
                  </td>
                  <td className="py-4 px-6">{complaint.deadline}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`${complaint.status === "Completed"
                          ? "bg-green-500"
                          : complaint.status === "Overdue"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        } text-white px-3 py-1 rounded-full shadow-md`}
                    >
                      {complaint.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {complaint.voteCount}
                  </td>
                  <td className="py-4 px-6">{complaint.complainNo}</td>
                  <td className="py-4 px-6">{complaint.actionBySA}</td>
                  <td className="py-4 px-6 space-x-3">
                    {isSuperAdmin ? (
                      <button
                        onClick={() => {
                          setSelectedComplaint(complaint);
                          setShowModal(true); // Show the modal when clicked
                        }}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 shadow-lg"
                      >
                        Extend Deadline
                      </button>
                    ) : (
                      <span>No action allowed</span>
                    )}

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-6 text-center text-gray-500">
                  No complaints found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for New Deadline */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Extend Deadline</h2>
            <div className="mb-4">
              <label htmlFor="newDeadline" className="block text-gray-700">New Deadline</label>
              <input
                type="date"
                id="newDeadline"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleExtendDeadline}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompletedComplaints;
