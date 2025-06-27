import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Flame } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getCurrentMonthCalendar } from '../api/api';

interface StreakCalendarProps {
  onClose: () => void;
}

interface CalendarData {
  username: string;
  loginStreak: number;
  currentMonth: number;
  currentYear: number;
  loginDays: Array<{
    date: string;
    day: number;
  }>;
  totalDaysThisMonth: number;
}

const StreakCalendar: React.FC<StreakCalendarProps> = ({ onClose }) => {
  const { darkMode } = useTheme();
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState(true);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        setLoading(true);
        const response = await getCurrentMonthCalendar();
        setCalendarData(response.data);
      } catch (error) {
        console.error('Error fetching calendar data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, []);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const isLoginDay = (day: number) => {
    return calendarData?.loginDays.some(loginDay => loginDay.day === day) || false;
  };

  const renderCalendarDays = () => {
    if (!calendarData) return [];

    const daysInMonth = getDaysInMonth(calendarData.currentMonth, calendarData.currentYear);
    const firstDay = getFirstDayOfMonth(calendarData.currentMonth, calendarData.currentYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isActive = isLoginDay(day);
      const isToday = new Date().getDate() === day &&
        new Date().getMonth() === calendarData.currentMonth &&
        new Date().getFullYear() === calendarData.currentYear;

      days.push(
        <div
          key={day}
          className={`calendar-day ${isActive ? 'active' : ''} ${isToday ? 'today' : ''}`}
        >
          {day}
          {isActive && <div className="login-indicator"></div>}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className={`streak-calendar-modal ${darkMode ? 'dark' : 'light'}`}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="calendar-header">
          <div className="calendar-title">
            <Calendar size={20} />
            <span>Login Calendar</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div className="calendar-loading">Loading...</div>
        ) : calendarData ? (
          <>
            <div className="streak-info">
              <div className="streak-stat">
                <Flame size={18} />
                <span>Current Streak: {calendarData.loginStreak} days</span>
              </div>
              <div className="month-stat">
                <span>This month: {calendarData.totalDaysThisMonth} days</span>
              </div>
            </div>

            <div className="calendar-navigation">
              <h3>{monthNames[calendarData.currentMonth]} {calendarData.currentYear}</h3>
            </div>

            <div className="calendar-grid">
              <div className="calendar-weekdays">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="weekday">{day}</div>
                ))}
              </div>
              <div className="calendar-days">
                {renderCalendarDays()}
              </div>
            </div>
          </>
        ) : (
          <div className="calendar-error">Failed to load calendar data</div>
        )}
      </motion.div>
    </div>
  );
};

export default StreakCalendar;
