import { GoogleGenAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

async function listModels() {
  const models = await genAI.listModels();
  console.log("✅ Available Gemini Models:");
  for (const model of models) {
    console.log(`• ${model.name}`);
  }
}

listModels().catch(console.error);
