import express from "express";
import mongoose from "mongoose";
import { getTextFromPdfStream } from "../utils/pdfExtractor";
import { generateQuizFromText } from "../utils/quizGenerator";

const router = express.Router();

router.get("/quiz/:topic", async (req, res) => {
  const { topic } = req.params;
  console.log(`🟡 Incoming quiz request for topic: ${topic}`);
  const db = mongoose.connection.db;

  if (!db) {
    res.status(500).json({ error: "Database connection not established" });
    return;
  }

  try {
    const mapping = await db.collection("topic_mappings").findOne({ topic });
    if (!mapping){
      console.log("🔴 Topic not found in topic_mappings");
      res.status(404).json({ error: "Topic not found in mapping" })
      return;
    }
     console.log(`🟢 Found mapping for topic → PDF: ${mapping.pdf}`);
    const file = await db.collection("pdfs.files").findOne({ filename: mapping.pdf });
    if (!file){
      console.log("🔴 PDF file not found for topic:", topic);
      res.status(404).json({ error: "PDF file not found" });
      return;
    }// res.status(404).json({ error: "PDF not found" });
    console.log(`🟢 Found PDF file for topic: ${topic} with ID: ${file._id}`);

    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "pdfs" });
    const stream = bucket.openDownloadStream(file._id);

    const text = await getTextFromPdfStream(stream);
    if (!text) {
      console.log("🔴 No text extracted from PDF for topic:", topic);
      res.status(500).json({ error: "Failed to extract text from PDF" });
      return;
    }
    console.log(`🟢 Successfully extracted text from PDF for topic: ${topic}`);

    const formattedQuiz = await generateQuizFromText(text, topic);
    
    console.log(`🟢 Successfully generated quiz for topic: ${topic}`);

    res.json(formattedQuiz);
  } catch (err) {
    console.error("Quiz generation error:", err);
    res.status(500).json({ error: "Server error during quiz generation" });
  }
});

export default router;
