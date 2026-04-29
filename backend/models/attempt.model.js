import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true
    },

    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam"
    },

    // 🔥 ANSWERS
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question"
        },
        selectedOption: Number,
        isCorrect: Boolean,
        marksObtained: Number
      }
    ],

    // 🔥 RESULT SUMMARY
    score: Number,
    totalMarks: Number,
    correct: Number,
    wrong: Number,
    unattempted: Number,
    accuracy: Number,

    timeTaken: Number,

    submittedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model("Attempt", attemptSchema);