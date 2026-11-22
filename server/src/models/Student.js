import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  registerNumber: { type: String, required: true, trim: true, unique: true },
  department: { type: String, required: true, trim: true },
  technicalSkills: [{ type: String, trim: true }],
  aptitudeScore: { type: Number, required: true, min: 0, max: 100 },
  communicationSkills: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true
  },
  placementReadiness: {
    type: String,
    enum: ["Ready", "In Progress", "Not Ready"],
    default: "In Progress"
  }
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);