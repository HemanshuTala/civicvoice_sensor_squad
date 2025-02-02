import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaPen, FaMapMarkedAlt, FaRegEnvelope, FaListAlt, FaImage, FaRegComment, FaPaperPlane, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

function CompletedComplaints() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null); // Store selected complaint
  const [modalOpen, setModalOpen] = useState(false); // Control modal visibility
  const [updatedImage, setUpdatedImage] = useState(null); // Track updated image file
  const [updatedDescription, setUpdatedDescription] = useState(""); // Track updated description

  const handleSetCompleted = (complaintNo) => {
    // Find the complaint by complaintNo and set the modal form
    const complaint = complaints.find(c => c.complainNo === complaintNo);
    setSelectedComplaint(complaint);
    setUpdatedImage(null); // Reset image input field
    setUpdatedDescription(""); // Reset description input field
    setModalOpen(true); // Open the modal
  };

  const handleImageChange = (e) => {
    setUpdatedImage(e.target.files[0]); // Set the selected file to state
  };

  const handleConfirmCompleted = async () => {
    if (!updatedImage) {
      setError("Please upload an image.");
      return;
    }
  
    try {
      setLoading(true);
  
      // Create FormData to send both image and description
      const formData = new FormData();
      formData.append("complainNo", selectedComplaint.complainNo); // Add complaint number
      formData.append("image", updatedImage); // Add the image file
      formData.append("description", updatedDescription); // Add the description
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/complain/setCompleted`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
  
      if (response.ok) {
        // Update the complaint status to "Completed" locally
        const updatedComplaints = complaints.map((complaint) =>
          complaint.complainNo === selectedComplaint.complainNo ? { ...complaint, status: "Completed", image: updatedImage.name, description: updatedDescription } : complaint
        );
        setComplaints(updatedComplaints);
        setModalOpen(false); // Close the modal after successful update
  
        // Reload the page to fetch fresh data
        window.location.reload();
      } else {
        console.error("Failed to set status to Completed:", response.statusText);
        setError("Failed to update status to Completed");
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  

  const handleRejectCompleted = () => {
    setModalOpen(false); // Close the modal if rejected
  };

  // Fetch complaints from API
  const fetchComplaints = async () => {
    setLoading(true);
    setError("");

    // Initialize the complaints array
    let combinedComplaints = [];

    try {
      // Fetch Pending complaints
      const pendingResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/complain/get-by-status?status=Pending`, {
        method: "GET",
        credentials: "include",
      });

      if (pendingResponse.ok) {
        const pendingData = await pendingResponse.json();
        if (Array.isArray(pendingData.data)) {
          combinedComplaints = combinedComplaints.concat(pendingData.data);
        }
      } else {
        console.error("Error fetching Pending complaints:", pendingResponse.statusText);
      }

      // Fetch Accepted complaints
      const acceptedResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/complain/get-by-status?status=Accepted`, {
        method: "GET",
        credentials: "include",
      });

      if (acceptedResponse.ok) {
        const acceptedData = await acceptedResponse.json();
        if (Array.isArray(acceptedData.data)) {
          combinedComplaints = combinedComplaints.concat(acceptedData.data);
        }
      } else {
        console.error("Error fetching Accepted complaints:", acceptedResponse.statusText);
      }

      // Update the state with the combined data from both responses
      setComplaints(combinedComplaints);
    } catch (err) {
      setError(`Failed to fetch complaints: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch complaints on mount and when statusFilter changes
  useEffect(() => {
    fetchComplaints();
  }, []);

  // Log complaints state for debugging
  useEffect(() => {
    console.log(complaints); // Check the complaints state after fetching
  }, [complaints]);

  // Helper function to truncate text for description
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "..."; // Truncate and add ellipsis
    }
    return text;
  };

  return (
    <div className="min-h-screen py-8 px-6 font-poppins" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" />
      </Helmet>

      <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
      Pending Complaints
      </h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Review, manage, and resolve user complaints effectively.
      </p>

      {/* Conditionally render table or loading spinner */}
      {loading ? (
        <div className="text-center text-blue-500">Loading...</div> // Show loading message while loading
      ) : (
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
                    <td className="py-4 px-6">{truncateText(complaint.description, 50)}</td>
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
                        className={`${complaint.status === "Accepted"
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
                      {Boolean(complaint.isSuperApproved) ? (
                        <button
                          onClick={() => handleSetCompleted(complaint.complainNo)}
                          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 shadow-lg"
                        >
                          Set Completed
                        </button>
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

      {/* Error Handling */}
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}

      {/* Modal for Setting Completed */}
      {modalOpen && selectedComplaint && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">Set Complaint as Completed</h2>
            <div className="mb-4">
              <strong>Image:</strong>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <strong>Description:</strong>
              <textarea
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleRejectCompleted}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmCompleted}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompletedComplaints;
