// middleware/authMiddleware.js

import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // No token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, not authorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    // User deleted or not found
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // includes role automatically

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
   
    if (!roles.includes(req.user.role)) {
      
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};