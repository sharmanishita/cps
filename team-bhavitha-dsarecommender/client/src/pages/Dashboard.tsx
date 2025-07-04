// client/src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useUserStore } from "../store/userStore";
import LearnedConceptCard from "../components/LearnedConceptCard";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

interface QuizHistoryEntry {
  topic: string;
  score: number;
  mastery: number;
  createdAt: string;
}

interface DashboardProps {
  asBackground?: boolean;
}

const Dashboard = ({ asBackground = false }: DashboardProps) => {
  const username = useUserStore((state) => state.username);
  const mastery = useUserStore((state) => state.mastery);
  const progress = useUserStore((state) => state.progress);
  const quizHistory = useUserStore((state) => state.quizHistory);
  const setQuizHistory = useUserStore((state) => state.setQuizHistory);
  const setProfile = useUserStore((state) => state.setProfile);
  const addLearnedTopic = useUserStore((state) => state.addLearnedTopic);
  const removeLearnedTopic = useUserStore((state) => state.removeLearnedTopic);

  const navigate = useNavigate();
  // State for Recommendation path (though not directly used in Dashboard's render, kept for potential future use or if RecommendationPage is merged)
  const [startConcept, setStartConcept] = useState("");
  const [endConcept, setEndConcept] = useState("");
  const [recommendedPath, setRecommendedPath] = useState<string[]>([]);
  const [pathError, setPathError] = useState<string | null>(null);

  const handleTakeQuiz = (selectedTopic: string) => {
    navigate(`/quiz/${encodeURIComponent(selectedTopic)}`);
  };

  // Helper function to get quiz scores for a specific topic, sorted by date
  const getQuizScoresForTopic = (topic: string) => {
    return quizHistory
      .filter(entry => entry.topic === topic)
      .map(entry => ({ score: entry.score, date: entry.createdAt }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort by date ascending
  };


  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get(`/quiz-history/${username}`);
        if (Array.isArray(res.data)) {
          setQuizHistory(res.data);

          const topicScoresMap: Record<string, number[]> = {};
          res.data.forEach((entry: QuizHistoryEntry) => {
            if (!topicScoresMap[entry.topic]) topicScoresMap[entry.topic] = [];
            topicScoresMap[entry.topic].push(entry.mastery);
          });

          const updatedMastery: Record<string, number> = {};
          Object.entries(topicScoresMap).forEach(([topic, scores]) => {
            const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
            updatedMastery[topic] = avg;

            // Confidence is (1 - mastery_score). If confidence is >= 0.7, consider learned.
            // Note: Your existing logic checks `(1 - masteryValue) >= 0.7` in QuizPage,
            // which aligns with higher mastery meaning lower `mastery` score (closer to 0).
            // Let's ensure consistent interpretation here. If mastery from backend is 0-1 (0=perfect, 1=no knowledge)
            // then 1-mastery is confidence. If mastery is 0-1 (0=no knowledge, 1=perfect) then mastery is confidence.
            // Assuming your `mastery` state from backend is 0 to 1 where 0 is full mastery and 1 is no mastery.
            // So, `1 - mastery` is effectively the "confidence" or "correctness" percentage.
            const confidencePercentage = (1 - avg) * 100;
            const isLearned = progress.includes(topic);

            // Mark as learned if confidence is >= 70% and not already learned
            if (confidencePercentage >= 70 && !isLearned) {
              addLearnedTopic(topic);
            }
            // Remove from learned if confidence drops below 70% and it was previously marked learned
            else if (confidencePercentage < 70 && isLearned) {
              removeLearnedTopic(topic);
            }
          });

          // Only update the mastery part of the profile
          setProfile({ mastery: updatedMastery });
        }
      } catch (err) {
        console.error("Failed to fetch quiz history", err);
        setQuizHistory([]);
      }
    };

    if (username) fetchHistory();
  }, [username, setQuizHistory, setProfile, progress, addLearnedTopic, removeLearnedTopic]);

  const chartData = quizHistory
    .map((entry) => ({
      topic: entry.topic,
      mastery: (1 - entry.mastery) * 100, // Convert mastery (0-1) to confidence percentage (0-100)
      date: new Date(entry.createdAt).toLocaleDateString(), // Format date for display
      fullDate: new Date(entry.createdAt).getTime(), // For sorting
    }))
    .sort((a, b) => a.fullDate - b.fullDate); // Sort by date for proper chart progression


  return (
    <div
      className={`container py-4 text-white rounded shadow-lg ${
        asBackground
          ? "position-fixed top-0 start-0 w-100 h-100 z-n1 opacity-25 blur-lg overflow-auto"
          : "bg-dark"
      }`}
    >
      {!asBackground && (
        <>
          <h2 className="text-center mb-4 text-purple">Welcome, {username}!</h2>
          <p className="text-center text-white mb-5">This is your personalized dashboard.</p>
        </>
      )}

      {/* Mastery Over Time */}
      <hr className="my-5 border-secondary border-dashed" />
      <div className="dashboard-section mb-5 pt-3">
        <h3 className="text-center mb-4 text-info">Mastery Over Time</h3>
        {chartData.length === 0 ? (
          <p className="text-center text-white mt-3">No data available yet to show mastery progression.</p>
        ) : (
          <div className="chart-container bg-dark-subtle p-3 rounded shadow">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData} margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
                <XAxis dataKey="topic" interval={0} angle={-30} textAnchor="end" stroke="#b0b0b0" />
                <YAxis domain={[0, 100]} label={{ value: 'Confidence (%)', angle: -90, position: 'insideLeft', fill: '#b0b0b0' }} stroke="#b0b0b0" />
                <Tooltip contentStyle={{ backgroundColor: '#333333', border: '1px solid #555555', color: '#e0e0e0' }} itemStyle={{ color: '#e0e0e0' }} />
                <Line type="monotone" dataKey="mastery" stroke="#a872e6" strokeWidth={3} dot={{ r: 5, fill: '#a872e6' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Mastery Levels */}
      <hr className="my-5 border-secondary border-dashed" />
      <div className="dashboard-section mb-5 pt-3">
        <h3 className="text-center mb-4 text-info">Current Mastery Levels</h3>
        {Object.keys(mastery).length === 0 ? (
          <p className="text-center text-white mt-3">No mastery data available. Take some quizzes to get started!</p>
        ) : (
          <ul className="list-group list-group-flush mx-auto" style={{ maxWidth: '800px' }}>
            {Object.entries(mastery).map(([topic, score]) => (
              <li key={topic} className="list-group-item bg-secondary-subtle border-start border-5 border-success rounded mb-3 shadow-sm d-flex justify-content-between align-items-center text-dark">
                <strong>{topic}</strong>
                <span className="badge bg-primary text-white fs-6">{(1 - score).toFixed(2)} Confidence</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Topics Learned (now passing quizScores) */}
      <hr className="my-5 border-secondary border-dashed" />
      <div className="dashboard-section mb-5 pt-3">
        <h3 className="text-center mb-4 text-info">Topics Learned</h3>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-5 g-4 justify-content-center"> {/* Changed here */}
          {progress.length === 0 ? (
            <p className="text-center text-white mt-3 col-12">No topics marked as completed yet. Keep learning!</p>
          ) : (
            progress.map((topic) => (
              <div className="col" key={topic}>
                <LearnedConceptCard
                  title={topic}
                  quizScores={getQuizScoresForTopic(topic)} // Pass relevant quiz scores for the topic
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quiz History */}
      <hr className="my-5 border-secondary border-dashed" />
      <div className="dashboard-section mb-5 pt-3">
        <h3 className="text-center mb-4 text-info">Quiz History</h3>
        {quizHistory.length === 0 ? (
          <p className="text-center text-white mt-3">No quiz attempts recorded yet.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 g-3 justify-content-center">
            {quizHistory.map((entry, i) => (
              <div className="col" key={i}>
                <li className="list-group-item bg-secondary-subtle border-start border-5 border-primary rounded shadow-sm text-start text-dark-contrast h-100 p-3">
                  <strong>{entry.topic}</strong> — Score: {entry.score}% — Mastery Weight: {entry.mastery}
                  <br />
                  <small className="text-muted">{new Date(entry.createdAt).toLocaleString()}</small>
                </li>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;