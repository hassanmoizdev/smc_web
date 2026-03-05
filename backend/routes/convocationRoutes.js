import express from "express";
import Convocation from "../models/Convocation.js";
import { uploadConvocation } from "../config/cloudinary.js";

const router = express.Router();

// Prepare multer configuration to handle multiple specific fields
// We expect a main `picture`, and up to 5 distinction attachments (`distinction_year1`, etc)
const cpUpload = uploadConvocation.fields([
    { name: "picture", maxCount: 1 },
    { name: "distinction_year1", maxCount: 1 },
    { name: "distinction_year2", maxCount: 1 },
    { name: "distinction_year3", maxCount: 1 },
    { name: "distinction_year4", maxCount: 1 },
    { name: "distinction_year5", maxCount: 1 },
]);

router.post("/", cpUpload, async (req, res) => {
    try {
        const {
            name,
            fatherName,
            whatsapp,
            email,
            collegeId,
            uhsReg,
            pmdReg,
            academicSession,
            passingYear,
            distinction,
            positionHolder,
            department,
            currentPosition,
            attendConvocation,
        } = req.body;

        // Build the positions data safely by parsing if it came as a JSON string,
        // or manually reconstructing from fields. Let's assume frontend sends flat fields for simplicity.
        const positions = {
            year1: req.body.position_year1 || "",
            year2: req.body.position_year2 || "",
            year3: req.body.position_year3 || "",
            year4: req.body.position_year4 || "",
            year5: req.body.position_year5 || "",
        };

        // Extract file paths from req.files provided by multer-cloudinary or locals
        let pictureUrl = "";
        if (req.files && req.files["picture"] && req.files["picture"][0]) {
            pictureUrl = req.files["picture"][0].path || `/uploads/convocations/${req.files["picture"][0].filename}`;
        }

        const distinctionFiles = {
            year1: req.files && req.files["distinction_year1"] && req.files["distinction_year1"][0] ? req.files["distinction_year1"][0].path || `/uploads/convocations/${req.files["distinction_year1"][0].filename}` : "",
            year2: req.files && req.files["distinction_year2"] && req.files["distinction_year2"][0] ? req.files["distinction_year2"][0].path || `/uploads/convocations/${req.files["distinction_year2"][0].filename}` : "",
            year3: req.files && req.files["distinction_year3"] && req.files["distinction_year3"][0] ? req.files["distinction_year3"][0].path || `/uploads/convocations/${req.files["distinction_year3"][0].filename}` : "",
            year4: req.files && req.files["distinction_year4"] && req.files["distinction_year4"][0] ? req.files["distinction_year4"][0].path || `/uploads/convocations/${req.files["distinction_year4"][0].filename}` : "",
            year5: req.files && req.files["distinction_year5"] && req.files["distinction_year5"][0] ? req.files["distinction_year5"][0].path || `/uploads/convocations/${req.files["distinction_year5"][0].filename}` : "",
        };

        const newConvocation = new Convocation({
            name,
            fatherName,
            whatsapp,
            email,
            collegeId,
            uhsReg,
            pmdReg,
            academicSession,
            passingYear,
            distinction,
            distinctionFiles,
            positionHolder,
            positions,
            department,
            currentPosition,
            attendConvocation,
            picture: pictureUrl,
        });

        await newConvocation.save();

        res.status(201).json({ message: "Convocation registration submitted successfully", record: newConvocation });
    } catch (error) {
        console.error("Error submitting convocation form:", error);
        res.status(500).json({ error: "An error occurred while submitting the form. Please try again." });
    }
});

// Endpoint to get all registrations (likely for admin dashboard later)
router.get("/", async (req, res) => {
    try {
        const records = await Convocation.find().sort({ createdAt: -1 });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch records" });
    }
});

export default router;
