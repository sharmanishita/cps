import express from "express";
import { verifyToken, allowRoles } from "../middlewares/authMiddleware";
import { completeTopic, submitQuiz } from "../controllers/protectedController";

const router = express.Router();

/**
 * Route: POST /progress/complete-topic
 * Role: Student only
 * Description: Marks a topic as completed and unlocks quiz.
 */
router.post(
  "/progress/complete-topic",
  verifyToken,
  allowRoles("student"),
  completeTopic
);

/**
 * Route: POST /progress/submit-quiz
 * Role: Student only
 * Description: Submit quiz answers and get recommendation.
 */
router.post(
  "/progress/submit-quiz",
  verifyToken,
  allowRoles("student"),
  submitQuiz
);

export default router;
