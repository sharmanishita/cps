import { Router } from 'express';
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    createConcept,
    updateConcept,
    deleteConcept,
} from '../controllers/adminController';
import { protect } from '../middlewares/authMiddleware';
import { admin } from '../middlewares/adminMiddleware';
import { conceptValidationRules, validate } from '../validators/conceptValidator';

const router = Router();

// This applies 'protect' and 'admin' middleware to ALL routes in this file
router.use(protect, admin);

// User Management Routes
router.get('/users', getAllUsers);
router.route('/users/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// Concept (Course) Management Routes
router.post('/concepts', conceptValidationRules(), validate, createConcept);
router.route('/concepts/:id')
    .put(conceptValidationRules(), validate, updateConcept)
    .delete(deleteConcept);

export default router;