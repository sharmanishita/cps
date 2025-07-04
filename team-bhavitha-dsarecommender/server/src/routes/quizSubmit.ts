import express from "express";
import QuizResult from "../models/QuizResult";

const router = express.Router();

router.post("/quiz/submit", async (req, res) => {
  const { topic, username, answers, _correctAnswers } = req.body;

  if (!topic || !username || !Array.isArray(answers) || !Array.isArray(_correctAnswers)) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    const total = _correctAnswers.length;
    let correctCount = 0;

    for (let i = 0; i < total; i++) {
      if (answers[i] === _correctAnswers[i]) {
        correctCount++;
      }
    }

    const score = (correctCount / total) * 100;
    const mastery = Math.max(0.1, Math.min(0.9, 1 - score / 100));

    // ✅ Save result to DB using your schema
    await QuizResult.create({
      username,
      topic,
      score,
      mastery,
      answers,
      correctAnswers: _correctAnswers
    });

    // ✅ Response for frontend
    res.json({
      topic,
      score,
      userAnswers: answers,
      correctAnswers: _correctAnswers,
      masteryUpdate: {
        [topic]: mastery
      }
    });
  } catch (err) {
    console.error("Quiz submission error:", err);
    res.status(500).json({ error: "Failed to submit quiz" });
  }
});

export default router;
