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
        className={`max-w-7xl mx-auto min-h-screen flex flex-col transition-colors duration-300 ${
          darkMode ? 'bg-[#181A20]' : 'bg-gradient-to-br from-white to-blue-50'
        }`}
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

        {/* Stat Cards Section - Horizontally scrollable on small screens, grid on medium+ */}
        <div className="mb-32 mt-16 px-4 md:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-20 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            {[
              {
                icon: <BookOpen size={32} className={`${darkMode ? 'text-blue-200' : 'text-blue-700'} mb-4`} />,
                value: summaryToShow.totalLessonsCompleted,
                label: 'Lessons Completed',
                gradientDark: 'from-blue-700 to-blue-400',
                gradientLight: 'from-blue-100 to-blue-50 border border-blue-200',
                textColorDark: 'text-white',
                textColorLight: 'text-blue-900',
                subTextColorDark: 'text-blue-100',
                subTextColorLight: 'text-blue-700/80',
              },
              {
                icon: <Award size={32} className={`${darkMode ? 'text-teal-200' : 'text-teal-700'} mb-4`} />,
                value: summaryToShow.totalQuizzesTaken,
                label: 'Quizzes Taken',
                gradientDark: 'from-teal-700 to-teal-400',
                gradientLight: 'from-teal-100 to-teal-50 border border-teal-200',
                textColorDark: 'text-white',
                textColorLight: 'text-teal-900',
                subTextColorDark: 'text-teal-100',
                subTextColorLight: 'text-teal-700/80',
              },
              {
                icon: <Clock size={32} className={`${darkMode ? 'text-purple-200' : 'text-purple-700'} mb-4`} />,
                value: formatTime(summaryToShow.totalStudyTime),
                label: 'Study Time',
                gradientDark: 'from-purple-700 to-purple-400',
                gradientLight: 'from-purple-100 to-purple-50 border border-purple-200',
                textColorDark: 'text-white',
                textColorLight: 'text-purple-900',
                subTextColorDark: 'text-purple-100',
                subTextColorLight: 'text-purple-700/80',
              },
              {
                icon: <Medal size={32} className={`${darkMode ? 'text-yellow-200' : 'text-yellow-700'} mb-4`} />,
                value: summaryToShow.totalPoints,
                label: 'Total Points',
                gradientDark: 'from-orange-600 to-yellow-400',
                gradientLight: 'from-yellow-100 to-orange-50 border border-yellow-200',
                textColorDark: 'text-white',
                textColorLight: 'text-yellow-900',
                subTextColorDark: 'text-yellow-100',
                subTextColorLight: 'text-yellow-700/80',
              },
            ].map((card) => (
              <div
                key={card.label}
                className={`rounded-2xl shadow-lg p-10 flex flex-col items-center min-w-[260px] max-w-[320px] mx-2 transition-colors duration-300 bg-gradient-to-br ${
                  darkMode ? `${card.gradientDark} bg-opacity-90` : card.gradientLight
                }`}
              >
                {card.icon}
                <div className={`text-3xl font-bold mb-2 ${darkMode ? card.textColorDark : card.textColorLight}`}>
                  {card.value}
                </div>
                <div className={`text-md font-medium ${darkMode ? card.subTextColorDark : card.subTextColorLight}`}>
                  {card.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Circular Progress Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-32 mt-24 px-4 md:px-20">
          <div className="flex flex-col items-center p-6">
            <CircularProgress progress={calculateOverallProgress()} size={150} strokeWidth={28} color="#60a5fa" label="Overall" />
            <span className="mt-10 text-blue-200 font-semibold text-xl">Overall Progress</span>
          </div>
          <div className="flex flex-col items-center p-6">
            <CircularProgress
              progress={(summaryToShow.currentStreak / Math.max(summaryToShow.loginStreak, 1)) * 100}
              size={150}
              strokeWidth={28}
              color="#f59e42"
              label="Streak"
            />
            <span className="mt-10 text-orange-200 font-semibold text-xl">
              Current Streak: {summaryToShow.currentStreak}
            </span>
          </div>
          <div className="flex flex-col items-center p-6">
            <CircularProgress
              progress={(summaryToShow.totalCheckIns / 30) * 100}
              size={150}
              strokeWidth={28}
              color="#38bdf8"
              label="Check-ins"
            />
            <span className="mt-10 text-cyan-200 font-semibold text-xl">
              Check-ins: {summaryToShow.totalCheckIns}
            </span>
          </div>
        </div>

        {/* Bar Chart Section */}
        <div
          className={`rounded-2xl shadow-lg p-20 mb-32 mt-24 flex flex-col items-center justify-center transition-colors duration-300 ${
            darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-white to-blue-50 border border-blue-100'
          }`}
        >
          <h3
            className={`text-5xl font-extrabold mb-16 mt-24 flex items-center justify-center ${
              darkMode ? 'text-purple-200' : 'text-purple-700'
            }`}
            style={{
              letterSpacing: '0.05em',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            <BarChart3 size={56} className={`mr-8 ${darkMode ? 'text-purple-200' : 'text-purple-400'}`} />
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
                      const barHeight = (value / maxValue) * 320;
                      return (
                        <div key={idx} className="flex flex-col items-center group w-14">
                          <div
                            className={`w-32 rounded-t-2xl transition-all duration-500 relative shadow-xl bg-gradient-to-t ${
                              darkMode ? 'from-blue-400 to-purple-400' : 'from-blue-200 to-purple-100'
                            }`}
                            style={{ height: `${barHeight}px` }}
                          >
                            <div
                              className={`absolute bottom-full left-1/2 -translate-x-1/2 transform opacity-0 group-hover:opacity-100 pointer-events-none text-sm px-4 py-2 rounded shadow-lg z-10 transition-all duration-300 ${
                                darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 border border-blue-100'
                              }`}
                              style={{ marginBottom: '1rem' }}
                            >
                              {`${day.lessonsCompleted} lessons, ${day.quizzesTaken} quizzes, ${formatTime(day.studyTime)} study`}
                            </div>
                          </div>

                          {/* X Axis label */}
                          <span className={`mt-4 font-semibold ${
                            darkMode ? 'text-blue-200 text-sm' : 'text-blue-700 text-base'
                          }`}>
                            {new Date(day._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* X Axis line */}
                  <div className={`absolute left-0 right-0 bottom-10 h-0.5 z-0 ${darkMode ? 'bg-blue-900 opacity-60' : 'bg-blue-200 opacity-60'}`} />
                </div>
              );
            })()}
          </div>
        </div>

        {/* Space after graph for stats */}
        <div style={{ height: 24 }} />

        {/* Progress Tracker */}
        <div className="mb-24 mt-16 flex justify-center w-full">
          <div className={`rounded-2xl shadow-lg px-6 py-10 max-w-full w-full flex flex-col gap-8 items-center 
            ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700' : ''}`}>
            <h2 className={`text-3xl font-extrabold tracking-tight text-center mb-4 
              ${darkMode ? 'text-blue-200' : 'text-gray-900'}`}>
              Your Latest Progress (Sample Data)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {/* Lessons Completed */}
              <div
                className={`flex flex-col items-center justify-center rounded-xl p-4 w-full transition-colors duration-300 ${darkMode ? '' : 'bg-blue-200/40'}`}
                style={
                  darkMode
                    ? {
                        background: 'linear-gradient(135deg, #23263a 0%, #181A20 100%)',
                        border: '2px solid #2d3148',
                        color: '#fff',
                        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)',
                        borderRadius: 18,
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 80,
                        padding: '24px 16px',
                      }
                    : undefined
                }
              >
                <span className={`font-extrabold mt-1 ${darkMode ? 'text-2xl' : 'text-4xl text-blue-700'}`} style={darkMode ? { color: '#7dd3fc' } : undefined}>
                  {DUMMY_SUMMARY.totalLessonsCompleted}
                </span>
                <span className={`${darkMode ? 'text-md' : 'text-lg text-blue-900/80'} mt-1`} style={darkMode ? { color: '#d1d5db' } : undefined}>
                  Lessons Completed
                </span>
              </div>

              {/* Quizzes Taken */}
              <div
                className={`flex flex-col items-center justify-center rounded-xl p-4 w-full transition-colors duration-300 ${darkMode ? '' : 'bg-teal-200/40'}`}
                style={
                  darkMode
                    ? {
                        background: 'linear-gradient(135deg, #23263a 0%, #181A20 100%)',
                        border: '2px solid #2d3148',
                        color: '#fff',
                        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)',
                        borderRadius: 18,
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 80,
                        padding: '24px 16px',
                      }
                    : undefined
                }
              >
                <span className={`font-extrabold mt-1 ${darkMode ? 'text-2xl' : 'text-4xl text-teal-700'}`} style={darkMode ? { color: '#6ee7b7' } : undefined}>
                  {DUMMY_SUMMARY.totalQuizzesTaken}
                </span>
                <span className={`${darkMode ? 'text-md' : 'text-lg text-teal-900/80'} mt-1`} style={darkMode ? { color: '#d1d5db' } : undefined}>
                  Quizzes Taken
                </span>
              </div>

              {/* Study Time */}
              <div
                className={`flex flex-col items-center justify-center rounded-xl p-4 w-full transition-colors duration-300 ${darkMode ? '' : 'bg-purple-200/40'}`}
                style={
                  darkMode
                    ? {
                        background: 'linear-gradient(135deg, #23263a 0%, #181A20 100%)',
                        border: '2px solid #2d3148',
                        color: '#fff',
                        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)',
                        borderRadius: 18,
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 80,
                        padding: '24px 16px',
                      }
                    : undefined
                }
              >
                <span className={`font-extrabold mt-1 ${darkMode ? 'text-2xl' : 'text-4xl text-purple-700'}`} style={darkMode ? { color: '#c4b5fd' } : undefined}>
                  {formatTime(DUMMY_SUMMARY.totalStudyTime)}
                </span>
                <span className={`${darkMode ? 'text-md' : 'text-lg text-purple-900/80'} mt-1`} style={darkMode ? { color: '#d1d5db' } : undefined}>
                  Study Time
                </span>
              </div>

              {/* Total Points */}
              <div
                className={`flex flex-col items-center justify-center rounded-xl p-4 w-full transition-colors duration-300 ${darkMode ? '' : 'bg-yellow-200/40'}`}
                style={
                  darkMode
                    ? {
                        background: 'linear-gradient(135deg, #23263a 0%, #181A20 100%)',
                        border: '2px solid #2d3148',
                        color: '#fff',
                        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)',
                        borderRadius: 18,
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 80,
                        padding: '24px 16px',
                      }
                    : undefined
                }
              >
                <span className={`font-extrabold mt-1 ${darkMode ? 'text-2xl' : 'text-4xl text-yellow-700'}`} style={darkMode ? { color: '#fde68a' } : undefined}>
                  {DUMMY_SUMMARY.totalPoints}
                </span>
                <span className={`${darkMode ? 'text-md' : 'text-lg text-yellow-900/80'} mt-1`} style={darkMode ? { color: '#d1d5db' } : undefined}>
                  Total Points
                </span>
              </div>

              {/* Current Streak */}
              <div
                className={`flex flex-col items-center justify-center rounded-xl p-4 w-full transition-colors duration-300 ${darkMode ? '' : 'bg-orange-200/40'}`}
                style={
                  darkMode
                    ? {
                        background: 'linear-gradient(135deg, #23263a 0%, #181A20 100%)',
                        border: '2px solid #2d3148',
                        color: '#fff',
                        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)',
                        borderRadius: 18,
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 80,
                        padding: '24px 16px',
                      }
                    : undefined
                }
              >
                <span className={`font-extrabold mt-1 ${darkMode ? 'text-2xl' : 'text-4xl text-orange-700'}`} style={darkMode ? { color: '#fdba74' } : undefined}>
                  {DUMMY_SUMMARY.currentStreak}
                </span>
                <span className={`${darkMode ? 'text-md' : 'text-lg text-orange-900/80'} mt-1`} style={darkMode ? { color: '#d1d5db' } : undefined}>
                  Current Streak
                </span>
              </div>

              {/* Check-ins */}
              <div
                className={`flex flex-col items-center justify-center rounded-xl p-4 w-full transition-colors duration-300 ${darkMode ? '' : 'bg-cyan-200/40'}`}
                style={
                  darkMode
                    ? {
                        background: 'linear-gradient(135deg, #23263a 0%, #181A20 100%)',
                        border: '2px solid #2d3148',
                        color: '#fff',
                        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)',
                        borderRadius: 18,
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 80,
                        padding: '24px 16px',
                      }
                    : undefined
                }
              >
                <span className={`font-extrabold mt-1 ${darkMode ? 'text-2xl' : 'text-4xl text-cyan-700'}`} style={darkMode ? { color: '#67e8f9' } : undefined}>
                  {DUMMY_SUMMARY.totalCheckIns}
                </span>
                <span className={`${darkMode ? 'text-md' : 'text-lg text-cyan-900/80'} mt-1`} style={darkMode ? { color: '#d1d5db' } : undefined}>
                  Check-ins
                </span>
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
