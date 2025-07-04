// src/pages/RecommendationPage.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { validTopics } from "../data/validTopic";
import {api} from "../lib/api";

const RecommendationPage = () => {
  const username = useUserStore((state) => state.username);
  const navigate = useNavigate();

  const [startConcept, setStartConcept] = useState("");
  const [endConcept, setEndConcept] = useState("");
  const [recommendedPath, setRecommendedPath] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGetPath = async () => {
    setError(null);
    if (!startConcept.trim() || !endConcept.trim()) {
      setError("Please select both start and target concepts.");
      setRecommendedPath([]);
      return;
    }

    try {
      const res = await api.post("/recommendation", {
        start: startConcept.trim(),
        end: endConcept.trim(),
        username,
      });

      setRecommendedPath(res.data.path || []);
      if (res.data.path?.length === 0) {
        setError("No path found between the selected concepts.");
      }
    } catch (err: any) {
      console.error("Error fetching recommendation:", err);
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  const handleTakeQuiz = (topic: string) => {
    navigate(`/quiz/${encodeURIComponent(topic)}`);
  };

  const handleExplore = (topic: string) => {
    navigate(`/explore/${encodeURIComponent(topic)}`);
  };

  return (
    <div className="container py-4 bg-dark text-white rounded shadow-lg">
      <h2 className="text-center mb-4 text-info">Get Learning Path Recommendation</h2>

      <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mb-4 align-items-center">
        <select
          value={startConcept}
          onChange={(e) => setStartConcept(e.target.value)}
          className="form-select form-select-lg bg-dark-subtle text-dark-contrast border-secondary"
          style={{ maxWidth: '300px' }}
        >
          <option value="">Select Start Concept</option>
          {validTopics.filter((t) => t !== endConcept).map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>

        <select
          value={endConcept}
          onChange={(e) => setEndConcept(e.target.value)}
          className="form-select form-select-lg bg-dark-subtle text-dark-contrast border-secondary"
          style={{ maxWidth: '300px' }}
        >
          <option value="">Select Target Concept</option>
          {validTopics.filter((t) => t !== startConcept).map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>

        <button
          onClick={handleGetPath}
          className="btn btn-primary btn-lg flex-shrink-0"
        >
          Get Path
        </button>
      </div>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {recommendedPath.length > 0 && (
        <div className="bg-secondary-subtle p-4 rounded shadow text-dark mt-4">
          <h4 className="text-center mb-4 text-info">Recommended Path:</h4>
          <ul className="list-group">
            {recommendedPath.map((topic, idx) => (
              <li
                key={idx}
                className="list-group-item bg-dark-subtle d-flex justify-content-between align-items-center py-3 px-4 mb-2 rounded"
              >
                <span>{idx + 1}. {topic}</span>
                <div className="d-flex gap-2">
                  <button
                    onClick={() => handleTakeQuiz(topic)}
                    className="btn btn-success btn-sm"
                  >
                    Take Quiz
                  </button>
                  <button
                    onClick={() => handleExplore(topic)}
                    className="btn btn-info btn-sm"
                  >
                    Explore
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecommendationPage;
