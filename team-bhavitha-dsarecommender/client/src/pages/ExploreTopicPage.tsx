import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import LoadingSpinner from "../components/LoadingSpinner";

interface Concept {
  name: string;
  description?: string;
  spotlight_fact?: string;
  lecture?: string;
  examples?: string[];
  related_topics?: string[];
  quiz_available?: boolean;
  structuredNotes?: {
    overview?: string;
    keyConcepts?: { name: string; explanation: string }[];
    frequentlyUsed?: string[];
    commonPitfalls?: string[];
    bestPractices?: string[];
    latestReferences?: string[];
  };
}

const ExploreTopicPage = () => {
  const { topic } = useParams<{ topic: string }>();
  const [concept, setConcept] = useState<Concept | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isTakingQuiz, setIsTakingQuiz] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!topic) {
      setError("No topic specified for exploration.");
      setLoading(false);
      return;
    }

    setLoading(true);
    api
      .get(`/explore/${encodeURIComponent(topic)}`)
      .then((res) => {
        setConcept(res.data);
        setError("");
      })
      .catch((err) => {
        console.error("Error fetching concept:", err);
        setError("Couldn't load concept information. Please try again later.");
        setConcept(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [topic]);

  const handleTakeQuiz = (selectedTopic: string) => {
    setIsTakingQuiz(true);
    setTimeout(() => {
      navigate(`/quiz/${encodeURIComponent(selectedTopic)}`);
      setIsTakingQuiz(false);
    }, 800);
  };

  if (error) {
    return (
      <div className="container py-5 bg-dark text-white rounded shadow-lg text-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button onClick={() => navigate("/dashboard")} className="btn btn-secondary mt-3">
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-5 bg-dark text-white rounded shadow-lg text-center">
        <LoadingSpinner size="lg" message="Loading concept information..." />
        <button onClick={() => navigate("/dashboard")} className="btn btn-secondary mt-3">
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!concept) return null;

  const notes = concept.structuredNotes;

  return (
    <div className="container py-4 bg-dark text-white rounded shadow-lg">
      <h2 className="text-center mb-4 text-primary fs-2">{concept.name}</h2>

      {(concept.description || concept.spotlight_fact || concept.lecture) && (
        <div className="card bg-dark-subtle text-dark-contrast p-4 mb-4 shadow-sm">
          {concept.description && (
            <p className="mb-2"><strong>Description:</strong> {concept.description}</p>
          )}
          {concept.spotlight_fact && (
            <p className="mb-2"><strong>Spotlight Fact:</strong> {concept.spotlight_fact}</p>
          )}
          {concept.lecture && (
            <p className="mb-0"><strong>Appears in Lecture:</strong> {concept.lecture}</p>
          )}
        </div>
      )}

      {concept.examples&&concept.examples.length > 0 && (
        <div className="card bg-dark-subtle text-dark-contrast p-4 mb-4 shadow-sm">
          <h5 className="text-info mb-3"><i className="bi bi-lightbulb-fill me-2"></i> Examples:</h5>
          <ul className="list-group list-group-flush bg-dark-subtle">
            {concept.examples.map((ex, i) => (
              <li key={i} className="list-group-item bg-dark-subtle text-dark-contrast border-0 py-1">{ex}</li>
            ))}
          </ul>
        </div>
      )}

      {concept.related_topics&&concept.related_topics?.length > 0 && (
        <div className="card bg-dark-subtle text-dark-contrast p-4 mb-4 shadow-sm">
          <h5 className="text-info mb-3"><i className="bi bi-link-45deg me-2"></i> Related Topics:</h5>
          <ul className="list-group list-group-flush bg-dark-subtle">
            {concept.related_topics.map((related, i) => (
              <li key={i} className="list-group-item bg-dark-subtle text-dark-contrast border-0 py-1">{related}</li>
            ))}
          </ul>
        </div>
      )}

      {notes?.overview && (
        <div className="card bg-dark-subtle text-dark-contrast p-4 mb-4 shadow-sm">
          <h5 className="text-info mb-3"><i className="bi bi-journal-text me-2"></i> Overview:</h5>
          <p className="mb-0">{notes.overview}</p>
        </div>
      )}

      {notes&&notes.keyConcepts&&notes.keyConcepts.length > 0 && (
        <div className="card bg-dark-subtle text-dark-contrast p-4 mb-4 shadow-sm">
          <h5 className="text-info mb-3"><i className="bi bi-collection me-2"></i> Key Concepts:</h5>
          <ul className="list-group list-group-flush bg-dark-subtle">
            {notes.keyConcepts.map((kc, i) => (
              <li key={i} className="list-group-item bg-dark-subtle text-dark-contrast border-0 py-1">
                <strong>{kc.name}:</strong> {kc.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}

      {notes&&notes.frequentlyUsed&&notes.frequentlyUsed?.length > 0 && (
        <div className="card bg-dark-subtle text-dark-contrast p-4 mb-4 shadow-sm">
          <h5 className="text-info mb-3"><i className="bi bi-tools me-2"></i> Frequently Used In Practice:</h5>
          <ul className="list-group list-group-flush bg-dark-subtle">
            {notes.frequentlyUsed.map((item, i) => (
              <li key={i} className="list-group-item bg-dark-subtle text-dark-contrast border-0 py-1">{item}</li>
            ))}
          </ul>
        </div>
      )}

      {notes&&notes.commonPitfalls&&notes.commonPitfalls.length > 0 && (
        <div className="card bg-dark-subtle text-dark-contrast p-4 mb-4 shadow-sm">
          <h5 className="text-info mb-3"><i className="bi bi-exclamation-triangle me-2"></i> Common Pitfalls:</h5>
          <ul className="list-group list-group-flush bg-dark-subtle">
            {notes.commonPitfalls.map((item, i) => (
              <li key={i} className="list-group-item bg-dark-subtle text-dark-contrast border-0 py-1">{item}</li>
            ))}
          </ul>
        </div>
      )}

      {notes&&notes.bestPractices&&notes.bestPractices.length > 0 && (
        <div className="card bg-dark-subtle text-dark-contrast p-4 mb-4 shadow-sm">
          <h5 className="text-info mb-3"><i className="bi bi-lightning-charge me-2"></i> Best Practices:</h5>
          <ul className="list-group list-group-flush bg-dark-subtle">
            {notes.bestPractices.map((item, i) => (
              <li key={i} className="list-group-item bg-dark-subtle text-dark-contrast border-0 py-1">{item}</li>
            ))}
          </ul>
        </div>
      )}

      {notes&&notes.latestReferences&&notes.latestReferences.length > 0 && (
        <div className="card bg-dark-subtle text-dark-contrast p-4 mb-4 shadow-sm">
          <h5 className="text-info mb-3"><i className="bi bi-journal-bookmark-fill me-2"></i> Latest References:</h5>
          <ul className="list-group list-group-flush bg-dark-subtle">
            {notes.latestReferences.map((item, i) => (
              <li key={i} className="list-group-item bg-dark-subtle text-dark-contrast border-0 py-1">{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="card bg-dark-subtle p-4 mb-4 d-flex justify-content-between align-items-center flex-wrap shadow-sm">
        <p className="mb-0 fs-5 text-dark-contrast">
          <strong>Quiz Available:</strong>{" "}
          <span className={concept.quiz_available ? "text-success fw-bold" : "text-danger fw-bold"}>
            {concept.quiz_available ? "Yes!" : "No."}
          </span>
        </p>
        {concept.quiz_available && (
          <button
            onClick={() => handleTakeQuiz(concept.name)}
            className="btn btn-primary btn-lg mt-3 mt-md-0"
            disabled={isTakingQuiz}
          >
            {isTakingQuiz ? <LoadingSpinner size="sm" /> : "Take Quiz Now"}{" "}
            <i className="bi bi-arrow-right-circle-fill ms-2"></i>
          </button>
        )}
      </div>

      <div className="text-center mt-4">
        <button onClick={() => navigate("/dashboard")} className="btn btn-secondary btn-lg">
          <i className="bi bi-arrow-left-circle-fill me-2"></i> Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ExploreTopicPage;
