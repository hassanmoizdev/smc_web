import express from "express";
import Downloads from "../models/downloads.js";
import { downloadFile } from "../config/cloudinary.js";
import { handleFileUpload, handleFileDeletion, getFileUrl } from "../utils/fileUpload.js";

const router = express.Router();

// Upload new download
router.post("/add", downloadFile.single("file"), async (req, res) => {
  try {
    console.log("=== Upload Request Debug ===");
    console.log("Body:", req.body);
    console.log("File:", req.file);
    console.log("========================");

    const { title, description } = req.body;

    // Validate that file was uploaded
    if (!req.file) {
      console.error("No file received in request");
      return res.status(400).json({
        error: "No file uploaded",
        message: "Please select a file to upload"
      });
    }

    // Validate required fields
    if (!title || title.trim() === '') {
      return res.status(400).json({
        error: "Title is required",
        message: "Please provide a title for the file"
      });
    }

    const fileData = handleFileUpload(req.file, 'downloads');
    const newDownload = new Downloads({
      title: title.trim(),
      description: description?.trim() || '',
      fileUrl: fileData.path,
      fileSize: fileData.size,
      cloudinaryPublicId: fileData.cloudinaryPublicId || null
    });

    await newDownload.save();
    console.log("✅ File uploaded successfully:", newDownload._id);
    res.status(201).json(newDownload);
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({
      error: "Failed to upload file",
      message: error.message
    });
  }
});

// Get all downloads
router.get("/", async (req, res) => {
  try {
    const downloads = await Downloads.find().sort({ createdAt: -1 });
    res.json(downloads);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch downloads" });
  }
});

// Delete a download
router.delete("/:id", async (req, res) => {
  try {
    const download = await Downloads.findById(req.params.id);
    if (!download) return res.status(404).json({ error: "File not found" });

    // Delete file from storage (Cloudinary or local)
    await handleFileDeletion(download.fileUrl, download.cloudinaryPublicId);

    await Downloads.findByIdAndDelete(req.params.id);
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: "Failed to delete file" });
  }
});

export default router;
