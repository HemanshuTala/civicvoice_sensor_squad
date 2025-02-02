import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaPen, FaMapMarkedAlt, FaRegEnvelope, FaListAlt, FaImage, FaRegComment, FaPaperPlane, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

function CompletedComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch complaints from API
  const fetchComplaints = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8000/api/complain/complete/approval", {
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

  // Handle Approve button
  const handleApprove = async (complainNo) => {
    try {
      const response = await fetch("http://localhost:8000/api/complain/complete/approval/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ complainNo }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to approve the complaint");
      }

      // After successfully approving, reload the page to refresh the complaint list
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle Reject button
  const handleReject = async (complainNo) => {
    try {
      const response = await fetch("http://localhost:8000/api/complain/complete/approval/reject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ complainNo }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to reject the complaint");
      }

      // After successfully rejecting, reload the page to refresh the complaint list
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="min-h-screen py-8 px-6 font-poppins" style={{ fontFamily: "Poppins, sans-serif" }}>
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" />
      </Helmet>

      <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
       Complete Approval
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
            {complaints.length > 0 ? (
              complaints.map((complaint) => (
                <tr key={complaint.complainNo} className="hover:bg-blue-50 border-b transition-all duration-300">
                  <td className="py-4 px-6">{complaint.name}</td>
                  <td className="py-4 px-6">{complaint.description}</td>
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
                      className={`${
                        complaint.status === "Completed"
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
                    Yes: {complaint.yesVotes} | No: {complaint.noVotes}
                  </td>
                  <td className="py-4 px-6">{complaint.complainNo}</td>
                  <td className="py-4 px-6">{complaint.actionBySA}</td>
                  <td className="py-4 px-6 space-x-3">
                    <button
                      onClick={() => handleApprove(complaint.complainNo)}
                      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 shadow-lg"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleReject(complaint.complainNo)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 shadow-lg"
                    >
                      <FaTimes />
                    </button>
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
    </div>
  );
}

export default CompletedComplaints;
