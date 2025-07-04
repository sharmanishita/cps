import axios from 'axios';

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";
const API_KEY = process.env.GEMINI_API_KEY;

async function testGemini() {
  try {
    const res = await axios.post(`${GEMINI_API_URL}?key=${API_KEY}`, {
      contents: [{ parts: [{ text: "Say hello in JSON format." }] }]
    });

    console.log("✅ Gemini Response:", res.data);
  } catch (err: any) {
    console.error("❌ Gemini API Test Failed:", err?.response?.data || err.message);
  }
}

testGemini();
