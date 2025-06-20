import { Document, Types } from 'mongoose';

export interface IQuizQuestion {
    questionText: string;
    options: string[];
    correctAnswerIndex: number;
    explanation?: string;
}

export interface IQuizAttempt {
    score: number;
    submittedAnswers: number[];
    attemptedAt: Date;
}

export interface IConcept extends Document {
    title: string;
    description: string;
    contentBlocks: { type: string; data: string }[];
    prerequisites: Types.ObjectId[];
    quiz: IQuizQuestion[];
}

// Updated IUser interface
export interface IUser extends Document {
    firstName: string; // Changed from 'name'
    lastName: string;  // Added
    email: string;
    password?: string; // Password is now optional for OAuth users
    googleId?: string;
    githubId?: string;
    role: 'user' | 'admin';
    learningProfile: {
        concept: Types.ObjectId;
        masteryLevel: number;
        quizAttempts: IQuizAttempt[];
    }[];
    isModified: (field: string) => boolean;
}


export interface IQuizQuestion { /* ... */ }
export interface IQuizAttempt { /* ... */ }
export interface IConcept extends Document { /* ... */ }

// Updated IUser interface
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    googleId?: string;
    githubId?: string;
    role: 'user' | 'admin';
    learningProfile: {
        concept: Types.ObjectId;
        masteryLevel: number;
        quizAttempts: IQuizAttempt[];
    }[];
    // --- NEW FIELDS AND METHOD ---
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    isModified: (field: string) => boolean;
    getResetPasswordToken: () => string;
}