import express from "express";
import {
  createTeacher,
  deleteTeacher,
  getTeacher,
  getTeacherById,
  updateTeacher,
} from "../controllars/TeacherControllar.js";
const router = express.Router();

// Get all teachers
router.get("/", getTeacher);
// Get a teacher by ID
router.get("/:id", getTeacherById);
// Create a new teacher
router.post("/", createTeacher);
// Update a teacher
router.patch("/:id", updateTeacher);
// Delete a teacher
router.delete("/:id", deleteTeacher);

export default router;
