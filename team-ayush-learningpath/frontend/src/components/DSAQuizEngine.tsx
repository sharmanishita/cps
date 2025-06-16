// File: src/components/DSAQuizEngine.tsx

import React, { useEffect, useState, useRef } from "react";
// import HomePage from "./HomePage";
// import QuizInterface from "./QuizInterface";
// import ResultsPage from "./ResultsPage";
// import { generateQuestions } from "../data/dsaQuestions";

const DSAQuizEngine = () => {
//   const [questions] = useState(generateQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [progress, setProgress] = useState(0);
  const [cheatingWarnings, setCheatingWarnings] = useState(0);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [windowBlurs, setWindowBlurs] = useState(0);
  const [isDisqualified, setIsDisqualified] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!quizStarted || quizFinished) return;
    timerRef.current = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [quizStarted, quizFinished, currentIndex]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && quizStarted && !quizFinished) {
        setTabSwitches((prev) => prev + 1);
        setCheatingWarnings((prev) => prev + 1);
      }
    };
    const handleBlur = () => {
      if (quizStarted && !quizFinished) {
        setWindowBlurs((prev) => prev + 1);
        setCheatingWarnings((prev) => prev + 1);
      }
    };
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [quizStarted, quizFinished]);

  useEffect(() => {
    if (cheatingWarnings >= 3) setIsDisqualified(true);
  }, [cheatingWarnings]);

//   useEffect(() => {
//     setProgress(((currentIndex + 1) / questions.length) * 100);
//   }, [currentIndex, questions.length]);

  useEffect(() => {
    if (timeLeft === 0) handleNext();
  }, [timeLeft]);

  const handleAnswer = (index: number) => setSelectedAnswer(index);

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const updatedAnswers = { ...answers, [currentIndex]: selectedAnswer };
      setAnswers(updatedAnswers);
    //   if (selectedAnswer === questions[currentIndex].correct) setScore((prev) => prev + 1);
    }
    setSelectedAnswer(null);
    // if (currentIndex < questions.length - 1) {
    //   setCurrentIndex((prev) => prev + 1);
    //   setTimeLeft(15);
    // } else {
    //   setQuizFinished(true);
    // }
  };

  const startQuiz = () => setQuizStarted(true);
  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswers({});
    setQuizStarted(false);
    setQuizFinished(false);
    setTimeLeft(15);
    setProgress(0);
    setCheatingWarnings(0);
    setTabSwitches(0);
    setWindowBlurs(0);
    setIsDisqualified(false);
  };

// //   if (!quizStarted) return <HomePage startQuiz={startQuiz} />;
//   if (quizFinished) {
//     return (
//       <ResultsPage
//         score={score}
//         total={questions.length}
//         answers={answers}
//         questions={questions}
//         cheatingWarnings={cheatingWarnings}
//         tabSwitches={tabSwitches}
//         windowBlurs={windowBlurs}
//         isDisqualified={isDisqualified}
//         resetQuiz={resetQuiz}
//       />
//     );
//   }
//   return (
//     <QuizInterface
//       question={questions[currentIndex]}
//       currentIndex={currentIndex}
//       totalQuestions={questions.length}
//       selectedAnswer={selectedAnswer}
//       onAnswer={handleAnswer}
//       onNext={handleNext}
//       timeLeft={timeLeft}
//       progress={progress}
//       cheatingWarnings={cheatingWarnings}
//       tabSwitches={tabSwitches}
//       windowBlurs={windowBlurs}
//     />
//   );
};

export default DSAQuizEngine;
