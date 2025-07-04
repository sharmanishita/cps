// client/src/components/LearnedConceptCard.tsx
import React from 'react';
import { BookOpen, Code, FlaskConical, Calculator, BrainCircuit, Lightbulb, GraduationCap } from 'lucide-react';

interface LearnedConceptCardProps {
  title: string;
  quizScores?: { score: number; date: string }[];
}

// A simple map for topic-to-icon. Expand this as needed.
const topicIcons: { [key: string]: React.ElementType } = {
  'Python Basics': Code,
  'Data Structures': BrainCircuit,
  'Algorithms': Lightbulb,
  'Calculus': Calculator,
  'Chemistry': FlaskConical,
  'Physics': GraduationCap,
  // Add more mappings for your validTopics
};

const LearnedConceptCard = ({ title, quizScores }: LearnedConceptCardProps) => {
  const IconComponent = topicIcons[title] || BookOpen;

  return (
    <div
      className="card text-center bg-secondary-subtle text-white h-100 shadow-sm border border-primary learned-concept-card"
    >
      <div className="card-body d-flex flex-column justify-content-center align-items-center">
        <div className="icon-wrapper mb-3" style={{ fontSize: '3rem', color: '#a872e6' }}>
          <IconComponent size={48} />
        </div>
        <h4 className="card-title text-info mb-2">{title}</h4>
        <p className="card-text text-dark">Status: <i className="fas fa-check-circle text-success me-1"></i> Completed</p>
        {/* This div ensures consistent height regardless of quizScores presence */}
        {/* It reserves space for the 'Last Score' line, even if empty */}
        <div className="quiz-score-placeholder mt-2" style={{ minHeight: '1.5em' }}> {/* Adjust minHeight if content needs more space */}
            {quizScores && quizScores.length > 0 && (
                <p className="card-text text-dark-emphasis mb-0">
                    Last Score: **{quizScores[quizScores.length - 1].score.toFixed(0)}%**
                </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default LearnedConceptCard;