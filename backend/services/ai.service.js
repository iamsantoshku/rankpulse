// import OpenAI from "openai";



// if (!process.env.OPENAI_API_KEY) {
//   console.error("❌ OPENAI_API_KEY missing in environment");
// }

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

// export const generateMCQs = async (text) => {
//   const prompt = `
// Convert the following current affairs news into 5 MCQs.

// Rules:
// - 4 options each
// - Provide correct answer index (0-3)
// - Add explanation

// News:
// ${text}

// Return JSON format:
// [
//   {
//     "question": "",
//     "options": ["", "", "", ""],
//     "correctIndex": 0,
//     "explanation": ""
//   }
// ]
// `;

//   const response = await openai.chat.completions.create({
//     model: "gpt-4.1-mini",
//     messages: [{ role: "user", content: prompt }]
//   });

//   return JSON.parse(response.choices[0].message.content);
// };



import OpenAI from "openai";

export const generateMCQs = async (text) => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("❌ OPENAI_API_KEY not found in .env");
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const prompt = `
Convert the following current affairs news into 5 MCQs.

Rules:
- 4 options each
- Provide correct answer index (0-3)
- Add explanation

News:
${text}

Return JSON format:
[
  {
    "question": "",
    "options": ["", "", "", ""],
    "correctIndex": 0,
    "explanation": ""
  }
]
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }]
  });

  return JSON.parse(response.choices[0].message.content);
};




