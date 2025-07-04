import mongoose from "mongoose";

const coordSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
}, { _id: false });

const drivingLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true }, // NEW
    date: { type: Date, required: true },
    route: {
      type: [coordSchema],
      required: true,
      validate: v => Array.isArray(v) && v.length === 2
    },
    distance: { type: Number, required: true },
    startAddress: { type: String },
    endAddress: { type: String },
    notes: { type: String },
    fuelUsed: { type: Number }, // NEW
    fuelType: { type: String }, // NEW
    fuelCost: { type: Number }, // NEW
  },
  { timestamps: true }
);

export default mongoose.model("DrivingLog", drivingLogSchema);