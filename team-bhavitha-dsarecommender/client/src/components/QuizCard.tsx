// client/src/components/QuizCard.tsx
import LoadingSpinner from "./LoadingSpinner"; // Import LoadingSpinner

interface QuizCardProps {
  topic: string;
  onTakeQuiz: (topic: string) => void;
  isLoading?: boolean; // Add isLoading prop
}

const QuizCard = ({ topic, onTakeQuiz, isLoading }: QuizCardProps) => {
  return (
    <div className="card text-center bg-secondary-subtle text-white h-100 shadow-sm border border-info">
      <div className="card-body d-flex flex-column justify-content-between">
        <h4 className="card-title text-info mb-3">{topic}</h4>
        <p className="card-text text-muted">Ready to test your knowledge?</p>
        <button
          onClick={() => onTakeQuiz(topic)}
          className="btn btn-primary mt-auto"
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? <LoadingSpinner size="sm" /> : "Take Quiz"}
        </button>
      </div>
    </div>
  );
};

export default QuizCard;