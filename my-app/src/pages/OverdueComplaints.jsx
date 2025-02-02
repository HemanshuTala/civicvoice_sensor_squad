import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaPen, FaMapMarkedAlt, FaRegEnvelope, FaListAlt, FaImage, FaRegComment, FaPaperPlane, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import * as jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
function CompletedComplaints() {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pending"); // Default status
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newStatus, setNewStatus] = useState("");

  // Popup state
  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [newDeadline, setNewDeadline] = useState("");

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

  return (
    <div className="min-h-screen py-8 px-6 font-poppins" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
        />
      </Helmet>

      <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Overdue Complaints
      </h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Review, manage, and resolve user complaints effectively.
      </p>

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
            {Array.isArray(complaints) && complaints.length > 0 ? (
              complaints.map((complaint) => (
                <tr
                  key={complaint.complainNo}
                  className="hover:bg-blue-50 border-b transition-all duration-300"
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
                <td colSpan="7" className="py-6 text-center text-gray-500">
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
