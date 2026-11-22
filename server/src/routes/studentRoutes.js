import { Router } from "express";
import mongoose from "mongoose";
import Student from "../models/Student.js";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) { next(error); }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid student ID" });
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) { next(error); }
});

router.post("/", async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (typeof payload.technicalSkills === "string") {
      payload.technicalSkills = payload.technicalSkills.split(",").map(s => s.trim()).filter(Boolean);
    }
    const student = await Student.create(payload);
    res.status(201).json(student);
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "Register number already exists" });
    if (error.name === "ValidationError") return res.status(400).json({ message: error.message });
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid student ID" });
    const payload = { ...req.body };
    if (typeof payload.technicalSkills === "string") {
      payload.technicalSkills = payload.technicalSkills.split(",").map(s => s.trim()).filter(Boolean);
    }
    const student = await Student.findByIdAndUpdate(req.params.id, payload, {
      new: true, runValidators: true
    });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "Register number already exists" });
    if (error.name === "ValidationError") return res.status(400).json({ message: error.message });
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid student ID" });
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student record deleted successfully" });
  } catch (error) { next(error); }
});

export default router;