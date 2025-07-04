import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function haversineDistance(points) {
  if (!Array.isArray(points) || points.length !== 2) return 0;
  const [lat1, lng1] = points[0];
  const [lat2, lng2] = points[1];
  const toRad = x => (x * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function MapClickHandler({ points, setPoints, onChange }) {
  useMapEvents({
    click(e) {
      if (points.length < 2) {
        const newPoints = [...points, [e.latlng.lat, e.latlng.lng]];
        setPoints(newPoints);
        if (newPoints.length === 2) {
          onChange(newPoints, haversineDistance(newPoints).toFixed(2));
        } else {
          onChange(newPoints, null);
        }
      }
    }
  });
  return null;
}

const RouteMapPicker = ({ value, onChange }) => {
  const [points, setPoints] = useState(value || []);

  const handleReset = () => {
    setPoints([]);
    onChange([], null);
  };

  return (
    <div>
      <MapContainer center={[23.8103, 90.4125]} zoom={12} style={{ height: 300, width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler points={points} setPoints={setPoints} onChange={onChange} />
        {points.map((pos, idx) => (
          <Marker key={idx} position={pos} />
        ))}
        {points.length === 2 && <Polyline positions={points} color="green" />}
      </MapContainer>
      <div className="flex items-center mt-2 gap-4">
        <button
          type="button"
          onClick={handleReset}
          className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition"
        >
          Reset
        </button>
        {points.length === 2 && (
          <span className="text-green-700 font-semibold">
            Distance: {haversineDistance(points).toFixed(2)} km
          </span>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Click on the map to select start and end points.
      </p>
    </div>
  );
};

export default RouteMapPicker;