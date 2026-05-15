import express from "express";

import {
  createStudyNote,
  getNotesByExam,
  getSubjectsByExam,
  getNotesBySubject
} from "../controllers/studyNote.controller.js";

// import upload from "../middleware/upload.middleware.js";
import upload from "../middleware/uploadNotes.js";

const router = express.Router();


// ADMIN
// router.post(
//   "/create",
//   upload.single("pdf"),
//   createStudyNote
// );

router.post(
  "/create",
  upload.single("pdf"),
  createStudyNote
);


// USER
router.get(
  "/subjects/:examId",
  getSubjectsByExam
);

router.get(
  "/exam/:examId",
  getNotesByExam
);

router.get(
  "/exam/:examId/:subject",
  getNotesBySubject
);

export default router;