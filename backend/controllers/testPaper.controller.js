


import Test from "../models/Test.js";

// export const createTest = async (req, res) => {
//   try {
//     const data = req.body;

//     const test = await Test.create({
//       ...data,
//       testSeries: data.testSeries || null,
//       pyp: data.pyp || null,
//       totalQuestions: Number(data.totalQuestions),
//       duration: Number(data.duration),
//       price: data.isFree ? 0 : Number(data.price)
//     });

//     res.status(201).json(test);
//   } catch (err) {
//     console.error("❌ ERROR:", err.message);
//     res.status(500).json({ message: err.message });
//   }
// };



// controllers/testPaper.controller.js


export const createTest = async (req, res) => {
  try {
    const data = req.body;

    // const test = await Test.create({
    //   ...data,
    //   totalQuestions: Number(data.totalQuestions),
    //   duration: Number(data.duration),
    //   price: data.isFree ? 0 : Number(data.price)
    // });


    const test = await Test.create({
  ...data,

  testSeries: data.testSeries || null,
  pyp: data.pyp || null,

  totalQuestions: Number(data.totalQuestions),
  duration: Number(data.duration),
  price: data.isFree ? 0 : Number(data.price)
});

    res.status(201).json(test);
  } catch (err) {
    console.error("❌ ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
};

export const getTestById = async (req, res) => {
  try {
    const { id } = req.params; // ✅ FIXED

    const test = await Test.findById(id)
      .populate({
        path: "testSeries",
        populate: { path: "exam" }
      })
      .populate({
        path: "pyp",
        populate: { path: "exam" }
      });

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.json(test);
  } catch (err) {
    console.error("❌ ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
};

export const getTestsBySeries = async (req, res) => {
  const { seriesId } = req.params;

  const tests = await Test.find({
    testSeries: seriesId
  });

  res.json(tests);
};

// 📄 Get Tests by PYP
export const getTestsByPYP = async (req, res) => {
  const { pypId } = req.params;

  const tests = await Test.find({
    pyp: pypId
  });

  res.json(tests);
};