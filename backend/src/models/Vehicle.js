import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true }, // e.g. "Honda City"
    number: { type: String, required: true }, // e.g. "WB12AB1234"
    type: { type: String }, // e.g. "Car", "Bike", "Truck"
    make: { type: String }, // e.g. "Honda"
    model: { type: String }, // e.g. "City"
    year: { type: Number },  // e.g. 2020
    notes: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Vehicle", vehicleSchema);