"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, CheckCircle, Star, Users, Brain, Target, Zap, BookOpen, Code, Globe } from "lucide-react"
import Link from "next/link"

export default function LearningPaths() {
  const learningPaths = [
    {
      id: 1,
      title: "Full Stack Developer",
      description: "Master both frontend and backend development",
      duration: "16 weeks",
      difficulty: "Intermediate",
      students: "25K+",
      rating: 4.8,
      progress: 45,
      concepts: 120,
      completed: 54,
      icon: Globe,
      color: "from-blue-500 to-purple-600",
      skills: ["React", "Node.js", "MongoDB", "System Design"],
      path: [
        { name: "Frontend Basics", status: "completed", concepts: 15 },
        { name: "React Fundamentals", status: "completed", concepts: 20 },
        { name: "Backend Development", status: "current", concepts: 25 },
        { name: "Database Design", status: "locked", concepts: 18 },
        { name: "System Architecture", status: "locked", concepts: 22 },
        { name: "Deployment & DevOps", status: "locked", concepts: 20 },
      ],
    },
    {
      id: 2,
      title: "Data Scientist",
      description: "From statistics to machine learning and AI",
      duration: "20 weeks",
      difficulty: "Advanced",
      students: "18K+",
      rating: 4.9,
      progress: 0,
      concepts: 95,
      completed: 0,
      icon: Brain,
      color: "from-green-500 to-teal-600",
      skills: ["Python", "Statistics", "ML", "Deep Learning"],
      path: [
        { name: "Python for Data Science", status: "available", concepts: 12 },
        { name: "Statistics & Probability", status: "locked", concepts: 18 },
        { name: "Data Analysis", status: "locked", concepts: 15 },
        { name: "Machine Learning", status: "locked", concepts: 25 },
        { name: "Deep Learning", status: "locked", concepts: 15 },
        { name: "MLOps & Deployment", status: "locked", concepts: 10 },
      ],
    },
    {
      id: 3,
      title: "Software Engineer",
      description: "Master algorithms, system design, and coding interviews",
      duration: "12 weeks",
      difficulty: "Intermediate",
      students: "40K+",
      rating: 4.7,
      progress: 75,
      concepts: 85,
      completed: 64,
      icon: Code,
      color: "from-orange-500 to-red-600",
      skills: ["DSA", "System Design", "Coding Patterns", "Mock Interviews"],
      path: [
        { name: "Data Structures", status: "completed", concepts: 20 },
        { name: "Algorithms", status: "completed", concepts: 25 },
        { name: "System Design", status: "current", concepts: 15 },
        { name: "Coding Patterns", status: "locked", concepts: 12 },
        { name: "Mock Interviews", status: "locked", concepts: 8 },
        { name: "Behavioral Prep", status: "locked", concepts: 5 },
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500 bg-green-500"
      case "current":
        return "text-blue-500 bg-blue-500"
      case "available":
        return "text-purple-500 bg-purple-500"
      default:
        return "text-gray-400 bg-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "current":
        return <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
      case "available":
        return <div className="w-2 h-2 bg-white rounded-full" />
      default:
        return <div className="w-2 h-2 bg-white rounded-full opacity-50" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Personalized Learning Paths</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              AI-curated learning journeys tailored to your goals, current knowledge, and learning pace
            </p>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-blue-500" />
              <span>Goal-oriented</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>Adaptive difficulty</span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-purple-500" />
              <span>AI-powered</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Create Custom Path CTA - Moved to Top */}
        <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800 dark:bg-gray-800/80 dark:border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-purple-700 text-gray-900 dark:text-white">
              Create Your Custom Path
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              Can't find the perfect path? Let our AI create a personalized learning journey just for you
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              asChild
            >
              <Link href="/learning-paths/custom">
                <Brain className="w-4 h-4 mr-2" />
                Generate Custom Path
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Predefined Learning Paths */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Predefined Learning Paths</h2>
            <Badge variant="outline">{learningPaths.length} Paths Available</Badge>
          </div>

          {learningPaths.map((path) => (
            <Card
              key={path.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 dark:bg-gray-800/80 dark:border-gray-700"
            >
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Path Info */}
                <div className="lg:col-span-1 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${path.color} flex items-center justify-center`}
                    >
                      <path.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{path.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{path.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Progress</span>
                      <span className="font-medium">{path.progress}%</span>
                    </div>
                    <Progress value={path.progress} className="h-2" />

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-300">Duration</span>
                        <div className="font-medium">{path.duration}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-300">Concepts</span>
                        <div className="font-medium">
                          {path.completed}/{path.concepts}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{path.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{path.students}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-300 mb-2 block">Key Skills</span>
                      <div className="flex flex-wrap gap-2">
                        {path.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full" asChild>
                      <Link href={`/learning-paths/${path.id}`}>
                        {path.progress > 0 ? "Continue Path" : "Start Path"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Visual Path - Fixed vertical lines issue */}
                <div className="lg:col-span-2 p-6 bg-gray-50 dark:bg-gray-800/80">
                  <h4 className="font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Learning Journey
                  </h4>

                  <div className="space-y-4">
                    {path.path.map((step, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-center space-x-4">
                          {/* Step Indicator */}
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(step.status)} relative z-10`}
                          >
                            {getStatusIcon(step.status)}
                          </div>

                          {/* Step Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h5
                                className={`font-medium ${step.status === "locked" ? "text-gray-400" : "text-gray-900 dark:text-white"}`}
                              >
                                {step.name}
                              </h5>
                              <span
                                className={`text-xs ${step.status === "locked" ? "text-gray-400" : "text-gray-600 dark:text-gray-300"}`}
                              >
                                {step.concepts} concepts
                              </span>
                            </div>

                            {step.status === "current" && (
                              <div className="mt-2">
                                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300 mb-1">
                                  <span>In Progress</span>
                                  <span>12/25 concepts</span>
                                </div>
                                <Progress value={48} className="h-1" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Connection Line - Fixed positioning */}
                        {index < path.path.length - 1 && (
                          <div className="ml-4 mt-2 mb-2 w-0.5 h-4 bg-gray-300 dark:bg-gray-600"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
