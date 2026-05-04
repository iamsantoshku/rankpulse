import mongoose from "mongoose";

const mcqSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctIndex: Number,
  explanation: String
});

const currentAffairSchema = new mongoose.Schema({
  title: String,
  content: String,
  source: String,
  date: Date,

  mcqs: [mcqSchema],

  isPublished: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("CurrentAffair", currentAffairSchema);