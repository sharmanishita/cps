import React, { useEffect } from 'react';
import Layout from './Layout';
import ProgressBar from './ProgressBar';
import ProgressTracker from './ProgressTracker';
import CircularProgress from './CircularProgress';
import { useTheme } from '../contexts/ThemeContext';
import { BookOpen, Award, Clock, Medal, BarChart3 } from 'lucide-react';
import { useProgressStore } from '../store/zustand/progressStore';
import type { ProgressSummary } from '../api/api';

const DUMMY_SUMMARY: ProgressSummary = {
  totalLessonsCompleted: 3,
  totalQuizzesTaken: 2,
  totalStudyTime: 90,
  totalPointsEarned: 50,
  totalCheckIns: 2,
  currentStreak: 1,
  totalPoints: 50,
  loginStreak: 1,
};

const DUMMY_STATS = [
  { _id: '2025-07-01', lessonsCompleted: 1, quizzesTaken: 1, studyTime: 30, pointsEarned: 10, checkIns: 1 },
  { _id: '2025-07-02', lessonsCompleted: 0, quizzesTaken: 0, studyTime: 20, pointsEarned: 5, checkIns: 0 },
  { _id: '2025-07-03', lessonsCompleted: 1, quizzesTaken: 1, studyTime: 25, pointsEarned: 15, checkIns: 1 },
  { _id: '2025-07-04', lessonsCompleted: 1, quizzesTaken: 0, studyTime: 15, pointsEarned: 10, checkIns: 0 },
  { _id: '2025-07-05', lessonsCompleted: 0, quizzesTaken: 0, studyTime: 0, pointsEarned: 0, checkIns: 0 },
  { _id: '2025-07-06', lessonsCompleted: 0, quizzesTaken: 0, studyTime: 0, pointsEarned: 0, checkIns: 0 },
  { _id: '2025-07-07', lessonsCompleted: 0, quizzesTaken: 0, studyTime: 0, pointsEarned: 0, checkIns: 0 },
];

const isEmptySummary = (summary: any) => {
  if (!summary) return true;
  // Consider empty if all values are 0
  return Object.values(summary).every((v) => v === 0);
};

const MILESTONES = [
  { label: 'First Quiz', achieved: (summary: any) => summary.totalQuizzesTaken > 0 },
  { label: '5 Lessons', achieved: (summary: any) => summary.totalLessonsCompleted >= 5 },
  { label: '7-Day Streak', achieved: (summary: any) => summary.loginStreak >= 7 },
  { label: '100 Points', achieved: (summary: any) => summary.totalPoints >= 100 },
];

const ProgressPage: React.FC = () => {
  const { darkMode } = useTheme();
  const {
    progressSummary: realSummary,
    dailyStats: realStats,
    loading,
    fetchProgressSummary,
    fetchProgressStats
  } = useProgressStore();

  useEffect(() => {
    fetchProgressSummary();
    fetchProgressStats();
  }, [fetchProgressSummary, fetchProgressStats]);

  // Decide which data to show
  const summaryToShow: ProgressSummary = isEmptySummary(realSummary) ? DUMMY_SUMMARY : (realSummary || DUMMY_SUMMARY);
  const statsToShow = (realStats && realStats.length > 0 && !isEmptySummary(realSummary)) ? realStats : DUMMY_STATS;

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const calculateOverallProgress = () => {
    if (!summaryToShow) return 0;
    const totalActivities = summaryToShow.totalLessonsCompleted + summaryToShow.totalQuizzesTaken;
    const maxActivities = 100; // Assuming 100 activities is 100% progress
    return Math.min((totalActivities / maxActivities) * 100, 100);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={`max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-24 min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#181A20]' : 'bg-gradient-to-br from-white to-blue-50'}`}>
        <div className="mb-20 mt-8">
          <h1 className="text-3xl font-extrabold text-white mb-8 tracking-tight">
            Your Learning Progress
          </h1>
          <p className="text-lg text-gray-400">
            Continue your learning journey and celebrate your achievements
          </p>
        </div>

        {/* Modern Stat Cards - horizontally scrollable on small screens */}
        <div className="flex gap-12 md:gap-20 mb-32 mt-16 px-4 md:px-20 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {/* Blue (primary) */}
          <div className={`rounded-2xl shadow-lg p-10 flex flex-col items-center min-w-[260px] max-w-[320px] mx-2 transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-blue-700 to-blue-400 bg-opacity-90' : 'bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200'}`}>
            <BookOpen size={32} className={`mb-4 ${darkMode ? 'text-blue-200' : 'text-blue-700'}`} />
            <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-blue-900'}`}>{summaryToShow.totalLessonsCompleted}</div>
            <div className={`text-md font-medium ${darkMode ? 'text-blue-100' : 'text-blue-700/80'}`}>Lessons Completed</div>
          </div>
          {/* Teal (secondary) */}
          <div className={`rounded-2xl shadow-lg p-10 flex flex-col items-center min-w-[260px] max-w-[320px] mx-2 transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-teal-700 to-teal-400 bg-opacity-90' : 'bg-gradient-to-br from-teal-100 to-teal-50 border border-teal-200'}`}>
            <Award size={32} className={`mb-4 ${darkMode ? 'text-teal-200' : 'text-teal-700'}`} />
            <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-teal-900'}`}>{summaryToShow.totalQuizzesTaken}</div>
            <div className={`text-md font-medium ${darkMode ? 'text-teal-100' : 'text-teal-700/80'}`}>Quizzes Taken</div>
          </div>
          {/* Purple (secondary) */}
          <div className={`rounded-2xl shadow-lg p-10 flex flex-col items-center min-w-[260px] max-w-[320px] mx-2 transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-purple-700 to-purple-400 bg-opacity-90' : 'bg-gradient-to-br from-purple-100 to-purple-50 border border-purple-200'}`}>
            <Clock size={32} className={`mb-4 ${darkMode ? 'text-purple-200' : 'text-purple-700'}`} />
            <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-purple-900'}`}>{formatTime(summaryToShow.totalStudyTime)}</div>
            <div className={`text-md font-medium ${darkMode ? 'text-purple-100' : 'text-purple-700/80'}`}>Study Time</div>
          </div>
          {/* Orange/Yellow (secondary) */}
          <div className={`rounded-2xl shadow-lg p-10 flex flex-col items-center min-w-[260px] max-w-[320px] mx-2 transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-orange-600 to-yellow-400 bg-opacity-90' : 'bg-gradient-to-br from-yellow-100 to-orange-50 border border-yellow-200'}`}>
            <Medal size={32} className={`mb-4 ${darkMode ? 'text-yellow-200' : 'text-yellow-700'}`} />
            <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-yellow-900'}`}>{summaryToShow.totalPoints}</div>
            <div className={`text-md font-medium ${darkMode ? 'text-yellow-100' : 'text-yellow-700/80'}`}>Total Points</div>
          </div>
        </div>

        {/* Circular Progress Section above the bar chart */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-32 mb-32 mt-24 px-4 md:px-20">
          <div className="flex flex-col items-center p-6">
            <CircularProgress progress={calculateOverallProgress()} size={150} strokeWidth={28} color="#60a5fa" label="Overall" />
            <span className="mt-10 text-blue-200 font-semibold text-xl">Overall Progress</span>
          </div>
          <div className="flex flex-col items-center p-6">
            <CircularProgress progress={(summaryToShow.currentStreak / Math.max(summaryToShow.loginStreak, 1)) * 100} size={150} strokeWidth={28} color="#f59e42" label="Streak" />
            <span className="mt-10 text-orange-200 font-semibold text-xl">Current Streak: {summaryToShow.currentStreak}</span>
          </div>
          <div className="flex flex-col items-center p-6">
            <CircularProgress progress={(summaryToShow.totalCheckIns / 30) * 100} size={150} strokeWidth={28} color="#38bdf8" label="Check-ins" />
            <span className="mt-10 text-cyan-200 font-semibold text-xl">Check-ins: {summaryToShow.totalCheckIns}</span>
          </div>
        </div>

        {/* Bar Chart Section */}
        <div className={`rounded-2xl shadow-lg p-20 mb-32 mt-24 flex flex-col items-center justify-center transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-white to-blue-50 border border-blue-100'}`}>
          <h3
            className={`text-5xl font-extrabold mb-16 mt-24 flex items-center justify-center ${darkMode ? 'text-purple-200' : 'text-purple-700'}`}
            style={{
              letterSpacing: '0.05em',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            <BarChart3 size={56} className={`mr-8 ${darkMode ? 'text-purple-200' : 'text-purple-400'}`} />
            Daily Activity (Last 7 Days)
          </h3>
          <div className="relative w-full max-w-5xl mx-auto px-8">
            {/* Dynamic Y Axis */}
            {(() => {
              const studyTimes = statsToShow.slice(-7).map(day => day.studyTime);
              const maxMinutes = Math.max(...studyTimes, 60);
              let yLabels = [];
              const yStep = 10;
              for (let m = Math.ceil(maxMinutes / yStep) * yStep; m >= 0; m -= yStep) {
                if (m % 60 === 0 && m !== 0) {
                  yLabels.push(`${m / 60}h`);
                } else if (m !== 0) {
                  yLabels.push(`${m}m`);
                } else {
                  yLabels.push('0m');
                }
              }
              return (
                <>
                  <div className="absolute left-0 top-0 bottom-10 flex flex-col justify-between h-[28rem] z-10 pointer-events-none">
                    {yLabels.map((label, i) => (
                      <div
                        key={label}
                        className={`font-semibold ${label.includes('h') ? (darkMode ? 'text-base text-purple-300' : 'text-base text-purple-400') : (darkMode ? 'text-xs text-blue-300' : 'text-xs text-blue-400')}`}
                        style={{ height: '0' }}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-end gap-24 h-[28rem] w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-blue-50 justify-center pl-32">
                    {statsToShow.slice(-7).map((day, idx) => {
                      let value = day.studyTime;
                      let maxValue = Math.max(...studyTimes, 60);
                      if (maxValue === 0) maxValue = 1;
                      const barHeight = (value / maxValue) * 400;
                      return (
                        <div key={idx} className="flex flex-col items-center group">
                          <div
                            className={`w-32 rounded-t-2xl transition-all duration-500 relative shadow-xl ${darkMode ? 'bg-gradient-to-t from-blue-400 to-purple-400' : 'bg-gradient-to-t from-blue-200 to-purple-100'}`}
                            style={{ height: `${barHeight}px` }}
                          >
                            <div className={`absolute bottom-full mb-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none text-base px-8 py-4 rounded shadow-lg z-10 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 border border-blue-100'}`}>
                              {`${day.lessonsCompleted} lessons, ${day.quizzesTaken} quizzes, ${formatTime(day.studyTime)} study`}
                            </div>
                          </div>
                          {/* X Axis label */}
                          <span className={`text-lg mt-6 font-semibold ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                            {new Date(day._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  {/* X Axis line */}
                  <div className={`absolute left-0 right-0 bottom-10 h-0.5 z-0 ${darkMode ? 'bg-blue-900 opacity-60' : 'bg-blue-200 opacity-60'}`} />
                </>
              );
            })()}
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="mb-32 mt-32 flex flex-col items-center w-full">
          <h2 className="text-3xl font-extrabold mb-14 tracking-tight text-center">Your Latest Progress (Sample Data)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className={`w-full h-32 flex flex-col items-center justify-center rounded-lg shadow-sm transition-colors duration-300 ${darkMode ? 'bg-blue-500/10' : 'bg-blue-200/40'}`}>
              <span className={`text-4xl font-extrabold mt-1 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>{DUMMY_SUMMARY.totalLessonsCompleted}</span>
              <span className={`text-lg mt-1 ${darkMode ? 'text-white' : 'text-blue-900/80'}`}>Lessons Completed</span>
            </div>
            <div className={`w-full h-32 flex flex-col items-center justify-center rounded-lg shadow-sm transition-colors duration-300 ${darkMode ? 'bg-teal-400/10' : 'bg-teal-200/40'}`}>
              <span className={`text-4xl font-extrabold mt-1 ${darkMode ? 'text-teal-300' : 'text-teal-700'}`}>{DUMMY_SUMMARY.totalQuizzesTaken}</span>
              <span className={`text-lg mt-1 ${darkMode ? 'text-white' : 'text-teal-900/80'}`}>Quizzes Taken</span>
            </div>
            <div className={`w-full h-32 flex flex-col items-center justify-center rounded-lg shadow-sm transition-colors duration-300 ${darkMode ? 'bg-purple-400/10' : 'bg-purple-200/40'}`}>
              <span className={`text-4xl font-extrabold mt-1 ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>{formatTime(DUMMY_SUMMARY.totalStudyTime)}</span>
              <span className={`text-lg mt-1 ${darkMode ? 'text-white' : 'text-purple-900/80'}`}>Study Time</span>
            </div>
            <div className={`w-full h-32 flex flex-col items-center justify-center rounded-lg shadow-sm transition-colors duration-300 ${darkMode ? 'bg-yellow-400/10' : 'bg-yellow-200/40'}`}>
              <span className={`text-4xl font-extrabold mt-1 ${darkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>{DUMMY_SUMMARY.totalPoints}</span>
              <span className={`text-lg mt-1 ${darkMode ? 'text-white' : 'text-yellow-900/80'}`}>Total Points</span>
            </div>
            <div className={`w-full h-32 flex flex-col items-center justify-center rounded-lg shadow-sm transition-colors duration-300 ${darkMode ? 'bg-orange-400/10' : 'bg-orange-200/40'}`}>
              <span className={`text-4xl font-extrabold mt-1 ${darkMode ? 'text-orange-300' : 'text-orange-700'}`}>{DUMMY_SUMMARY.currentStreak}</span>
              <span className={`text-lg mt-1 ${darkMode ? 'text-white' : 'text-orange-900/80'}`}>Current Streak</span>
            </div>
            <div className={`w-full h-32 flex flex-col items-center justify-center rounded-lg shadow-sm transition-colors duration-300 ${darkMode ? 'bg-cyan-400/10' : 'bg-cyan-200/40'}`}>
              <span className={`text-4xl font-extrabold mt-1 ${darkMode ? 'text-cyan-300' : 'text-cyan-700'}`}>{DUMMY_SUMMARY.totalCheckIns}</span>
              <span className={`text-lg mt-1 ${darkMode ? 'text-white' : 'text-cyan-900/80'}`}>Check-ins</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProgressPage;
