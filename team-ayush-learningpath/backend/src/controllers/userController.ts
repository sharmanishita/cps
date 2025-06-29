// src/controllers/userController.ts
import { Request, Response } from 'express';
import User from '../models/userModel';

/**
 * @desc    Get the user's dashboard, including their populated learning profile.
 * @route   GET /api/users/dashboard
 * @access  Private
 */
export const getDashboard = async (req: Request, res: Response) => {
    try {
        // The user ID is available from the 'protect' middleware via req.user
        const userProfile = await User.findById(req.user?.id).populate({
            path: 'learningProfile.concept', // Go into learningProfile and populate the 'concept' field
            select: 'title description', // From the populated concept, only select these fields
        });

        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(userProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * @desc    Update the user's own profile details (e.g., name).
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateProfile = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user?.id);

        if (user) {
            user.name = req.body.name || user.name;
            // You can add other updatable fields here, for example:
            // user.email = req.body.email || user.email;
            // NOTE: Changing email would require additional verification logic.

            const updatedUser = await user.save();

            // Return the updated user data, excluding the password.
            res.status(200).json({
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
        res.status(500).json({ message: 'Server Error' });
    }
};
