import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cloudinary, { deleteFromCloudinary } from '../config/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
// Determine if we should use Cloudinary or local storage
const USE_CLOUDINARY = false;

// Local storage paths
const LOCAL_UPLOADS_PATH = path.join(__dirname, '../uploads');

/**
 * Upload file handler - uses Cloudinary in production, local storage in development
 */
export const handleFileUpload = (file, folder = 'general') => {
  if (USE_CLOUDINARY) {
    // Cloudinary automatically handles the upload via multer middleware
    return {
      filename: file.filename,
      path: file.path, // This will be the Cloudinary URL
      size: file.size,
      cloudinaryPublicId: file.filename, // Store this for deletion
    };
  } else {
    // Local file handling
    const uploadPath = path.join(LOCAL_UPLOADS_PATH, folder);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
      console.log("File data:", file);
    return {
      filename: file.filename,
      path: `/uploads/${folder}/${file.filename}`,
      size: file.size,
    };
  }
};

/**
 * Delete file handler - removes from Cloudinary or local storage
 */
export const handleFileDeletion = async (filePath, publicId = null) => {
  try {
    if (USE_CLOUDINARY && publicId) {
      // Delete from Cloudinary
      await deleteFromCloudinary(publicId);
    } else if (!USE_CLOUDINARY) {
      // Delete local file
      const fullPath = path.join(__dirname, '..', filePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

/**
 * Get file URL - returns Cloudinary URL or local path
 */
export const getFileUrl = (filePath, publicId = null) => {
  if (USE_CLOUDINARY && publicId) {
    return cloudinary.url(publicId);
  }
  return filePath;
};

/**
 * Transform Cloudinary image URL
 */
export const getOptimizedImageUrl = (publicId, options = {}) => {
  if (USE_CLOUDINARY && publicId) {
    return cloudinary.url(publicId, {
      quality: 'auto',
      fetch_format: 'auto',
      ...options,
    });
  }
  return publicId;
};

export default {
  handleFileUpload,
  handleFileDeletion,
  getFileUrl,
  getOptimizedImageUrl,
  USE_CLOUDINARY,
};