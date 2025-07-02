import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-50 via-emerald-100 to-teal-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white/90 shadow-2xl hidden md:flex flex-col py-8 px-4 border-r border-green-100">
        <div className="flex items-center space-x-2 mb-10">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-green-600">
            <path d="M20 8l-8-4-12 6 12 6 8-4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-2xl font-bold text-green-700">DriveLogix</span>
        </div>
        <nav className="flex flex-col gap-2">
          <a href="/dashboard" className="text-green-700 font-semibold bg-green-100 rounded px-3 py-2 transition">Dashboard</a>
          <a href="#" className="text-gray-700 hover:bg-green-50 rounded px-3 py-2 transition">Driving Logs</a>
          <a href="#" className="text-gray-700 hover:bg-green-50 rounded px-3 py-2 transition">Fuel Records</a>
          <a href="#" className="text-gray-700 hover:bg-green-50 rounded px-3 py-2 transition">Documents</a>
          <a href="#" className="text-gray-700 hover:bg-green-50 rounded px-3 py-2 transition">Vehicles</a>
          <a href="#" className="text-gray-700 hover:bg-green-50 rounded px-3 py-2 transition">Analytics</a>
          <a href="#" className="text-gray-700 hover:bg-green-50 rounded px-3 py-2 transition">Settings</a>
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

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-green-800 mb-2 tracking-tight">
              Welcome, {user?.name || "Driver"}!
            </h1>
            <p className="text-lg text-gray-600">Here’s your driving summary and quick actions.</p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&q=80&w=400"
              alt="Dashboard"
              className="w-36 h-36 object-cover rounded-2xl shadow-lg border-4 border-green-100 hidden md:block"
            />
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-green-400 to-teal-400 w-10 h-10 rounded-full shadow-lg opacity-70 animate-pulse"></div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border border-green-100 hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <span className="text-green-700 text-3xl font-extrabold mb-2">1,250 km</span>
            <span className="text-gray-500 font-medium">Distance This Month</span>
          </div>
          <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border border-green-100 hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <span className="text-emerald-600 text-3xl font-extrabold mb-2">16.2 km/l</span>
            <span className="text-gray-500 font-medium">Avg. Fuel Efficiency</span>
          </div>
          <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border border-green-100 hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <span className="text-teal-600 text-3xl font-extrabold mb-2">2</span>
            <span className="text-gray-500 font-medium">Expiring Documents</span>
          </div>
        </div>

        {/* Charts & Reminders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/90 rounded-2xl shadow-xl p-8 border border-green-100">
            <h2 className="text-xl font-bold text-green-700 mb-4">Distance Over Time</h2>
            <div className="h-40 flex items-center justify-center text-gray-400">
              <span>Chart coming soon...</span>
            </div>
          </div>
          <div className="bg-white/90 rounded-2xl shadow-xl p-8 border border-green-100">
            <h2 className="text-xl font-bold text-green-700 mb-4">Upcoming Reminders</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Insurance renewal in 5 days</li>
              <li>Service due in 200 km</li>
              <li>PUC expires next month</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;