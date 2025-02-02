import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaPen, FaMapMarkedAlt, FaRegEnvelope, FaListAlt, FaImage, FaRegComment, FaPaperPlane, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

function CompletedComplaints() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pending"); // Default status
  const [complaints, setComplaints] = useState([]);
  const [editStatusId, setEditStatusId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const handleEditStatus = (id) => setEditStatusId(id);

  const handleSaveStatus = (id) => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, status: newStatus } : complaint
    );
    setComplaints(updatedComplaints);
    setEditStatusId(null); // Close the editing modal

    // Refetch complaints after saving
    fetchComplaints();
  };

  const handleRejectStatus = (id) => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, status: "Rejected" } : complaint
    );
    setComplaints(updatedComplaints);
    setEditStatusId(null); // Close the editing modal

    // Refetch complaints after rejecting
    fetchComplaints();
  };

  const handleAcceptStatus = (id) => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, status: "Resolved" } : complaint
    );
    setComplaints(updatedComplaints);

    // Refetch complaints after accepting
    fetchComplaints();
  };

  // Fetch complaints from API
  const fetchComplaints = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`http://localhost:8000/api/complain/get-by-status?status=Completed`, {
        method: "GET",
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

  // Fetch complaints on mount and when statusFilter changes
  useEffect(() => {
    fetchComplaints();
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
        Complete Complaints
      </h1>
      <p className="text-lg text-gray-600 mb-6 text-center">Review, manage, and resolve user complaints effectively.</p>

      {/* Search and Filter Section */}
      <div className="flex justify-between mb-6">
        {/* Empty div for spacing, can be extended later */}
        <div></div>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 w-12 h-12"></div>
          <span>Loading complaints...</span>
        </div>
      ) : (
        // Complaints Table only shows when loading is false
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg max-w-6xl mx-auto">
          <table className="w-full text-sm table-auto">
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
              {Array.isArray(complaints) && complaints.length > 0 ? (
                complaints.map((complaint) => (
                  <tr key={complaint.complainNo} className="hover:bg-blue-50 border-b transition-all duration-300">
                    <td className="py-4 px-6">{complaint.name}</td>
                    <td className="py-4 px-6">
                      {complaint.description.length > 50
                        ? `${complaint.description.substring(0, 50)}...`
                        : complaint.description}
                    </td>

                    <td className="py-4 px-6">
                      <img
                        src={`http://localhost:8000/${complaint.image.replace("public\\", "")}`}
                        alt="complaint"
                        className="w-12 h-12 rounded-full object-cover shadow-lg"
                      />
                    </td>
                    <td className="py-4 px-6">{complaint.deadline !== "Not set" && (
                      <p >


                        {complaint.deadline.replace(/[a-zA-Z].*/, '')}
                      </p>
                    )}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`${complaint.status === "Completed"
                            ? "bg-green-500"
                            : complaint.status === "Rejected"
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
                      {Boolean(complaint.isSuperCompleted) ? (
                        <span className="text-green-500">Completed</span>
                      ) : (
                        <span className="text-yellow-500">Pending Approval</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-6 text-center text-gray-500 flex justify-center items-center">
                    No complaints found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* Edit Status Modal */}
      {editStatusId !== null && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg transform transition duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-center">Edit Status</h2>
            <div className="mb-4">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500"
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
