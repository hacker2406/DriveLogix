import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import RouteMapPicker from "../components/RouteMapPicker";
import { FaMapMarkerAlt, FaTrash, FaRoad } from "react-icons/fa";

const DrivingLogs = () => {
  const { getToken } = useAuth();
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({ date: "", notes: "" });
  const [routeCoords, setRouteCoords] = useState([]);
  const [distance, setDistance] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/driving-logs`,
        { headers }
      );
      setLogs(data);
    } catch {
      setError("Failed to fetch logs");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
    // eslint-disable-next-line
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRouteChange = (coords, dist) => {
    setRouteCoords(coords);
    setDistance(dist);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    if (routeCoords.length !== 2 || !distance) {
      setError("Please select start and end points on the map.");
      return;
    }
    try {
      const token = getToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/driving-logs`,
        {
          date: form.date,
          route: routeCoords.map(([lat, lng]) => ({ lat, lng })),
          distance: Number(distance),
          notes: form.notes
        },
        { headers }
      );
      setForm({ date: "", notes: "" });
      setRouteCoords([]);
      setDistance("");
      fetchLogs();
    } catch {
      setError("Failed to add log");
    }
  };

  const handleDelete = async id => {
    try {
      const token = getToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.delete(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/driving-logs/${id}`,
        { headers }
      );
      setLogs(logs.filter(log => log._id !== id));
    } catch {
      setError("Failed to delete log");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-2 md:px-0">
      <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">Driving Logs</h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 flex-1 max-w-xl mx-auto md:mx-0"
        >
          <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
            <FaRoad className="text-green-500" /> Add New Log
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Route (Map Picker)</label>
            <RouteMapPicker value={routeCoords} onChange={handleRouteChange} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={2}
              placeholder="Optional"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-lg shadow hover:shadow-xl transition-all duration-200"
          >
            Add Log
          </button>
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </form>

        {/* Logs Section */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-green-700 mb-4">Your Logs</h3>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {loading ? (
              <div>Loading...</div>
            ) : logs.length === 0 ? (
              <div className="text-gray-500">No logs yet.</div>
            ) : (
              logs.map(log => (
                <div
                  key={log._id}
                  className="bg-white rounded-xl shadow p-6 border border-green-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div>
                    <div className="font-semibold text-green-700 text-lg flex items-center gap-2">
                      <FaRoad className="text-green-500" />
                      {new Date(log.date).toLocaleDateString()}
                    </div>
                    <div className="text-gray-700 flex items-center gap-2 mt-1">
                      <span className="font-medium">
                        <FaMapMarkerAlt className="inline text-red-500 mr-1" />
                        {log.startAddress || "Start"}
                      </span>
                      <span className="mx-2 text-gray-400">→</span>
                      <span className="font-medium">
                        <FaMapMarkerAlt className="inline text-green-600 mr-1" />
                        {log.endAddress || "End"}
                      </span>
                    </div>
                    <div className="text-gray-700 mt-1">
                      Distance: <span className="font-semibold">{log.distance} km</span>
                    </div>
                    {log.notes && (
                      <div className="text-gray-500 text-sm mt-1">Notes: {log.notes}</div>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(log._id)}
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

export default DrivingLogs;