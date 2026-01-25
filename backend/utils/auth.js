import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";
const protect = async (req, res, next) => {
    let token;
    if (req.cookies.token && req.cookies) {
        try {
            token = req.cookies.token;
            console.log("Token:", token);
            const decoded = jwt.verify(token, JWT_SECRET);
            console.log("Decoded token:", decoded);
            req.admin = await Admin.findById(decoded.id).select("-password");
            console.log("Admin found:", req.admin);
            next();
        } catch (error) {
            console.error("JWT Error Name:", error.name); // e.g., TokenExpiredError
            console.error("JWT Error Message:", error.message); // e.g., invalid signature
            res.status(401).json({ message: "Not authorized", details: error.message });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

export default protect;