import DrivingLog from "../models/DrivingLog.js";

// Create a new driving log
export const createLog = async (req, res) => {
  try {
    const { date, route, distance, startAddress, endAddress, notes } = req.body;
    const log = new DrivingLog({
      user: req.user._id,
      date,
      route,
      distance,
      startAddress,
      endAddress,
      notes
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
    const logs = await DrivingLog.find({ user: req.user._id }).sort({ date: -1 });
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