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
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-5 border-b border-gray-800">
          <h2 className="text-2xl font-bold tracking-wide">Admin Panel</h2>
          <p className="text-xs text-gray-400 mt-1">CivicVoice</p>
        </div>
        <nav className="flex-grow p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/dashboard"
                className="block py-2.5 px-4 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Dashboard
              </Link>
            </li>
            {isSuperAdmin && (
              <li>
                <Link
                  to="/admin/add"
                  className="block py-2.5 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Add Admin
                </Link>
              </li>
            )}
            {isSuperAdmin && (
              <li>
                <Link
                  to="/admin/approval"
                  className="block py-2.5 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Approval
                </Link>
              </li>
            )}
            {isSuperAdmin && (
              <li>
                <Link
                  to="/admin/completeApproval"
                  className="block py-2.5 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Complete Approval
                </Link>
              </li>
            )}
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="block py-2.5 px-4 w-full text-left rounded-lg hover:bg-gray-800 transition-colors"
              >
                Complaints
              </button>
              {isDropdownOpen && (
                <ul className="mt-2 rounded-lg overflow-hidden border border-gray-800">
                  <li>
                    <Link
                      to="/admin/complaints/completed"
                      className="block py-2 px-4 bg-gray-850 hover:bg-gray-800 transition-colors"
                    >
                      Completed
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/complaints/overdue"
                      className="block py-2 px-4 bg-gray-850 hover:bg-gray-800 transition-colors"
                    >
                      Overdue
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/complaints/pending"
                      className="block py-2 px-4 bg-gray-850 hover:bg-gray-800 transition-colors"
                    >
                      Pending
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/complaints/notaccepted"
                      className="block py-2 px-4 bg-gray-850 hover:bg-gray-800 transition-colors"
                    >
                      Not Accepted
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/complaints/rejected"
                      className="block py-2 px-4 bg-gray-850 hover:bg-gray-800 transition-colors"
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
                className="block py-2.5 px-4 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Feedback
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-4 text-center bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
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
