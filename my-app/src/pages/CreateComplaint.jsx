import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import {
  FaPen,
  FaMapMarkedAlt,
  FaRegEnvelope,
  FaListAlt,
  FaImage,
  FaRegComment,
  FaPaperPlane,
  FaCalendarAlt,
} from "react-icons/fa";

function CreateComplaint() {
  const [formData, setFormData] = useState({
    complaintName: "",
    district: "",
    area: "",
    pincode: "",
    category: "",
    date: "",
    image: null,
    description: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/category/get-all`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFormData({
      ...formData,
      image: files[0],
    });
  };

  function CreateComplaint() {
    const navigate = useNavigate(); // Initialize navigate
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
  
      const formDataObj = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataObj.append(key, formData[key]);
      });
  
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/complain/create`, {
          method: "POST",
          body: formDataObj,
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error("Failed to submit complaint");
        }
  
        const result = await response.json();
        console.log("Complaint submitted successfully:", result);
        
        Swal.fire({
          title: "Success!",
          text: "Complaint submitted successfully",
          icon: "success",
        }).then(() => {
          navigate("/"); // Redirect to home page
        });
  
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      // console.log(formDataObj);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/complain/create`, {
        method: "POST",
        body: formDataObj,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error("Failed to submit complaint");
      }

      const result = await response.json();
      console.log("Complaint submitted successfully:", result);
      setFormData
        ({
          complaintName: "",
          district: "",
          area: "",
          pincode: "",
          date: "",
          image: null,
          description: "",
        }
        );
        Swal.fire({
          title: "Success!",
          text: "Complaint submitted successfully",
          icon: "success"
        });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div
        className="flex items-center justify-center min-h-screen px-4 pt-16 pb-16"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Create Complaint
          </h1>

          {error && (
            <div className="mb-4 text-red-500 text-center">
              Error: {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Complaint Name */}
            <div className="mb-4">
              <label
                htmlFor="complaintName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Complaint Name
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
                <FaPen className="ml-4 text-gray-500" />
                <input
                  type="text"
                  id="complaintName"
                  name="complaintName"
                  placeholder="Enter complaint name"
                  value={formData.complaintName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 pl-10 bg-white focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* District Dropdown */}
            <div className="mb-4">
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                District
              </label>
              <select
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="" disabled>
                  Select your district
                </option>
                <option value="district1">District 1</option>
                <option value="district2">District 2</option>
                <option value="district3">District 3</option>
                <option value="district4">District 4</option>
                <option value="district5">District 5</option>
              </select>
            </div>

            {/* Location */}
            <div className="mb-4">
              <label
                htmlFor="area"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Area
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
                <FaMapMarkedAlt className="ml-4 text-gray-500" />
                <input
                  type="text"
                  id="area"
                  name="area"
                  placeholder="Enter area"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full px-4 py-2 pl-10 bg-white focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Pincode */}
            <div className="mb-4">
              <label
                htmlFor="pincode"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Pincode
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
                <FaRegEnvelope className="ml-4 text-gray-500" />
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 pl-10 bg-white focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Date */}
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Date
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
                <FaCalendarAlt className="ml-4 text-gray-500" />
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 pl-10 bg-white focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
                <FaListAlt className="ml-4 text-gray-500" />
                <select
                  id="category"
                  name="category"
                  value={formData.category._id}
                  onChange={handleChange}
                  className="w-full px-4 py-2 pl-10 bg-white focus:outline-none"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Upload Image
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
                <FaImage className="ml-4 text-gray-500" />
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 pl-10 bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <div className="relative border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
                <FaRegComment className="absolute top-3 left-3 text-gray-500" />
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-10 py-2 bg-white focus:outline-none"
                  required
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                disabled={loading}
              >
                <FaPaperPlane className="text-white" />
                {loading ? "Submitting..." : "Submit Complaint"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateComplaint;