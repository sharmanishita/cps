import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing a single concept progress document for a user.
 */
export interface IUserConceptProgress extends Document {
  userId: mongoose.Types.ObjectId;        // Reference to the user
  conceptId: mongoose.Types.ObjectId;     // Reference to the concept
  masteryScore: number;                   // Value from 0 (not mastered) to 1 (fully mastered)
  attempts: number;                       // Number of quiz attempts on this concept
  lastUpdated: Date;                      // Timestamp of last update
}

/**
 * Schema for tracking an individual user's progress on a specific concept.
 * This enables personalized learning path recommendations.
 */
const UserConceptProgressSchema: Schema<IUserConceptProgress> = new Schema(
  {
    // Reference to the User model
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true, // Improves query performance
    },

    // Reference to the Concept model
    conceptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Concept',
      required: true,
      index: true, // Improves query performance
    },

    // Score from 0.0 to 1.0 representing mastery level
    masteryScore: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
      default: 0,
    },

    // Number of attempts made by the user on this concept
    attempts: {
      type: Number,
      required: true,
      default: 0,
    },

    // When this progress was last updated
    lastUpdated: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps automatically
  }
);

// Ensure a user can't have duplicate progress records for the same concept
UserConceptProgressSchema.index({ userId: 1, conceptId: 1 }, { unique: true });

/**
 * Mongoose model for UserConceptProgress.
 */
const UserConceptProgress = mongoose.model<IUserConceptProgress>(
  'UserConceptProgress',
  UserConceptProgressSchema
);

export default UserConceptProgress;
