import { Document, Types } from 'mongoose';

// Interface for a single quiz question within a Concept
export interface IQuizQuestion {
    questionText: string;
    options: string[];
    correctAnswerIndex: number;
    explanation?: string;
}

// Interface for a single attempt a user makes on a quiz
export interface IQuizAttempt {
    score: number;
    submittedAnswers: number[];
    attemptedAt: Date;
}

// Interface for the Concept (Course) model
export interface IConcept extends Document {
    title: string;
    description: string;
    contentBlocks: { type: string; data: string }[];
    prerequisites: Types.ObjectId[];
    quiz: IQuizQuestion[];
}

// Interface for the User model
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    learningProfile: {
        concept: Types.ObjectId;
        masteryLevel: number; // Represents the user's best score on this concept
        quizAttempts: IQuizAttempt[]; // A full history of all attempts
    }[];
    isModified: (field: string) => boolean;
}