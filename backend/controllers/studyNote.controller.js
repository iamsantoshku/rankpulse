import StudyNote from "../models/studyNote.model.js";


// CREATE NOTE
// export const createStudyNote = async (req, res) => {
//   try {
//     const { exam, subject, title } = req.body;

//     const pdfUrl =
//       `http://localhost:5050/uploads/notes/${req.file.filename}`;

//     const note = await StudyNote.create({
//       exam,
//       subject,
//       title,
//       pdfUrl
//     });

//     res.status(201).json(note);

//   } catch (err) {
//     res.status(500).json({
//       message: err.message
//     });
//   }
// };


// export const createStudyNote = async (req, res) => {
//   try {
//     const { exam, subject, title } = req.body;

//     const baseUrl =
//       process.env.BASE_URL ||
//       "http://localhost:5050";

//     const pdfUrl =
//       `${baseUrl}/uploads/notes/${req.file.filename}`;

//     const note = await StudyNote.create({
//       exam,
//       subject,
//       title,
//       pdfUrl
//     });

//     res.status(201).json({
//       success: true,
//       note
//     });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message
//     });
//   }
// };


// import StudyNote from "../models/studyNote.model.js";

// export const createStudyNote = async (
//   req,
//   res
// ) => {
//   try {

//     const {
//       exam,
//       subject,
//       title
//     } = req.body;

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "PDF is required"
//       });
//     }

//     // ✅ Cloudinary PDF URL
//     const pdfUrl = req.file.path;

//     const note =
//       await StudyNote.create({
//         exam,
//         subject,
//         title,
//         pdfUrl
//       });

//     res.status(201).json({
//       success: true,
//       note
//     });

//   } catch (err) {

//     console.log(err);

//     res.status(500).json({
//       success: false,
//       message: err.message
//     });
//   }
// };


export const createStudyNote = async (req, res) => {
  try {
    const { exam, subject, title } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "PDF upload failed",
      });
    }

    const note = await StudyNote.create({
      exam,
      subject,
      title,

      pdfUrl: req.file.path,
    });

    res.status(201).json({
      success: true,
      note,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
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