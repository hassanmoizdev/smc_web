import express from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import protect from "../utils/auth.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

router.post("/signup", async (req, res) => {
  try { 
    const { name, email, password } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: "Admin already exists" });

    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();

    const token = jwt.sign({ id: newAdmin._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      message: "Admin registered successfully",
      token,
      admin: { name: newAdmin.name, email: newAdmin.email, id: newAdmin._id },
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "1d" });

    console.log("Login successful");
    res.json({
      token,
      admin: { name: admin.name, email: admin.email, id: admin._id },
    });
    
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

router.get("/verify", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ valid: false, message: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) return res.status(401).json({ valid: false, message: "Admin not found" });

    res.json({ valid: true, id: decoded.id, admin: { name: admin.name, email: admin.email } });
  } catch (err) {
    res.status(401).json({ valid: false, message: "Invalid token" });
  }
});

router.post("/logout", (req, res) => res.json({ message: "Logged out successfully" }));

router.get("/profile", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json({ admin });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
