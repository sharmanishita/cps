// src/models/userModel.ts
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser, IQuizAttempt } from '../types';

/**
 * The QuizAttempt schema defines the structure for a single test attempt by a user.
 * This allows for a detailed history of their performance over time.
 */
const quizAttemptSchema = new Schema<IQuizAttempt>({
    score: {
        type: Number, // The score for this specific attempt, from 0 to 1.
        required: true,
    },
    submittedAnswers: [{
        type: Number // Stores the index of the answer the user chose for each question.
    }],
    attemptedAt: {
        type: Date,
        default: Date.now,
    },
});

/**
 * The User schema defines the structure for user accounts and their
 * unique, personal learning journey.
 */
const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false, // Don't include the password in query results by default
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    // This is the user's personal learning profile.
    learningProfile: [{
        // A direct reference to a document in the 'Concept' collection.
        concept: {
            type: Schema.Types.ObjectId,
            ref: 'Concept',
            required: true
        },
        // The user's current mastery level, which is their highest score on any attempt.
        masteryLevel: {
            type: Number,
            default: 0,
        },
        // A complete history of every time the user took the quiz for this concept.
        quizAttempts: [quizAttemptSchema]
    }],
}, {
    timestamps: true,
});

// Hashes the user's password before saving it to the database
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export default model<IUser>('User', userSchema);
