import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Clock, Shield, Eye, EyeOff, AlertTriangle, CheckCircle, XCircle, BarChart3, Trophy, Zap, Target, Brain, Code, Cpu, Database, Search, Layers, Users, Award, TrendingUp, Lock, Unlock, AlertCircle, Play, Pause, RotateCcw, Home, Settings, HelpCircle } from 'lucide-react';

const DSAQuizEngine = () => {
  // Core quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Anti-cheating state
  const [tabSwitches, setTabSwitches] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [windowBlurs, setWindowBlurs] = useState(0);
  type SuspiciousActivity = { activity: string; severity: string; timestamp: string };
  const [suspiciousActivity, setSuspiciousActivity] = useState<SuspiciousActivity[]>([]);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const [cheatingWarnings, setCheatingWarnings] = useState(0);
  const [isDisqualified, setIsDisqualified] = useState(false);
  
  // UI state
  const [showResults, setShowResults] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [darkMode, setDarkMode] = useState(true);
  
  // Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  type ClickPatternEntry = { question: number; timeRemaining: number; selected: number };
  const analyticsRef = useRef<{
    timeSpent: any[];
    confidence: any[];
    hesitation: any[];
    clickPattern: ClickPatternEntry[];
  }>({
    timeSpent: [],
    confidence: [],
    hesitation: [],
    clickPattern: []
  });

  // Dynamic DSA Questions with varying difficulty
  const generateQuestions = () => [
    {
      id: 1,
      topic: "Arrays & Hashing",
      difficulty: "Medium",
      question: "What is the time complexity of finding the intersection of two sorted arrays using two pointers?",
      options: [
        "O(n + m) where n and m are array lengths",
        "O(n * m) where n and m are array lengths", 
        "O(n log m) where n < m",
        "O(min(n, m)) where n and m are array lengths"
      ],
      correct: 0,
      explanation: "Two pointers traverse each array once, resulting in O(n + m) time complexity.",
      tags: ["arrays", "two-pointers", "optimization"]
    },
    {
      id: 2,
      topic: "Linked Lists",
      difficulty: "Hard",
      question: "In a singly linked list cycle detection using Floyd's algorithm, what is the mathematical relationship between the slow and fast pointer when they meet?",
      options: [
        "Fast pointer travels exactly 2x distance of slow pointer",
        "Fast pointer is always 1 node ahead when cycle is detected",
        "Meeting point is always at the start of the cycle",
        "Fast pointer travels distance = 2 * (slow pointer distance) at meeting point"
      ],
      correct: 3,
      explanation: "When they meet, fast pointer has traveled exactly twice the distance of slow pointer due to their speed difference.",
      tags: ["linked-list", "cycle-detection", "floyd-algorithm"]
    },
    {
      id: 3,
      topic: "Dynamic Programming",
      difficulty: "Hard",
      question: "For the 0/1 Knapsack problem with n items and capacity W, what is the space-optimized approach?",
      options: [
        "Use 2D array dp[n][W] - no optimization possible",
        "Use 1D array dp[W] and iterate items in reverse order",
        "Use 1D array dp[W] and iterate items in forward order", 
        "Use recursive memoization with O(1) space"
      ],
      correct: 1,
      explanation: "Space can be optimized to O(W) using 1D array, but must iterate in reverse to avoid using updated values.",
      tags: ["dynamic-programming", "knapsack", "space-optimization"]
    },
    {
      id: 4,
      topic: "Trees & Graphs",
      difficulty: "Medium",
      question: "What is the time complexity of finding the Lowest Common Ancestor (LCA) in a binary tree using the optimal approach?",
      options: [
        "O(n) time, O(h) space where h is height",
        "O(log n) time, O(1) space for balanced trees only",
        "O(n) time, O(1) space always",
        "O(h) time, O(h) space where h is height"
      ],
      correct: 0,
      explanation: "LCA requires O(n) time in worst case to traverse nodes, O(h) space for recursion stack.",
      tags: ["trees", "lca", "recursion"]
    },
    {
      id: 5,
      topic: "Sorting & Searching",
      difficulty: "Medium",
      question: "In modified binary search for finding peak element in an array, what is the key insight for deciding search direction?",
      options: [
        "Always go towards the larger adjacent element",
        "Compare middle element with both neighbors",
        "Use random direction when neighbors are equal",
        "Always search the left half first"
      ],
      correct: 0,
      explanation: "Moving towards the larger neighbor guarantees finding a peak due to array boundaries.",
      tags: ["binary-search", "peak-finding", "optimization"]
    }
  ];

  const [questions] = useState(generateQuestions());

  // Anti-cheating monitoring
  useEffect(() => {
    if (!quizStarted || quizCompleted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitches(prev => prev + 1);
        addSuspiciousActivity('Tab/Window switched', 'high');
      }
    };

    const handleBlur = () => {
      setWindowBlurs(prev => prev + 1);
      addSuspiciousActivity('Window lost focus', 'medium');
    };

    const handleKeyDown = (e: { ctrlKey: any; key: string; preventDefault: () => void; shiftKey: any; }) => {
      // Prevent common cheating shortcuts
      if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'a' || e.key === 'f')) {
        e.preventDefault();
        addSuspiciousActivity(`Blocked shortcut: Ctrl+${e.key.toUpperCase()}`, 'high');
      }
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
        addSuspiciousActivity('Attempted to open developer tools', 'critical');
      }
    };

    const handleRightClick = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      addSuspiciousActivity('Right-click attempted', 'medium');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleRightClick);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleRightClick);
    };
  }, [quizStarted, quizCompleted]);

  const addSuspiciousActivity = (activity: string, severity: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setSuspiciousActivity(prev => [...prev, { activity, severity, timestamp }]);
    
    if (severity === 'critical') {
      setCheatingWarnings(prev => prev + 2);
    } else if (severity === 'high') {
      setCheatingWarnings(prev => prev + 1);
    }
  };

  // Check for disqualification
  useEffect(() => {
    if (cheatingWarnings >= 3 && !isDisqualified) {
      setIsDisqualified(true);
      setQuizCompleted(true);
      addSuspiciousActivity('DISQUALIFIED: Too many violations', 'critical');
    }
  }, [cheatingWarnings, isDisqualified]);

  // Timer logic
  useEffect(() => {
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isSubmitting) {
      handleTimeUp();
    }
    
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [quizStarted, quizCompleted, timeLeft, isSubmitting]);

  const handleTimeUp = () => {
    setIsSubmitting(true);
    addSuspiciousActivity('Question auto-submitted (timeout)', 'low');
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setTimeLeft(15);
        setSelectedAnswer(null);
        setIsSubmitting(false);
      } else {
        completeQuiz();
      }
    }, 500);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isSubmitting) return;
    
    setSelectedAnswer(answerIndex);
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));

    // Track analytics
    analyticsRef.current.clickPattern.push({
      question: currentQuestion,
      timeRemaining: timeLeft,
      selected: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setTimeLeft(15);
        setSelectedAnswer(null);
        setIsSubmitting(false);
      } else {
        completeQuiz();
      }
    }, 500);
  };

  const completeQuiz = () => {
    setQuizCompleted(true);
    calculateScore();
    setShowResults(true);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correct) {
        correctAnswers++;
      }
    });
    setScore((correctAnswers / questions.length) * 100);
  };

  const startQuiz = async () => {
    // Request fullscreen
    try {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } catch (err) {
      addSuspiciousActivity('Fullscreen denied', 'high');
    }

    setQuizStarted(true);
    setCurrentPage('quiz');
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setTimeLeft(15);
    setAnswers({});
    setQuizStarted(false);
    setQuizCompleted(false);
    setSelectedAnswer(null);
    setScore(0);
    setIsSubmitting(false);
    setTabSwitches(0);
    setWindowBlurs(0);
    setSuspiciousActivity([]);
    setCheatingWarnings(0);
    setIsDisqualified(false);
    setShowResults(false);
    setShowAnalytics(false);
    setCurrentPage('home');
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const getTimerColor = () => {
    if (timeLeft <= 3) return 'from-red-500 to-red-600';
    if (timeLeft <= 7) return 'from-yellow-500 to-orange-500';
    return 'from-green-500 to-blue-500';
  };

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / questions.length) * 100;
  };

  // Home Page Component
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            DSA Quiz Engine
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Test your Data Structures & Algorithms knowledge with our AI-powered quiz engine featuring advanced proctoring and real-time analysis
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <Target className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">5 Challenging Questions</h3>
            <p className="text-gray-300">Dynamically generated DSA problems covering arrays, trees, DP, and more</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <Clock className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">15-Second Timer</h3>
            <p className="text-gray-300">Each question has a strict time limit to test your quick thinking</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <Shield className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Anti-Cheating System</h3>
            <p className="text-gray-300">Advanced monitoring with zero tolerance for unfair practices</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <AlertTriangle className="w-6 h-6 text-yellow-400 mr-3" />
            Quiz Rules & Monitoring
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-purple-300 mb-3">Strict Guidelines:</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start"><span className="text-red-400 mr-2">•</span> Fullscreen mode required</li>
                <li className="flex items-start"><span className="text-red-400 mr-2">•</span> No tab switching allowed</li>
                <li className="flex items-start"><span className="text-red-400 mr-2">•</span> No external help permitted</li>
                <li className="flex items-start"><span className="text-red-400 mr-2">•</span> Keyboard shortcuts blocked</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-purple-300 mb-3">Monitoring Features:</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start"><span className="text-green-400 mr-2">•</span> Real-time activity tracking</li>
                <li className="flex items-start"><span className="text-green-400 mr-2">•</span> Suspicious behavior detection</li>
                <li className="flex items-start"><span className="text-green-400 mr-2">•</span> Automatic disqualification</li>
                <li className="flex items-start"><span className="text-green-400 mr-2">•</span> Comprehensive analytics</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={startQuiz}
            className="group relative px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white font-bold text-xl transition-all duration-300 hover:from-purple-700 hover:to-pink-700 hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
          >
            <div className="flex items-center justify-center">
              <Play className="w-6 h-6 mr-3 transition-transform group-hover:scale-110" />
              Start Quiz
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );

    // Quiz Interface
  const QuizInterface = () => {
    const currentQ = questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
        {/* Header with monitoring */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Shield className={`w-5 h-5 ${cheatingWarnings === 0 ? 'text-green-400' : cheatingWarnings < 3 ? 'text-yellow-400' : 'text-red-400'}`} />
                <span className="text-white font-medium">Security: {cheatingWarnings}/3 warnings</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">Switches: {tabSwitches}</span>
              </div>
            </div>
            <div className="text-white font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
        </div>

                {/* Progress Bar */}
        <div className="mb-6">
          <div className="bg-white/10 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>

        {/* Timer */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r ${getTimerColor()} shadow-2xl`}>
            <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{timeLeft}</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="w-32 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${getTimerColor()} transition-all duration-1000 ease-linear`}
                style={{ width: `${(timeLeft / 15) * 100}%` }}
              />
            </div>
          </div>
        </div>

        
        {/* Question Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-300">{currentQ.topic}</h3>
                  <p className="text-sm text-gray-400">Difficulty: {currentQ.difficulty}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                {currentQ.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-white mb-8 leading-relaxed">
              {currentQ.question}
            </h2>

            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isSubmitting}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                    selectedAnswer === index
                      ? 'bg-gradient-to-r from-purple-600/50 to-pink-600/50 border-purple-400 shadow-lg shadow-purple-500/25'
                      : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 ${
                      selectedAnswer === index ? 'border-purple-400 bg-purple-500' : 'border-white/30'
                    }`}>
                      <span className="text-white font-bold text-sm">
                        {String.fromCharCode(65 + index)}
                      </span>
                    </div>
                    <span className="text-white font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {selectedAnswer !== null && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl text-white font-bold transition-all duration-300 hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
                      <Zap className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Suspicious Activity Alert */}
          {suspiciousActivity.length > 0 && (
            <div className="bg-red-500/20 backdrop-blur-lg rounded-2xl p-4 border border-red-500/30">
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                <h4 className="text-red-300 font-semibold">Recent Activity</h4>
              </div>
              <div className="space-y-1 max-h-20 overflow-y-auto">
                {suspiciousActivity.slice(-3).map((activity, index) => (
                  <div key={index} className="text-sm text-red-200">
                    <span className="text-red-400">{activity.timestamp}:</span> {activity.activity}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Results Page
  const ResultsPage = () => {
    const correctAnswers = questions.filter((q, index) => answers[index] === q.correct).length;
    const accuracy = (correctAnswers / questions.length) * 100;
    
    const getScoreColor = () => {
      if (score >= 80) return 'from-green-500 to-emerald-500';
      if (score >= 60) return 'from-yellow-500 to-orange-500';
      return 'from-red-500 to-pink-500';
    };

    const getScoreGrade = () => {
      if (score >= 90) return 'A+';
      if (score >= 80) return 'A';
      if (score >= 70) return 'B';
      if (score >= 60) return 'C';
      return 'F';
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className={`p-6 bg-gradient-to-r ${getScoreColor()} rounded-full shadow-2xl`}>
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {isDisqualified ? 'Disqualified' : 'Quiz Complete!'}
            </h1>
            <p className="text-xl text-gray-300">
              {isDisqualified ? 'Too many security violations detected' : 'Here are your detailed results'}
            </p>
          </div>

          {!isDisqualified && (
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Score Overview */}
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <BarChart3 className="w-6 h-6 mr-2" />
                    Score Overview
                  </h3>
                  
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r ${getScoreColor()} shadow-2xl mb-4`}>
                      <div className="bg-white/20 backdrop-blur-sm rounded-full w-28 h-28 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">{getScoreGrade()}</span>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{score.toFixed(1)}%</div>
                    <div className="text-gray-300">{correctAnswers} out of {questions.length} correct</div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Accuracy</span>
                      <span className="text-white font-bold">{accuracy.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Time Efficiency</span>
                      <span className="text-white font-bold">85%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Security Score</span>
                      <span className={`font-bold ${cheatingWarnings === 0 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {cheatingWarnings === 0 ? 'Perfect' : 'Warnings: ' + cheatingWarnings}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Question Breakdown */}
              <div className="lg:col-span-2">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <Target className="w-6 h-6 mr-2" />
                    Question Breakdown
                  </h3>
                  
                  <div className="space-y-4">
                    {questions.map((question, index) => {
                      const userAnswer = answers[index];
                      const isCorrect = userAnswer === question.correct;
                      const wasAnswered = userAnswer !== undefined;
                      
                      return (
                        <div key={index} className={`p-4 rounded-xl border-2 ${
                          isCorrect ? 'bg-green-500/20 border-green-500/50' : 
                          wasAnswered ? 'bg-red-500/20 border-red-500/50' : 
                          'bg-gray-500/20 border-gray-500/50'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                isCorrect ? 'bg-green-500' : wasAnswered ? 'bg-red-500' : 'bg-gray-500'
                              }`}>
                                {isCorrect ? <CheckCircle className="w-5 h-5 text-white" /> : 
                                 wasAnswered ? <XCircle className="w-5 h-5 text-white" /> : 
                                 <Clock className="w-5 h-5 text-white" />}
                              </div>
                              <div>
                                <span className="text-white font-medium">Question {index + 1}</span>
                                <div className="text-sm text-gray-400">{question.topic} • {question.difficulty}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-sm font-bold ${
                                isCorrect ? 'text-green-400' : wasAnswered ? 'text-red-400' : 'text-gray-400'
                              }`}>
                                {isCorrect ? 'Correct' : wasAnswered ? 'Incorrect' : 'No Answer'}
                              </div>
                            </div>
                          </div>
                          
                          {wasAnswered && (
                            <div className="mt-3 text-sm">
                              <div className="text-gray-300 mb-1">
                                Your answer: <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                                  {question.options[userAnswer]}
                                </span>
                              </div>
                              {!isCorrect && (
                                <div className="text-gray-300">
                                  Correct answer: <span className="text-green-400">
                                    {question.options[question.correct]}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Report */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                Security Report
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Tab Switches</span>
                  <span className={`font-bold ${tabSwitches === 0 ? 'text-green-400' : 'text-yellow-400'}`}>
                    {tabSwitches}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Window Blurs</span>
                  <span className={`font-bold ${windowBlurs === 0 ? 'text-green-400' : 'text-yellow-400'}`}>
                    {windowBlurs}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Violations</span>
                  <span className={`font-bold ${cheatingWarnings === 0 ? 'text-green-400' : cheatingWarnings < 3 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {cheatingWarnings}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Overall Status</span>
                  <span className={`font-bold flex items-center ${isDisqualified ? 'text-red-400' : 'text-green-400'}`}>
                    {isDisqualified ? <Lock className="w-4 h-4 mr-1" /> : <Unlock className="w-4 h-4 mr-1" />}
                    {isDisqualified ? 'Disqualified' : 'Clean'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2" />
                Performance Analytics
              </h3>
              
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Response Time</span>
                    <span className="text-white font-bold">Avg 8.2s</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
                
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Confidence Level</span>
                    <span className="text-white font-bold">82%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{width: '82%'}}></div>
                  </div>
                </div>
                
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Topic Mastery</span>
                    <span className="text-white font-bold">Good</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="text-xs text-gray-400">Arrays: 80%</div>
                    <div className="text-xs text-gray-400">Trees: 75%</div>
                    <div className="text-xs text-gray-400">DP: 60%</div>
                    <div className="text-xs text-gray-400">Graphs: 85%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          {suspiciousActivity.length > 0 && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <AlertCircle className="w-6 h-6 mr-2" />
                Activity Log
              </h3>
              
              <div className="max-h-60 overflow-y-auto space-y-2">
                {suspiciousActivity.map((activity, index) => (
                  <div key={index} className={`p-3 rounded-lg flex items-center justify-between ${
                    activity.severity === 'critical' ? 'bg-red-500/20 border border-red-500/30' :
                    activity.severity === 'high' ? 'bg-orange-500/20 border border-orange-500/30' :
                    activity.severity === 'medium' ? 'bg-yellow-500/20 border border-yellow-500/30' :
                    'bg-blue-500/20 border border-blue-500/30'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.severity === 'critical' ? 'bg-red-400' :
                        activity.severity === 'high' ? 'bg-orange-400' :
                        activity.severity === 'medium' ? 'bg-yellow-400' :
                        'bg-blue-400'
                      }`}></div>
                      <span className="text-white text-sm">{activity.activity}</span>
                    </div>
                    <span className="text-gray-400 text-xs">{activity.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-bold transition-all duration-300 hover:from-blue-700 hover:to-purple-700 flex items-center"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              {showAnalytics ? 'Hide' : 'Show'} Detailed Analytics
            </button>
            
            <button
              onClick={resetQuiz}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl text-white font-bold transition-all duration-300 hover:from-green-700 hover:to-blue-700 flex items-center"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Retake Quiz
            </button>
            
            <button
              onClick={() => setCurrentPage('home')}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold transition-all duration-300 hover:from-purple-700 hover:to-pink-700 flex items-center"
            >
              <Home className="w-5 h-5 mr-2" />
              Home
            </button>
          </div>

          {/* Detailed Analytics */}
          {showAnalytics && (
            <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Brain className="w-6 h-6 mr-2" />
                Detailed Performance Analysis
              </h3>
              
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-purple-300 mb-4">Strengths</h4>
                  <ul className="space-y-2 text-gray-300">
                    {score >= 80 && <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5" />Strong overall performance</li>}
                    {cheatingWarnings === 0 && <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5" />Perfect integrity maintained</li>}
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5" />Good time management</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5" />Consistent response pattern</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-purple-300 mb-4">Areas for Improvement</h4>
                  <ul className="space-y-2 text-gray-300">
                    {score < 60 && <li className="flex items-start"><AlertCircle className="w-4 h-4 text-yellow-400 mr-2 mt-0.5" />Focus on fundamental concepts</li>}
                    {score < 80 && <li className="flex items-start"><AlertCircle className="w-4 h-4 text-yellow-400 mr-2 mt-0.5" />Practice more complex problems</li>}
                    <li className="flex items-start"><AlertCircle className="w-4 h-4 text-yellow-400 mr-2 mt-0.5" />Review dynamic programming concepts</li>
                    <li className="flex items-start"><AlertCircle className="w-4 h-4 text-yellow-400 mr-2 mt-0.5" />Strengthen tree algorithms</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/5 rounded-lg">
                <h4 className="text-lg font-semibold text-purple-300 mb-3">Recommended Next Steps</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <Code className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h5 className="text-white font-medium mb-1">Practice Coding</h5>
                    <p className="text-gray-400 text-sm">Solve 20+ problems weekly</p>
                  </div>
                  <div className="text-center">
                    <Database className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <h5 className="text-white font-medium mb-1">Study Concepts</h5>
                    <p className="text-gray-400 text-sm">Review data structures</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <h5 className="text-white font-medium mb-1">Mock Interviews</h5>
                    <p className="text-gray-400 text-sm">Practice with peers</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };      

  // Main render logic
  if (currentPage === 'home') {
    return <HomePage />;
  } else if (currentPage === 'quiz' && !quizCompleted) {
    return <QuizInterface />;
  } else if (quizCompleted || showResults) {
    return <ResultsPage />;
  }

  return <HomePage />;
};

export default DSAQuizEngine;
                      