import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import DocumentUploader from "../components/DocumentUploader";
import DocumentList from "../components/DocumentList";
import { FaIdCard, FaUpload, FaTrash } from "react-icons/fa";

const Documents = () => {
  const { getToken } = useAuth();
  const [license, setLicense] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [vehicleDocs, setVehicleDocs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const licenseInputRef = useRef();

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError("");
      const token = getToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      try {
        // Fetch license
        const { data: licenseData } = await axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/users/license`,
          { headers }
        );
        setLicense(licenseData);

        // Fetch vehicles
        const { data: vehiclesData } = await axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/vehicles`,
          { headers }
        );
        setVehicles(vehiclesData);

        // Fetch documents for each vehicle
        const docsObj = {};
        for (const v of vehiclesData) {
          try {
            const { data: docs } = await axios.get(
              `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/vehicles/${v._id}/documents`,
              { headers }
            );
            docsObj[v._id] = docs;
          } catch {
            docsObj[v._id] = [];
          }
        }
        setVehicleDocs(docsObj);
      } catch {
        setError("Failed to fetch documents.");
      }
      setLoading(false);
    };
    fetchAll();
    // eslint-disable-next-line
  }, []);

  // Upload license
  const handleLicenseUpload = async (e) => {
    setError("");
    const file = e.target.files[0];
    if (!file) return;
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const formData = new FormData();
    formData.append("license", file);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/users/license`,
        formData,
        { headers }
      );
      setLicense(data);
      if (licenseInputRef.current) licenseInputRef.current.value = "";
    } catch {
      setError("Failed to upload license.");
    }
  };

  // Delete license
  const handleLicenseDelete = async () => {
    setError("");
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/users/license`,
        { headers }
      );
      setLicense(null);
    } catch {
      setError("Failed to delete license.");
    }
  };

  // Upload vehicle document
  const handleVehicleDocUpload = async (vehicleId, file, type) => {
    setError("");
    if (!file || !type) return;
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const formData = new FormData();
    formData.append("document", file);
    formData.append("type", type);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/vehicles/${vehicleId}/documents`,
        formData,
        { headers }
      );
      setVehicleDocs((prev) => ({
        ...prev,
        [vehicleId]: [...(prev[vehicleId] || []), data],
      }));
    } catch {
      setError("Failed to upload document.");
    }
  };

  // Delete vehicle document
  const handleVehicleDocDelete = async (vehicleId, docId) => {
    setError("");
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/vehicles/${vehicleId}/documents/${docId}`,
        { headers }
      );
      setVehicleDocs((prev) => ({
        ...prev,
        [vehicleId]: (prev[vehicleId] || []).filter((doc) => doc._id !== docId),
      }));
    } catch {
      setError("Failed to delete document.");
    }
  };

  // Vehicle document upload form state
  const [docUpload, setDocUpload] = useState({}); // { [vehicleId]: { file, type } }

  const handleDocInputChange = (vehicleId, field, value) => {
    setDocUpload((prev) => ({
      ...prev,
      [vehicleId]: { ...prev[vehicleId], [field]: value },
    }));
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-2">
      <h2 className="text-3xl font-bold text-green-700 mb-8 text-center flex items-center justify-center gap-2">
        <FaIdCard className="text-green-600" /> Documents
      </h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* License Section */}
      <div className="bg-white rounded-xl shadow p-6 mb-8 border border-green-100">
        <h3 className="text-xl font-semibold text-green-700 mb-2 flex items-center gap-2">
          <FaIdCard className="text-green-600" /> License
        </h3>
        {license ? (
          <div className="flex items-center gap-4">
            <a
              href={license.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline flex items-center gap-1"
            >
              <FaIdCard /> View License
            </a>
            <button
              onClick={handleLicenseDelete}
              className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 flex items-center gap-1"
            >
              <FaTrash /> Delete
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-600 font-medium mb-2">
            <FaUpload className="text-green-500" />
            Upload your license please
          </div>
        )}
        <div className="mt-3 flex items-center gap-2">
          <label
            htmlFor="license-upload"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg cursor-pointer shadow hover:from-green-600 hover:to-teal-600 transition"
          >
            <FaUpload className="mr-2" />
            {license ? "Replace License" : "Upload License"}
            <input
              id="license-upload"
              type="file"
              accept="image/*,application/pdf"
              ref={licenseInputRef}
              onChange={handleLicenseUpload}
              className="hidden"
            />
          </label>
          {!license && (
            <span className="text-gray-400 text-sm flex items-center gap-1">
              <FaUpload /> Upload
            </span>
          )}
        </div>
      </div>

      {/* Vehicle Documents Section */}
      <div className="bg-white rounded-xl shadow p-6 border border-green-100">
        <h3 className="text-xl font-semibold text-green-700 mb-4">
          Vehicle Documents
        </h3>
        {vehicles.length === 0 ? (
          <div className="text-gray-500">No vehicles found.</div>
        ) : (
          vehicles.map((v) => (
            <div key={v._id} className="mb-8">
              <div className="font-semibold text-green-700 mb-2">
                {v.name} ({v.number})
              </div>
              {/* Document List */}
              <div className="mb-2">
                {(vehicleDocs[v._id] || []).length === 0 ? (
                  <div className="text-gray-500">No documents uploaded.</div>
                ) : (
                  <DocumentList
                    documents={vehicleDocs[v._id] || []}
                    onDelete={(docId) => handleVehicleDocDelete(v._id, docId)}
                  />
                )}
              </div>
              {/* Upload Form */}
              <DocumentUploader
                onUpload={(file, type) =>
                  handleVehicleDocUpload(v._id, file, type)
                }
                value={docUpload[v._id] || { file: null, type: "" }}
                onChange={(val) =>
                  setDocUpload((prev) => ({ ...prev, [v._id]: val }))
                }
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Documents;