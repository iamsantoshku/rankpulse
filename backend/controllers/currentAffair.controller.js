



import axios from "axios";
import CurrentAffair from "../models/CurrentAffair.js";
import { generateMCQs } from "../services/ai.service.js";


// 🔥 GENERATE CURRENT AFFAIRS
export const fetchAndGenerateCA = async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`
    );

    const articles = response.data.articles || [];

    console.log("TOTAL:", articles.length);

    const results = [];

    for (let art of articles) {
      try {
        const content = art.description || art.title;

        console.log("Processing:", content);

        let mcqs = [];

        try {
          mcqs = await generateMCQs(content);
        } catch {
          console.log("AI FAIL → fallback");
          mcqs = [
            {
              question: content,
              options: ["A", "B", "C", "D"],
              correctIndex: 0,
              explanation: "Fallback"
            }
          ];
        }

        const saved = await CurrentAffair.create({
          title: art.title,
          content,
          source: art.source?.name || "Unknown",
          date: new Date(art.publishedAt),
          mcqs,
          isPublished: false
        });

        console.log("✅ Saved:", saved._id);

        results.push(saved);

      } catch (err) {
        console.log("❌ Error:", err.message);
      }
    }

    res.json({
      count: results.length,
      data: results
    });

  } catch (err) {
    console.error("❌ ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
};



// 📄 GET ALL (ONLY PUBLISHED)
export const getCurrentAffairs = async (req, res) => {
  try {
    const data = await CurrentAffair.find({ isPublished: true })
      .sort({ date: -1 })
      .limit(50);

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// 📄 GET TODAY CA
export const getTodayCA = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const data = await CurrentAffair.find({
      isPublished: true,
      date: { $gte: today }
    }).sort({ date: -1 });

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// 📄 GET SINGLE CA
export const getCAById = async (req, res) => {
  try {
    const data = await CurrentAffair.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ✅ PUBLISH (ADMIN)
export const publishCA = async (req, res) => {
  try {
    await CurrentAffair.findByIdAndUpdate(req.params.id, {
      isPublished: true
    });

    res.json({ message: "✅ Published successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ❌ DELETE (ADMIN)
export const deleteCA = async (req, res) => {
  try {
    await CurrentAffair.findByIdAndDelete(req.params.id);
    res.json({ message: "🗑 Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



