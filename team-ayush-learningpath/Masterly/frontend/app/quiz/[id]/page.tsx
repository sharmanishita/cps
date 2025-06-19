"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Clock, CheckCircle, XCircle, Trophy, Target, ArrowRight, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: "Easy" | "Medium" | "Hard"
  topic: string
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "What is the time complexity of searching in a balanced binary search tree?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 1,
    explanation: "In a balanced BST, the height is log n, so search operations take O(log n) time.",
    difficulty: "Medium",
    topic: "Data Structures",
  },
  {
    id: 2,
    question: "Which sorting algorithm has the best average-case time complexity?",
    options: ["Bubble Sort", "Quick Sort", "Insertion Sort", "Selection Sort"],
    correctAnswer: 1,
    explanation:
      "Quick Sort has an average-case time complexity of O(n log n), which is optimal for comparison-based sorting.",
    difficulty: "Medium",
    topic: "Algorithms",
  },
  {
    id: 3,
    question: "What data structure is used to implement recursion?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: 1,
    explanation: "Recursion uses the call stack to keep track of function calls and their local variables.",
    difficulty: "Easy",
    topic: "Data Structures",
  },
  {
    id: 4,
    question: "Which of the following is NOT a stable sorting algorithm?",
    options: ["Merge Sort", "Quick Sort", "Insertion Sort", "Bubble Sort"],
    correctAnswer: 1,
    explanation:
      "Quick Sort is not stable because it can change the relative order of equal elements during partitioning.",
    difficulty: "Hard",
    topic: "Algorithms",
  },
  {
    id: 5,
    question: "What is the space complexity of the merge sort algorithm?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Merge Sort requires O(n) additional space for the temporary arrays used during merging.",
    difficulty: "Medium",
    topic: "Algorithms",
  },
]

export default function QuizPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(sampleQuestions.length).fill(-1))
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleSubmitQuiz()
    }
  }, [timeLeft, quizCompleted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitQuiz = () => {
    setQuizCompleted(true)
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    selectedAnswers.forEach((answer, index) => {
      if (answer === sampleQuestions[index].correctAnswer) {
        correct++
      }
    })
    return {
      correct,
      total: sampleQuestions.length,
      percentage: Math.round((correct / sampleQuestions.length) * 100),
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
      case "Hard":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  if (showResults) {
    const score = calculateScore()
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6 dark:bg-gray-800/80 dark:border-gray-700">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl text-gray-900 dark:text-white">Quiz Completed!</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">Here are your results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{score.percentage}%</div>
                  <div className="text-gray-600 dark:text-gray-300">Overall Score</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400">{score.correct}</div>
                  <div className="text-gray-600 dark:text-gray-300">Correct Answers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                    {formatTime(1800 - timeLeft)}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">Time Taken</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Question Review</h3>
                {sampleQuestions.map((question, index) => {
                  const isCorrect = selectedAnswers[index] === question.correctAnswer
                  const wasAnswered = selectedAnswers[index] !== -1

                  return (
                    <Card
                      key={question.id}
                      className={`border-l-4 dark:bg-gray-800/80 dark:border-gray-700 ${isCorrect ? "border-l-green-500" : wasAnswered ? "border-l-red-500" : "border-l-gray-300"}`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                          <div className="flex items-center space-x-2">
                            {isCorrect ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : wasAnswered ? (
                              <XCircle className="w-5 h-5 text-red-500" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                            )}
                          </div>
                        </div>
                        <CardTitle className="text-lg text-gray-900 dark:text-white">{question.question}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg border ${
                                optionIndex === question.correctAnswer
                                  ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                                  : optionIndex === selectedAnswers[index] &&
                                      selectedAnswers[index] !== question.correctAnswer
                                    ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                                    : "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                <div
                                  className={`w-4 h-4 rounded-full border-2 ${
                                    optionIndex === question.correctAnswer
                                      ? "bg-green-500 border-green-500"
                                      : optionIndex === selectedAnswers[index] &&
                                          selectedAnswers[index] !== question.correctAnswer
                                        ? "bg-red-500 border-red-500"
                                        : "border-gray-300"
                                  }`}
                                />
                                <span className="text-gray-900 dark:text-white">{option}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                          <p className="text-sm text-gray-900 dark:text-white">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <div className="flex justify-center space-x-4 mt-8">
                <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
                <Button variant="outline" onClick={() => router.push("/mock-tests")}>
                  More Tests
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const currentQ = sampleQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-6 dark:bg-gray-800/80 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-gray-900 dark:text-white">Data Structures Quiz</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Question {currentQuestion + 1} of {sampleQuestions.length}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-orange-600 dark:text-orange-400">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                </div>
                <Badge className={getDifficultyColor(currentQ.difficulty)}>{currentQ.difficulty}</Badge>
              </div>
            </div>
            <Progress value={progress} className="mt-4" />
          </CardHeader>
        </Card>

        {/* Question */}
        <Card className="mb-6 dark:bg-gray-800/80 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline">{currentQ.topic}</Badge>
              <span className="text-sm text-muted-foreground">Question {currentQuestion + 1}</span>
            </div>
            <CardTitle className="text-xl leading-relaxed text-gray-900 dark:text-white">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString()}
              onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
            >
              {currentQ.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-accent transition-colors dark:bg-gray-800/80 dark:border-gray-700"
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-gray-900 dark:text-white">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex space-x-2">
            {sampleQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  index === currentQuestion
                    ? "bg-blue-500 text-white"
                    : selectedAnswers[index] !== -1
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion === sampleQuestions.length - 1 ? (
            <Button onClick={handleSubmitQuiz} className="bg-green-600 hover:bg-green-700">
              <Target className="w-4 h-4 mr-2" />
              Submit Quiz
            </Button>
          ) : (
            <Button onClick={handleNextQuestion}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
