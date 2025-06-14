/* AUTHOR - SHREYAS MENE (CREATED ON 11/06/2025) */
import React from 'react';
import { useState } from 'react';
import { ThemeProvider } from './utils/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import './App.css'
import Chatbot from './components/Chatbot'
import TopicSelector from './components/TopicSelector'
import AssessmentDisplay from './components/AssessmentDisplay'

interface Topic {
  id: number;
  name: string;
  category: string;
}

function App() {
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
  const [shouldGenerateAssessment, setShouldGenerateAssessment] = useState(false);

  const handleTopicSelect = (topics: Topic[]) => {
    setSelectedTopics(topics);
    setShouldGenerateAssessment(false); // Reset assessment when topics change
  };

  const handleGenerateAssessment = (topics: Topic[]) => {
    setShouldGenerateAssessment(true);
  };

  const handleAssessmentGenerated = () => {
    setShouldGenerateAssessment(false);
  };

  return (
    <ThemeProvider>
      <div className="App">
        <ThemeToggle />
        <div className="app-container">
          <header>
            <h1>
              <img 
                src="/graduation-cap.svg" 
                alt="EduAssess Logo" 
                className="header-icon"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/vite.svg'; // Fallback to vite logo if graduation cap fails to load
                }}
              />
              EduAssess
            </h1>
          </header>
          
          <main>
            <div className="content-container">
              <TopicSelector 
                onTopicSelect={handleTopicSelect}
                onGenerateAssessment={handleGenerateAssessment}
              />
              <AssessmentDisplay 
                selectedTopics={selectedTopics}
                shouldGenerateAssessment={shouldGenerateAssessment}
                onAssessmentGenerated={handleAssessmentGenerated}
              />
            </div>
          </main>

          <Chatbot />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
