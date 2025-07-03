import Vehicle from "../models/Vehicle.js";

export const addVehicle = async (req, res) => {
  try {
    const { name, number, type, make, model, year, notes } = req.body;
    const vehicle = new Vehicle({
      user: req.user._id,
      name,
      number,
      type,
      make,
      model,
      year,
      notes
    });
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ message: "Failed to add vehicle" });
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