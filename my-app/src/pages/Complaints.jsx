import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaThumbsUp, FaThumbsDown,FaSearch, FaFilter } from "react-icons/fa";
import Swal from 'sweetalert2'

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [filterOption, setFilterOption] = useState("complaintNo");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [complaintNo, setComplaintNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch complaints
  const fetchComplaints = async (queryParams = {}) => {
    setLoading(true);
    setError("");

    try {
      const queryString = new URLSearchParams(queryParams).toString();
      // console.log(`Fetching: http://localhost:8000/api/complain/query-get?${queryString}`);

      const response = await fetch(`http://localhost:8000/api/complain/query-get?${queryString}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setComplaints(data.data || []); // Extract 'data' array
      // console.log("Updated complaints state:", data.data || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Log complaints whenever it updates
  useEffect(() => {
    // console.log("Complaints State Updated:", complaints);
  }, [complaints]);

  const getComplainsByDistrict = async (queryParams = {}) => {
    setLoading(true);
    setError("");

    try {
      // const queryString = new URLSearchParams(queryParams).toString();
      // console.log(`Fetching: http://localhost:8000/api/complain/query-get?${queryString}`);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/complain/get-by-district`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",

        });
      }

      const data = await response.json();
      setComplaints(data.data || []); // Extract 'data' array
      // console.log("Updated complaints state:", data.data || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getComplainsByDistrict()
  }, []);

  const handleVote = async (complainNo) => {
    AddVote(complainNo);
  }

  const AddVote = async (complainNo) => {
    setLoading(true);
    setError("");

    try {
      // Make sure to use POST if you are sending data in the body
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/complain/add-vote`, {
        method: "POST", // Changed to POST for body support
        headers: {
          "Content-Type": "application/json", // Ensure the server knows you're sending JSON
        },
        body: JSON.stringify({ complainNo }), // Send data as JSON
        credentials: "include",
      });

      if (!response.ok) {
        // If the response is not ok, show an error
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        return;
      }

      const data = await response.json();
      location.reload();
    } catch (err) {
      console.error(err);
      setError(err.message); // Set the error if there was an issue
    } finally {
      setLoading(false); // Set loading to false once the request is complete
    }
  };

  useEffect(() => {
    // You can include logic here if needed
  }, []);

  // Handle search button click
  const handleSearch = () => {
    if (filterOption === "complaintNo" && complaintNo) {
      fetchComplaints({ complain_no: complaintNo });
    } else if (filterOption === "district" && selectedDistrict) {
      fetchComplaints({ district: selectedDistrict });
    }
  };

  return (
    <div className="w-full bg-white text-gray-800">
      {/* Helmet for adding external fonts */}
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div className="p-8 text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
  <h1 className="text-4xl font-bold text-gray-800 relative inline-block">
    Complaints
    <span className="absolute left-0 bottom-0 w-full h-1 bg-green-500"></span>
  </h1>
  <p className="mt-4 text-lg text-gray-600">View all complaints here.</p>
</div>


      {/* Filter Section */}
      <div className="p-6 flex flex-col md:flex-row justify-center items-center gap-4  w-full max-w-2xl mx-auto">
      {/* Filter Dropdown */}
      <div className="flex items-center gap-2">
     
        <select
          onChange={(e) => {
            setFilterOption(e.target.value);
            setComplaintNo(""); 
            setSelectedDistrict("");
          }}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="complaintNo">Filter by Complaint No</option>
          <option value="district">Filter by District</option>
        </select>
      </div>

      {/* Input Field Based on Selection */}
      {filterOption === "district" ? (
        <div className="flex items-center gap-2">
          <select
            onChange={(e) => setSelectedDistrict(e.target.value)}
            value={selectedDistrict}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select District</option>
            <option value="ahmedabad">Ahmedabad</option>
                <option value="amreli">Amreli</option>
                <option value="anand">Anand</option>
                <option value="balasinor">Balasinor</option>
                <option value="banskantha">Banaskantha</option>
                <option value="baroda">Baroda</option>
                <option value="bharuch">Bharuch</option>
                <option value="bhavnagar">Bhavnagar</option>
                <option value="botad">Botad</option>
                <option value="chhotaudepur">Chhota Udepur</option>
                <option value="dahod">Dahod</option>
                <option value="dang">Dang</option>
                <option value="devbhoomi_dwarka">Devbhoomi Dwarka</option>
                <option value="gir_somnath">Gir Somnath</option>
                <option value="godhra">Godhra</option>
                <option value="junagadh">Junagadh</option>
                <option value="kheda">Kheda</option>
                <option value="kutch">Kutch</option>
                <option value="mehsana">Mehsana</option>
                <option value="morbi">Morbi</option>
                <option value="navsari">Navsari</option>
                <option value="patan">Patan</option>
                <option value="porbandar">Porbandar</option>
                <option value="rajkot">Rajkot</option>
                <option value="sabar_kanta">Sabar Kantha</option>
                <option value="surat">Surat</option>
                <option value="surendranagar">Surendranagar</option>
                <option value="tapi">Tapi</option>
                <option value="vadodara">Vadodara</option>
                <option value="valsad">Valsad</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
          >
            <FaSearch /> Search
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter Complaint No"
            value={complaintNo}
            onChange={(e) => setComplaintNo(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
          >
            <FaSearch /> Search
          </button>
        </div>
      )}
    </div>

      {/* Complaints List */}
      <div className="p-8  min-h-screen">
  {loading && <p className="text-center text-gray-500">Loading...</p>}
  {error && <p className="text-center text-red-500">{error}</p>}
  {!loading && !error && complaints.length === 0 && (
    <p className="text-center text-gray-500">No complaints found.</p>
  )}

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ fontFamily: "Poppins, sans-serif" }}>
    {Array.isArray(complaints) ? (
      complaints.map((complaint) => (
        <div
          key={complaint.complainNo}
          className="bg-white/80 backdrop-blur-lg text-gray-800 rounded-2xl shadow-lg transition-transform transform hover:scale-105  overflow-hidden border border-gray-200"
        >
          {/* Image Section */}
          <div className="relative">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${complaint.image.replace("public\\", "")}`}
              alt={complaint.name}
              className="w-full h-56 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white text-lg font-semibold px-4 py-2">
              {complaint.name}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-3">
            <p className="text-gray-600 text-sm">{complaint.description}</p>
            <p className="text-gray-700 font-medium">Status: 
              <span className={`ml-2 px-3 py-1 text-sm rounded-full font-semibold 
                ${complaint.status === "Resolved" ? "bg-green-500 text-white" : "bg-yellow-500 text-gray-800"}`}>
                {complaint.status}
              </span>
            </p>

            <div className="mt-4 flex items-center gap-4">
              <div className="text-gray-700 font-medium">Vote:</div>
              {complaint.hasUserVoted ? (
                <div className="flex gap-2">
                  <p className="text-green-600 font-semibold">
                    Yes: {complaint.voteCount || 0}
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => handleVote(complaint.complainNo)}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-md hover:from-green-500 hover:to-green-700 transition-all"
                >
                  <FaThumbsUp /> Yes
                </button>
              )}
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500">No complaints found.</p>
    )}
  </div>
</div>


    </div>
  );
}

export default Complaints;
