import { Router } from 'express';
const router = Router();
import analyzeController from '../controllers/analyzeController.js';
import { generate } from '../controllers/quizController.js';
import upload from '../middlewares/uploadMiddleware.js';

router.post('/analyze', upload.single('file'), analyzeController);
router.post('/generate-quiz', generate);

export default router;
