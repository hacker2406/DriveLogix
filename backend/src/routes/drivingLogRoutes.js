import express from "express";
import { createLog, getLogs, deleteLog } from "../controllers/drivingLogController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getLogs)
  .post(protect, createLog);

router.route("/:id")
  .delete(protect, deleteLog);

export default router;