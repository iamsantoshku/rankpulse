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

    answers: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question"
        },
        selected: Number
      }
    ],

    score: Number,
    correct: Number,
    wrong: Number,
    attempted: Number,

    timeTaken: Number
  },
  { timestamps: true }
);

export default mongoose.model("TestAttempt", attemptSchema);