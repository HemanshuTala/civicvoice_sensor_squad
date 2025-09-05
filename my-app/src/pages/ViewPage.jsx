import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaCheckCircle, FaThumbsUp, FaUserClock } from "react-icons/fa"; // Icons
import { Helmet } from "react-helmet"; // For adding the helmet tag

const ViewPage = () => {
  const urlObj = new URL(window.location.href);

  // Get the 'id' query parameter
  const id = urlObj.searchParams.get("id");

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async (queryParams = {}) => {
    setLoading(true);
    setError(null); // Reset error state before each fetch

    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/complain/query-get?complain_no=${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setComplaints(data.data || []); // Extract 'data' array
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Show error message if there is an error
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  // If there are no complaints, show a message
  if (complaints.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>No complaints found.</p>
      </div>
    );
  }

  // If complaints data is available, display it
  const complaint = complaints[0];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 md:py-12 px-4">
      <Helmet>
        <title>Complaint Details</title>
        <meta name="description" content="View detailed information about the complaint." />
      </Helmet>

      <div className="bg-white w-full max-w-screen-xl rounded-lg shadow-lg p-6 md:p-8 lg:p-12 space-y-8">
        {/* Summary Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-green-50 border border-green-100 rounded-xl p-4">
            <div className="text-xs text-gray-500">Complaint No</div>
            <div className="text-lg font-semibold text-gray-800">{complaint.complainNo}</div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <div className="text-xs text-gray-500">Deadline</div>
            <div className="text-lg font-semibold text-gray-800">{complaint.deadline}</div>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <div className="text-xs text-gray-500">Status</div>
            <div className="text-lg font-semibold text-gray-800">{complaint.status}</div>
          </div>
          <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
            <div className="text-xs text-gray-500">Votes</div>
            <div className="text-lg font-semibold text-gray-800">{complaint.voteCount}</div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
          {/* Complaint Image */}
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${complaint.image.replace("public\\", "")}`}
            alt="Complaint"
            className="w-full lg:w-2/5 h-auto rounded-lg border-4 border-gray-300 object-cover shadow-xl"
          />
          {/* Complaint Details */}
          <div className="lg:w-3/5 flex flex-col justify-between space-y-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800">{complaint.name}</h1>
            <p className="text-sm text-gray-500">Complaint No: {complaint.complainNo}</p>
            <p className="text-base md:text-lg text-gray-700">{complaint.description}</p>
            {/* Details Section */}
            <div className="text-gray-600 space-y-4">
              <div className="flex items-center space-x-3">
                <FaCalendarAlt className="text-blue-500 text-xl" />
                <p className="text-lg"><strong>Deadline:</strong> {complaint.deadline}</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaCheckCircle className="text-green-500 text-xl" />
                <p className="text-lg"><strong>Status:</strong> {complaint.status}</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaThumbsUp className="text-yellow-500 text-xl" />
                <p className="text-lg"><strong>Votes:</strong> {complaint.voteCount}</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaUserClock className="text-gray-500 text-xl" />
                <p className="text-lg"><strong>Action by SA:</strong> {complaint.actionBySA}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
