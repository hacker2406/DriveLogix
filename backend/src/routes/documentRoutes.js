import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  uploadVehicleDocument,
  uploadUserLicense,
  getVehicleDocuments,
  deleteVehicleDocument,
  getUserLicense,
  deleteUserLicense,
} from "../controllers/documentController.js";

const router = express.Router();

router.post(
  "/vehicles/:id/documents",
  protect,
  upload.single("document"),
  uploadVehicleDocument
);
router.get("/vehicles/:id/documents", protect, getVehicleDocuments);
router.delete(
  "/vehicles/:id/documents/:docId",
  protect,
  deleteVehicleDocument
);

router.post("/users/license", protect, upload.single("license"), uploadUserLicense);
router.get("/users/license", protect, getUserLicense);
router.delete("/users/license", protect, deleteUserLicense);

export default router;