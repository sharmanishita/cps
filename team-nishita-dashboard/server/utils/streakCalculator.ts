import { UserProgress } from '../models/UserProgress.js';
import { User } from '../models/user.js';

export const calculateStreak = async (userId: string): Promise<number> => {
  try {
    const today = new Date();
    let currentDate = new Date(today);
    currentDate.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let consecutiveDays = true;

    // Check backwards from today
    while (consecutiveDays) {
      const progress = await UserProgress.findOne({
        userId,
        date: currentDate,
        isCheckedIn: true
      });

      if (progress) {
        streak++;
        // Move to previous day
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        // If it's today and no check-in yet, don't break streak
        if (currentDate.getTime() === today.setHours(0, 0, 0, 0)) {
          currentDate.setDate(currentDate.getDate() - 1);
          continue;
        }
        consecutiveDays = false;
      }

      // Safety check to prevent infinite loop
      if (streak > 365) break;
    }

    return streak;
  } catch (error) {
    console.error('Error calculating streak:', error);
    return 0;
  }
};

export const updateUserLevel = async (userId: string, totalPoints: number): Promise<string> => {
  let level = 'Beginner';
  
  if (totalPoints >= 1000) {
    level = 'Master';
  } else if (totalPoints >= 600) {
    level = 'Expert';
  } else if (totalPoints >= 300) {
    level = 'Scholar';
  } else if (totalPoints >= 100) {
    level = 'Learner';
  }

  await User.findByIdAndUpdate(userId, { level });
  return level;
};

// server/middleware/pointsTracker.ts
import { Request, Response, NextFunction } from 'express';
export const pointsTracker = async (req: Request, res: Response, next: NextFunction) => {
  // This middleware can be used to automatically update user level after points change
  const originalSend = res.json;
  
  res.json = function (data: any) {
    // Check if response contains user points update
    if (data && data.totalPoints) {
      updateUserLevel((req as any).user?.id, data.totalPoints);
    }
    
    return originalSend.call(this, data);
  };
  
  next();
};