// middleware/pointsTracker.ts
import { Request, Response, NextFunction } from 'express';
import { updateUserLevel } from '../utils/badgeChecker.js';

export const pointsTracker = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json.bind(res); // Preserve original function

  res.json = function (data: any) {
    const userId = (req as any).user?.id;

    if (userId && typeof data?.totalPoints === 'number') {
      updateUserLevel(userId, data.totalPoints)
        .then(level => {
          console.log(`User level updated to: ${level}`);
        })
        .catch(err => {
          console.error('Failed to update user level:', err);
        });
    }

    return originalJson(data);
  };

  next();
};
