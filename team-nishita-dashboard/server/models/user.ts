import mongoose, { Document } from 'mongoose';
interface IUser extends Document {
  username: string;
  password: string;
  role: 'user' | 'admin';
  lastLogin: Date;
  loginStreak: number;
  loginDays: Date[];
};

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  lastLogin: { type: Date },
  loginStreak: { type: Number, default: 0 },
  loginDays: [{ type: Date }]
})

export const User = mongoose.model('User', userSchema);
