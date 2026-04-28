import TestSeries from "../models/TestSeries.js";
// import PreviousYear from "../models/PreviousYear.js";
import PreviousYear from "../models/PreviousYear.js";
import Exam from "../models/Exam.js";

// ➕ Create Test Series
export const createTestSeries = async (req, res) => {
  const data = await TestSeries.create(req.body);
  res.json(data);
};



export const getTestSeriesByExam = async (req, res) => {
  try {
    const { slug } = req.params;

    // 🔥 find exam by slug
    const exam = await Exam.findOne({ slug });

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // 🔥 find test series using exam ID
    const tests = await TestSeries.find({ exam: exam._id });

    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET PYP BY SLUG


// ➕ Create Previous Year Paper
export const createPYP = async (req, res) => {
  const data = await PreviousYear.create(req.body);
  res.json(data);
};


export const getPYPByExam = async (req, res) => {
  const { slug } = req.params;

  const exam = await Exam.findOne({ slug });

  if (!exam) {
    return res.status(404).json({ message: "Exam not found" });
  }

  const pyp = await PreviousYear.find({ exam: exam._id });

  res.json(pyp);
};
