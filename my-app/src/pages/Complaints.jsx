import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa"; // Importing icons

function Complaints() {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: "Road Maintenance Required",
      description: "The main road in our area has large potholes causing inconvenience.",
      image: "https://www.shutterstock.com/image-photo/close-leak-ruin-valve-old-600nw-205724125.jpg",
      votes: { yes: 10, no: 3 },
      status: "pending",
      voted: false,
      district: "Sector 1",
    },
    {
      id: 2,
      title: "Electricity Issue in Sector 5",
      description: "Frequent power outages are disrupting daily activities in Sector 5.",
      image: "https://image.cdn.ishopastro.com/eyJidWNrZXQiOiJwcm9kLW1lZGlhLW15c2hvcGFzdHJvLWNvbSIsImtleSI6IjY3MzAzMDI1MDkwMDM2NS9zdGF0aWMtcmVzLzRmNDQwY2JjNzQ1MzkzOTQ4Njg4MzQzLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6OTAwLCJmaXQiOiJjb3ZlciJ9LCJyb3RhdGUiOm51bGx9fQ==",
      votes: { yes: 5, no: 1 },
      status: "solved",
      voted: false,
      district: "Sector 5",
    },
    {
      id: 3,
      title: "Water Leakage in Block A",
      description: "There is a persistent water leakage causing wastage in Block A.",
      image: "https://media.istockphoto.com/id/157376761/photo/close-up-of-drain-pipe-leaking-water.jpg?s=612x612&w=0&k=20&c=QD8uZtE5FPU-jyKNeNa0CvQmMM9GsqLV3YKFJGsY0nI=",
      votes: { yes: 8, no: 2 },
      status: "pending",
      voted: false,
      district: "Block A",
    },
  ]);

  const [filterOption, setFilterOption] = useState("complaintNo");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [complaintNo, setComplaintNo] = useState("");

  const handleVote = (id, type) => {
    setComplaints((prevComplaints) =>
      prevComplaints.map((complaint) =>
        complaint.id === id
          ? {
              ...complaint,
              votes: {
                ...complaint.votes,
                [type]: complaint.votes[type] + 1,
              },
              voted: true,
            }
          : complaint
      )
    );
  };

  const totalComplaints = complaints.length;
  const solvedComplaints = complaints.filter((complaint) => complaint.status === "solved").length;
  const pendingComplaints = complaints.filter((complaint) => complaint.status === "pending").length;

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Helmet for adding external fonts */}
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div className="p-8 text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
        <h1 className="text-4xl font-bold text-gray-800">Complaints</h1>
        <p className="mt-4 text-lg text-gray-600">View all complaints here.</p>
      </div>

      {/* Filter Dropdown */}
      <div className="p-8 flex justify-center gap-4">
        <select
          onChange={(e) => setFilterOption(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="complaintNo">Filter by Complaint No</option>
          <option value="district">Filter by District</option>
        </select>

        {filterOption === "district" ? (
          <select
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">Select District</option>
            <option value="Sector 1">Sector 1</option>
            <option value="Sector 5">Sector 5</option>
            <option value="Block A">Block A</option>
          </select>
        ) : (
          <input
            type="text"
            placeholder="Enter Complaint No"
            value={complaintNo}
            onChange={(e) => setComplaintNo(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />
        )}
      </div>

      {/* Complaints Cards */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ fontFamily: "Poppins, sans-serif" }}>
        {complaints
          .filter(
            (complaint) =>
              (filterOption === "complaintNo" &&
                complaint.id.toString().includes(complaintNo)) ||
              (filterOption === "district" && complaint.district.includes(selectedDistrict))
          )
          .map((complaint) => (
            <div
              key={complaint.id}
              className="bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-300"
            >
              {/* Image Section with Title */}
              <div className="relative">
                <img
                  src={complaint.image}
                  alt={complaint.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white text-lg font-semibold px-4 py-2">
                  {complaint.title}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4">
                <p className="text-gray-600 text-sm">{complaint.description}</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="text-gray-700 font-medium">Vote:</div>
                  {complaint.voted ? (
                    <div className="flex gap-2">
                      <p className="text-green-600 px-4 py-2 font-semibold">
                        Yes: {complaint.votes.yes}
                      </p>
                      <p className="text-red-600 px-4 py-2 font-semibold">
                        No: {complaint.votes.no}
                      </p>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => handleVote(complaint.id, "yes")}
                        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                      >
                        <FaThumbsUp /> Yes
                      </button>
                      <button
                        onClick={() => handleVote(complaint.id, "no")}
                        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        <FaThumbsDown /> No
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

   
      
    </div>
  );
}

export default Complaints;
