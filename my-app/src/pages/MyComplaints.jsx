import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaMapMarkedAlt,
  FaThumbsUp,
} from "react-icons/fa";

const MyComplaints = () => {
  // State to store complaints data
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch complaints data from API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/complain/get-user-complains`, {
      method: "GET",
      credentials: "include", // Include cookies with the request
    })
      .then((response) => {
        console.log("Response status:", response.status);  // Check the response status
        if (!response.ok) {
          throw new Error(`Failed to fetch complaints: ${response.statusText}`);
        }
        if (response.headers.get("Content-Type").includes("application/json")) {
          return response.json();
        } else {
          throw new Error("Expected JSON response");
        }
      })
      .then((data) => {
        // Access the data field (assuming complaints are inside 'data' and are in an array)
        if (data.statusCode === 200) {
          setComplaints(data.data); // Set the 'data' property (contains complaints)
          console.log("Response data:", data.data); // Log the full response structure
          setLoading(false);
        } else {
          // Handle unexpected status codes (e.g., if the API responds with something other than 200)
          setError(data.message || "Failed to fetch complaints.");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error occurred:", err);  // More detailed error log
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty array ensures this runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full px-4 py-8 font-poppins">
      {/* Helmet for Fonts */}
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6 relative" style={{ fontFamily: "Poppins, sans-serif" }}>
        My Complaint
        <span className="block w-24 h-1 bg-green-500 mx-auto mt-2"></span>
      </h1>

      {/* Complaints Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
  {complaints.map((complaint, index) => (
    <div
      key={index}
      className="bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl overflow-hidden border border-gray-200 transition-all transform hover:scale-[1.04] "
    >
      {/* Image Section with Overlay */}
      <div className="relative overflow-hidden">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/` + complaint.image.replace("public\\", "")}
          alt={complaint.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-lg font-semibold px-4 py-2">
          {complaint.name}
        </div>
      </div>

      {/* Complaint Details */}
      <div className="p-6 space-y-4">
        {/* Complaint Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {complaint.description}
        </p>

        {/* Complaint Info with Icons */}
        <div className="text-sm text-gray-500 space-y-3">
          {/* Address */}
          <p className="flex items-center gap-2">
            <FaMapMarkedAlt className="text-blue-500" />
            <span className="font-medium text-gray-700">Address:</span> {complaint.area}, {complaint.district}, {complaint.pincode}
          </p>
          
          {/* Complaint Date */}
          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-green-500" />
            <span className="font-medium text-gray-700">Date:</span> {complaint.complaintDate}
          </p>

          {/* Status Badge */}
          <p className="flex items-center gap-2">
            {complaint.status === "Resolved" ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaExclamationCircle className="text-red-500" />
            )}
            <span className={`font-semibold px-3 py-1 rounded-full text-sm ${complaint.status === "Resolved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {complaint.status}
            </span>
          </p>

          {/* Vote Count */}
          <p className="flex items-center gap-2">
            <FaThumbsUp className="text-pink-500" />
            <span className="font-medium text-gray-700">Votes:</span> {complaint.voteCount}
          </p>

          {/* Deadline */}
          {complaint.deadline !== "Not set" && (
  <p className="flex items-center gap-2">
    <FaClock className="text-blue-500" />
    <span className="font-medium text-gray-700">Deadline:</span> 
    {complaint.deadline.replace(/[a-zA-Z].*/, '')}
  </p>
)}

        </div>

        
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default MyComplaints;
