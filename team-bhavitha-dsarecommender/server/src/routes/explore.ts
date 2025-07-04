// routes/explore.ts
import express from "express";
import Concept from "../models/concepts"; // Your Mongoose model
import mongoose from "mongoose";
import { generateStructuredNotes } from "../utils/generateStructuredNotes";
import { getTextFromPdfStream } from "../utils/pdfExtractor";
const router = express.Router();

// GET /api/explore/:topic
router.get("/:topic", async (req, res) => {
  const { topic } = req.params;
  console.log(`🟡 Incoming explore request for topic: ${topic}`);
  const db = mongoose.connection.db;
  if (!db) {
    res.status(500).json({ error: "Database connection not established" });
    return;
  }
  console.log(`🟢 Database connection established for explore route`);
  try {
    // const concept = await Concept.findOne({ name: new RegExp(`^${topic}$`, "i") });

    // if (!concept) {
    //   res.status(404).json({ error: "Concept not found" });
    //   return;
    // }
      const mapping = await db.collection("topic_mappings").findOne({topic});
    if (!mapping) {
      console.log("🔴 Topic not found in topic_mappings");
      res.status(404).json({ error: "Topic not found in mapping" });
      return; 
    }
    console.log(`🟢 Found mapping for topic: ${topic} → PDF: ${mapping.pdf}`);
    const file = await db.collection("pdfs.files").findOne({ filename: mapping.pdf });
    if (!file) {
      console.log("🔴 PDF file not found for topic:", topic);
      res.status(404).json({ error: "PDF file not found" });
      return;
    }
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

    const structuredNotes = await generateStructuredNotes(text, topic);
    console.log(`🟢 Successfully generated structured notes for topic: ${topic}`);
    res.json(structuredNotes);
    //res.json(concept);
  } catch (err) {
    console.error("Explore route error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
