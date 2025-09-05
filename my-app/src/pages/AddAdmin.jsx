import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

function AddAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [admins, setAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch the list of admins from the server
  const fetchAdmins = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user/get/admin", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setAdmins(data.data);
    } catch (err) {
      setError("Failed to load admins.");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const adminData = { name, email, district };

    try {
      const response = await fetch("http://localhost:8000/api/user/add/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to create admin");
      }

      alert("Admin created successfully");
      setName("");
      setEmail("");
      setDistrict("");
      fetchAdmins();
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-6 bg-gray-100 font-poppins">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
        />
      </Helmet>

      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
        Admin Management
      </h1>

      {/* Admin List Card */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-lg mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Admin List</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {showForm ? "Cancel" : "Add Admin"}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">District</th>
              </tr>
            </thead>
            <tbody>
              {admins?.length > 0 ? (
                admins.map((admin, idx) => (
                  <tr key={idx} className="hover:bg-green-50 transition duration-200 border-b">
                    <td className="py-3 px-6 text-gray-700">{admin.name}</td>
                    <td className="py-3 px-6 text-gray-700">{admin.email}</td>
                    <td className="py-3 px-6 text-gray-700">{admin.district}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-6 text-center text-gray-500">
                    No admins found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Admin Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-5">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 shadow-sm"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 shadow-sm"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
              District
            </label>
            <select
              id="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 shadow-sm"
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Admin"}
          </button>
        </form>
      )}
    </div>
  );
}

export default AddAdmin;
