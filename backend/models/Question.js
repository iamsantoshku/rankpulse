



// import mongoose from "mongoose";

// const questionSchema = new mongoose.Schema(
//   {
//     question: {
//       type: String,
//       required: true
//     },

//     options: [
//       {
//         text: String,
//         isCorrect: Boolean
//       }
//     ],

//     explanation: String,

//     // 🔥 ONLY LINK TO TEST
//     test: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Test",
//       required: true
//     },

//     subject: String,

//     difficulty: {
//       type: String,
//       enum: ["easy", "medium", "hard"]
//     },

//     marks: {
//       type: Number,
//       default: 1
//     },

//     negativeMarks: {
//       type: Number,
//       default: 0
//     }
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Question", questionSchema);




import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    // 🔥 QUESTION TEXT (MULTI LANGUAGE SUPPORT)
    question: {
      en: { type: String, required: true },
      hi: { type: String } // optional Hindi
    },

    // 🔥 OPTIONS
    options: [
      {
        text: {
          en: String,
          hi: String
        },
        isCorrect: Boolean
      }
    ],

    // 🔥 QUESTION TYPE
    type: {
      type: String,
      enum: ["mcq", "numeric"],
      default: "mcq"
    },

    // 🔥 FOR NUMERIC TYPE QUESTIONS
    correctAnswer: {
      type: String // used only when type = numeric
    },

    // 🔥 EXPLANATION
    explanation: {
      en: String,
      hi: String
    },

    // 🔥 LINK TO TEST
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true
    },

    // 🔥 SECTION (VERY IMPORTANT)
    section: {
      type: String,
      default: "General"
      // Example: "Math", "Reasoning", "English", "GK"
    },

    // 🔥 SUBJECT (OPTIONAL FILTERING)
    subject: {
      type: String
    },

    // 🔥 DIFFICULTY
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy"
    },

    // 🔥 MARKING SYSTEM
    marks: {
      type: Number,
      default: 2
    },

    negativeMarks: {
      type: Number,
      default: 0.5
    },

    // 🔥 ORDER IN TEST
    order: {
      type: Number
    }
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);