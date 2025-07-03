import express from "express";
import { addVehicle, getVehicles, deleteVehicle } from "../controllers/vehicleController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getVehicles)
  .post(protect, addVehicle);

router.route("/:id")
  .delete(protect, deleteVehicle);

export default router;