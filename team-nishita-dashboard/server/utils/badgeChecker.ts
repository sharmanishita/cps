// utils/badgeChecker.ts
import Achievement, { IAchievement } from '../models/Achievement.js';
import UserBadge from '../models/UserBadge.js';
import UserProgress from '../models/UserProgress.js';
import { User } from '../models/user.js';
import { Types } from 'mongoose';

// Exported function to check and award new badges
export const checkBadges = async (userId: string): Promise<void> => {
  try {
    const achievements = await Achievement.find({ isActive: true }).lean<IAchievement[]>();

    const userBadges = await UserBadge.find({ userId }).select('achievementId');
    const earnedAchievementIds = userBadges.map(badge => badge.achievementId.toString());

    const user = await User.findById(userId);
    if (!user) return;

    const progressStats = await UserProgress.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalLessons: { $sum: '$lessonsCompleted' },
          totalQuizzes: { $sum: '$quizzesTaken' },
          totalStudyTime: { $sum: '$studyTime' },
          totalPointsFromProgress: { $sum: '$pointsEarned' },
          dailyCheckins: { $sum: { $cond: ['$isCheckedIn', 1, 0] } }
        }
      }
    ]);

    const stats = progressStats[0] || {};

    for (const achievement of achievements) {
      if (earnedAchievementIds.includes(String(achievement._id))) continue;

      const condition = achievement.condition;
      let qualifies = false;
      let valueToCheck = 0;

      switch (condition.field) {
        case 'lessonsCompleted':
          valueToCheck = stats.totalLessons || 0;
          break;
        case 'quizzesTaken':
          valueToCheck = stats.totalQuizzes || 0;
          break;
        case 'currentStreak':
          valueToCheck = user.currentStreak || 0;
          break;
        case 'totalPoints':
          valueToCheck = user.totalPoints || 0;
          break;
        case 'dailyCheckins':
          valueToCheck = stats.dailyCheckins || 0;
          break;
        case 'studyTime':
          valueToCheck = stats.totalStudyTime || 0;
          break;
      }

      switch (condition.operator) {
        case 'gte':
          qualifies = valueToCheck >= condition.value;
          break;
        case 'eq':
          qualifies = valueToCheck === condition.value;
          break;
        case 'lte':
          qualifies = valueToCheck <= condition.value;
          break;
      }

      if (qualifies) {
        await awardBadge(userId, String(achievement._id), achievement.pointsAwarded);
      }
    }
  } catch (error) {
    console.error('Error checking badges:', error);
  }
};

// Internal function to award a badge
const awardBadge = async (userId: string, achievementId: string, pointsAwarded: number): Promise<void> => {
  try {
    await UserBadge.create({ userId, achievementId, pointsAwarded });

    await User.findByIdAndUpdate(userId, {
      $inc: { totalPoints: pointsAwarded }
    });

    console.log(`Badge awarded to user ${userId}: ${achievementId} (+${pointsAwarded} points)`);
  } catch (error) {
    console.error('Error awarding badge:', error);
  }
};

// ✅ Export this so it can be used in pointsTracker
export const updateUserLevel = async (userId: string, totalPoints: number): Promise<string> => {
  let level = 'Beginner';

  if (totalPoints >= 1000) level = 'Master';
  else if (totalPoints >= 600) level = 'Expert';
  else if (totalPoints >= 300) level = 'Scholar';
  else if (totalPoints >= 100) level = 'Learner';

  await User.findByIdAndUpdate(userId, { level });
  return level;
};
