import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]; 
      console.log("Token received in middleware:", token); 
      console.log("Authorization header received:", req.headers.authorization); 

      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      console.log("Decoded token:", decoded); 

      req.user = await User.findById(decoded.id).select("-password"); 
      console.log("User attached to request:", req.user);

      next();
    } catch (error) {
      console.error("Token verification failed:", error.message); 
      res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  } else {
    console.error("No token provided"); 
    res.status(401).json({ success: false, message: "Not authorized, no token" });
  }
};
