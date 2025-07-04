import React from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-50 via-emerald-100 to-teal-100">
      <Sidebar />
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