import mongoose, { Document, Schema } from 'mongoose';

export interface IUserBadge extends Document {
  userId: mongoose.Types.ObjectId;
  achievementId: mongoose.Types.ObjectId;
  earnedAt: Date;
  pointsAwarded: number;
}

const UserBadgeSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  achievementId: { type: Schema.Types.ObjectId, ref: 'Achievement', required: true },
  earnedAt: { type: Date, default: Date.now },
  pointsAwarded: { type: Number, required: true }
});

// Prevent duplicate badges
UserBadgeSchema.index({ userId: 1, achievementId: 1 }, { unique: true });

export default mongoose.model<IUserBadge>('UserBadge', UserBadgeSchema);
