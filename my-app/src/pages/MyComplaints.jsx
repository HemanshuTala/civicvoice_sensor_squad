import React from "react";
import { Helmet } from "react-helmet";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
} from "react-icons/fa";

const MyComplaints = () => {
  // Sample Complaints Data
  const complaints = [
    {
      image: "https://images.stockcake.com/public/8/a/1/8a189531-e79f-4452-a927-8c92b436e740_large/holding-clogged-pipe-stockcake.jpg",
      name: "Water Leakage in Bathroom",
      description:
        "There's a continuous water leakage in the second-floor bathroom, causing inconvenience to all students.",
      complaintDate: "2025-01-20",
      status: "In Progress",
      deadline: "2025-01-25",
    },
    {
      image: "https://images.stockcake.com/public/8/a/1/8a189531-e79f-4452-a927-8c92b436e740_large/holding-clogged-pipe-stockcake.jpg",
      name: "Broken Chair in Library",
      description:
        "Several chairs in the library are broken, making it difficult to use them for studying.",
      complaintDate: "2025-01-18",
      status: "Resolved",
      deadline: "2025-01-22",
    },
    {
      image: "https://images.stockcake.com/public/8/a/1/8a189531-e79f-4452-a927-8c92b436e740_large/holding-clogged-pipe-stockcake.jpg",
      name: "AC Not Working in Lab",
      description:
        "The air conditioner in Lab 2 is not cooling properly, making it uncomfortable for students during practicals.",
      complaintDate: "2025-01-15",
      status: "In Progress",
      deadline: "2025-01-28",
    },
    {
      image: "https://images.stockcake.com/public/8/a/1/8a189531-e79f-4452-a927-8c92b436e740_large/holding-clogged-pipe-stockcake.jpg",
      name: "Unclean Mess Area",
      description:
        "The dining tables and surrounding areas in the mess are not cleaned regularly.",
      complaintDate: "2025-01-12",
      status: "Resolved",
      deadline: "2025-01-16",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 font-poppins">
      {/* Helmet for Fonts */}
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
        My Complaints
      </h1>

      {/* Complaints Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
        {complaints.map((complaint, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            {/* Image */}
            <img
              src={complaint.image}
              alt={complaint.name}
              className="w-full h-48 object-cover"
            />

            {/* Complaint Details */}
            <div className="p-4">
              {/* Complaint Title */}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {complaint.name}
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">
                {complaint.description}
              </p>

              {/* Complaint Info with Icons */}
              <div className="text-sm text-gray-500 space-y-3">
                {/* Complaint Date */}
                <p className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-green-500" />
                  <span className="font-medium text-gray-700">
                    Complaint Date:
                  </span>{" "}
                  {complaint.complaintDate}
                </p>

                {/* Status */}
                <p className="flex items-center">
                  {complaint.status === "Resolved" ? (
                    <FaCheckCircle className="mr-2 text-green-500" />
                  ) : (
                    <FaExclamationCircle className="mr-2 text-red-500" />
                  )}
                  <span className="font-medium text-gray-700">Status:</span>{" "}
                  {complaint.status}
                </p>

                {/* Deadline */}
                <p className="flex items-center">
                  <FaClock className="mr-2 text-blue-500" />
                  <span className="font-medium text-gray-700">Deadline:</span>{" "}
                  {complaint.deadline}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyComplaints;
