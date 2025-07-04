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
  return Object.values(summary).every((v) => v === 0);
};

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
    const maxActivities = 100;
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
      <div
        className="max-w-7xl mx-auto min-h-screen flex flex-col bg-[#181A20]"
        style={{
          paddingTop: 48,
          paddingLeft: 32,
          paddingRight: 32,
        }}
      >
        {/* Header Section */}
        <div className="flex flex-col items-center" style={{ marginTop: 32, marginBottom: 16 }}>
          <h1
            className="text-3xl font-extrabold text-white tracking-tight text-center"
            style={{ marginBottom: 10, paddingTop: 8, paddingBottom: 8 }}
          >
            Your Learning Progress
          </h1>
          <p
            className="text-gray-400 text-lg text-center"
            style={{ marginBottom: 18, paddingLeft: 8, paddingRight: 8 }}
          >
            Continue your learning journey and celebrate your achievements
          </p>
        </div>

        {/* Stat Cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16 justify-center"
          style={{ marginTop: 40 }}
        >
          {[
            {
              icon: <BookOpen size={44} className="mb-3 text-blue-200" />,
              value: summaryToShow.totalLessonsCompleted,
              label: 'Lessons Completed',
              gradient: 'from-blue-700 to-blue-400',
            },
            {
              icon: <Award size={44} className="mb-3 text-teal-200" />,
              value: summaryToShow.totalQuizzesTaken,
              label: 'Quizzes Taken',
              gradient: 'from-teal-700 to-teal-400',
            },
            {
              icon: <Clock size={44} className="mb-3 text-purple-200" />,
              value: formatTime(summaryToShow.totalStudyTime),
              label: 'Study Time',
              gradient: 'from-purple-700 to-purple-400',
            },
            {
              icon: <Medal size={44} className="mb-3 text-yellow-200" />,
              value: summaryToShow.totalPoints,
              label: 'Total Points',
              gradient: 'from-orange-600 to-yellow-400',
            },
          ].map((card) => (
            <div
              key={card.label}
              className={`rounded-2xl shadow-lg flex flex-col items-center justify-center bg-gradient-to-br ${card.gradient} bg-opacity-90`}
              style={{
                minWidth: 200,
                maxWidth: 260,
                width: 220,
                height: 180,
                margin: '0 auto',
              }}
            >
              {card.icon}
              <div className="text-2xl font-bold text-white mb-1">{card.value}</div>
              <div className="text-md font-medium text-blue-100">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Space below stat cards */}
        <div style={{ height: 32 }} />

        {/* Circular Progress Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-16 mt-2">
          <div className="flex flex-col items-center p-2">
            <CircularProgress progress={calculateOverallProgress()} size={120} strokeWidth={12} color="#60a5fa" label="Overall" />
            <span className="mt-6 text-blue-200 font-semibold text-lg">Overall Progress</span>
          </div>
          <div className="flex flex-col items-center p-2">
            <CircularProgress progress={(summaryToShow.currentStreak / Math.max(summaryToShow.loginStreak, 1)) * 100} size={120} strokeWidth={12} color="#f59e42" label="Streak" />
            <span className="mt-6 text-orange-200 font-semibold text-lg">Current Streak: {summaryToShow.currentStreak}</span>
          </div>
          <div className="flex flex-col items-center p-2">
            <CircularProgress progress={(summaryToShow.totalCheckIns / 30) * 100} size={120} strokeWidth={12} color="#38bdf8" label="Check-ins" />
            <span className="mt-6 text-cyan-200 font-semibold text-lg">Check-ins: {summaryToShow.totalCheckIns}</span>
          </div>
        </div>

        {/* Space below circles */}
        <div style={{ height: 32 }} />

        {/* Improved Bar Chart Section */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-12 mb-12 mt-2 flex flex-col items-center justify-center w-full">
          <h3
            className="text-2xl font-extrabold text-purple-200 mb-6 mt-6 flex items-center justify-center"
            style={{
              letterSpacing: '0.05em',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            <BarChart3 size={32} className="mr-3 text-purple-200" />
            Daily Activity (Last 7 Days)
          </h3>
          <div className="relative w-full max-w-4xl mx-auto px-2">
            {/* Improved Bar Chart */}
            {(() => {
              const studyTimes = statsToShow.slice(-7).map(day => day.studyTime);
              const maxMinutes = Math.max(...studyTimes, 60);
              let yLabels = [];
              const yStep = 15;
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
                <div className="flex w-full">
                  {/* Y Axis */}
                  <div className="flex flex-col justify-between h-96 mr-2">
                    {yLabels.map((label, i) => (
                      <div
                        key={label}
                        className={`font-semibold ${label.includes('h') ? 'text-base text-purple-300' : 'text-xs text-blue-300'}`}
                        style={{ height: '0' }}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                  {/* Bars */}
                  <div className="flex items-end gap-10 h-96 w-full">
                    {statsToShow.slice(-7).map((day, idx) => {
                      let value = day.studyTime;
                      let maxValue = Math.max(...studyTimes, 60);
                      if (maxValue === 0) maxValue = 1;
                      const barHeight = (value / maxValue) * 320;
                      return (
                        <div key={idx} className="flex flex-col items-center group w-14">
                          <div
                            className="w-full rounded-t-lg bg-gradient-to-t from-blue-400 to-purple-400 transition-all duration-500 relative shadow"
                            style={{ height: `${barHeight}px` }}
                          >
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none text-xs bg-gray-900 text-white px-2 py-1 rounded shadow z-10">
                              {`${day.lessonsCompleted} lessons, ${day.quizzesTaken} quizzes, ${formatTime(day.studyTime)} study`}
                            </div>
                          </div>
                          <span className="text-sm text-blue-200 mt-2 font-semibold">
                            {new Date(day._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Space after graph for stats */}
        <div style={{ height: 24 }} />

        {/* Progress Tracker / Stats Section */}
        <div className="mb-12 mt-6 flex justify-center w-full">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-lg px-6 py-8 max-w-full w-full flex flex-col gap-6 items-center">
            <h2 className="text-lg font-bold text-blue-200 mb-2">Your Latest Progress (Sample Data)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="flex flex-col items-center justify-center bg-gray-800 rounded-xl p-4 w-full">
                <span className="text-2xl font-extrabold text-blue-300 mb-1">{DUMMY_SUMMARY.totalLessonsCompleted}</span>
                <span className="text-md text-blue-100">Lessons Completed</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-gray-800 rounded-xl p-4 w-full">
                <span className="text-2xl font-extrabold text-teal-300 mb-1">{DUMMY_SUMMARY.totalQuizzesTaken}</span>
                <span className="text-md text-teal-100">Quizzes Taken</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-gray-800 rounded-xl p-4 w-full">
                <span className="text-2xl font-extrabold text-purple-300 mb-1">{formatTime(DUMMY_SUMMARY.totalStudyTime)}</span>
                <span className="text-md text-purple-100">Study Time</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-gray-800 rounded-xl p-4 w-full">
                <span className="text-2xl font-extrabold text-yellow-300 mb-1">{DUMMY_SUMMARY.totalPoints}</span>
                <span className="text-md text-yellow-100">Total Points</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-gray-800 rounded-xl p-4 w-full">
                <span className="text-2xl font-extrabold text-orange-300 mb-1">{DUMMY_SUMMARY.currentStreak}</span>
                <span className="text-md text-orange-100">Current Streak</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-gray-800 rounded-xl p-4 w-full">
                <span className="text-2xl font-extrabold text-cyan-300 mb-1">{DUMMY_SUMMARY.totalCheckIns}</span>
                <span className="text-md text-cyan-100">Check-ins</span>
              </div>
            </div>
          </div>
        </div>

        {/* Smaller Footer */}
        <footer
          className="w-full text-center mt-auto border-t border-gray-700"
          style={{
            background: 'linear-gradient(90deg, #23263a 0%, #1e2133 100%)',
            color: '#a0aec0',
            fontSize: 14,
            padding: '12px 0 8px 0',
            letterSpacing: '0.03em',
            fontWeight: 500,
            marginTop: 16,
          }}
        >
          <span style={{ fontWeight: 700, color: '#fff' }}>BluePrint</span> &nbsp;|&nbsp; Crafted for learners everywhere &nbsp; &copy; {new Date().getFullYear()} BluePrint Team 6
        </footer>
      </div>
    </Layout>
  );
};

export default ProgressPage;
