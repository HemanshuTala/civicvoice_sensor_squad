import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaCheckCircle, FaThumbsUp, FaUserClock } from "react-icons/fa"; // Icons
import { Helmet } from "react-helmet"; // For adding the helmet tag

const ViewPage = () => {
  const urlObj = new URL(window.location.href);

  // Get the 'id' query parameter
  const id = urlObj.searchParams.get("id");

  console.log(id); // Outputs: CMP-1738389350163-1773

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
      console.log(data);
      setComplaints(data.data || []); // Extract 'data' array
    } catch (err) {
      console.error(err);
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
    <div className="min-h-screen bg-gray-100 flex justify-center py-12">
      <Helmet>
        <title>Complaint Details</title>
        <meta name="description" content="View detailed information about the complaint." />
      </Helmet>

      <div className="bg-white w-full max-w-screen-xl rounded-lg shadow-lg p-8 lg:p-16 space-y-8">
        <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-x-12 lg:space-y-0">
          {/* Complaint Image */}
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${complaint.image.replace("public\\", "")}`}
            alt="Complaint"
            className="w-full lg:w-2/5 h-auto rounded-lg border-4 border-gray-300 object-cover shadow-xl"
          />
          {/* Complaint Details */}
          <div className="lg:w-3/5 flex flex-col justify-between space-y-6">
            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800">{complaint.name}</h1>
            <p className="text-sm text-gray-500">Complaint No: {complaint.complainNo}</p>
            <p className="text-lg text-gray-700">{complaint.description}</p>
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
            {/* Take Action Button */}
            {/* <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300 ease-in-out">
              Take Action
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
