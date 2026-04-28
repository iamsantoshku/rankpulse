// import mongoose from "mongoose";

// const testSeriesSchema = new mongoose.Schema(
//   {
//     exam: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Exam",
//       required: true
//     },
//     title: String,
//     totalTests: Number,
//     previousPapers: Number,
//     price: Number
//   },
//   { timestamps: true }
// );

// export default mongoose.model("TestSeries", testSeriesSchema);


// import mongoose from "mongoose";

// const testSeriesSchema = new mongoose.Schema(
//   {
//     title: String,
//     exam: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Exam"
//     },
//     totalTests: Number,
//     price: Number,
//     // previousPapers: Number,
//     isFree: Boolean
//   },
//   { timestamps: true }
// );

// export default mongoose.model("TestSeries", testSeriesSchema);



import mongoose from "mongoose";

const testSeriesSchema = new mongoose.Schema(
  {
    title: String,
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam"
    },
    totalQuestions: Number,
    totalMarks: Number,
    duration: Number,
    isFree: Boolean,
    price: Number,
    tag: String, // SSC, RRB etc
    testNumber: Number
  },
  { timestamps: true }
);

export default mongoose.model("TestSeries", testSeriesSchema);