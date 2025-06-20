// src/models/userModel.ts
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto'; // Import Node.js crypto library
import { IUser, IQuizAttempt } from '../types';

const quizAttemptSchema = new Schema<IQuizAttempt>({
    score: { type: Number, required: true },
    submittedAnswers: [{ type: Number }],
    attemptedAt: { type: Date, default: Date.now },
});

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false, minlength: 6, select: false },
    googleId: { type: String },
    githubId: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    learningProfile: [{
        concept: { type: Schema.Types.ObjectId, ref: 'Concept', required: true },
        masteryLevel: { type: Number, default: 0 },
        quizAttempts: [quizAttemptSchema]
    }],
    // --- NEW FIELDS FOR PASSWORD RESET ---
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpire: { type: Date, select: false },
}, { timestamps: true });

// Hash password before saving
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password') || !this.password) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// --- NEW METHOD TO GENERATE RESET TOKEN ---
userSchema.methods.getResetPasswordToken = function() {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Set expiration time (e.g., 15 minutes)
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken; // Return the un-hashed token to be sent via email
};

export default model<IUser>('User', userSchema);
