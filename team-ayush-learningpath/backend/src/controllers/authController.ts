// src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/userModel';
import { IUser } from '../types';
import { sendEmail } from '../utils/sendEmail'; // <-- THIS IS THE MISSING IMPORT

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
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({ firstName, lastName, email, password });
        generateTokenAndSetCookie(res, user._id.toString());
        res.status(201).json({ _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role });
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
        res.status(200).json({ _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role });
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

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).json({ message: 'If an account with that email exists, a reset link has been sent.' });
        }
        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        const emailMessage = `You are receiving this email because you (or someone else) has requested a password reset. Please click the link below to reset your password. This link will expire in 15 minutes.\n\n${resetUrl}`;
        await sendEmail({
            to: user.email,
            subject: 'Password Reset Request',
            text: emailMessage,
            html: `<p>Please click the link to reset your password: <a href="${resetUrl}" target="_blank">${resetUrl}</a></p>`
        });
        res.status(200).json({ message: 'Email sent.' });
    } catch (error) {
        console.error('FORGOT PASSWORD ERROR:', error);
        res.status(500).json({ message: 'Server error while processing request.' });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
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
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        generateTokenAndSetCookie(res, user._id.toString());
        res.status(200).json({ message: 'Password reset successful.' });
    } catch (error) {
        console.error('RESET PASSWORD ERROR:', error);
        res.status(500).json({ message: 'Server error while resetting password.' });
    }
};
