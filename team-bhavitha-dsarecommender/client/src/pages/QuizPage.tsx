// client/src/pages/QuizPage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/api";
import { useUserStore } from "../store/userStore";
import LoadingSpinner from "../components/LoadingSpinner"; // Import LoadingSpinner

interface MCQQuestion {
  question: string;
  options: string[];
}

interface QuizSummary {
  topic: string;
  score: number;
  masteryUpdate: Record<string, number>;
  correctAnswers?: string[];
  userAnswers?: string[];
}

const QuizPage = () => {
  const { topic } = useParams<{ topic: string }>();
  const navigate = useNavigate();
  const username = useUserStore((state) => state.username);
  const updateProfile = useUserStore((state) => state.setProfile);
  const currentMastery = useUserStore((state) => state.mastery);
  const addLearnedTopic = useUserStore((state) => state.addLearnedTopic);
  const quizHistory = useUserStore((state) => state.quizHistory);
  const setQuizHistory = useUserStore((state) => state.setQuizHistory);
  const progress = useUserStore((state) => state.progress);

  const [loading, setLoading] = useState(true); // For initial quiz questions fetch
  const [isSubmitting, setIsSubmitting] = useState(false); // For quiz submission
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<MCQQuestion[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [summary, setSummary] = useState<QuizSummary | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!topic) {
        setError("No topic specified");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await api.get(`/quiz/${encodeURIComponent(topic)}`);
        const fetchedQuestions = res.data.questions;

        if (!Array.isArray(fetchedQuestions)) {
          throw new Error("Invalid questions format received from server");
        }

        setQuestions(fetchedQuestions);
        setAnswers(new Array(fetchedQuestions.length).fill(""));
        setCorrectAnswers(res.data._correctAnswers || []);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load quiz questions";
        console.error("Quiz loading error:", err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [topic]);

  const handleOptionSelect = (qIndex: number, selected: string) => {
    if (submitted) return;
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[qIndex] = selected;
      return newAnswers;
    });
  };

  const handleSubmit = async () => {
    if (!topic) return;
    if (questions.length === 0 || answers.some((a) => a === "")) {
      alert("Please answer all questions before submitting.");
      return;
    }

    try {
      setIsSubmitting(true); // Start loading for submission
      setSubmitted(true); // Mark as submitted to show results
      
      const res = await api.post("/quiz/submit", {
        topic,
        answers,
        username,
        _correctAnswers: correctAnswers,
      });

      const masteryValue = res.data.masteryUpdate?.[topic];
      setSummary(res.data);

      updateProfile({
        mastery: {
          ...currentMastery,
          ...res.data.masteryUpdate,
        },
      });

      if (typeof masteryValue === "number" && (1 - masteryValue) >= 0.7 && !progress.includes(topic)) {
        addLearnedTopic(topic);
      }

      const newEntry = {
        topic,
        score: res.data.score,
        mastery: masteryValue,
        createdAt: new Date().toISOString(),
      };
      setQuizHistory([...quizHistory, newEntry]);

    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to submit quiz";
      console.error("Quiz submission error:", err);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false); // End loading for submission
    }
  };

  if (loading) {
    return (
      <div className="container py-5 bg-dark text-white rounded shadow-lg text-center">
        <LoadingSpinner size="lg" message="Loading quiz questions..." /> {/* Use spinner here */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 bg-dark text-white rounded shadow-lg text-center">
        <h2 className="text-danger mb-4">Error</h2>
        <div className="alert alert-danger mb-4">{error}</div>
        <button
          onClick={() => navigate("/dashboard")}
          className="btn btn-primary btn-lg"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4 bg-dark text-white rounded shadow-lg">
      <h2 className="text-center mb-4 text-primary">Quiz on: {topic}</h2>

      {questions.length === 0 ? (
        <p className="text-center fs-5 text-muted mt-3">
          No questions available for this topic.
        </p>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          {questions.map((q, i) => (
            <div key={i} className="card bg-light text-dark p-4 shadow rounded mb-4">
              <p className="card-text fs-5 fw-bold mb-3 text-dark">
                {i + 1}. {q.question}
              </p>
              <div className="d-flex flex-column gap-3">
                {q.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`list-group-item list-group-item-action bg-white text-dark border border-secondary rounded py-3 px-4 d-flex align-items-center ${
                      submitted && summary
                        ? summary.correctAnswers?.[i] === option
                          ? "border-success bg-success-subtle text-success-emphasis"
                          : summary.userAnswers?.[i] === option &&
                            summary.correctAnswers?.[i] !== option
                          ? "border-danger bg-danger-subtle text-danger-emphasis"
                          : ""
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${i}`}
                      value={option}
                      checked={answers[i] === option}
                      onChange={() => handleOptionSelect(i, option)}
                      disabled={submitted || isSubmitting} // Disable while submitted or submitting
                      className="form-check-input me-3"
                      style={{ transform: "scale(1.4)" }}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {!submitted && (
            <button
              onClick={handleSubmit}
              disabled={answers.some((a) => a === "") || answers.length === 0 || isSubmitting} // Disable submit button while submitting
              className="btn btn-primary btn-lg w-100 mt-4"
            >
              {isSubmitting ? <LoadingSpinner size="sm" /> : "Submit Quiz"}
            </button>
          )}
        </form>
      )}

      {summary && (
        <div className="card bg-light text-dark p-5 shadow-lg rounded mt-5 text-center">
          <h3 className="card-title text-success mb-3">Quiz Results</h3>
          <p className="card-text fs-4 mb-2 text-dark">
            <span className="fw-semibold">Score:</span> {summary.score.toFixed(1)}%
          </p>
          {summary.masteryUpdate && topic && (
            <p className="card-text fs-4 mb-4 text-dark">
              <span className="fw-semibold">Mastery Level:</span>{" "}
              {((1 - (summary.masteryUpdate[topic] || 0)) * 100).toFixed(1)}%
            </p>
          )}
          <button
            onClick={() => navigate("/dashboard")}
            className="btn btn-primary btn-lg"
          >
            Return to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;