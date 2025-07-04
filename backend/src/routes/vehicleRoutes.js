import express from "express";
import { addVehicle, getVehicles, deleteVehicle } from "../controllers/vehicleController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js"; // Use the upload from config

const router = express.Router();

router.route("/")
  .get(protect, getVehicles)
  .post(protect, upload.single("photo"), addVehicle);

router.route("/:id")
  .delete(protect, deleteVehicle);

export default router;