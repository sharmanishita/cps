import { Router } from 'express';
import {
    getQuizForConcept,
    submitQuiz
} from '../controllers/quizController';
import { protect } from '../middlewares/authMiddleware';
import { submitQuizRules, validate } from '../validators/quizValidator';

const router = Router();

// All quiz routes require a user to be logged in
router.use(protect);

router.get('/:conceptId', getQuizForConcept);
router.post('/submit/:conceptId', submitQuizRules(), validate, submitQuiz);

export default router;