import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", path: "/admin" },
    { name: "Mahasiswa", path: "/admin/mahasiswa" },
    { name: "Mahasiswa List", path: "/admin/mahasiswa-list" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col top-0 h-screen">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menus.map((menu) => (
            <Link
              key={menu.name}
              to={menu.path}
              className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                location.pathname === menu.path ? "bg-gray-700" : ""
              }`}
            >
              {menu.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">{children}</div>
    </div>
  );
};

export default AdminLayout;
