import { Router } from 'express';
import { generateRecommendation } from '../controllers/recommendationController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// The route to generate a new recommendation
router.post('/generate', protect, generateRecommendation);

export default router;