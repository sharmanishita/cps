import { Request, Response } from "express";

// Constants
const QUIZ_PASS_THRESHOLD = 70; // percent score to pass quiz

// Mock database functions - replace with real DB queries
const getNextTopics = async (topicId: string): Promise<string[]> => {
  // Example: Return next topic IDs from your learning path graph
  return ["topic2", "topic3"];
};

const saveUserProgress = async (
  studentId: string,
  topicId: string,
  status: "topic_completed" | "quiz_submitted",
  score?: number
): Promise<void> => {
  // Save/update user progress in DB
  console.log(`Progress saved for student ${studentId} on topic ${topicId} with status ${status} and score ${score}`);
};

const evaluateQuiz = (submittedAnswers: string[], correctAnswers: string[]): number => {
  let correctCount = 0;
  submittedAnswers.forEach((ans, i) => {
    if (ans === correctAnswers[i]) correctCount++;
  });
  return (correctCount / correctAnswers.length) * 100;
};

/**
 * Student completes a topic.
 * Marks topic as completed and unlocks quiz.
 */
export const completeTopic = async (req: Request, res: Response) => {
  const studentId = req.user?.id;
  const { topicId } = req.body;

  if (!studentId || !topicId) {
    res.status(400).json({ message: "Missing studentId or topicId" });
    return;
  }

  try {
    await saveUserProgress(studentId, topicId, "topic_completed");
    res.status(200).json({ message: "Topic completed, quiz unlocked" });
  } catch (error) {
    console.error("completeTopic error:", error);
    res.status(500).json({ message: "Server error while completing topic" });
  }
};

/**
 * Student submits quiz answers.
 * Evaluates quiz and recommends next steps.
 */
export const submitQuiz = async (req: Request, res: Response) => {
  const studentId = req.user?.id;
  const { topicId, answers } = req.body;

  if (!studentId || !topicId || !answers || !Array.isArray(answers)) {
    res.status(400).json({ message: "Missing or invalid data in request" });
    return;
  }

  try {
    // Fetch correct answers from DB - for demo hardcoded
    const correctAnswers = ["A", "B", "C", "D"];

    // Evaluate score
    const score = evaluateQuiz(answers, correctAnswers);

    await saveUserProgress(studentId, topicId, "quiz_submitted", score);

    if (score >= QUIZ_PASS_THRESHOLD) {
      const nextTopics = await getNextTopics(topicId);
      res.status(200).json({
        message: "Quiz passed!",
        score,
        recommendedNextTopics: nextTopics,
      });
    } else {
      res.status(200).json({
        message: "Quiz not passed. Please revisit the topic.",
        score,
        recommendedNextTopics: [topicId], // repeat same topic
      });
    }
  } catch (error) {
    console.error("submitQuiz error:", error);
    res.status(500).json({ message: "Server error while submitting quiz" });
  }
};
