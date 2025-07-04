import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/driving-logs", label: "Driving Logs" },
    { to: "/fuel-records", label: "Fuel Records" },
    { to: "/documents", label: "Documents" },
    { to: "/vehicles", label: "Vehicles" },
    { to: "/analytics", label: "Analytics" },
    { to: "/settings", label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-white/90 shadow-2xl hidden md:flex flex-col py-8 px-4 border-r border-green-100">
      <div className="flex items-center space-x-2 mb-10">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-green-600">
          <path d="M20 8l-8-4-12 6 12 6 8-4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-2xl font-bold text-green-700">DriveLogix</span>
      </div>
      <nav className="flex flex-col gap-2">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`${
              location.pathname === link.to
                ? "text-green-700 font-semibold bg-green-100"
                : "text-gray-700 hover:bg-green-50"
            } rounded px-3 py-2 transition`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-8">
        <button
          onClick={logout}
          className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 rounded-lg font-semibold hover:from-green-600 hover:to-teal-600 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;