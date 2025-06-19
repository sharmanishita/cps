"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, X, Clock, Trophy, RotateCcw, ArrowRight } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
}

interface Quiz {
  id: number
  title: string
  timeLimit: number // in seconds
  questions: Question[]
  completed: boolean
  score?: number
  totalQuestions: number
}

interface QuizPlatformProps {
  quiz: Quiz
}

export function QuizPlatform({ quiz }: QuizPlatformProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit)
  const [isActive, setIsActive] = useState(false)
  const [showResults, setShowResults] = useState(quiz.completed)
  const [quizStarted, setQuizStarted] = useState(quiz.completed)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0 && !showResults) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => {
          if (timeLeft <= 1) {
            setIsActive(false)
            setShowResults(true)
            return 0
          }
          return timeLeft - 1
        })
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
      setShowResults(true)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, showResults])

  const startQuiz = () => {
    setQuizStarted(true)
    setIsActive(true)
    setTimeLeft(quiz.timeLimit)
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResults(false)
  }

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      finishQuiz()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const finishQuiz = () => {
    setIsActive(false)
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correct++
      }
    })
    return correct
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  if (!quizStarted) {
    return (
      <Card className="dark:bg-gray-800/80 dark:border-gray-700 max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-gray-900 dark:text-white mb-4">{quiz.title}</CardTitle>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-6 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{Math.floor(quiz.timeLimit / 60)} minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>{quiz.questions.length} questions</span>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quiz Instructions:</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 text-left">
                <li>
                  • You have {Math.floor(quiz.timeLimit / 60)} minutes to complete {quiz.questions.length} questions
                </li>
                <li>• Each question has only one correct answer</li>
                <li>• You can navigate between questions using the Next/Previous buttons</li>
                <li>• Your progress will be saved automatically</li>
                <li>• Click "Finish Quiz" when you're done or time runs out</li>
              </ul>
            </div>
          </div>
        </CardHeader>

        <CardContent className="text-center">
          <Button onClick={startQuiz} size="lg" className="px-8">
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (showResults) {
    const score = quiz.completed ? quiz.score! : calculateScore()
    const total = quiz.questions.length
    const percentage = Math.round((score / total) * 100)

    return (
      <Card className="dark:bg-gray-800/80 dark:border-gray-700 max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-gray-900 dark:text-white mb-4">Quiz Results</CardTitle>

          <div className="space-y-4">
            <div className={`text-6xl font-bold ${getScoreColor(score, total)}`}>
              {score}/{total}
            </div>

            <div className="text-xl text-gray-600 dark:text-gray-300">You scored {percentage}%</div>

            <div className="flex items-center justify-center space-x-6">
              <Badge
                className={`${percentage >= 80 ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : percentage >= 60 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"}`}
              >
                {percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Good Job!" : "Keep Practicing!"}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Question Review:</h3>

            {quiz.questions.map((question, index) => {
              const userAnswer = selectedAnswers[index]
              const isCorrect = userAnswer === question.correct

              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-lg border ${
                    isCorrect
                      ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                      : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    ) : (
                      <X className="w-5 h-5 text-red-600 mt-1" />
                    )}

                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {index + 1}. {question.question}
                      </h4>

                      <div className="space-y-1 text-sm">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded ${
                              optionIndex === question.correct
                                ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
                                : optionIndex === userAnswer && userAnswer !== question.correct
                                  ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200"
                                  : "text-gray-600 dark:text-gray-300"
                            }`}
                          >
                            {optionIndex === question.correct && "✓ "}
                            {optionIndex === userAnswer && userAnswer !== question.correct && "✗ "}
                            {option}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center mt-6">
            <Button onClick={startQuiz} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentQ = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  return (
    <Card className="dark:bg-gray-800/80 dark:border-gray-700 max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-gray-900 dark:text-white">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </CardTitle>

          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                timeLeft <= 60
                  ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        <Progress value={progress} className="h-2" />
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{currentQ.question}</h2>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => selectAnswer(index)}
                className={`w-full p-4 text-left rounded-lg border transition-colors ${
                  selectedAnswers[currentQuestion] === index
                    ? "bg-blue-50 border-blue-300 text-blue-900 dark:bg-blue-900/20 dark:border-blue-600 dark:text-blue-300"
                    : "bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-700/50 dark:border-gray-600 dark:hover:bg-gray-600/50 text-gray-900 dark:text-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      selectedAnswers[currentQuestion] === index
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300 dark:border-gray-500"
                    }`}
                  >
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
          <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
            Previous
          </Button>

          <div className="text-sm text-muted-foreground">
            {selectedAnswers.filter((answer) => answer !== undefined).length} of {quiz.questions.length} answered
          </div>

          <div className="flex items-center space-x-2">
            {currentQuestion === quiz.questions.length - 1 ? (
              <Button onClick={finishQuiz}>Finish Quiz</Button>
            ) : (
              <Button onClick={nextQuestion} disabled={selectedAnswers[currentQuestion] === undefined}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
