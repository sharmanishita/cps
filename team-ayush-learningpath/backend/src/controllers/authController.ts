import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { IUser } from '../types';

const generateTokenAndSetCookie = (res: Response, userId: string) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
    });
};

export const registerUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        const user = await User.create({ firstName, lastName, email, password });
        generateTokenAndSetCookie(res, user._id.toString());

        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        generateTokenAndSetCookie(res, user._id.toString());
        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const logoutUser = (req: Request, res: Response) => {
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: 'Logout successful' });
};

export const getMyProfile = (req: Request, res: Response) => {
    res.status(200).json(req.user);
};

export const changePassword = async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user?.id).select('+password');
        if (!user || !user.password || !(await bcrypt.compare(oldPassword, user.password))) {
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


/**
 * @desc    Handle forgot password request
 * @route   POST /api/auth/forgot-password
 */
export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        // We send a success message even if the user isn't found
        // to prevent attackers from discovering which emails are registered.
        if (!user) {
            return res.status(200).json({ message: 'Email sent if user exists.' });
        }

        // Get reset token from the user model method
        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false }); // Save the user with the new token fields

        // Create reset URL
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

        await sendEmail({
            to: user.email,
            subject: 'Password Reset Token',
            text: message,
            html: `<p>Please click the link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`
        });

        res.status(200).json({ message: 'Email sent' });

    } catch (error) {
        // Clear token fields if there was an error
        // const user = await User.findOne({ email: req.body.email });
        // if (user) {
        //     user.resetPasswordToken = undefined;
        //     user.resetPasswordExpire = undefined;
        //     await user.save({ validateBeforeSave: false });
        // }
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @desc    Handle the actual password reset
 * @route   PUT /api/auth/reset-password/:resetToken
 */
export const resetPassword = async (req: Request, res: Response) => {
    try {
        // Get hashed token
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.resetToken)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token.' });
        }

        // Set new password
        user.password = req.body.password;
        // Clear the reset token fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        // Generate a new login token and cookie for immediate login
        generateTokenAndSetCookie(res, user._id.toString());

        res.status(200).json({
             _id: user._id,
             firstName: user.firstName,
             email: user.email,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};