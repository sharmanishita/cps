// src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

// Helper function to generate a JWT and set it in a cookie
const generateTokenAndSetCookie = (res: Response, userId: string) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
        expiresIn: '1d',
    });

    res.cookie('token', token, {
        httpOnly: true, // Prevents client-side JS from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict', // Helps mitigate CSRF attacks
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 */
export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ name, email, password });
        generateTokenAndSetCookie(res, user._id.toString());

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @desc    Authenticate a user
 * @route   POST /api/auth/login
 */
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        generateTokenAndSetCookie(res, user._id.toString());

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @desc    Log out a user
 * @route   POST /api/auth/logout
 */
export const logoutUser = (req: Request, res: Response) => {
    // The server clears the authentication cookie, effectively logging the user out.
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logout successful' });
};

/**
 * @desc    Get the current user's profile
 * @route   GET /api/auth/me
 */
export const getMyProfile = (req: Request, res: Response) => {
    // The req.user object is attached by the 'protect' middleware.
    res.status(200).json(req.user);
};

/**
 * @desc    Change the current user's password
 * @route   PUT /api/auth/changepassword
 */
export const changePassword = async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user?.id).select('+password');
        if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
            return res.status(401).json({ message: 'Incorrect old password' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
