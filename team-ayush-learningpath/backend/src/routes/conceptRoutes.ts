import { Router } from 'express';
import {
    getAllConcepts,
    getConceptById
} from '../controllers/conceptController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// All concept routes are protected
router.use(protect);

router.get('/', getAllConcepts);
router.get('/:id', getConceptById);

export default router;