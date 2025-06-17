import { Router } from 'express';
import {
    getDashboard,
    updateProfile
} from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// All routes in this file are protected
router.use(protect);

router.get('/dashboard', getDashboard);
router.put('/profile', updateProfile);

export default router;