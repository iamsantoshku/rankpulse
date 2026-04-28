
// });

// export default mongoose.model("Test", testSchema);




// import mongoose from "mongoose";

// const testSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true
//     },

//     testSeries: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "TestSeries",
//       default: null
//     },

//     pyp: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "PreviousYear",
//       default: null
//     },

//     totalQuestions: {
//       type: Number,
//       required: true
//     },

//     duration: {
//       type: Number,
//       required: true
//     },

//     isFree: {
//       type: Boolean,
//       default: true
//     },

//     price: {
//       type: Number,
//       default: 0
//     }
//   },
//   { timestamps: true }
// );

// // ✅ FIXED VALIDATION
// testSchema.pre("save", function () {
//   if (!this.testSeries && !this.pyp) {
//     throw new Error("Test must belong to either Test Series or PYP");
//   }
// });

// export default mongoose.model("Test", testSchema);





import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  name: String, // Maths, Reasoning, etc
  questions: Number,
  marks: Number
});

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    testSeries: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestSeries",
      default: null
    },

    pyp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PreviousYear",
      default: null
    },

    totalQuestions: {
      type: Number,
      required: true
    },

    duration: {
      type: Number,
      required: true
    },

    // ✅ NEW
    hasSections: {
      type: Boolean,
      default: false
    },

    sections: [sectionSchema], // optional

    // ✅ LANGUAGE SUPPORT
    language: {
      type: String,
      enum: ["english", "hindi", "both"],
      default: "both"
    },

    isFree: {
      type: Boolean,
      default: true
    },

    price: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// ✅ VALIDATION
testSchema.pre("save", function () {
  if (!this.testSeries && !this.pyp) {
    throw new Error("Test must belong to either Test Series or PYP");
  }

  if (this.hasSections && this.sections.length === 0) {
    throw new Error("Sections required when hasSections is true");
  }
});

export default mongoose.model("Test", testSchema);