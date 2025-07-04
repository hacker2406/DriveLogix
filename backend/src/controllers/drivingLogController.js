import DrivingLog from "../models/DrivingLog.js";
import fetch from "node-fetch"; 

async function getAddressFromCoords(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "DriveLogix/1.0 (your@email.com)" }
    });
    const data = await res.json();
    return data.display_name || "";
  } catch {
    return "";
  }
}

// Create a new driving log
export const createLog = async (req, res) => {
  try {
    const { date, route, distance, notes, vehicle, fuelUsed, fuelType, fuelCost } = req.body;

    // Get start/end addresses using reverse geocoding
    let startAddress = "";
    let endAddress = "";
    if (Array.isArray(route) && route.length === 2) {
      startAddress = await getAddressFromCoords(route[0].lat, route[0].lng);
      endAddress = await getAddressFromCoords(route[1].lat, route[1].lng);
    }

    const log = new DrivingLog({
      user: req.user._id,
      vehicle, // NEW
      date,
      route,
      distance,
      startAddress,
      endAddress,
      notes,
      fuelUsed,   // NEW
      fuelType,   // NEW
      fuelCost,   // NEW
    });
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: "Failed to create log" });
  }
};

// Get all driving logs for the logged-in user
export const getLogs = async (req, res) => {
  try {
    const logs = await DrivingLog.find({ user: req.user._id })
      .populate("vehicle")
      .sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch logs" });
  }
};

// Delete a driving log
export const deleteLog = async (req, res) => {
  try {
    const log = await DrivingLog.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!log) return res.status(404).json({ message: "Log not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete log" });
  }
};