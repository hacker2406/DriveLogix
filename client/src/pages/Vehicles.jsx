import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { FaCar, FaTrash, FaPlus, FaCamera } from "react-icons/fa";

const Vehicles = () => {
  const { getToken } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    name: "",
    number: "",
    type: "",
    make: "",
    model: "",
    year: "",
    notes: "",
  });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/vehicles`,
        { headers }
      );
      setVehicles(data);
    } catch {
      setError("Failed to fetch vehicles");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVehicles();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.number) {
      setError("Name and number are required.");
      return;
    }
    try {
      const token = getToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      if (photo) formData.append("photo", photo);

      await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/vehicles`,
        formData,
        { headers }
      );
      setForm({
        name: "",
        number: "",
        type: "",
        make: "",
        model: "",
        year: "",
        notes: "",
      });
      setPhoto(null);
      setPreview("");
      fetchVehicles();
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      setError("Failed to add vehicle");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = getToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.delete(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/vehicles/${id}`,
        { headers }
      );
      setVehicles(vehicles.filter((v) => v._id !== id));
    } catch {
      setError("Failed to delete vehicle");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-2 md:px-0">
      <h2 className="text-3xl font-bold text-green-700 mb-8 text-center flex items-center gap-2 justify-center">
        <FaCar /> Vehicles
      </h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Add Vehicle Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 flex-1 max-w-xl mx-auto md:mx-0"
        >
          <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
            <FaPlus className="text-green-500" /> Add New Vehicle
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Number *</label>
            <input
              type="text"
              name="number"
              value={form.number}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <input
                type="text"
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300"
                placeholder="Car, Bike, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
              <input
                type="text"
                name="make"
                value={form.make}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300"
                placeholder="Honda, Tata, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
              <input
                type="text"
                name="model"
                value={form.model}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300"
                placeholder="City, Nexon, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input
                type="number"
                name="year"
                value={form.year}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300"
                placeholder="2020"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300"
              rows={2}
              placeholder="Optional"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <FaCamera /> Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              ref={fileInputRef}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 rounded-lg shadow w-32 h-20 object-cover border border-green-100"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-lg shadow hover:shadow-xl transition-all duration-200"
          >
            Add Vehicle
          </button>
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </form>

        {/* Vehicles List */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-green-700 mb-4">Your Vehicles</h3>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {loading ? (
              <div>Loading...</div>
            ) : vehicles.length === 0 ? (
              <div className="text-gray-500">No vehicles yet.</div>
            ) : (
              vehicles.map((v) => (
                <div
                  key={v._id}
                  className="bg-white rounded-xl shadow p-6 border border-green-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    {v.photo ? (
                      <img
                        src={v.photo}
                        alt={v.name}
                        className="w-24 h-16 object-cover rounded-lg border border-green-100 shadow"
                      />
                    ) : (
                      <div className="w-24 h-16 flex items-center justify-center bg-green-50 rounded-lg border border-green-100 text-green-400">
                        <FaCar size={32} />
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-green-700 text-lg flex items-center gap-2">
                        {v.name}
                      </div>
                      <div className="text-gray-700">
                        Number: <span className="font-medium">{v.number}</span>
                      </div>
                      <div className="text-gray-500 text-sm">
                        {v.type && <>Type: {v.type} &nbsp;</>}
                        {v.make && <>Make: {v.make} &nbsp;</>}
                        {v.model && <>Model: {v.model} &nbsp;</>}
                        {v.year && <>Year: {v.year}</>}
                      </div>
                      {v.notes && (
                        <div className="text-gray-400 text-xs mt-1">Notes: {v.notes}</div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(v._id)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition flex items-center gap-2 self-start md:self-auto"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;