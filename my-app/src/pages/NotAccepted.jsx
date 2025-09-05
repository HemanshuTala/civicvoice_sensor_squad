import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaPen, FaMapMarkedAlt, FaRegEnvelope, FaListAlt, FaImage, FaEye, FaRegComment, FaPaperPlane, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CompletedComplaints() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newStatus, setNewStatus] = useState("");

  // New states for modal visibility and data
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [acceptDate, setAcceptDate] = useState("");
  const [acceptDescription, setAcceptDescription] = useState("");
  const [rejectDescription, setRejectDescription] = useState("");

  // timeframe filters
  const [quickRange, setQuickRange] = useState("All"); // All, 7d, 30d, YTD
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleAcceptModal = (complainNo) => {
    const complaint = complaints.find(c => c.complainNo === complainNo);
    setSelectedComplaint(complaint);
    setIsAcceptModalOpen(true);
  };

  const handleRejectModal = (complaint) => {
    setSelectedComplaint(complaint);
    setIsRejectModalOpen(true);
  };

  const handleSaveAccept = () => {
    const complainNo = selectedComplaint.complainNo;
    sendAcceptStatus(complainNo, acceptDate, acceptDescription);
  };

  const handleSaveReject = async () => {
    if (!rejectDescription) {
      alert("Please provide a rejection description.");
      return;
    }
    await sendRejectStatus(selectedComplaint.complainNo, rejectDescription);
  };

  const handleViewDetails = (complaint) => {
    navigate("/admin/complaints/view?id=" + complaint);
  };

  const sendAcceptStatus = async (complainNo, acceptDate, acceptDescription) => {
    if (!acceptDate || !acceptDescription) {
      alert("Please fill out all fields");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/complain/accept`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ complainNo, deadline: acceptDate, description: acceptDescription }),
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      fetchComplaints();
      setIsAcceptModalOpen(false);
    } catch (error) {
      setError("Failed to accept the complaint. Please try again.");
    }
  };

  const sendRejectStatus = async (complainNo, rejectDescription) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/complain/reject`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ complainNo, description: rejectDescription }),
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      fetchComplaints();
      setIsRejectModalOpen(false);
    } catch (error) {
      setError("Failed to reject the complaint. Please try again.");
    }
  };

  const fetchComplaints = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/complain/get-by-status?status=Not Accepted`,
        { method: "GET", credentials: "include" }
      );

      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      const data = await response.json();
      setComplaints(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchComplaints(); }, []);

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
    <div className="min-h-screen py-8 px-4 md:px-6 font-poppins bg-gray-100">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
        />
      </Helmet>

      <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2 text-center">
        Not Accepted Complaints
      </h1>
      <p className="text-md md:text-lg text-gray-600 mb-6 text-center">
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
            <option value="Not Accepted">Not Accepted</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
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
        <table className="w-full text-sm table-auto">
          <thead className="bg-green-600 text-white">
            <tr className="text-left">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Deadline</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Votes</th>
              <th className="py-3 px-4">Complaint No.</th>
              <th className="py-3 px-4">Action by SA</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {Array.isArray(filteredComplaints) && filteredComplaints.length > 0 ? (
              filteredComplaints.map((complaint) => (
                <tr key={complaint.complainNo} className="hover:bg-gray-100 border-b">
                  <td className="py-3 px-4">{complaint.name}</td>
                  <td className="py-3 px-4">
                    {complaint.description.length > 50 ? `${complaint.description.slice(0, 50)}...` : complaint.description}
                  </td>
                  <td className="py-3 px-4">
                    <img
                      src={`http://localhost:8000/${complaint.image.replace("public\\", "")}`}
                      alt="complaint"
                      className="w-12 h-12 rounded-full object-cover shadow-lg"
                    />
                  </td>
                  <td className="py-3 px-4">{complaint.deadline}</td>
                  <td className="py-3 px-4">
                    <div className="max-w-[120px] w-full flex justify-center">
                      <span
                        className={`w-full text-center px-4 py-2 rounded-lg font-medium text-sm shadow-md ${complaint.status === "Completed"
                          ? "bg-green-100 text-green-700 border border-green-500"
                          : complaint.status === "Rejected"
                            ? "bg-red-100 text-red-700 border border-red-500"
                            : "bg-yellow-100 text-yellow-700 border border-yellow-500"
                          }`}
                      >
                        {complaint.status}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    {complaint.voteCount}
                  </td>
                  <td className="py-3 px-4">{complaint.complainNo}</td>
                  <td className="py-3 px-4">{complaint.actionBySA}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(complaint.complainNo)}
                      className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition shadow-lg"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleAcceptModal(complaint.complainNo)}
                      className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition shadow-lg"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleRejectModal(complaint)}
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition shadow-lg"
                    >
                      <FaTimes />
                    </button>
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

      {/* Accept Complaint Modal */}
      {isAcceptModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Accept Complaint</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Deadline</label>
              <input
                type="date"
                value={acceptDate}
                onChange={(e) => setAcceptDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={acceptDescription}
                onChange={(e) => setAcceptDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
            </div>
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => setIsAcceptModalOpen(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAccept}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Complaint Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Reject Complaint</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={rejectDescription}
                onChange={(e) => setRejectDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
            </div>
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => setIsRejectModalOpen(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveReject}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompletedComplaints;
