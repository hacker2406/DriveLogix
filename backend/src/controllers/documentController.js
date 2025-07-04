import Vehicle from "../models/Vehicle.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";

// Upload document for a vehicle
export const uploadVehicleDocument = async (req, res) => {
  try {
    const { type } = req.body;
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "drivelogix/documents",
    });

    const doc = {
      url: result.secure_url,
      public_id: result.public_id,
      type,
      uploadedAt: new Date(),
    };

    vehicle.documents.push(doc);
    await vehicle.save();

    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ message: "Failed to upload document" });
  }
};

// Upload license for user (unique)
export const uploadUserLicense = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    // Delete old license from Cloudinary if exists
    if (user.license && user.license.public_id) {
      await cloudinary.uploader.destroy(user.license.public_id);
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "drivelogix/license",
    });

    user.license = {
      url: result.secure_url,
      public_id: result.public_id,
      uploadedAt: new Date(),
    };
    await user.save();

    res.status(201).json(user.license);
  } catch (err) {
    res.status(500).json({ message: "Failed to upload license" });
  }
};

// Fetch all documents for a vehicle
export const getVehicleDocuments = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json(vehicle.documents);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch documents" });
  }
};

// Delete a document from a vehicle
export const deleteVehicleDocument = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    const doc = vehicle.documents.id(req.params.docId);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    // Remove from Cloudinary
    if (doc.public_id) {
      await cloudinary.uploader.destroy(doc.public_id);
    }

    doc.remove();
    await vehicle.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete document" });
  }
};

// Fetch user license
export const getUserLicense = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.license || null);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch license" });
  }
};

// Delete user license
export const deleteUserLicense = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.license && user.license.public_id) {
      await cloudinary.uploader.destroy(user.license.public_id);
    }
    user.license = undefined;
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete license" });
  }
};