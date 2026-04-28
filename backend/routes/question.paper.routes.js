// import express from "express";
// import {
//   createTest,
//   getTestsBySeries,
//   getTestsByPYP
// } from "../controllers/testPaper.controller.js";

// const router = express.Router();

// router.post("/test", createTest);
// router.get("/series/:seriesId", getTestsBySeries);
// router.get("/pyp/:pypId", getTestsByPYP);

// export default router;



// import express from "express";
// import {
//   createTest,
//   getTestsBySeries,
//   getTestsByPYP,
//   getTestById
// } from "../controllers/testPaper.controller.js";

// const router = express.Router();

// // ✅ CREATE TEST PAPER
// router.post("/", createTest);

// router.get("/:testId", getTestById);

// // ✅ GET TESTS BY SERIES
// router.get("/series/:seriesId", getTestsBySeries);

// // ✅ GET TESTS BY PYP
// router.get("/pyp/:pypId", getTestsByPYP);

// export default router;



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