import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import { useTheme } from '../contexts/ThemeContext';

interface ProgressTrackerProps {
  onProgressUpdate?: () => void;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ onProgressUpdate }) => {
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progressSummary, setProgressSummary] = useState({
    totalLessonsCompleted: 25,
    totalQuizzesTaken: 12,
    totalStudyTime: 180,
    totalPoints: 450
  });

  const [formData, setFormData] = useState({
    lessonsCompleted: 0,
    quizzesTaken: 0,
    studyTime: 0,
    pointsEarned: 0,
    isCheckedIn: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : parseInt(value) || 0
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setProgressSummary(prev => ({
        ...prev,
        totalLessonsCompleted: prev.totalLessonsCompleted + formData.lessonsCompleted,
        totalQuizzesTaken: prev.totalQuizzesTaken + formData.quizzesTaken,
        totalStudyTime: prev.totalStudyTime + formData.studyTime,
        totalPoints: prev.totalPoints + formData.pointsEarned
      }));

      setFormData({
        lessonsCompleted: 0,
        quizzesTaken: 0,
        studyTime: 0,
        pointsEarned: 0,
        isCheckedIn: false
      });

      setLoading(false);
      onProgressUpdate?.();
    }, 1000);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        📝 Update Your Progress
      </h3>

      {error && (
        <div className="mb-6 p-3 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 rounded flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-4 text-red-500 hover:text-red-700 font-bold"
          >
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Lessons Completed
            </label>
            <input
              type="number"
              name="lessonsCompleted"
              value={formData.lessonsCompleted}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quizzes Taken
            </label>
            <input
              type="number"
              name="quizzesTaken"
              value={formData.quizzesTaken}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Study Time (minutes)
            </label>
            <input
              type="number"
              name="studyTime"
              value={formData.studyTime}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Points Earned
            </label>
            <input
              type="number"
              name="pointsEarned"
              value={formData.pointsEarned}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            name="isCheckedIn"
            checked={formData.isCheckedIn}
            onChange={handleInputChange}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
            Daily Check-in
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-2"
        >
          {loading ? 'Updating...' : 'Update Progress'}
        </button>
      </form>

      {/* Quick Stats Display */}
      {progressSummary && (
        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-5">
            Today's Summary
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {progressSummary.totalLessonsCompleted}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Lessons</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                {progressSummary.totalQuizzesTaken}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Quizzes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {formatTime(progressSummary.totalStudyTime)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Study Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
                {progressSummary.totalPoints}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Points</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
