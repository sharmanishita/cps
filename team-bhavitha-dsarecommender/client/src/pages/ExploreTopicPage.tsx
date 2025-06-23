import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Concept {
  name: string;
  description: string;
  spotlight_fact: string;
  lecture: string;
  examples?: string[];
  related_topics?: string[];
  quiz_available?: boolean;
}

const ExploreTopicPage = () => {
  const { topic } = useParams<{ topic: string }>();
  const [concept, setConcept] = useState<Concept | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Ensure topic is not undefined before making the API call
    if (!topic) {
      setError("No topic specified for exploration.");
      return;
    }

    axios
      .get(`/api/explore/${encodeURIComponent(topic)}`)
      .then((res) => {
        setConcept(res.data);
        setError(""); // Clear previous error
      })
      .catch((err) => {
        console.error("Error fetching concept:", err);
        setError("Couldn't load concept information. Please try again later."); // More user-friendly error
        setConcept(null); // Clear concept on error
      });
  }, [topic]);

  if (error) {
    return (
      <div className="container py-5 bg-dark text-white rounded shadow-lg text-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!concept) {
    return (
      <div className="container py-5 bg-dark text-white rounded shadow-lg text-center">
        <p className="text-white fs-5">Loading concept information...</p>
      </div>
    );
  }

  return (
    <div className="container py-4 bg-dark text-white rounded shadow-lg">
      <h2 className="text-center mb-4 text-primary fs-2">{concept.name}</h2>

      <div className="card bg-dark-subtle text-dark-contrast p-4 mb-4 shadow-sm"> {/* Changed text-white to text-dark-contrast */}
        <p className="mb-2"><strong>Description:</strong> {concept.description}</p>
        <p className="mb-2"><strong>Spotlight Fact:</strong> {concept.spotlight_fact}</p>
        <p className="mb-0"><strong>Appears in Lecture:</strong> {concept.lecture}</p>
      </div>

      {concept.examples && concept.examples.length > 0 && (
        <div className="card bg-dark-subtle text-dark-contrast p-4 mb-4 shadow-sm"> {/* Changed text-white to text-dark-contrast */}
          <h5 className="card-title text-info mb-3">Examples:</h5>
          <ul className="list-group list-group-flush bg-dark-subtle">
            {concept.examples.map((ex, i) => (
              <li key={i} className="list-group-item bg-dark-subtle text-dark-contrast border-0 py-1"> {/* Changed text-white to text-dark-contrast */}
                {ex}
              </li>
            ))}
          </ul>
        </div>
      )}

      {concept.related_topics && concept.related_topics.length > 0 && (
        <div className="card bg-dark-subtle text-dark-contrast p-4 mb-4 shadow-sm"> {/* Changed text-white to text-dark-contrast */}
          <h5 className="card-title text-info mb-3">Related Topics:</h5>
          <ul className="list-group list-group-flush bg-dark-subtle">
            {concept.related_topics.map((related, i) => (
              <li key={i} className="list-group-item bg-dark-subtle text-dark-contrast border-0 py-1"> {/* Changed text-white to text-dark-contrast */}
                {related}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="card bg-dark-subtle text-dark-contrast p-4 shadow-sm"> {/* Changed text-white to text-dark-contrast */}
        <p className="mb-0">
          <strong>Quiz Available:</strong>{" "}
          <span className={concept.quiz_available ? "text-success fw-bold" : "text-danger fw-bold"}>
            {concept.quiz_available ? "Yes" : "No"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ExploreTopicPage;