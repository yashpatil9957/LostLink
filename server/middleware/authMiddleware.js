import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
        });
    }

    try {
    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
        return res.status(401).json({
        success: false,
        message: "User not found",
        });
    }

    req.user = user;

    next();
    } catch (error) {
    return res.status(401).json({
        success: false,
        message: "Not authorized, invalid token",
    });
    }
};

export default protect;

