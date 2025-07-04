import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import Concept from "../models/concepts";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateStructuredNotes(pdfText: string, topic: string) {
  // Check cache
  // const existing = await Concept.findOne({ name: new RegExp(`^${topic}$`, "i") });
  // if (existing?.structuredNotes) {
  //   console.log("✅ Returning cached notes for topic:", topic);
  //   return existing.structuredNotes;
  // }

  // Updated prompt with stricter JSON instructions
  const prompt = `
You are an educational AI assistant. Analyze the following lecture text about the topic "${topic}" and return a detailed semantic summary.

Return a strictly valid JSON in the following structure WITHOUT any additional text, explanations, or markdown formatting:

{
  "description": "A concise explanation of the topic.",
  "spotlight_fact": "A surprising or interesting fact about the topic.",
  "lecture": "Lecture name or number, if available.",
  "examples": ["Example 1", "Example 2"],
  "related_topics": ["Topic A", "Topic B"],
  "quiz_available": true,

  "structuredNotes": {
    "overview": "Brief summary of the topic.",
    "keyConcepts": [
      { "name": "Concept 1", "explanation": "..." },
      { "name": "Concept 2", "explanation": "..." }
    ],
    "frequentlyUsed": ["Use case 1", "Use case 2"],
    "commonPitfalls": ["Pitfall 1", "Pitfall 2"],
    "bestPractices": ["Best practice 1", "Best practice 2"],
    "latestReferences": ["Reference 1", "Reference 2"]
  }
}

Here is the raw lecture content:
"""${pdfText}"""
`;

  let rawTextContent = ''; // For error logging

  try {
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    rawTextContent = await response.text(); // Store for possible error logging

    // 🔍 Robust JSON extraction
    let jsonString = rawTextContent.trim();
    
    // 1. Handle markdown code blocks
    if (jsonString.startsWith("```json")) {
      jsonString = jsonString.slice(7);
      // Remove trailing triple backticks if present
      const endIndex = jsonString.lastIndexOf("```");
      if (endIndex !== -1) {
        jsonString = jsonString.substring(0, endIndex);
      }
      jsonString = jsonString.trim();
    } 
    else if (jsonString.startsWith("```")) {
      jsonString = jsonString.slice(3);
      // Remove trailing triple backticks if present
      const endIndex = jsonString.lastIndexOf("```");
      if (endIndex !== -1) {
        jsonString = jsonString.substring(0, endIndex);
      }
      jsonString = jsonString.trim();
    }
    
    // 2. Extract JSON between first { and last }
    const startIdx = jsonString.indexOf('{');
    const endIdx = jsonString.lastIndexOf('}');
    
    if (startIdx === -1 || endIdx === -1) {
      throw new Error("No JSON object found in response");
    }
    
    jsonString = jsonString.substring(startIdx, endIdx + 1);
    
    const parsed = JSON.parse(jsonString);

    // Fallbacks for missing fields
    const fullConcept = {
      name: topic,
      description: parsed.description || "",
      spotlight_fact: parsed.spotlight_fact || "",
      lecture: parsed.lecture || "",
      examples: parsed.examples || [],
      related_topics: parsed.related_topics || [],
      quiz_available: parsed.quiz_available ?? true,
      structuredNotes: parsed.structuredNotes || {},
    };

    // await Concept.updateOne(
    //   { name: topic },
    //   { $set: fullConcept },
    //   { upsert: true }
    // );

    console.log("🟢 Structured notes generated and cached for:", topic);
    return fullConcept;
  } catch (err) {
    console.error("❌ Error generating structured notes:", err);
    
    // Log raw response for debugging
    console.error("Raw API response:", rawTextContent);
    
    throw new Error("Failed to generate structured notes.");
  }
}