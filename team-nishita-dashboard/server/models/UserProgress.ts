import mongoose, { Document, Schema } from 'mongoose';

export interface IUserProgress extends Document {
  userId: mongoose.Types.ObjectId;
  lessonsCompleted: number;
  quizzesTaken: number;
  studyTime: number;
  pointsEarned: number;
  isCheckedIn: boolean;
  date: Date;
}

const UserProgressSchema = new Schema<IUserProgress>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lessonsCompleted: { type: Number, default: 0 },
  quizzesTaken: { type: Number, default: 0 },
  studyTime: { type: Number, default: 0 },
  pointsEarned: { type: Number, default: 0 },
  isCheckedIn: { type: Boolean, default: false },
  date: { type: Date, required: true }
});

export const UserProgress = mongoose.model<IUserProgress>('UserProgress', UserProgressSchema);
