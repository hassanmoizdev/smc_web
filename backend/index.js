import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import authRoutes from "./routes/authRoutes.js";
import downloadsRoutes from "./routes/downloadsRoutes.js";
import newsEventsRoutes from "./routes/newsEventsRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import researchRoutes from "./routes/researchRoutes.js";
import siteSettingRoutes from "./routes/siteSettingRoutes.js";
import sliderRoutes from "./routes/sliderRoutes.js";
import convocationRoutes from "./routes/convocationRoutes.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware to parse JSON and urlencoded with size limits
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
// Vercel/production deploy: lock to FRONTEND_URL. Local server: allow CRA (localhost:3000).
const isVercelDeploy = process.env.VERCEL_ENV === "1";
const corsOptions = {
  origin: isVercelDeploy
    ? process.env.FRONTEND_URL || false
    : true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Serve local uploads when running the API locally (not on Vercel)
if (!isVercelDeploy) {
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
}

if (!isVercelDeploy) {
  // Ensure uploads directories exist, create if missing
  const uploadDirs = [
    path.join(__dirname, "uploads/events"),
    path.join(__dirname, "uploads/downloads"),
    path.join(__dirname, "uploads/notifications"),
    path.join(__dirname, "uploads/research"),
    path.join(__dirname, "uploads/logos"),
    path.join(__dirname, "uploads/convocations"),
  ];
  uploadDirs.forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
}


console.log(`
  ==================================================
  --------------------------------------------------
  ==================================================
  --------------------------------------------------
  ==================================================
  --------------------------------------------------
  ✅ Connecting to database: ${process.env.MONGO_DB_URL}
  --------------------------------------------------
  ==================================================
  --------------------------------------------------
  ==================================================
  --------------------------------------------------
  ==================================================
  --------------------------------------------------
  ==================================================
  `);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_DB_URL || {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // You can add more options here as needed
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    cloudinary: process.env.USE_CLOUDINARY === 'true' ? 'enabled' : 'disabled',
    vercel_env: process.env.VERCEL_ENV || 'not set',
    storage_mode: process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === '1' ? 'cloudinary' : 'local'
  });
});

// Mount API routes with consistent base paths
app.use(`/api/auth`, authRoutes);
app.use(`/api/downloads`, downloadsRoutes);
app.use(`/api/events`, newsEventsRoutes);
app.use(`/api/notifications`, notificationRoutes);
app.use(`/api/research`, researchRoutes);
app.use(`/api/site-settings`, siteSettingRoutes);
app.use(`/api/slider`, sliderRoutes);
app.use(`/api/convocation`, convocationRoutes);

// Serve React build in production (after API routes so /api/* is not swallowed)
if (process.env.NODE_ENV === "production" && fs.existsSync(path.join(__dirname, "../frontend/build"))) {
  const clientBuildPath = path.join(__dirname, "../frontend/build");
  app.use(express.static(clientBuildPath));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

// Generic 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Centralized error handler (example)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

// For Vercel deployment, export the app instead of using app.listen
if (process.env.VERCEL_ENV) {
  module.exports = app;
} else {
  // Windows often reserves port 5000; use 5001 locally if unset
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}
