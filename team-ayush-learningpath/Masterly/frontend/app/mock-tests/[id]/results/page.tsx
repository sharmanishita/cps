"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, X, Clock, Trophy, BarChart3, ArrowLeft, Download, Share } from "lucide-react"
import { useParams } from "next/navigation"
import Link from "next/link"

interface Question {
  id: number
  type: "mcq" | "coding"
  question: string
  options?: string[]
  correct?: number
  explanation?: string
  difficulty: "Easy" | "Medium" | "Hard"
  topic: string
  points: number
  userAnswer?: number | string
  isCorrect?: boolean
}

interface TestResult {
  id: number
  title: string
  description: string
  duration: number // in seconds
  timeTaken: number // in seconds
  score: number
  passingScore: number
  questions: Question[]
  date: string
  percentile: number
}

export default function MockTestResults() {
  const params = useParams()
  const testId = params.id as string

  const [result] = useState<TestResult>({
    id: Number.parseInt(testId),
    title: "Data Structures & Algorithms - Complete Assessment",
    description: "Comprehensive test covering arrays, linked lists, trees, graphs, and dynamic programming",
    duration: 5400, // 90 minutes
    timeTaken: 4250, // 70 minutes and 50 seconds
    score: 78,
    passingScore: 70,
    date: "June 17, 2025",
    percentile: 82,
    questions: [
      {
        id: 1,
        type: "mcq",
        question: "What is the time complexity of inserting an element at the beginning of an array?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correct: 2,
        explanation:
          "Inserting at the beginning requires shifting all existing elements one position to the right, which takes O(n) time.",
        difficulty: "Easy",
        topic: "Arrays",
        points: 5,
        userAnswer: 2,
        isCorrect: true,
      },
      {
        id: 2,
        type: "coding",
        question: "Implement a function to reverse a linked list iteratively.",
        difficulty: "Medium",
        topic: "Linked Lists",
        points: 15,
        userAnswer:
          "def reverseList(head):\n    prev = None\n    current = head\n    while current:\n        next_temp = current.next\n        current.next = prev\n        prev = current\n        current = next_temp\n    return prev",
        isCorrect: true,
      },
      {
        id: 3,
        type: "mcq",
        question: "Which data structure is best suited for implementing a function call stack?",
        options: ["Queue", "Stack", "Heap", "Hash Table"],
        correct: 1,
        explanation:
          "A stack follows LIFO (Last In, First Out) principle, which matches how function calls are managed - the most recent call is the first to return.",
        difficulty: "Easy",
        topic: "Stacks",
        points: 5,
        userAnswer: 1,
        isCorrect: true,
      },
      {
        id: 4,
        type: "coding",
        question: "Find the maximum depth of a binary tree.",
        difficulty: "Easy",
        topic: "Trees",
        points: 10,
        userAnswer:
          "def maxDepth(root):\n    if not root:\n        return 0\n    return max(maxDepth(root.left), maxDepth(root.right)) + 1",
        isCorrect: true,
      },
      {
        id: 5,
        type: "mcq",
        question: "What is the worst-case time complexity of QuickSort?",
        options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
        correct: 1,
        explanation:
          "QuickSort's worst case occurs when the pivot is always the smallest or largest element, leading to O(n²) time complexity.",
        difficulty: "Medium",
        topic: "Sorting",
        points: 8,
        userAnswer: 0,
        isCorrect: false,
      },
    ],
  })

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}h ${mins}m ${secs}s`
    }
    return `${mins}m ${secs}s`
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

  const correctAnswers = result.questions.filter((q) => q.isCorrect).length
  const totalQuestions = result.questions.length
  const mcqQuestions = result.questions.filter((q) => q.type === "mcq").length
  const codingQuestions = result.questions.filter((q) => q.type === "coding").length
  const mcqCorrect = result.questions.filter((q) => q.type === "mcq" && q.isCorrect).length
  const codingCorrect = result.questions.filter((q) => q.type === "coding" && q.isCorrect).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Test Results</h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/mock-tests">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Tests
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{result.title}</p>

          {/* Result Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900 dark:text-white">Score</span>
              </div>
              <div className="text-2xl font-bold text-blue-600 mt-1">{result.score}%</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Passing: {result.passingScore}%</div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900 dark:text-white">Correct</span>
              </div>
              <div className="text-2xl font-bold text-green-600 mt-1">
                {correctAnswers}/{totalQuestions}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">
                {Math.round((correctAnswers / totalQuestions) * 100)}% accuracy
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-gray-900 dark:text-white">Time Taken</span>
              </div>
              <div className="text-2xl font-bold text-purple-600 mt-1">{formatTime(result.timeTaken)}</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">of {formatTime(result.duration)}</div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-gray-900 dark:text-white">Percentile</span>
              </div>
              <div className="text-2xl font-bold text-orange-600 mt-1">{result.percentile}%</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">
                Better than {result.percentile}% of test takers
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Performance Analysis */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Performance Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-300">MCQ Questions</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {mcqCorrect}/{mcqQuestions}
                    </span>
                  </div>
                  <Progress value={(mcqCorrect / mcqQuestions) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-300">Coding Questions</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {codingCorrect}/{codingQuestions}
                    </span>
                  </div>
                  <Progress value={(codingCorrect / codingQuestions) * 100} className="h-2" />
                </div>

                <div className="pt-4 border-t dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Topic Performance</h4>

                  {["Arrays", "Linked Lists", "Stacks", "Trees", "Sorting"].map((topic) => {
                    const topicQuestions = result.questions.filter((q) => q.topic === topic)
                    const topicCorrect = topicQuestions.filter((q) => q.isCorrect).length
                    const percentage =
                      topicQuestions.length > 0 ? Math.round((topicCorrect / topicQuestions.length) * 100) : 0

                    return (
                      <div key={topic} className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-300">{topic}</span>
                          <span className="font-medium text-gray-900 dark:text-white">{percentage}%</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
                </div>

                <div className="pt-4 border-t dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Difficulty Breakdown</h4>

                  {["Easy", "Medium", "Hard"].map((difficulty) => {
                    const diffQuestions = result.questions.filter((q) => q.difficulty === difficulty)
                    const diffCorrect = diffQuestions.filter((q) => q.isCorrect).length
                    const percentage =
                      diffQuestions.length > 0 ? Math.round((diffCorrect / diffQuestions.length) * 100) : 0

                    return (
                      <div key={difficulty} className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <div className="flex items-center space-x-2">
                            <Badge className={getDifficultyColor(difficulty)}>{difficulty}</Badge>
                            <span className="text-gray-600 dark:text-gray-300">({diffQuestions.length} questions)</span>
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">{percentage}%</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="font-medium text-blue-900 dark:text-blue-300 mb-1">Focus Areas</div>
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    Based on your performance, we recommend focusing on Sorting algorithms.
                  </div>
                </div>

                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="font-medium text-green-900 dark:text-green-300 mb-1">Strengths</div>
                  <div className="text-sm text-green-800 dark:text-green-200">
                    You performed well in Linked Lists and Trees. Keep up the good work!
                  </div>
                </div>

                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="font-medium text-purple-900 dark:text-purple-300 mb-1">Next Steps</div>
                  <div className="text-sm text-purple-800 dark:text-purple-200">
                    Try our Advanced Algorithms mock test to further challenge yourself.
                  </div>
                </div>

                <div className="flex justify-center pt-2">
                  <Button asChild>
                    <Link href="/learning-paths/custom">Create Custom Learning Path</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Review */}
          <div className="lg:col-span-2">
            <Card className="dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Question Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {result.questions.map((question, index) => (
                  <div key={question.id} className="border dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-gray-900 dark:text-white">Question {index + 1}</span>
                          <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                          <Badge variant="outline">{question.topic}</Badge>
                          <Badge variant="outline" className="capitalize">
                            {question.type}
                          </Badge>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">{question.question}</p>
                      </div>
                      <div className="ml-4">
                        {question.isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <X className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                    </div>

                    {question.type === "mcq" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                        {question.options?.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded border text-sm ${
                              optionIndex === question.correct
                                ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300"
                                : optionIndex === question.userAnswer && !question.isCorrect
                                  ? "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300"
                                  : "bg-gray-50 border-gray-200 dark:bg-gray-700/50 dark:border-gray-600"
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{String.fromCharCode(65 + optionIndex)}.</span>
                              <span>{option}</span>
                              {optionIndex === question.correct && (
                                <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                              )}
                              {optionIndex === question.userAnswer && !question.isCorrect && (
                                <X className="w-4 h-4 text-red-600 ml-auto" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {question.type === "coding" && (
                      <div className="mb-3">
                        <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-2">
                          <div className="font-medium text-gray-900 dark:text-white mb-1">Your Solution:</div>
                          <pre className="text-xs text-gray-800 dark:text-gray-200 overflow-x-auto p-2 bg-gray-100 dark:bg-gray-800 rounded">
                            {question.userAnswer as string}
                          </pre>
                        </div>
                        <div className="flex items-center space-x-2">
                          {question.isCorrect ? (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                              All Test Cases Passed
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
                              Some Test Cases Failed
                            </Badge>
                          )}
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/coding-platform?problem=${question.id}&source=review&testId=${result.id}`}>
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    )}

                    {question.explanation && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="font-medium text-blue-900 dark:text-blue-300 mb-1">Explanation:</div>
                        <div className="text-sm text-blue-800 dark:text-blue-200">{question.explanation}</div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-4">
          <Button variant="outline" size="lg" asChild>
            <Link href={`/mock-tests/${result.id}/start`}>Retake Test</Link>
          </Button>
          <Button size="lg" asChild>
            <Link href="/mock-tests">Browse More Tests</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
