

// routes/question.paper.routes.js

import express from "express";
import {
  createTest,
  getTestsBySeries,
  getTestsByPYP,
  getTestById // ✅ ADD THIS
} from "../controllers/testPaper.controller.js";

const router = express.Router();

// ✅ CREATE TEST
router.post("/", createTest);

// ✅ GET SINGLE TEST
// router.get("/:id", getTestById);
router.get("/:id", getTestById);

// ✅ FILTERS
router.get("/series/:seriesId", getTestsBySeries);
router.get("/pyp/:pypId", getTestsByPYP);

export default router;