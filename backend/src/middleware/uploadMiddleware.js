import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "drivelogix/vehicles",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

export const upload = multer({ storage });