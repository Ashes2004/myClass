import express from "express";
import {
  createResult,
  deleteResult,
  getAllResults,
  getResultById,
  getResultByStudentId,
} from "../controllars/ResultControllar.js";

const router = express.Router();

router.post("/", createResult);
router.delete("/:id", deleteResult);
router.get("/", getAllResults);
router.get("/:id", getResultById);
router.get("/student/:studentId", getResultByStudentId);
export default router;
