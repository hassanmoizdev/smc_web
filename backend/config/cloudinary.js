import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if we should use Cloudinary
const USE_CLOUDINARY = process.env.USE_CLOUDINARY === 'true' ||
  process.env.NODE_ENV === 'production' ||
  process.env.VERCEL_ENV === '1';

// Configure Cloudinary only if needed
if (USE_CLOUDINARY) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Create local disk storage
const createLocalStorage = (folder) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, `../uploads/${folder}`);
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, ext);
      cb(null, `${baseName}-${uniqueSuffix}${ext}`);
    }
  });
};

// Create Cloudinary storage
const createCloudinaryStorage = (folder, allowedFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp']) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: `sihs/${folder}`,
      allowed_formats: allowedFormats,
      transformation: folder === 'logos'
        ? [{ width: 500, height: 500, crop: 'limit' }]
        : [{ width: 1200, height: 800, crop: 'limit' }],
    },
  });
};

// Helper to create storage based on environment
const createStorage = (folder, allowedFormats) => {
  if (USE_CLOUDINARY) {
    return createCloudinaryStorage(folder, allowedFormats);
  } else {
    return createLocalStorage(folder);
  }
};

// Multer configurations for different upload types
export const uploadEvent = multer({
  storage: createStorage('events', ['jpg', 'jpeg', 'png', 'gif', 'webp']),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export const downloadFile = multer({
  storage: createStorage('downloads', [
    // Images
    'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg',
    // Documents
    'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt',
    // Archives
    'zip', 'rar'
  ]),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
});

export const uploadLogo = multer({
  storage: createStorage('logos', ['jpg', 'jpeg', 'png', 'gif', 'webp']),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

export const uploadNotification = multer({
  storage: createStorage('notifications', ['pdf', 'jpg', 'jpeg', 'png']),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export const uploadResearch = multer({
  storage: createStorage('research', ['pdf', 'doc', 'docx']),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export const uploadConvocation = multer({
  storage: createStorage('convocations', ['jpg', 'jpeg', 'png', 'pdf']),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
});

// Utility function to delete files from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};

// Utility function to get file URL
export const getCloudinaryUrl = (publicId, options = {}) => {
  return cloudinary.url(publicId, options);
};

export default cloudinary;