import Exam from "../models/Exam.js";
import TestSeries from "../models/TestSeries.js";
import User from "../models/userModels.js"
import TestAttempt from "../models/TestAttempt.js";
import Test from "../models/Test.js";
import PreviousYear from "../models/PreviousYear.js";


import slugify from "slugify";

// ➕ Create Exam
export const createExam = async (req, res) => {
  try {
    const { title, description, logo, isPopular } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const slug = slugify(title, { lower: true });

    const exam = await Exam.create({
      title,
      slug,
      description,
      logo,
      isPopular
    });

    res.status(201).json(exam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📄 Get All Exams
export const getExams = async (req, res) => {
  const exams = await Exam.find().sort({ createdAt: -1 });
  res.json(exams);
};


export const createTestSeries = async (req, res) => {
  const test = await TestSeries.create(req.body);
  res.json(test);
};




// export const getPopularExams = async (req, res) => {
//   try {
//     const exams = await Exam.aggregate([
//       { $match: { isPopular: true } },
//       { $sample: { size: 5 } } // random 5
//     ]);

//     res.json(exams);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const getPopularExams = async (req, res) => {
  try {

    // 🔥 get random popular exams
    const exams = await Exam.aggregate([
      { $match: { isPopular: true } },
      { $sample: { size: 5 } }
    ]);

    // 🔥 add counts
    const updatedExams = await Promise.all(

      exams.map(async (exam) => {

        // get all series
        const series = await TestSeries.find({
          exam: exam._id
        });

        const seriesIds = series.map((s) => s._id);

        // total mocks
        const totalMocks = await Test.countDocuments({
          testSeries: { $in: seriesIds }
        });

        // total pyp
        const totalPYP = await PreviousYear.countDocuments({
          exam: exam._id
        });

        return {
          ...exam,

          mockCount: totalMocks,
          pypCount: totalPYP,
          seriesCount: series.length
        };
      })
    );

    res.status(200).json(updatedExams);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};




export const getUserPerformance = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("👉 USER ID:", userId);

    const attempts = await TestAttempt.find({ user: userId })
      .populate("test")
      .sort({ createdAt: -1 });

    console.log("👉 ATTEMPTS:", attempts);

    res.json(attempts);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getExamStats = async (req, res) => {
  const stats = await Attempt.aggregate([
    {
      $group: {
        _id: "$exam",
        totalAttempts: { $sum: 1 },
        avgScore: { $avg: "$score" }
      }
    }
  ]);

  res.json(stats);
};