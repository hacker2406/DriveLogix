import express from "express";
import authRoutes from "./routes/authRoutes.js"
import drivingLogRoutes from "./routes/drivingLogRoutes.js";
import connectDB from "./config/db.js"
import cors from "cors"
import dotenv from "dotenv";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.use("/api/driving-logs", drivingLogRoutes);

app.get("/", (req, res) => {
  res.send("Shoe E-Commerce Backend is Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
