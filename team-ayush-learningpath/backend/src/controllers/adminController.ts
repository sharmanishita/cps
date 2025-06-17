// src/controllers/adminController.ts
import { Request, Response } from 'express';
import User from '../models/userModel';
import Concept from '../models/conceptModel';

// --- User Management ---

/**
 * @desc    Get all users (admin only)
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
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
        const user = await User.findById(req.params.id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
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
        res.status(500).json({ message: 'Server error' });
    }
};


// --- Concept (Course) Management ---

/**
 * @desc    Create a new learning concept (admin only)
 * @route   POST /api/admin/concepts
 * @access  Private/Admin
 */
export const createConcept = async (req: Request, res: Response) => {
    const { title, description, contentBlocks, prerequisites } = req.body;
    try {
        const concept = new Concept({
            title,
            description,
            contentBlocks,
            prerequisites,
        });
        const createdConcept = await concept.save();
        res.status(201).json(createdConcept);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @desc    Update an existing learning concept (admin only)
 * @route   PUT /api/admin/concepts/:id
 * @access  Private/Admin
 */
export const updateConcept = async (req: Request, res: Response) => {
    const { title, description, contentBlocks, prerequisites } = req.body;
    try {
        const concept = await Concept.findById(req.params.id);
        if (concept) {
            concept.title = title || concept.title;
            concept.description = description || concept.description;
            concept.contentBlocks = contentBlocks || concept.contentBlocks;
            concept.prerequisites = prerequisites || concept.prerequisites;
            const updatedConcept = await concept.save();
            res.json(updatedConcept);
        } else {
            res.status(440).json({ message: 'Concept not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @desc    Delete a learning concept (admin only)
 * @route   DELETE /api/admin/concepts/:id
 * @access  Private/Admin
 */
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
        res.status(500).json({ message: 'Server error' });
    }
};
