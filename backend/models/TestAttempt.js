// import mongoose from "mongoose";

// const attemptSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true
//     },

//     test: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Test",
//       required: true
//     },

//     answers: [
//       {
//         question: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Question"
//         },
//         selected: Number
//       }
//     ],

//     score: Number,
//     correct: Number,
//     wrong: Number,
//     attempted: Number,

//     timeTaken: Number
//   },
//   { timestamps: true }
// );

// export default mongoose.model("TestAttempt", attemptSchema);





// ˇimport mongoose from "mongoose";
import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true
  },
  selectedOption: {
    type: Number
  },
  isCorrect: {
    type: Boolean
  },
  marksObtained: {
    type: Number
  }
});

const attemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
      index: true
    },

    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      index: true
    },

    answers: [answerSchema],

    score: {
      type: Number,
      default: 0
    },

    totalMarks: {
      type: Number,
      default: 0
    },

    correct: {
      type: Number,
      default: 0
    },

    wrong: {
      type: Number,
      default: 0
    },

    attempted: {
      type: Number,
      default: 0
    },

    unattempted: {
      type: Number,
      default: 0
    },
    // new added
    rank: {
  type: Number
},

percentile: {
  type: Number
},



    accuracy: {
      type: Number,
      default: 0
    },

    timeTaken: {
      type: Number
    },

    violations: {
      tabSwitch: { type: Number, default: 0 },
      blur: { type: Number, default: 0 },
      copy: { type: Number, default: 0 },
      rightClick: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

export default mongoose.model("TestAttempt", attemptSchema);