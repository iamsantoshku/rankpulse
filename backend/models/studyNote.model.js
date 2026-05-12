import mongoose from "mongoose";

const studyNoteSchema = new mongoose.Schema(
  {
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true
    },

    subject: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    pdfUrl: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "StudyNote",
  studyNoteSchema
);