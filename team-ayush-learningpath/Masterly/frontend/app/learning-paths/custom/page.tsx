"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Brain,
  Target,
  Search,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Code,
  Database,
  Globe,
  Zap,
  TrendingUp,
  RefreshCw,
  Play,
  Lock,
  Home,
  Sparkles,
  Clock,
  Award,
} from "lucide-react"
import Link from "next/link"

interface Topic {
  id: string
  title: string
  description: string
  courseId: string
  courseName: string
  masteryLevel: number
  isCompleted: boolean
  isPrerequisite: boolean
  estimatedHours: number
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  icon: any
}

interface Course {
  id: string
  title: string
  description: string
  totalTopics: number
  completedTopics: number
  masteryScore: number
  icon: any
  color: string
}

const availableCourses: Course[] = [
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description: "Master fundamental data structures and algorithms",
    totalTopics: 15,
    completedTopics: 8,
    masteryScore: 7.2,
    icon: Code,
    color: "from-blue-500 to-purple-600",
  },
  {
    id: "web-dev",
    title: "Full Stack Web Development",
    description: "Complete web development from frontend to backend",
    totalTopics: 20,
    completedTopics: 12,
    masteryScore: 6.8,
    icon: Globe,
    color: "from-green-500 to-teal-600",
  },
  {
    id: "system-design",
    title: "System Design",
    description: "Learn to design scalable distributed systems",
    totalTopics: 12,
    completedTopics: 3,
    masteryScore: 4.5,
    icon: Database,
    color: "from-orange-500 to-red-600",
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    description: "From basics to advanced ML algorithms",
    totalTopics: 18,
    completedTopics: 0,
    masteryScore: 0,
    icon: Brain,
    color: "from-purple-500 to-pink-600",
  },
]

const allTopics: Topic[] = [
  // DSA Topics
  {
    id: "arrays",
    title: "Arrays",
    description: "Array operations and algorithms",
    courseId: "dsa",
    courseName: "Data Structures & Algorithms",
    masteryLevel: 8.5,
    isCompleted: true,
    isPrerequisite: false,
    estimatedHours: 12,
    difficulty: "Beginner",
    icon: Target,
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    description: "Singly, doubly, and circular linked lists",
    courseId: "dsa",
    courseName: "Data Structures & Algorithms",
    masteryLevel: 6.8,
    isCompleted: false,
    isPrerequisite: false,
    estimatedHours: 10,
    difficulty: "Beginner",
    icon: TrendingUp,
  },
  {
    id: "stacks",
    title: "Stacks",
    description: "Stack operations and applications",
    courseId: "dsa",
    courseName: "Data Structures & Algorithms",
    masteryLevel: 4.2,
    isCompleted: false,
    isPrerequisite: false,
    estimatedHours: 8,
    difficulty: "Beginner",
    icon: Zap,
  },
  {
    id: "queues",
    title: "Queues",
    description: "Queue operations and types",
    courseId: "dsa",
    courseName: "Data Structures & Algorithms",
    masteryLevel: 2.1,
    isCompleted: false,
    isPrerequisite: false,
    estimatedHours: 7,
    difficulty: "Beginner",
    icon: TrendingUp,
  },
  {
    id: "trees",
    title: "Trees",
    description: "Binary trees, BST, and tree algorithms",
    courseId: "dsa",
    courseName: "Data Structures & Algorithms",
    masteryLevel: 0,
    isCompleted: false,
    isPrerequisite: false,
    estimatedHours: 15,
    difficulty: "Intermediate",
    icon: Target,
  },
  {
    id: "graphs",
    title: "Graphs",
    description: "Graph algorithms and traversals",
    courseId: "dsa",
    courseName: "Data Structures & Algorithms",
    masteryLevel: 0,
    isCompleted: false,
    isPrerequisite: false,
    estimatedHours: 18,
    difficulty: "Advanced",
    icon: Brain,
  },
  // Web Dev Topics
  {
    id: "html-css",
    title: "HTML & CSS",
    description: "Frontend fundamentals",
    courseId: "web-dev",
    courseName: "Full Stack Web Development",
    masteryLevel: 9.1,
    isCompleted: true,
    isPrerequisite: true,
    estimatedHours: 20,
    difficulty: "Beginner",
    icon: Globe,
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "Modern JavaScript and ES6+",
    courseId: "web-dev",
    courseName: "Full Stack Web Development",
    masteryLevel: 7.8,
    isCompleted: true,
    isPrerequisite: true,
    estimatedHours: 25,
    difficulty: "Intermediate",
    icon: Code,
  },
  {
    id: "react",
    title: "React",
    description: "React fundamentals and hooks",
    courseId: "web-dev",
    courseName: "Full Stack Web Development",
    masteryLevel: 6.5,
    isCompleted: false,
    isPrerequisite: false,
    estimatedHours: 30,
    difficulty: "Intermediate",
    icon: Zap,
  },
  {
    id: "nodejs",
    title: "Node.js",
    description: "Backend development with Node.js",
    courseId: "web-dev",
    courseName: "Full Stack Web Development",
    masteryLevel: 5.2,
    isCompleted: false,
    isPrerequisite: false,
    estimatedHours: 22,
    difficulty: "Intermediate",
    icon: Database,
  },
]

export default function CustomPathGenerator() {
  const [selectedGoal, setSelectedGoal] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")
  const [pathType, setPathType] = useState<"course" | "topic">("course")
  const [generatedPath, setGeneratedPath] = useState<Topic[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [revisionThreshold] = useState(7)
  const [alternativeRoutes, setAlternativeRoutes] = useState<Topic[][]>([])
  const [selectedRoute, setSelectedRoute] = useState<number>(0)

  const generateCustomPath = () => {
    setIsGenerating(true)

    // Simulate AI path generation
    setTimeout(() => {
      let mainPath: Topic[] = []
      let alternatives: Topic[][] = []

      if (pathType === "course" && selectedGoal) {
        // Generate main path for entire course
        const courseTopics = allTopics.filter((topic) => topic.courseId === selectedGoal)

        // Add revision topics if mastery is below threshold
        const revisionTopics = courseTopics.filter(
          (topic) => topic.masteryLevel > 0 && topic.masteryLevel < revisionThreshold,
        )

        // Add incomplete topics
        const incompleteTopics = courseTopics.filter((topic) => !topic.isCompleted)

        mainPath = [...revisionTopics, ...incompleteTopics]
          .sort((a, b) => {
            // Sort by prerequisites first, then by difficulty
            if (a.isPrerequisite && !b.isPrerequisite) return -1
            if (!a.isPrerequisite && b.isPrerequisite) return 1
            return a.difficulty.localeCompare(b.difficulty)
          })
          .slice(0, 5)

        // Generate alternative routes
        // Route 1: Difficulty-focused (easiest first)
        const easyFirstRoute = [...revisionTopics, ...incompleteTopics]
          .sort((a, b) => a.difficulty.localeCompare(b.difficulty))
          .slice(0, 5)

        // Route 2: Time-optimized (shortest duration first)
        const timeOptimizedRoute = [...revisionTopics, ...incompleteTopics]
          .sort((a, b) => a.estimatedHours - b.estimatedHours)
          .slice(0, 5)

        // Route 3: Mastery-focused (lowest mastery first)
        const masteryFocusedRoute = [...revisionTopics, ...incompleteTopics]
          .sort((a, b) => a.masteryLevel - b.masteryLevel)
          .slice(0, 5)

        alternatives = [easyFirstRoute, timeOptimizedRoute, masteryFocusedRoute]
      } else if (pathType === "topic" && searchQuery) {
        // Generate path for specific topic
        const targetTopic = allTopics.find((topic) => topic.title.toLowerCase().includes(searchQuery.toLowerCase()))

        if (targetTopic) {
          // Find prerequisites and related topics
          const prerequisites = allTopics.filter(
            (topic) =>
              topic.courseId === targetTopic.courseId && topic.isPrerequisite && topic.masteryLevel < revisionThreshold,
          )

          mainPath = [...prerequisites, targetTopic].slice(0, 4)

          // Generate alternative approaches
          const directRoute = [targetTopic] // Direct approach
          const comprehensiveRoute = [
            ...prerequisites,
            targetTopic,
            ...allTopics.filter((t) => t.courseId === targetTopic.courseId && !t.isPrerequisite).slice(0, 2),
          ]

          alternatives = [directRoute, comprehensiveRoute.slice(0, 4)]
        }
      }

      setGeneratedPath(mainPath)
      setAlternativeRoutes(alternatives.filter((route) => route.length > 0))
      setSelectedRoute(0)
      setIsGenerating(false)
    }, 2000)
  }

  // Find the next incomplete topic in the current path
  const getNextIncompleteTopic = () => {
    const currentPath = selectedRoute === 0 ? generatedPath : alternativeRoutes[selectedRoute - 1] || generatedPath
    return currentPath.find((topic) => !topic.isCompleted)
  }

  const getStatusColor = (topic: Topic) => {
    if (topic.isCompleted) return "from-green-500 to-emerald-600"
    if (topic.masteryLevel >= revisionThreshold) return "from-blue-500 to-indigo-600"
    if (topic.masteryLevel > 0) return "from-yellow-500 to-orange-600"
    return "from-gray-400 to-gray-500"
  }

  const getStatusIcon = (topic: Topic) => {
    if (topic.isCompleted) return <CheckCircle className="w-5 h-5 text-white" />
    if (topic.masteryLevel >= revisionThreshold) return <Play className="w-5 h-5 text-white" />
    if (topic.masteryLevel > 0) return <RefreshCw className="w-5 h-5 text-white" />
    return <Lock className="w-5 h-5 text-white" />
  }

  const getStatusLabel = (topic: Topic) => {
    if (topic.isCompleted) return "Completed"
    if (topic.masteryLevel >= revisionThreshold) return "Ready"
    if (topic.masteryLevel > 0) return "Needs Revision"
    return "Not Started"
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/learning-paths"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI-Powered Custom Learning Path</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Generate a personalized learning journey based on your goals
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-purple-500" />
                <span>AI-Generated</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span>Adaptive</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-6 gap-8 h-[calc(100vh-200px)]">
          {/* Configuration Panel - Now wider */}
          <div className="lg:col-span-2 space-y-4 overflow-y-auto">
            <Card className="dark:bg-gray-800/80 dark:border-gray-700 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white text-xl">
                  <Brain className="w-6 h-6 text-purple-500" />
                  <span>AI Path Generator</span>
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Configure your learning preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Path Type Selection */}
                <div className="space-y-3">
                  <label className="text-base font-semibold text-gray-900 dark:text-white">Learning Approach</label>
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      variant={pathType === "course" ? "default" : "outline"}
                      onClick={() => setPathType("course")}
                      className="justify-start h-12 text-left"
                      size="lg"
                    >
                      <BookOpen className="w-5 h-5 mr-3" />
                      <div>
                        <div className="font-medium">Complete Course</div>
                        <div className="text-xs opacity-70">Full curriculum path</div>
                      </div>
                    </Button>
                    <Button
                      variant={pathType === "topic" ? "default" : "outline"}
                      onClick={() => setPathType("topic")}
                      className="justify-start h-12 text-left"
                      size="lg"
                    >
                      <Target className="w-5 h-5 mr-3" />
                      <div>
                        <div className="font-medium">Specific Topic</div>
                        <div className="text-xs opacity-70">Focused learning</div>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Course Selection */}
                {pathType === "course" && (
                  <div className="space-y-3">
                    <label className="text-base font-semibold text-gray-900 dark:text-white">Target Course</label>
                    <Select value={selectedGoal} onValueChange={setSelectedGoal}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Choose your learning goal" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCourses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            <div className="flex items-center space-x-3 py-2">
                              <course.icon className="w-5 h-5" />
                              <div>
                                <div className="font-medium">{course.title}</div>
                                <div className="text-xs text-gray-500">{course.description}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Topic Search */}
                {pathType === "topic" && (
                  <div className="space-y-3">
                    <label className="text-base font-semibold text-gray-900 dark:text-white">Search Topic</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="e.g., Stacks, React, Machine Learning..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 h-12 text-base"
                      />
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Search for any topic you want to master
                    </div>
                  </div>
                )}

                {/* Generate Button */}
                <Button
                  onClick={generateCustomPath}
                  disabled={isGenerating || (!selectedGoal && !searchQuery)}
                  className="w-full h-12 text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                      Generating Your Path...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-3" />
                      Generate Learning Path
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Current Progress */}
            <Card className="dark:bg-gray-800/80 dark:border-gray-700 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-gray-900 dark:text-white text-lg">Your Progress Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {availableCourses.slice(0, 3).map((course) => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-900 dark:text-white">{course.title}</span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {course.completedTopics}/{course.totalTopics}
                      </span>
                    </div>
                    <Progress value={(course.completedTopics / course.totalTopics) * 100} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Mastery: {course.masteryScore.toFixed(1)}/10</span>
                      <span>{Math.round((course.completedTopics / course.totalTopics) * 100)}% Complete</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Generated Path Visualization */}
          {generatedPath.length > 0 ? (
            <div className="lg:col-span-4">
              <Card className="dark:bg-gray-800/80 dark:border-gray-700 shadow-lg h-full flex flex-col">
                <CardHeader className="pb-4 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white text-xl">
                        <Target className="w-6 h-6 text-blue-500" />
                        <span>Your Custom Learning Path</span>
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300">
                        Follow this AI-generated path to achieve your goals
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                        <BookOpen className="w-4 h-4" />
                        <span>
                          {
                            (selectedRoute === 0
                              ? generatedPath
                              : alternativeRoutes[selectedRoute - 1] || generatedPath
                            ).length
                          }{" "}
                          Topics
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                        <Clock className="w-4 h-4" />
                        <span>
                          {(selectedRoute === 0
                            ? generatedPath
                            : alternativeRoutes[selectedRoute - 1] || generatedPath
                          ).reduce((acc, topic) => acc + topic.estimatedHours, 0)}
                          h
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                {/* Route Selection Tabs */}
                {alternativeRoutes.length > 0 && (
                  <div className="flex-shrink-0 px-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2 overflow-x-auto">
                      <Button
                        variant={selectedRoute === 0 ? "default" : "outline"}
                        onClick={() => setSelectedRoute(0)}
                        size="sm"
                        className="flex-shrink-0"
                      >
                        <Target className="w-4 h-4 mr-2" />
                        Recommended Path
                      </Button>
                      {alternativeRoutes.map((route, index) => (
                        <Button
                          key={index}
                          variant={selectedRoute === index + 1 ? "default" : "outline"}
                          onClick={() => setSelectedRoute(index + 1)}
                          size="sm"
                          className="flex-shrink-0"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          {index === 0 && "Easy First"}
                          {index === 1 && "Time Optimized"}
                          {index === 2 && "Mastery Focused"}
                          {index > 2 && `Route ${index + 1}`}
                        </Button>
                      ))}
                    </div>

                    {/* Route Description */}
                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                      {selectedRoute === 0 &&
                        "AI-recommended balanced approach considering prerequisites and difficulty"}
                      {selectedRoute === 1 && "Start with easier topics to build confidence gradually"}
                      {selectedRoute === 2 && "Minimize total learning time with shorter topics first"}
                      {selectedRoute === 3 && "Focus on improving weakest areas first"}
                    </div>
                  </div>
                )}

                <CardContent className="flex-1 overflow-y-auto px-8">
                  {/* Beautiful Path Visualization with dynamic layout */}
                  <div className="relative min-h-full py-8">
                    {/* Start Indicator */}
                    <div className="flex justify-center mb-8">
                      <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-lg">
                        <Play className="w-4 h-4" />
                        <span className="font-semibold text-sm">START YOUR JOURNEY</span>
                      </div>
                    </div>

                    {/* Dynamic Grid Layout based on path length */}
                    <div
                      className={`
      grid gap-8 max-w-full mx-auto
      ${
        generatedPath.length <= 3
          ? "grid-cols-1 max-w-2xl"
          : generatedPath.length <= 6
            ? "grid-cols-2 max-w-5xl"
            : "grid-cols-3 max-w-7xl"
      }
    `}
                    >
                      {(selectedRoute === 0
                        ? generatedPath
                        : alternativeRoutes[selectedRoute - 1] || generatedPath
                      ).map((topic, index) => (
                        <div key={topic.id} className="relative">
                          {/* Topic Card - Full width within grid */}
                          <div className="flex justify-center">
                            <Link
                              href={`/courses/${topic.courseId}/concepts/${topic.id}`}
                              className="group relative block w-full max-w-sm"
                            >
                              <div
                                className={`
                  relative p-5 rounded-2xl border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer w-full
                  ${
                    topic.masteryLevel > 0 && topic.masteryLevel < revisionThreshold
                      ? "border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 dark:border-yellow-600"
                      : topic.isCompleted
                        ? "border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-600"
                        : "border-gray-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 dark:border-gray-600"
                  }
                  hover:border-blue-400 dark:hover:border-blue-500
                `}
                              >
                                {/* Step Number */}
                                <div className="absolute -top-3 -left-3">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-sm">{index + 1}</span>
                                  </div>
                                </div>

                                {/* Floating Status Badge */}
                                <div className="absolute -top-2 -right-2">
                                  <div
                                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${getStatusColor(topic)} flex items-center justify-center shadow-lg`}
                                  >
                                    {getStatusIcon(topic)}
                                  </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-3">
                                  <div className="flex items-start space-x-3">
                                    <div className="p-2 rounded-lg bg-white/80 dark:bg-gray-700/80 shadow-sm">
                                      <topic.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">
                                        {topic.title}
                                      </h3>
                                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                        {topic.description}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Badges */}
                                  <div className="flex items-center space-x-2 flex-wrap">
                                    <Badge className={getDifficultyColor(topic.difficulty)} variant="secondary">
                                      {topic.difficulty}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {topic.estimatedHours}h
                                    </Badge>
                                    {topic.masteryLevel > 0 && (
                                      <Badge variant="outline" className="text-xs">
                                        <Award className="w-3 h-3 mr-1" />
                                        {topic.masteryLevel.toFixed(1)}/10
                                      </Badge>
                                    )}
                                  </div>

                                  {/* Revision Warning */}
                                  {topic.masteryLevel > 0 && topic.masteryLevel < revisionThreshold && (
                                    <div className="flex items-center space-x-2 p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                                      <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                                      <span className="text-xs text-yellow-700 dark:text-yellow-300">
                                        Revision recommended
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {/* Hover Effect */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                            </Link>
                          </div>

                          {/* Connection Arrow - Only show if not the last item and in appropriate positions */}
                          {index <
                            (selectedRoute === 0
                              ? generatedPath
                              : alternativeRoutes[selectedRoute - 1] || generatedPath
                            ).length -
                              1 && (
                            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                              <div className="p-1.5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg animate-pulse">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Finish Indicator */}
                    <div className="flex justify-center mt-12">
                      <div className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full shadow-lg">
                        <Award className="w-5 h-5" />
                        <span className="font-semibold">CONGRATULATIONS! PATH COMPLETED</span>
                        <Sparkles className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Route Comparison */}
                  {alternativeRoutes.length > 0 && (
                    <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <Brain className="w-4 h-4 mr-2" />
                        Compare All Routes
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Main Route */}
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border-2 border-blue-200 dark:border-blue-700">
                          <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">Recommended</div>
                          <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
                            <div>{generatedPath.length} topics</div>
                            <div>{generatedPath.reduce((acc, topic) => acc + topic.estimatedHours, 0)}h total</div>
                            <div>Balanced approach</div>
                          </div>
                        </div>

                        {/* Alternative Routes */}
                        {alternativeRoutes.map((route, index) => (
                          <div
                            key={index}
                            className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600"
                          >
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              {index === 0 && "Easy First"}
                              {index === 1 && "Time Optimized"}
                              {index === 2 && "Mastery Focused"}
                            </div>
                            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
                              <div>{route.length} topics</div>
                              <div>{route.reduce((acc, topic) => acc + topic.estimatedHours, 0)}h total</div>
                              <div>
                                {index === 0 && "Confidence building"}
                                {index === 1 && "Quick completion"}
                                {index === 2 && "Skill improvement"}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons - Fixed at bottom */}
                  <div className="sticky bottom-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-t pt-4 mt-8">
                    <div className="flex items-center justify-center space-x-3">
                      {getNextIncompleteTopic() ? (
                        <Button
                          asChild
                          className="shadow-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                        >
                          <Link
                            href={`/courses/${getNextIncompleteTopic()?.courseId}/concepts/${getNextIncompleteTopic()?.id}`}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Continue Learning: {getNextIncompleteTopic()?.title}
                          </Link>
                        </Button>
                      ) : (
                        <Button
                          asChild
                          className="shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          <Link href={`/courses/${generatedPath[0]?.courseId}/concepts/${generatedPath[0]?.id}`}>
                            <Award className="w-4 h-4 mr-2" />
                            Review Completed Path
                          </Link>
                        </Button>
                      )}
                      <Button variant="outline" onClick={generateCustomPath} className="shadow-lg">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Keep the existing empty state exactly the same
            <div className="lg:col-span-4">
              <Card className="dark:bg-gray-800/80 dark:border-gray-700 shadow-lg h-full">
                <CardContent className="flex flex-col items-center justify-center h-full">
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <Brain className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto" />
                      <Sparkles className="w-8 h-8 text-blue-500 absolute -top-2 -right-2 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Ready to Create Your Path?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                        Configure your learning goals and let our AI generate a personalized learning journey tailored
                        just for you.
                      </p>
                    </div>
                    <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4" />
                        <span>Goal-Oriented</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Brain className="w-4 h-4" />
                        <span>AI-Powered</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4" />
                        <span>Adaptive</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
