import StudyNote from "../models/studyNote.model.js";


// CREATE NOTE
export const createStudyNote = async (req, res) => {
  try {
    const { exam, subject, title } = req.body;

    const pdfUrl =
      `http://localhost:5050/uploads/notes/${req.file.filename}`;

    const note = await StudyNote.create({
      exam,
      subject,
      title,
      pdfUrl
    });

    res.status(201).json(note);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// GET NOTES BY EXAM
export const getNotesByExam = async (req, res) => {
  try {
    const notes = await StudyNote.find({
      exam: req.params.examId
    });

    res.json(notes);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// GET SUBJECTS OF EXAM
export const getSubjectsByExam = async (req, res) => {
  try {

    const subjects =
      await StudyNote.distinct(
        "subject",
        { exam: req.params.examId }
      );

    res.json(subjects);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// GET NOTES BY SUBJECT
export const getNotesBySubject = async (req, res) => {
  try {

    const notes = await StudyNote.find({
      exam: req.params.examId,
      subject: req.params.subject
    });

    res.json(notes);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};