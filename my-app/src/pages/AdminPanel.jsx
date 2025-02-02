import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import * as jwt_decode from "jwt-decode";

function Admin() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const navigate = useNavigate(); // For redirection

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const token = Cookies.get("token"); // Get the token from cookies
    if (token) {
      if (jwt_decode.jwtDecode(token).role === "superadmin") {
        setIsSuperAdmin(true);
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token"); // Remove the authentication token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>
        <nav className="flex-grow p-4">
          <ul className="space-y-4">
            <li>
              <Link
                to="/admin/dashboard"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Dashboard
              </Link>
            </li>
            {isSuperAdmin && (
              <li>
                <Link
                  to="/admin/add"
                  className="block py-2 px-4 rounded hover:bg-gray-700"
                >
                  Add Admin
                </Link>
              </li>
            )}
            {isSuperAdmin && (
              <li>
                <Link
                  to="/admin/approval"
                  className="block py-2 px-4 rounded hover:bg-gray-700"
                >
                  Approval
                </Link>
              </li>
            )}
            {isSuperAdmin && (
              <li>
                <Link
                  to="/admin/completeApproval"
                  className="block py-2 px-4 rounded hover:bg-gray-700"
                >
                  Complete Approval
                </Link>
              </li>
            )}
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="block py-2 px-4 w-full text-left rounded hover:bg-gray-700"
              >
                Complaints
              </button>
              {isDropdownOpen && (
                <ul className="absolute left-0 w-full bg-gray-700 text-white mt-2 rounded shadow-lg">
                  <li>
                    <Link
                      to="/admin/complaints/completed"
                      className="block py-2 px-4 hover:bg-gray-600"
                    >
                      Completed
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/complaints/overdue"
                      className="block py-2 px-4 hover:bg-gray-600"
                    >
                      Overdue
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/complaints/pending"
                      className="block py-2 px-4 hover:bg-gray-600"
                    >
                      Pending
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/complaints/notaccepted"
                      className="block py-2 px-4 hover:bg-gray-600"
                    >
                      Not Accepted
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/complaints/rejected"
                      className="block py-2 px-4 hover:bg-gray-600"
                    >
                      Rejected
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/admin/feedback"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Feedback
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 text-center bg-red-600 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 p-6 overflow-auto">
        <Outlet /> {/* This will render nested routes */}
      </main>
    </div>
  );
}

export default Admin;
