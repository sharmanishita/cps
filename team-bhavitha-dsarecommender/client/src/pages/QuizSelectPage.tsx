// client/src/pages/QuizSelectPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validTopics } from "../data/validTopic";
import LoadingSpinner from "../components/LoadingSpinner"; // Import LoadingSpinner

const QuizSelectPage = () => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for button loading
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (selectedTopic.trim()) {
      setIsLoading(true); // Start loading animation
      // Simulate a network delay or processing time before navigation
      setTimeout(() => {
        navigate(`/quiz/${encodeURIComponent(selectedTopic.trim())}`);
        setIsLoading(false); // End loading (though navigation changes page)
      }, 800); // 800ms delay for demonstration
    }
  };

  return (
    <div className="container py-5 bg-dark text-white rounded shadow-lg text-center" style={{ maxWidth: '650px' }}>
      <h2 className="mb-4 text-primary fs-2">Select a Topic for Quiz</h2>
      <div className="mb-3 d-flex justify-content-center">
        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="form-select form-select-lg bg-dark-subtle text-dark-contrast border-secondary"
          style={{ maxWidth: '300px' }}
          disabled={isLoading} // Disable select while loading
        >
          <option value="">Select a topic...</option>
          {validTopics.map((topic: string, i: number) => (
            <option key={i} value={topic}>{topic}</option>
          ))}
        </select>
      </div>
      <button
        onClick={handleSubmit}
        className="btn btn-primary btn-lg w-100"
        disabled={!selectedTopic || isLoading} // Disable button if no topic selected or loading
      >
        {isLoading ? <LoadingSpinner size="sm" /> : "Take Quiz"}
      </button>
    </div>
  );
};

export default QuizSelectPage;