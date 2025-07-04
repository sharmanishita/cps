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
    // Outer container:
    // - `position-relative d-flex flex-column align-items-center justify-content-center`: Explicitly uses column flex for vertical flow and centering.
    // - `vh-100`: Takes full viewport height.
    // - `pt-5 pb-3`: Padding to account for fixed navbar.
    // - `overflow-hidden`: Hides any overflow from *within* this div.
    <div className="position-relative d-flex flex-column align-items-center justify-content-center vh-100 pt-5 pb-3 overflow-hidden">
      {/* Inner card:
          - `flex-shrink-0`: Prevents shrinking.
          - `my-auto mx-auto`: Explicitly applies auto margins for both vertical and horizontal centering within the flex container.
          - `w-100`: Takes full width, limited by `max-width`.
      */}
      <div className="bg-dark text-white rounded shadow-lg text-center p-4 p-md-5 flex-shrink-0 my-auto mx-auto" style={{ maxWidth: '550px', width: '90%' }}>
        {/* Removed text-nowrap from here. The heading will now wrap if needed. */}
        <h2 className="mb-4 text-primary fs-2">Select a Topic for Quiz</h2>
        <div className="mb-4 w-100 d-flex justify-content-center">
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="form-select form-select-lg bg-dark-subtle text-dark-contrast border-secondary"
            style={{ maxWidth: '350px' }}
            disabled={isLoading}
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
          disabled={!selectedTopic || isLoading}
        >
          {isLoading ? <LoadingSpinner size="sm" /> : "Take Quiz"}
        </button>
      </div>
    </div>
  );
};

export default QuizSelectPage;