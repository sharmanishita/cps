// src/controllers/adminController.ts
import { Request, Response } from 'express';
import User from '../models/userModel';
import Concept from '../models/conceptModel';

// --- User Management ---

/**
 * @desc    Get all users with pagination (admin only)
 * @route   GET /api/admin/users?page=1&limit=10
 * @access  Private/Admin
 */
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        // --- Pagination Logic ---
        // Parse page and limit from query string, with sensible defaults.
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        // --- Database Queries ---
        // We run two queries in parallel for efficiency:
        // 1. Get the total count of all users to calculate total pages.
        // 2. Get the specific "page" of users using skip and limit.
        const [totalUsers, users] = await Promise.all([
            User.countDocuments(),
            User.find({}).select('-password').limit(limit).skip(skip).sort({ createdAt: -1 })
        ]);

        // --- Send Structured Response ---
        res.status(200).json({
            success: true,
            count: users.length,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalUsers / limit),
                totalUsers: totalUsers
            },
            data: users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @desc    Get a single user by ID (admin only)
 * @route   GET /api/admin/users/:id
 * @access  Private/Admin
 */
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).select('-password').populate('learningProfile.concept', 'title');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @desc    Update a user's details, including their role (admin only)
 * @route   PUT /api/admin/users/:id
 * @access  Private/Admin
 */
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role;
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @desc    Delete a user (admin only)
 * @route   DELETE /api/admin/users/:id
 * @access  Private/Admin
 */
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.json({ message: 'User removed successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// --- Concept (Course) Management --- (No changes to these functions)

export const createConcept = async (req: Request, res: Response) => {
    try {
        const { title, description, contentBlocks, prerequisites, quiz } = req.body;
        const concept = new Concept({ title, description, contentBlocks, prerequisites, quiz });
        const createdConcept = await concept.save();
        res.status(201).json(createdConcept);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateConcept = async (req: Request, res: Response) => {
    try {
        const { title, description, contentBlocks, prerequisites, quiz } = req.body;
        const concept = await Concept.findById(req.params.id);
        if (concept) {
            concept.title = title || concept.title;
            concept.description = description || concept.description;
            concept.contentBlocks = contentBlocks || concept.contentBlocks;
            concept.prerequisites = prerequisites || concept.prerequisites;
            concept.quiz = quiz || concept.quiz;
            const updatedConcept = await concept.save();
            res.json(updatedConcept);
        } else {
            res.status(404).json({ message: 'Concept not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteConcept = async (req: Request, res: Response) => {
    try {
        const concept = await Concept.findById(req.params.id);
        if (concept) {
            await concept.deleteOne();
            res.json({ message: 'Concept removed successfully' });
        } else {
            res.status(404).json({ message: 'Concept not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
export const getAllConcepts = async (req: Request, res: Response) => {
    try {
        const concepts = await Concept.find({});
        res.json(concepts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};