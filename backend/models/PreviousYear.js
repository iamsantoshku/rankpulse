// import mongoose from "mongoose";

// const pypSchema = new mongoose.Schema(
//   {
//     title: String,
//     exam: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Exam"
//     },
//     year: Number,
//     totalQuestions: Number
//   },
//   { timestamps: true }
// );

// export default mongoose.model("PreviousYear", pypSchema);



import mongoose from "mongoose";

const pypSchema = new mongoose.Schema(
  {
    title: String,
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam"
    },
    year: Number,
    shift: String,
    totalQuestions: Number,
    totalMarks: Number,
    duration: Number,
    tag: String,
    isFree: Boolean,
    price: Number
  },
  { timestamps: true }
);

export default mongoose.model("PreviousYear", pypSchema);