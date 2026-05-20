/**
 * One-time utility: removes all Convocation MongoDB records and related uploads.
 * Run from backend/: node scripts/clearConvocationData.js
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Convocation from "../models/Convocation.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const USE_CLOUDINARY =
  process.env.USE_CLOUDINARY === "true" ||
  process.env.NODE_ENV === "production" ||
  process.env.VERCEL_ENV === "1";

const CLOUDINARY_PREFIX = "sihs/convocations";
const LOCAL_CONVOCATIONS_DIR = path.join(__dirname, "../uploads/convocations");

function collectFileUrls(record) {
  const urls = [];
  if (record.picture) urls.push(record.picture);
  if (record.distinctionFiles) {
    for (const key of Object.keys(record.distinctionFiles)) {
      const url = record.distinctionFiles[key];
      if (url) urls.push(url);
    }
  }
  return urls;
}

function publicIdFromCloudinaryUrl(url) {
  if (!url || !url.includes("cloudinary.com")) return null;
  try {
    const uploadSegment = "/upload/";
    const idx = url.indexOf(uploadSegment);
    if (idx === -1) return null;
    let remainder = url.slice(idx + uploadSegment.length);
    remainder = remainder.replace(/^v\d+\//, "");
    const withoutQuery = remainder.split("?")[0];
    const lastDot = withoutQuery.lastIndexOf(".");
    return lastDot === -1 ? withoutQuery : withoutQuery.slice(0, lastDot);
  } catch {
    return null;
  }
}

async function deleteCloudinaryByPrefix() {
  const types = ["image", "raw"];
  let totalDeleted = 0;
  for (const resourceType of types) {
    let nextCursor;
    do {
      const result = await cloudinary.api.delete_resources_by_prefix(
        CLOUDINARY_PREFIX,
        { resource_type: resourceType, type: "upload", next_cursor: nextCursor }
      );
      const deleted = result.deleted || {};
      totalDeleted += Object.keys(deleted).length;
      nextCursor = result.next_cursor;
    } while (nextCursor);
  }
  return totalDeleted;
}

async function deleteCloudinaryFromRecords(records) {
  const publicIds = new Set();
  for (const record of records) {
    for (const url of collectFileUrls(record)) {
      const id = publicIdFromCloudinaryUrl(url);
      if (id) publicIds.add(id);
    }
  }
  let deleted = 0;
  for (const publicId of publicIds) {
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
      await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
      deleted++;
    } catch (err) {
      console.warn(`  Could not delete ${publicId}:`, err.message);
    }
  }
  return deleted;
}

function clearLocalConvocationFiles() {
  if (!fs.existsSync(LOCAL_CONVOCATIONS_DIR)) return 0;
  const files = fs.readdirSync(LOCAL_CONVOCATIONS_DIR);
  for (const file of files) {
    const fullPath = path.join(LOCAL_CONVOCATIONS_DIR, file);
    if (fs.statSync(fullPath).isFile()) fs.unlinkSync(fullPath);
  }
  return files.length;
}

async function main() {
  const mongoUrl = process.env.MONGO_DB_URL;
  if (!mongoUrl) {
    console.error("MONGO_DB_URL is not set in backend/.env");
    process.exit(1);
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(mongoUrl);

  const countBefore = await Convocation.countDocuments();
  console.log(`Found ${countBefore} convocation record(s) in database.`);

  const records = await Convocation.find().lean();

  let cloudinaryDeleted = 0;
  if (USE_CLOUDINARY) {
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.warn("Cloudinary env vars missing; skipping Cloudinary cleanup.");
    } else {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      console.log(`Deleting Cloudinary assets under "${CLOUDINARY_PREFIX}"...`);
      try {
        cloudinaryDeleted = await deleteCloudinaryByPrefix();
        console.log(`  Prefix delete: ${cloudinaryDeleted} asset(s).`);
      } catch (err) {
        console.warn("  Prefix delete failed, trying per-record URLs:", err.message);
        cloudinaryDeleted = await deleteCloudinaryFromRecords(records);
        console.log(`  Per-URL delete attempted for ${cloudinaryDeleted} public id(s).`);
      }
    }
  } else {
    console.log("Cloudinary disabled (local storage mode).");
  }

  const localDeleted = clearLocalConvocationFiles();
  if (localDeleted > 0) {
    console.log(`Removed ${localDeleted} local file(s) from uploads/convocations.`);
  }

  const deleteResult = await Convocation.deleteMany({});
  console.log(`Deleted ${deleteResult.deletedCount} record(s) from Convocation collection.`);

  const countAfter = await Convocation.countDocuments();
  console.log(`Remaining convocation records: ${countAfter}`);
  console.log("Done.");

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Failed:", err);
  mongoose.disconnect().finally(() => process.exit(1));
});
