"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Code, BookOpen, Play, ArrowLeft, AlertTriangle } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
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
  starterCode?: string
  testCases?: { input: string; output: string }[]
}

interface MockTest {
  id: number
  title: string
  description: string
  duration: number // in seconds
  questions: Question[]
  passingScore: number
}

export default function MockTestStart() {
  const params = useParams()
  const router = useRouter()
  const testId = params.id as string

  const [mockTest] = useState<MockTest>({
    id: Number.parseInt(testId),
    title: "Data Structures & Algorithms - Complete Assessment",
    description: "Comprehensive test covering arrays, linked lists, trees, graphs, and dynamic programming",
    duration: 5400, // 90 minutes
    passingScore: 70,
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
      },
      {
        id: 2,
        type: "coding",
        question: "Implement a function to reverse a linked list iteratively.",
        difficulty: "Medium",
        topic: "Linked Lists",
        points: 15,
        starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseList(head):
    """
    :type head: ListNode
    :rtype: ListNode
    """
    # Write your solution here
    pass`,
        testCases: [
          { input: "[1,2,3,4,5]", output: "[5,4,3,2,1]" },
          { input: "[1,2]", output: "[2,1]" },
          { input: "[]", output: "[]" },
        ],
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
      },
      {
        id: 4,
        type: "coding",
        question: "Find the maximum depth of a binary tree.",
        difficulty: "Easy",
        topic: "Trees",
        points: 10,
        starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def maxDepth(root):
    """
    :type root: TreeNode
    :rtype: int
    """
    # Write your solution here
    pass`,
        testCases: [
          { input: "[3,9,20,null,null,15,7]", output: "3" },
          { input: "[1,null,2]", output: "2" },
          { input: "[]", output: "0" },
        ],
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
      },
    ],
  })

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: any }>({})
  const [timeLeft, setTimeLeft] = useState(mockTest.duration)
  const [testStarted, setTestStarted] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  // Add this function to check if coding questions are submitted
  const isCodingQuestionSubmitted = (questionId: number) => {
    const submissionKey = `problem_${questionId}_mock-test`
    return localStorage.getItem(submissionKey) !== null
  }

  // Timer effect
  useEffect(() => {
    if (testStarted && !testCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmitTest()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [testStarted, testCompleted, timeLeft])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startTest = () => {
    setTestStarted(true)
  }

  const handleMCQAnswer = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const handleCodingAnswer = (questionId: number, code: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: code,
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < mockTest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitTest = () => {
    setTestCompleted(true)
    // Redirect to results page
    router.push(`/mock-tests/${testId}/results`)
  }

  const getAnsweredCount = () => {
    const mcqAnswered = Object.keys(answers).length
    const codingAnswered = mockTest.questions
      .filter((q) => q.type === "coding")
      .filter((q) => isCodingQuestionSubmitted(q.id)).length
    return mcqAnswered + codingAnswered
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

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
        <Card className="w-full max-w-3xl dark:bg-gray-800/80 dark:border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900 dark:text-white mb-4">{mockTest.title}</CardTitle>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{mockTest.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900 dark:text-white">Duration</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{formatTime(mockTest.duration)}</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900 dark:text-white">Questions</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{mockTest.questions.length} total</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900 dark:text-white">Passing Score</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{mockTest.passingScore}%</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Question Breakdown:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">MCQ Questions</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {mockTest.questions.filter((q) => q.type === "mcq").length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Code className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Coding Questions</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {mockTest.questions.filter((q) => q.type === "coding").length}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="text-center">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-yellow-800 dark:text-yellow-200">Important Instructions</span>
              </div>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 text-left space-y-1">
                <li>• Once started, the timer cannot be paused</li>
                <li>• You can navigate between questions freely</li>
                <li>• Coding questions will open in our integrated platform</li>
                <li>• Make sure you have a stable internet connection</li>
                <li>• Your progress is automatically saved</li>
              </ul>
            </div>

            <Button onClick={startTest} size="lg" className="w-full">
              <Play className="w-5 h-5 mr-2" />
              Start Mock Test
            </Button>

            <div className="mt-4">
              <Button variant="outline" asChild>
                <Link href="/mock-tests">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Tests
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQ = mockTest.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / mockTest.questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{mockTest.title}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Question {currentQuestion + 1} of {mockTest.questions.length}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className={`font-mono ${timeLeft < 300 ? "text-red-600" : "text-gray-900 dark:text-white"}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowWarning(true)}>
              Submit Test
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300 mt-1">
            <span>Progress: {Math.round(progress)}%</span>
            <span>
              Answered: {getAnsweredCount()}/{mockTest.questions.length}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Question Navigation */}
          <div className="lg:col-span-1">
            <Card className="dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 lg:grid-cols-1 gap-2">
                  {mockTest.questions.map((question, index) => (
                    <button
                      key={question.id}
                      onClick={() => setCurrentQuestion(index)}
                      className={`p-2 rounded text-sm font-medium transition-colors ${
                        index === currentQuestion
                          ? "bg-blue-600 text-white"
                          : (
                                question.type === "coding"
                                  ? isCodingQuestionSubmitted(question.id)
                                  : answers[question.id] !== undefined
                              )
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{index + 1}</span>
                        <div className="flex items-center space-x-1">
                          {question.type === "coding" ? <Code className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                          {(question.type === "coding"
                            ? isCodingQuestionSubmitted(question.id)
                            : answers[question.id] !== undefined) && <CheckCircle className="w-3 h-3" />}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Content */}
          <div className="lg:col-span-3">
            <Card className="dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className={getDifficultyColor(currentQ.difficulty)}>{currentQ.difficulty}</Badge>
                    <Badge variant="outline">{currentQ.topic}</Badge>
                    <Badge variant="outline" className="capitalize">
                      {currentQ.type}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{currentQ.points} points</div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{currentQ.question}</h2>

                  {currentQ.type === "mcq" ? (
                    <div className="space-y-3">
                      {currentQ.options?.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleMCQAnswer(currentQ.id, index)}
                          className={`w-full p-4 text-left rounded-lg border transition-all ${
                            answers[currentQ.id] === index
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400"
                              : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                answers[currentQ.id] === index
                                  ? "border-blue-500 bg-blue-500"
                                  : "border-gray-300 dark:border-gray-500"
                              }`}
                            >
                              {answers[currentQ.id] === index && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              {String.fromCharCode(65 + index)}.
                            </span>
                            <span className="text-gray-900 dark:text-white">{option}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          This is a coding question. Click the button below to open our coding platform to solve it.
                        </p>
                        <Button asChild>
                          <Link href={`/coding-platform?problem=${currentQ.id}&source=mock-test&testId=${testId}`}>
                            <Code className="w-4 h-4 mr-2" />
                            Open Coding Platform
                          </Link>
                        </Button>
                      </div>

                      {isCodingQuestionSubmitted(currentQ.id) ? (
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="font-medium text-green-800 dark:text-green-300">Solution Submitted</span>
                          </div>
                          <p className="text-sm text-green-700 dark:text-green-200">
                            Your solution has been saved. You can revisit the coding platform to make changes.
                          </p>
                        </div>
                      ) : (
                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                            <span className="font-medium text-yellow-800 dark:text-yellow-300">No Solution Yet</span>
                          </div>
                          <p className="text-sm text-yellow-700 dark:text-yellow-200">
                            You haven't submitted a solution for this question yet.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                  <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
                    Previous
                  </Button>

                  <Button onClick={nextQuestion} disabled={currentQuestion === mockTest.questions.length - 1}>
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Submit Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md dark:bg-gray-800/80 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-center text-gray-900 dark:text-white">Submit Test?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-gray-600 dark:text-gray-300">
                You have answered {getAnsweredCount()} out of {mockTest.questions.length} questions. Are you sure you
                want to submit your test?
              </p>

              <div className="flex items-center justify-center space-x-4">
                <Button variant="outline" onClick={() => setShowWarning(false)}>
                  Continue Test
                </Button>
                <Button onClick={handleSubmitTest}>Submit Test</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
