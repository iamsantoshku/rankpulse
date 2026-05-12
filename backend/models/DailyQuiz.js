import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },

  options: [String],

  correctAnswer: {
    type: String,
    required: true
  },

  explanation: String
});

const dailyQuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  slug: {
    type: String,
    unique: true
  },

  date: {
    type: Date,
    required: true
  },

  duration: {
    type: Number,
    default: 10 // minutes
  },

  questions: [questionSchema],

  isActive: {
    type: Boolean,
    default: true
  }

}, {
  timestamps: true
});

export default mongoose.model(
  "DailyQuiz",
  dailyQuizSchema
);