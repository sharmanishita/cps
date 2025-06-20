import mongoose, { Document } from 'mongoose';
interface IUser extends Document {
  username: string;
  password: string;
  totalPoints: number;
  level: string;
  currentStreak: number;
  longestStreak: number;
  lastActive: Date;
};

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  totalPoints: { type: Number, default: 0 },
  level: { type: String, default: 'Beginner' },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now }
})

export const User = mongoose.model('User', userSchema);
