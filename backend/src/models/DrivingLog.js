import mongoose from "mongoose";

const coordSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
}, { _id: false });

const drivingLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    route: {
      type: [coordSchema], // [start, end]
      required: true,
      validate: v => Array.isArray(v) && v.length === 2
    },
    distance: { type: Number, required: true }, // in km, calculated on frontend or backend
    startAddress: { type: String }, // optional, for reverse geocoded address
    endAddress: { type: String },   // optional
    notes: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("DrivingLog", drivingLogSchema);