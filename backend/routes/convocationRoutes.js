import express from "express";
import Convocation from "../models/Convocation.js";
import { uploadConvocation } from "../config/cloudinary.js";
import nodemailer from "nodemailer";

const router = express.Router();
const MAX_CONVOCATION_MEMBERS = 200;

const cpUpload = uploadConvocation.fields([
    { name: "picture", maxCount: 1 },
    { name: "paymentSlip", maxCount: 1 },
    { name: "distinction_year1", maxCount: 1 },
    { name: "distinction_year2", maxCount: 1 },
    { name: "distinction_year3", maxCount: 1 },
    { name: "distinction_year4", maxCount: 1 },
    { name: "distinction_year5", maxCount: 1 },
]);

function fileUrl(files, fieldName) {
    const file = files?.[fieldName]?.[0];
    if (!file) return "";
    // Cloudinary returns https URL in file.path
    if (file.path && /^https?:\/\//i.test(file.path)) {
        return file.path;
    }
    // Local disk: always store web path (not Windows absolute path)
    return `/uploads/convocations/${file.filename}`;
}

function normalizeMediaUrl(url) {
    if (!url || /^https?:\/\//i.test(url)) return url || "";
    const normalized = String(url).replace(/\\/g, "/");
    const idx = normalized.toLowerCase().indexOf("/uploads/");
    return idx !== -1 ? normalized.slice(idx) : url;
}

function formatRecord(record) {
    const obj = record.toObject ? record.toObject() : { ...record };
    obj.picture = normalizeMediaUrl(obj.picture);
    obj.paymentSlip = normalizeMediaUrl(obj.paymentSlip);
    if (obj.distinctionFiles) {
        for (const key of Object.keys(obj.distinctionFiles)) {
            obj.distinctionFiles[key] = normalizeMediaUrl(obj.distinctionFiles[key]);
        }
    }
    return obj;
}

async function getNextConvocationNumber() {
    const used = await Convocation.find({
        paymentStatus: "verified",
        convocationNumber: { $ne: null },
    }).select("convocationNumber");
    const usedSet = new Set(used.map((r) => r.convocationNumber));
    for (let n = 1; n <= MAX_CONVOCATION_MEMBERS; n++) {
        if (!usedSet.has(n)) return n;
    }
    return null;
}

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
            transactionId,
        } = req.body;

        if (!transactionId?.trim()) {
            return res.status(400).json({ error: "Transaction ID is required." });
        }

        const paymentSlipUrl = fileUrl(req.files, "paymentSlip");
        if (!paymentSlipUrl) {
            return res.status(400).json({ error: "Payment slip upload is required." });
        }

        const positions = {
            year1: req.body.position_year1 || "",
            year2: req.body.position_year2 || "",
            year3: req.body.position_year3 || "",
            year4: req.body.position_year4 || "",
            year5: req.body.position_year5 || "",
        };

        const pictureUrl = fileUrl(req.files, "picture");

        const distinctionFiles = {
            year1: fileUrl(req.files, "distinction_year1"),
            year2: fileUrl(req.files, "distinction_year2"),
            year3: fileUrl(req.files, "distinction_year3"),
            year4: fileUrl(req.files, "distinction_year4"),
            year5: fileUrl(req.files, "distinction_year5"),
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
            transactionId: transactionId.trim(),
            paymentSlip: paymentSlipUrl,
            paymentStatus: "pending",
            picture: pictureUrl,
        });

        await newConvocation.save();

        if (email) {
            try {
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.EMAIL_USER || "your-email@gmail.com",
                        pass: process.env.EMAIL_PASS || "your-app-password",
                    },
                });

                const mailOptions = {
                    from: process.env.EMAIL_USER || "your-email@gmail.com",
                    to: email,
                    subject: "Convocation Registration Received - SMC",
                    html: `
                        <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                            <div style="background-color: #8b0000; color: white; padding: 20px; text-align: center;">
                                <h1 style="margin: 0; font-size: 24px;">Registration Received</h1>
                            </div>
                            <div style="padding: 30px; background-color: #f9f9f9;">
                                <p style="font-size: 16px; color: #333;">Dear <strong>${name}</strong>,</p>
                                <p style="font-size: 16px; color: #333; line-height: 1.5;">
                                    Your convocation registration and payment details have been received. Our team will verify your transaction and confirm your seat.
                                </p>
                                <div style="background-color: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; margin: 20px 0;">
                                    <h3 style="margin-top: 0; color: #8b0000; border-bottom: 2px solid #8b0000; padding-bottom: 10px;">Registration Details</h3>
                                    <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                                    <p style="margin: 5px 0;"><strong>College ID:</strong> ${collegeId || "N/A"}</p>
                                    <p style="margin: 5px 0;"><strong>Transaction ID:</strong> ${transactionId}</p>
                                    <p style="margin: 5px 0;"><strong>Status:</strong> Pending verification</p>
                                </div>
                                <p style="font-size: 14px; color: #666;">
                                    Best Regards,<br>
                                    <strong>SMC Administration</strong>
                                </p>
                            </div>
                        </div>
                    `,
                };

                transporter.sendMail(mailOptions).catch((err) => {
                    console.error("Failed to send confirmation email:", err);
                });
            } catch (err) {
                console.error("Mail setup error:", err);
            }
        }

        res.status(201).json({
            message: "Convocation registration submitted successfully. Payment is pending verification.",
            record: formatRecord(newConvocation),
        });
    } catch (error) {
        console.error("Error submitting convocation form:", error);
        res.status(500).json({ error: "An error occurred while submitting the form. Please try again." });
    }
});

router.get("/", async (req, res) => {
    try {
        const records = await Convocation.find().sort({ createdAt: -1 });
        res.status(200).json(records.map(formatRecord));
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch records" });
    }
});

router.patch("/:id/verify", async (req, res) => {
    try {
        const record = await Convocation.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ error: "Record not found" });
        }

        if (record.paymentStatus === "verified" && record.convocationNumber) {
            return res.status(200).json({ message: "Already verified", record: formatRecord(record) });
        }

        const verifiedCount = await Convocation.countDocuments({ paymentStatus: "verified" });
        if (verifiedCount >= MAX_CONVOCATION_MEMBERS) {
            return res.status(400).json({
                error: `Maximum ${MAX_CONVOCATION_MEMBERS} convocation members already verified.`,
            });
        }

        const nextNumber = await getNextConvocationNumber();
        if (!nextNumber) {
            return res.status(400).json({ error: "No convocation numbers available (1–200 are full)." });
        }

        record.paymentStatus = "verified";
        record.convocationNumber = nextNumber;
        await record.save();

        res.status(200).json({
            message: `Payment verified. Convocation number ${nextNumber} assigned.`,
            record: formatRecord(record),
        });
    } catch (error) {
        console.error("Error verifying convocation:", error);
        res.status(500).json({ error: "Failed to verify payment" });
    }
});

router.patch("/:id/reject", async (req, res) => {
    try {
        const record = await Convocation.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ error: "Record not found" });
        }

        record.paymentStatus = "rejected";
        record.convocationNumber = null;
        await record.save();

        res.status(200).json({ message: "Payment rejected", record: formatRecord(record) });
    } catch (error) {
        console.error("Error rejecting convocation:", error);
        res.status(500).json({ error: "Failed to reject payment" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedRecord = await Convocation.findByIdAndDelete(req.params.id);
        if (!deletedRecord) {
            return res.status(404).json({ error: "Record not found" });
        }
        res.status(200).json({ message: "Record deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete record" });
    }
});

export default router;
