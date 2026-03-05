import mongoose from "mongoose";

const convocationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    email: { type: String, required: true },
    whatsapp: { type: String, required: true },
    picture: { type: String }, // Store URL/Path of the uploaded picture
    collegeId: { type: String },
    uhsReg: { type: String },
    pmdReg: { type: String },
    academicSession: { type: String },
    passingYear: { type: String },
    distinction: { type: String, enum: ["Yes", "No"], default: "No" },
    distinctionFiles: {
      year1: { type: String },
      year2: { type: String },
      year3: { type: String },
      year4: { type: String },
      year5: { type: String },
    },
    positionHolder: { type: String, enum: ["Yes", "No"], default: "No" },
    positions: {
      year1: { type: String },
      year2: { type: String },
      year3: { type: String },
      year4: { type: String },
      year5: { type: String },
    },
    department: { type: String },
    currentPosition: { type: String },
    attendConvocation: { type: String, enum: ["Yes", "No"], default: "Yes" },
  },
  { timestamps: true }
);

export default mongoose.model("Convocation", convocationSchema);
