"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Trophy, Target, Play, BookOpen, Code, Brain, Star } from "lucide-react"
import Link from "next/link"

interface MockTest {
  id: number
  title: string
  description: string
  duration: number // in minutes
  totalQuestions: number
  codingQuestions: number
  mcqQuestions: number
  difficulty: "Easy" | "Medium" | "Hard"
  topics: string[]
  participants: number
  averageScore: number
  passingScore: number
  attempts: number
  bestScore?: number
  lastAttempt?: string
  status: "not-started" | "in-progress" | "completed"
  category: string
}

export default function MockTests() {
  const [selectedCategory, setSelectedCategory] = useState("All Tests")

  const mockTests: MockTest[] = [
    {
      id: 1,
      title: "Data Structures & Algorithms - Complete Assessment",
      description: "Comprehensive test covering arrays, linked lists, trees, graphs, and dynamic programming",
      duration: 90,
      totalQuestions: 25,
      codingQuestions: 10,
      mcqQuestions: 15,
      difficulty: "Medium",
      topics: ["Arrays", "Trees", "Graphs", "Dynamic Programming", "Sorting"],
      participants: 1250,
      averageScore: 72,
      passingScore: 70,
      attempts: 2,
      bestScore: 85,
      lastAttempt: "2 days ago",
      status: "completed",
      category: "DSA",
    },
    {
      id: 2,
      title: "System Design Interview Simulation",
      description: "Design scalable systems like chat applications, URL shorteners, and social media feeds",
      duration: 60,
      totalQuestions: 8,
      codingQuestions: 3,
      mcqQuestions: 5,
      difficulty: "Hard",
      topics: ["Load Balancing", "Databases", "Caching", "Microservices", "Scalability"],
      participants: 890,
      averageScore: 65,
      passingScore: 75,
      attempts: 0,
      status: "not-started",
      category: "System Design",
    },
    {
      id: 3,
      title: "JavaScript Fundamentals & Advanced Concepts",
      description: "Test your knowledge of ES6+, async programming, closures, and modern JavaScript patterns",
      duration: 45,
      totalQuestions: 20,
      codingQuestions: 8,
      mcqQuestions: 12,
      difficulty: "Medium",
      topics: ["ES6+", "Async/Await", "Closures", "Prototypes", "DOM Manipulation"],
      participants: 2100,
      averageScore: 78,
      passingScore: 65,
      attempts: 1,
      bestScore: 92,
      lastAttempt: "1 week ago",
      status: "completed",
      category: "Programming",
    },
    {
      id: 4,
      title: "Machine Learning Fundamentals",
      description: "Cover supervised learning, neural networks, model evaluation, and feature engineering",
      duration: 75,
      totalQuestions: 18,
      codingQuestions: 6,
      mcqQuestions: 12,
      difficulty: "Hard",
      topics: ["Supervised Learning", "Neural Networks", "Feature Engineering", "Model Evaluation"],
      participants: 650,
      averageScore: 68,
      passingScore: 70,
      attempts: 0,
      status: "not-started",
      category: "AI/ML",
    },
    {
      id: 5,
      title: "React & Frontend Development",
      description: "Modern React patterns, hooks, state management, and performance optimization",
      duration: 60,
      totalQuestions: 22,
      codingQuestions: 9,
      mcqQuestions: 13,
      difficulty: "Medium",
      topics: ["React Hooks", "State Management", "Performance", "Testing", "TypeScript"],
      participants: 1800,
      averageScore: 74,
      passingScore: 65,
      attempts: 1,
      bestScore: 88,
      lastAttempt: "3 days ago",
      status: "in-progress",
      category: "Frontend",
    },
    {
      id: 6,
      title: "Database Design & SQL Mastery",
      description: "Advanced SQL queries, database normalization, indexing, and performance tuning",
      duration: 50,
      totalQuestions: 16,
      codingQuestions: 5,
      mcqQuestions: 11,
      difficulty: "Medium",
      topics: ["SQL Queries", "Normalization", "Indexing", "Performance", "NoSQL"],
      participants: 950,
      averageScore: 71,
      passingScore: 70,
      attempts: 0,
      status: "not-started",
      category: "Database",
    },
  ]

  const categories = [
    { name: "All Tests", count: mockTests.length },
    { name: "DSA", count: mockTests.filter((t) => t.category === "DSA").length },
    { name: "System Design", count: mockTests.filter((t) => t.category === "System Design").length },
    { name: "Programming", count: mockTests.filter((t) => t.category === "Programming").length },
    { name: "AI/ML", count: mockTests.filter((t) => t.category === "AI/ML").length },
    { name: "Frontend", count: mockTests.filter((t) => t.category === "Frontend").length },
    { name: "Database", count: mockTests.filter((t) => t.category === "Database").length },
  ]

  const filteredTests =
    selectedCategory === "All Tests" ? mockTests : mockTests.filter((test) => test.category === selectedCategory)

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "in-progress":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
      case "not-started":
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in-progress":
        return "In Progress"
      case "not-started":
        return "Not Started"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Mock Tests</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Practice with industry-standard assessments and track your progress
          </p>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900 dark:text-white">Tests Completed</span>
              </div>
              <div className="text-2xl font-bold text-blue-600 mt-1">
                {mockTests.filter((t) => t.status === "completed").length}
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900 dark:text-white">Average Score</span>
              </div>
              <div className="text-2xl font-bold text-green-600 mt-1">
                {Math.round(
                  mockTests.filter((t) => t.bestScore).reduce((acc, t) => acc + (t.bestScore || 0), 0) /
                    mockTests.filter((t) => t.bestScore).length,
                ) || 0}
                %
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-gray-900 dark:text-white">Time Practiced</span>
              </div>
              <div className="text-2xl font-bold text-purple-600 mt-1">
                {mockTests.filter((t) => t.status === "completed").reduce((acc, t) => acc + t.duration, 0)}m
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-gray-900 dark:text-white">Best Performance</span>
              </div>
              <div className="text-2xl font-bold text-orange-600 mt-1">
                {Math.max(...mockTests.filter((t) => t.bestScore).map((t) => t.bestScore || 0)) || 0}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Categories */}
          <div className="lg:col-span-1">
            <Card className="dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      selectedCategory === category.name
                        ? "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="dark:bg-gray-800/80 dark:border-gray-700 mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-600" />
                  Test Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="font-medium text-blue-900 dark:text-blue-300 mb-1">Time Management</div>
                  <div className="text-blue-800 dark:text-blue-200">
                    Allocate time wisely between coding and MCQ questions
                  </div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="font-medium text-green-900 dark:text-green-300 mb-1">Practice Environment</div>
                  <div className="text-green-800 dark:text-green-200">
                    Use our coding platform to get familiar with the interface
                  </div>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="font-medium text-purple-900 dark:text-purple-300 mb-1">Review Strategy</div>
                  <div className="text-purple-800 dark:text-purple-200">
                    Always review your answers before submitting
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tests Grid */}
          <div className="lg:col-span-3">
            <div className="grid gap-6">
              {filteredTests.map((test) => (
                <Card
                  key={test.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 dark:bg-gray-800/80 dark:border-gray-700"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getDifficultyColor(test.difficulty)}>{test.difficulty}</Badge>
                          <Badge className={getStatusColor(test.status)}>{getStatusText(test.status)}</Badge>
                          <Badge variant="outline">{test.category}</Badge>
                        </div>
                        <CardTitle className="text-xl text-gray-900 dark:text-white mb-2">{test.title}</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-300">
                          {test.description}
                        </CardDescription>
                      </div>

                      {test.bestScore && (
                        <div className="text-right ml-4">
                          <div className="text-2xl font-bold text-green-600">{test.bestScore}%</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Best Score</div>
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Test Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-300">{test.duration} min</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-300">{test.totalQuestions} questions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Code className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-300">{test.codingQuestions} coding</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-300">{test.participants.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Topics */}
                    <div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Topics Covered:</div>
                      <div className="flex flex-wrap gap-1">
                        {test.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Performance Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-300">Average Score</span>
                          <span className="font-medium text-gray-900 dark:text-white">{test.averageScore}%</span>
                        </div>
                        <Progress value={test.averageScore} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-300">Passing Score</span>
                          <span className="font-medium text-gray-900 dark:text-white">{test.passingScore}%</span>
                        </div>
                        <Progress value={test.passingScore} className="h-2" />
                      </div>
                    </div>

                    {/* Attempt History */}
                    {test.attempts > 0 && (
                      <div className="flex items-center justify-between text-sm bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <span className="text-gray-600 dark:text-gray-300">Attempts: </span>
                            <span className="font-medium text-gray-900 dark:text-white">{test.attempts}</span>
                          </div>
                          {test.lastAttempt && (
                            <div>
                              <span className="text-gray-600 dark:text-gray-300">Last: </span>
                              <span className="font-medium text-gray-900 dark:text-white">{test.lastAttempt}</span>
                            </div>
                          )}
                        </div>
                        {test.bestScore && (
                          <div className="flex items-center space-x-1">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            <span className="font-medium text-gray-900 dark:text-white">{test.bestScore}%</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {test.status === "not-started" && "Ready to start your first attempt"}
                        {test.status === "in-progress" && "Continue where you left off"}
                        {test.status === "completed" && "Retake to improve your score"}
                      </div>

                      <div className="flex space-x-2">
                        {test.status === "completed" && (
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/mock-tests/${test.id}/results`}>View Results</Link>
                          </Button>
                        )}
                        <Button size="sm" asChild>
                          <Link href={`/mock-tests/${test.id}/start`}>
                            <Play className="w-4 h-4 mr-2" />
                            {test.status === "not-started"
                              ? "Start Test"
                              : test.status === "in-progress"
                                ? "Continue"
                                : "Retake"}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            {filteredTests.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Tests
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
