// // // import { OpenAI } from "openai";
// // // import dotenv from "dotenv";
//  import path from "path";
// // // dotenv.config({ path: path.join(__dirname, "../../.env") });


// // // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// // // interface RawQuestion {
// // //   question: string;
// // //   options: string[];
// // //   answer: string;
// // // }

// // // export async function generateQuizFromText(text: string, topic: string) {
// // //   const prompt = `
// // // You are a quiz generation assistant.

// // // Generate exactly 10 medium-to-hard multiple choice questions (MCQs) on the topic: "${topic}".
// // // Each question must have 4 answer options and one correct answer.

// // // Return ONLY valid JSON like:
// // // [
// // //   {
// // //     "question": "....",
// // //     "options": ["A", "B", "C", "D"],
// // //     "answer": "..."
// // //   },
// // //   ...
// // // ]

// // // Lecture content:
// // // """ 
// // // ${text.slice(0, 4000)}
// // // """
// // // `;

// // //   const response = await openai.chat.completions.create({
// // //     model: "gpt-4o",
// // //     messages: [{ role: "user", content: prompt }],
// // //     temperature: 0.7,
// // //   });

// // //   const raw = response.choices[0].message.content || "[]";
// // //   const parsed: RawQuestion[] = JSON.parse(raw);

// // //   return {
// // //     questions: parsed.map(({ question, options }) => ({ question, options })),
// // //     _correctAnswers: parsed.map(({ answer }) => answer)
// // //   };
// // // }
// // import axios from "axios";
// // import dotenv from "dotenv";
// // dotenv.config({ path: path.join(__dirname, "../../.env") });

// // const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";

// // export async function generateQuizFromText(text: string, topic: string) {
// //   const prompt = `
// // Generate exactly 10 multiple choice questions (MCQs) of medium to hard difficulty on the topic: "${topic}".
// // Each question should include:
// // - a clear question
// // - 4 options
// // - one correct answer

// // Respond ONLY in valid JSON format:
// // [
// //   {
// //     "question": "...",
// //     "options": ["...", "...", "...", "..."],
// //     "answer": "..."
// //   }
// // ]

// // Context:
// // """
// // ${text.slice(0, 4000)}
// // """`;

// //   try {
// //     const response = await axios.post(
// //       `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
// //       {
// //         contents: [
// //           {
// //             parts: [{ text: prompt }],
// //           },
// //         ],
// //       }
// //     );

// //     // Assert the type of response.data to inform TypeScript about its structure
// //     const data = response.data as {
// //       candidates?: { content?: { parts?: { text?: string }[] } }[];
// //     };

// //     const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
// //     const json = textResponse?.replace(/```json|```/g, "").trim() ?? ""; // Remove code block wrappers

// //     const parsed = JSON.parse(json);

// //     return {
// //       questions: parsed.map(({ question, options }: any) => ({ question, options })),
// //       _correctAnswers: parsed.map((q: any) => q.answer),
// //     };
// //   } catch (err) {
// //     console.error("❌ Gemini API error:", err);
// //     throw new Error("Gemini quiz generation failed.");
// //   }
// // }
// import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config({ path: path.join(__dirname, "../../.env") });

// const GEMINI_API_URL =
//   "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";

// interface MCQ {
//   question: string;
//   options: string[];
//   answer: string;
// }

// export async function generateQuizFromText(text: string, topic: string) {
//   const prompt = `
// Generate 10 MCQs on the topic "${topic}". Return them in this format:
// [
//   {
//     "question": "...",
//     "options": ["A", "B", "C", "D"],
//     "answer": "..."
//   }
// ]

// Lecture content:
// """
// ${text.slice(0, 4000)}
// """`;

//   try {
//     const res = await axios.post(
//       `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
//       {
//         contents: [{ parts: [{ text: prompt }] }],
//       }
//     );

//     // Assert the type of res.data to inform TypeScript about its structure
//     const data = res.data as {
//       candidates?: { content?: { parts?: { text?: string }[] } }[];
//     };

//     const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
//     const cleaned = textResponse?.replace(/```json|```/g, "").trim() ?? "";
//     const parsed: MCQ[] = JSON.parse(cleaned);

//     return {
//       questions: parsed.map(({ question, options }) => ({ question, options })),
//       _correctAnswers: parsed.map((q) => q.answer),
//     };
//   } catch (err: any) {
//     console.warn("⚠️ Gemini failed. Using fallback questions.", err?.response?.data || err);

//     // ✅ Fallback mock data
//     const mockQuestions: MCQ[] = Array.from({ length: 10 }).map((_, i) => ({
//       question: `What is a mock question ${i + 1} on ${topic}?`,
//       options: ["Option A", "Option B", "Option C", "Option D"],
//       answer: "Option A",
//     }));

//     return {
//       questions: mockQuestions.map(({ question, options }) => ({ question, options })),
//       _correctAnswers: mockQuestions.map((q) => q.answer),
//     };
//   }
// }
// generateQuizFromText.ts
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import path from "path";
//dotenv.config({ path: path.join(__dirname, "../../.env") });
dotenv.config();


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

interface RawQuestion {
  question: string;
  options: string[];
  answer: string;
}

export async function generateQuizFromText(text: string, topic: string) {
  const prompt = `
Generate exactly 10 multiple choice questions (MCQs) of medium to hard difficulty on the topic: "${topic}".

Each question should have:
- a clear question
- 4 options
- one correct answer

Respond ONLY in valid JSON like:
[
  {
    "question": "...",
    "options": ["...", "...", "...", "..."],
    "answer": "..."
  }
]

Lecture content:
"""
${text.slice(0, 4000)}
"""
`;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const textResponse = result.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const cleaned = textResponse.replace(/```json|```/g, "").trim();
    const parsed: RawQuestion[] = JSON.parse(cleaned);

    return {
      questions: parsed.map(({ question, options }) => ({ question, options })),
      _correctAnswers: parsed.map((q) => q.answer),
    };
  } catch (err) {
    console.warn("⚠️ Gemini failed, using fallback questions.\n", err);

    //Fallback mock questions
    const mockQuestions: RawQuestion[] = Array.from({ length: 10 }).map((_, i) => ({
      question: `What is a mock question ${i + 1} on ${topic}?`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      answer: "Option A",
    }));

    return {
      questions: mockQuestions.map(({ question, options }) => ({ question, options })),
      _correctAnswers: mockQuestions.map((q) => q.answer),
    };
  }
}
