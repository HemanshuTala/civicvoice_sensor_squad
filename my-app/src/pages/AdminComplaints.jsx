import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa"; // Importing icons

// Example data with Yes/No voting
const complaintsData = [
  {
    id: 1,
    name: "John Doe",
    description: "Issue with the cafeteria food",
    image: "https://via.placeholder.com/50",
    deadline: "2025-02-01",
    status: "Pending",
    yesVotes: 5,
    noVotes: 3,
    complaintNo: "CPL1234",
    actionBySA: "SA1",
    createdAt: "2025-01-10",
  },
  {
    id: 2,
    name: "Jane Smith",
    description: "Water leakage in Block B",
    image: "https://via.placeholder.com/50",
    deadline: "2025-01-28",
    status: "Resolved",
    yesVotes: 7,
    noVotes: 2,
    complaintNo: "CPL5678",
    actionBySA: "SA2",
    createdAt: "2025-01-05",
  },
  // More complaints...
];

function AdminComplaints() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [complaints, setComplaints] = useState(complaintsData);
  const [editStatusId, setEditStatusId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  // timeframe filters
  const [quickRange, setQuickRange] = useState("All"); // All, 7d, 30d, YTD
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleStatusChange = (e) => setStatusFilter(e.target.value);
  const handleEditStatus = (id) => setEditStatusId(id);
  const handleSaveStatus = (id) => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, status: newStatus || complaint.status } : complaint
    );
    setComplaints(updatedComplaints);
    setEditStatusId(null); // Close the editing modal
  };

  const handleRejectStatus = (id) => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, status: "Rejected" } : complaint
    );
    setComplaints(updatedComplaints);
    setEditStatusId(null); // Close the editing modal
  };

  const handleAcceptStatus = (id) => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, status: "Resolved" } : complaint
    );
    setComplaints(updatedComplaints);
  };

  const withinDateRange = (createdAt) => {
    const created = new Date(createdAt);

    // Quick ranges
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

    // Custom range
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

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.name.toLowerCase().includes(search.toLowerCase()) ||
      complaint.complaintNo.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || complaint.status === statusFilter;
    const matchesDate = withinDateRange(complaint.createdAt || complaint.deadline);
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-poppins" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
        />
      </Helmet>

      <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-3 text-center " style={{ fontFamily: 'Poppins, sans-serif' }}>
        Complaints Management
      </h1>
      <p className="text-base sm:text-lg text-gray-600 mb-6 text-center">
        Review, manage, and resolve user complaints effectively.
      </p>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <input
            type="text"
            placeholder="Search by Name or Complaint ID"
            value={search}
            onChange={handleSearchChange}
            className="p-3 border border-gray-300 rounded-lg w-full sm:w-80 focus:ring-2 focus:ring-green-500 shadow-sm"
          />
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="p-3 border border-gray-300 rounded-lg w-full sm:w-48 focus:ring-2 focus:ring-green-500 shadow-sm"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={quickRange}
            onChange={(e) => setQuickRange(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 shadow-sm"
          >
            <option value="All">All Time</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="YTD">Year to date</option>
          </select>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 shadow-sm"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
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
            {filteredComplaints.map((complaint) => (
              <tr
                key={complaint.id}
                className="hover:bg-green-50 border-b transition-all duration-300"
              >
                <td className="py-4 px-6">{complaint.name}</td>
                <td className="py-4 px-6 max-w-xs md:max-w-md truncate" title={complaint.description}>{complaint.description}</td>
                <td className="py-4 px-6">
                  <img
                    src={complaint.image}
                    alt="complaint"
                    className="w-12 h-12 rounded-full object-cover shadow-lg"
                  />
                </td>
                <td className="py-4 px-6">{complaint.deadline}</td>
                <td className="py-4 px-6">
                  <span
                    className={`${
                      complaint.status === "Resolved"
                        ? "bg-green-500"
                        : complaint.status === "Rejected"
                        ? "bg-red-500"
                        : complaint.status === "Completed"
                        ? "bg-emerald-500"
                        : "bg-yellow-500"
                    } text-white px-3 py-1 rounded-full shadow-md`}
                  >
                    {complaint.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  Yes: {complaint.yesVotes} | No: {complaint.noVotes}
                </td>
                <td className="py-4 px-6">{complaint.complaintNo}</td>
                <td className="py-4 px-6">{complaint.actionBySA}</td>
                <td className="py-4 px-6 space-x-3">
                  <button
                    onClick={() => handleEditStatus(complaint.id)}
                    className="bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition duration-300 shadow-sm"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleAcceptStatus(complaint.id)}
                    className="bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition duration-300 shadow-sm"
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={() => handleRejectStatus(complaint.id)}
                    className="bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition duration-300 shadow-sm"
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Status Modal */}
      {editStatusId !== null && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg transform transition duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-center">Edit Status</h2>
            <div className="mb-4">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
              >
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => setEditStatusId(null)}
                className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveStatus(editStatusId)}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
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

export default AdminComplaints;
