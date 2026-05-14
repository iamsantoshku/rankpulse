import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export const askAI = async (message) => {
  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash"
    });

    const result = await model.generateContent(message);

    const response =
      result.response.text();

    return response;

  } catch (err) {
    console.log("AI ERROR:", err);

    throw new Error("AI failed");
  }
};