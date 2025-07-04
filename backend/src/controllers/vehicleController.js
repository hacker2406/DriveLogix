import Vehicle from "../models/Vehicle.js";
import { cloudinary } from "../config/cloudinary.js";

export const addVehicle = async (req, res) => {
  try {
    const { name, number, type, make, model, year, notes } = req.body;
    let photo = "";

    // Multer + CloudinaryStorage puts the URL in req.file.path
    if (req.file && req.file.path) {
      photo = req.file.path; // This is the Cloudinary URL
    }

    const vehicle = new Vehicle({
      user: req.user._id,
      name,
      number,
      type,
      make,
      model,
      year,
      notes,
      photo,
    });

    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ message: "Failed to add vehicle", error: err.message });
  }
};

export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch vehicles" });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete vehicle" });
  }
};