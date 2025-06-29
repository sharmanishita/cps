"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  CheckCircle,
  Clock,
  Users,
  Star,
  BookOpen,
  FileText,
  Video,
  Code,
  Share,
  Heart,
  MessageCircle,
  ChevronRight,
  ChevronDown,
  Trophy,
  Target,
  Brain,
  Zap,
  Award,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

interface Concept {
  id: number
  title: string
  description: string
  videosWatched: number
  totalVideos: number
  problemsSolved: number
  totalProblems: number
  articlesRead: number
  totalArticles: number
  masteryScore: number
  estimatedTime: string
}

interface Topic {
  id: number
  title: string
  description: string
  icon: any
  concepts: Concept[]
  overallMastery: number
  totalConcepts: number
  completedConcepts: number
  estimatedHours: number
}

const courseTopics: Topic[] = [
  {
    id: 1,
    title: "Arrays",
    description: "Master array operations, algorithms, and problem-solving techniques",
    icon: Target,
    overallMastery: 8.5,
    totalConcepts: 6,
    completedConcepts: 5,
    estimatedHours: 12,
    concepts: [
      {
        id: 1,
        title: "Array Basics",
        description: "Introduction to arrays, declaration, and basic operations",
        videosWatched: 4,
        totalVideos: 4,
        problemsSolved: 8,
        totalProblems: 10,
        articlesRead: 3,
        totalArticles: 3,
        masteryScore: 9.2,
        estimatedTime: "2h 30m",
      },
      {
        id: 2,
        title: "Array Searching",
        description: "Linear search, binary search, and search optimizations",
        videosWatched: 3,
        totalVideos: 3,
        problemsSolved: 12,
        totalProblems: 15,
        articlesRead: 2,
        totalArticles: 2,
        masteryScore: 8.7,
        estimatedTime: "3h 15m",
      },
      {
        id: 3,
        title: "Array Sorting",
        description: "Bubble sort, selection sort, insertion sort, and merge sort",
        videosWatched: 5,
        totalVideos: 6,
        problemsSolved: 18,
        totalProblems: 25,
        articlesRead: 4,
        totalArticles: 4,
        masteryScore: 7.8,
        estimatedTime: "4h 45m",
      },
      {
        id: 4,
        title: "Two Pointers Technique",
        description: "Solve array problems efficiently using two pointers",
        videosWatched: 2,
        totalVideos: 3,
        problemsSolved: 6,
        totalProblems: 12,
        articlesRead: 1,
        totalArticles: 2,
        masteryScore: 6.4,
        estimatedTime: "2h 20m",
      },
      {
        id: 5,
        title: "Sliding Window",
        description: "Master sliding window technique for subarray problems",
        videosWatched: 1,
        totalVideos: 4,
        problemsSolved: 3,
        totalProblems: 15,
        articlesRead: 0,
        totalArticles: 3,
        masteryScore: 4.2,
        estimatedTime: "3h 30m",
      },
      {
        id: 6,
        title: "Advanced Array Problems",
        description: "Complex array algorithms and competitive programming problems",
        videosWatched: 0,
        totalVideos: 5,
        problemsSolved: 0,
        totalProblems: 20,
        articlesRead: 0,
        totalArticles: 4,
        masteryScore: 0,
        estimatedTime: "5h 15m",
      },
    ],
  },
  {
    id: 2,
    title: "Linked Lists",
    description: "Understand linked list operations, types, and advanced techniques",
    icon: Brain,
    overallMastery: 6.8,
    totalConcepts: 5,
    completedConcepts: 2,
    estimatedHours: 10,
    concepts: [
      {
        id: 7,
        title: "Singly Linked Lists",
        description: "Basic linked list operations and implementations",
        videosWatched: 3,
        totalVideos: 3,
        problemsSolved: 10,
        totalProblems: 12,
        articlesRead: 2,
        totalArticles: 2,
        masteryScore: 8.9,
        estimatedTime: "2h 45m",
      },
      {
        id: 8,
        title: "Doubly Linked Lists",
        description: "Bidirectional linked lists and their applications",
        videosWatched: 2,
        totalVideos: 2,
        problemsSolved: 7,
        totalProblems: 10,
        articlesRead: 1,
        totalArticles: 2,
        masteryScore: 7.6,
        estimatedTime: "2h 15m",
      },
      {
        id: 9,
        title: "Circular Linked Lists",
        description: "Circular linked lists and their unique properties",
        videosWatched: 1,
        totalVideos: 2,
        problemsSolved: 3,
        totalProblems: 8,
        articlesRead: 0,
        totalArticles: 1,
        masteryScore: 5.2,
        estimatedTime: "1h 50m",
      },
      {
        id: 10,
        title: "Linked List Algorithms",
        description: "Reversal, cycle detection, and merging techniques",
        videosWatched: 0,
        totalVideos: 4,
        problemsSolved: 2,
        totalProblems: 15,
        articlesRead: 0,
        totalArticles: 3,
        masteryScore: 3.1,
        estimatedTime: "3h 20m",
      },
      {
        id: 11,
        title: "Advanced Linked List Problems",
        description: "Complex linked list manipulations and optimizations",
        videosWatched: 0,
        totalVideos: 3,
        problemsSolved: 0,
        totalProblems: 12,
        articlesRead: 0,
        totalArticles: 2,
        masteryScore: 0,
        estimatedTime: "2h 30m",
      },
    ],
  },
  {
    id: 3,
    title: "Stacks",
    description: "Learn stack operations, applications, and problem-solving patterns",
    icon: Zap,
    overallMastery: 4.2,
    totalConcepts: 4,
    completedConcepts: 1,
    estimatedHours: 8,
    concepts: [
      {
        id: 12,
        title: "Stack Fundamentals",
        description: "Stack operations, implementation, and basic applications",
        videosWatched: 2,
        totalVideos: 2,
        problemsSolved: 8,
        totalProblems: 10,
        articlesRead: 1,
        totalArticles: 1,
        masteryScore: 8.4,
        estimatedTime: "2h 00m",
      },
      {
        id: 13,
        title: "Expression Evaluation",
        description: "Infix, postfix, prefix expressions and conversions",
        videosWatched: 1,
        totalVideos: 3,
        problemsSolved: 4,
        totalProblems: 12,
        articlesRead: 0,
        totalArticles: 2,
        masteryScore: 4.7,
        estimatedTime: "2h 30m",
      },
      {
        id: 14,
        title: "Stack Applications",
        description: "Function calls, backtracking, and parsing applications",
        videosWatched: 0,
        totalVideos: 2,
        problemsSolved: 1,
        totalProblems: 8,
        articlesRead: 0,
        totalArticles: 1,
        masteryScore: 2.1,
        estimatedTime: "1h 45m",
      },
      {
        id: 15,
        title: "Advanced Stack Problems",
        description: "Complex stack-based algorithms and optimizations",
        videosWatched: 0,
        totalVideos: 3,
        problemsSolved: 0,
        totalProblems: 10,
        articlesRead: 0,
        totalArticles: 2,
        masteryScore: 0,
        estimatedTime: "2h 15m",
      },
    ],
  },
  {
    id: 4,
    title: "Queues",
    description: "Master queue operations, types, and real-world applications",
    icon: TrendingUp,
    overallMastery: 2.1,
    totalConcepts: 4,
    completedConcepts: 0,
    estimatedHours: 7,
    concepts: [
      {
        id: 16,
        title: "Queue Basics",
        description: "Queue operations, implementation, and basic applications",
        videosWatched: 1,
        totalVideos: 2,
        problemsSolved: 2,
        totalProblems: 8,
        articlesRead: 0,
        totalArticles: 1,
        masteryScore: 3.2,
        estimatedTime: "1h 30m",
      },
      {
        id: 17,
        title: "Circular Queues",
        description: "Circular queue implementation and optimization",
        videosWatched: 0,
        totalVideos: 2,
        problemsSolved: 1,
        totalProblems: 6,
        articlesRead: 0,
        totalArticles: 1,
        masteryScore: 1.8,
        estimatedTime: "1h 45m",
      },
      {
        id: 18,
        title: "Priority Queues",
        description: "Priority queue implementation using heaps",
        videosWatched: 0,
        totalVideos: 3,
        problemsSolved: 0,
        totalProblems: 10,
        articlesRead: 0,
        totalArticles: 2,
        masteryScore: 0,
        estimatedTime: "2h 30m",
      },
      {
        id: 19,
        title: "Deque and Applications",
        description: "Double-ended queues and their practical uses",
        videosWatched: 0,
        totalVideos: 2,
        problemsSolved: 0,
        totalProblems: 7,
        articlesRead: 0,
        totalArticles: 1,
        masteryScore: 0,
        estimatedTime: "1h 45m",
      },
    ],
  },
]

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([1])
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null)

  const toggleTopic = (topicId: number) => {
    setExpandedTopics((prev) => (prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]))
  }

  const getMasteryColor = (score: number) => {
    if (score >= 8) return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300"
    if (score >= 7) return "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
    if (score >= 5) return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300"
    if (score > 0) return "text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300"
    return "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
  }

  const getMasteryLabel = (score: number) => {
    if (score >= 8) return "Mastered"
    if (score >= 7) return "Completed"
    if (score >= 5) return "In Progress"
    if (score > 0) return "Started"
    return "Not Started"
  }

  const getMasteryIcon = (score: number) => {
    if (score >= 8) return <Trophy className="w-4 h-4" />
    if (score >= 7) return <CheckCircle className="w-4 h-4" />
    if (score >= 5) return <Target className="w-4 h-4" />
    if (score > 0) return <Play className="w-4 h-4" />
    return <Clock className="w-4 h-4" />
  }

  const getProgressColor = (score: number) => {
    if (score >= 8) return "bg-green-500"
    if (score >= 7) return "bg-blue-500"
    if (score >= 5) return "bg-yellow-500"
    if (score > 0) return "bg-orange-500"
    return "bg-gray-300"
  }

  const totalTopics = courseTopics.length
  const completedTopics = courseTopics.filter((topic) => topic.overallMastery >= 7).length
  const overallProgress = courseTopics.reduce((acc, topic) => acc + topic.overallMastery, 0) / totalTopics

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="grid lg:grid-cols-4 gap-6 p-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Course Header */}
          <Card className="dark:bg-gray-800/80 dark:border-gray-700">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge>Data Structures</Badge>
                    <Badge variant="outline">Beginner to Advanced</Badge>
                  </div>
                  <CardTitle className="text-2xl mb-2 text-gray-900 dark:text-white">
                    Complete Data Structures & Algorithms
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 dark:text-gray-300">
                    Master the fundamentals of data structures and algorithms with hands-on practice and real-world
                    examples
                  </CardDescription>

                  <div className="flex items-center space-x-6 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>45,234 students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>4.9 (2,847 reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>12 weeks</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>{Math.round(overallProgress * 10)}% Complete</span>
                </div>
                <Progress value={overallProgress * 10} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                  <span>
                    {completedTopics} of {totalTopics} topics completed
                  </span>
                  <span>Mastery Score: {overallProgress.toFixed(1)}/10</span>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Topics List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Course Topics</h2>
              <Badge variant="outline">{totalTopics} Topics</Badge>
            </div>

            {courseTopics.map((topic) => (
              <Card key={topic.id} className="dark:bg-gray-800/80 dark:border-gray-700 overflow-hidden">
                <div className="cursor-pointer" onClick={() => toggleTopic(topic.id)}>
                  <CardHeader className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl ${getMasteryColor(topic.overallMastery)}`}>
                          <topic.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <CardTitle className="text-lg text-gray-900 dark:text-white">{topic.title}</CardTitle>
                            <Badge className={`${getMasteryColor(topic.overallMastery)} border-0`}>
                              {getMasteryIcon(topic.overallMastery)}
                              <span className="ml-1">{getMasteryLabel(topic.overallMastery)}</span>
                            </Badge>
                          </div>
                          <CardDescription className="text-gray-600 dark:text-gray-300">
                            {topic.description}
                          </CardDescription>
                          <div className="flex items-center space-x-6 mt-3 text-sm text-muted-foreground">
                            <span>
                              {topic.completedConcepts}/{topic.totalConcepts} concepts
                            </span>
                            <span>~{topic.estimatedHours}h total</span>
                            <span>Mastery: {topic.overallMastery.toFixed(1)}/10</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getProgressColor(topic.overallMastery)} transition-all duration-300`}
                              style={{ width: `${(topic.overallMastery / 10) * 100}%` }}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {Math.round((topic.overallMastery / 10) * 100)}%
                          </div>
                        </div>
                        {expandedTopics.includes(topic.id) ? (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </div>

                {expandedTopics.includes(topic.id) && (
                  <CardContent className="pt-0">
                    <div className="border-t dark:border-gray-700 pt-4">
                      <div className="grid gap-3">
                        {topic.concepts.map((concept) => (
                          <Link
                            key={concept.id}
                            href={`/courses/${params.id}/concepts/${concept.id}`}
                            className={`block p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer dark:border-gray-700 ${
                              selectedConcept?.id === concept.id
                                ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                : ""
                            }`}
                            onClick={() => setSelectedConcept(concept)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="font-medium text-gray-900 dark:text-white">{concept.title}</h4>
                                  <Badge className={`${getMasteryColor(concept.masteryScore)} border-0 text-xs`}>
                                    {getMasteryIcon(concept.masteryScore)}
                                    <span className="ml-1">{getMasteryLabel(concept.masteryScore)}</span>
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">{concept.description}</p>

                                <div className="grid grid-cols-3 gap-4 text-xs">
                                  <div className="flex items-center space-x-2">
                                    <Video className="w-3 h-3 text-blue-500" />
                                    <span className="text-muted-foreground">
                                      {concept.videosWatched}/{concept.totalVideos} videos
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Code className="w-3 h-3 text-green-500" />
                                    <span className="text-muted-foreground">
                                      {concept.problemsSolved}/{concept.totalProblems} problems
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <FileText className="w-3 h-3 text-purple-500" />
                                    <span className="text-muted-foreground">
                                      {concept.articlesRead}/{concept.totalArticles} articles
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col items-end space-y-2 ml-4">
                                <div className="text-right">
                                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                                    {concept.masteryScore.toFixed(1)}
                                  </div>
                                  <div className="text-xs text-muted-foreground">/ 10</div>
                                </div>
                                <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${getProgressColor(concept.masteryScore)} transition-all duration-300`}
                                    style={{ width: `${(concept.masteryScore / 10) * 100}%` }}
                                  />
                                </div>
                                <div className="text-xs text-muted-foreground">{concept.estimatedTime}</div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Concept Details */}
          {selectedConcept && (
            <Card className="dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Current Focus</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">{selectedConcept.title}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {selectedConcept.masteryScore.toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">Mastery Score</div>
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getProgressColor(selectedConcept.masteryScore)} transition-all duration-500`}
                      style={{ width: `${(selectedConcept.masteryScore / 10) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center space-x-2">
                      <Video className="w-4 h-4 text-blue-500" />
                      <span>Videos</span>
                    </span>
                    <span className="font-medium">
                      {selectedConcept.videosWatched}/{selectedConcept.totalVideos}
                    </span>
                  </div>
                  <Progress
                    value={(selectedConcept.videosWatched / selectedConcept.totalVideos) * 100}
                    className="h-2"
                  />

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center space-x-2">
                      <Code className="w-4 h-4 text-green-500" />
                      <span>Problems</span>
                    </span>
                    <span className="font-medium">
                      {selectedConcept.problemsSolved}/{selectedConcept.totalProblems}
                    </span>
                  </div>
                  <Progress
                    value={(selectedConcept.problemsSolved / selectedConcept.totalProblems) * 100}
                    className="h-2"
                  />

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-purple-500" />
                      <span>Articles</span>
                    </span>
                    <span className="font-medium">
                      {selectedConcept.articlesRead}/{selectedConcept.totalArticles}
                    </span>
                  </div>
                  <Progress
                    value={(selectedConcept.articlesRead / selectedConcept.totalArticles) * 100}
                    className="h-2"
                  />
                </div>

                <div className="pt-4 border-t dark:border-gray-700">
                  <Button className="w-full" size="sm" asChild>
                    <Link href={`/courses/${params.id}/concepts/${selectedConcept.id}`}>Continue Learning</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Course Stats */}
          <Card className="dark:bg-gray-800/80 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Course Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{completedTopics}</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {totalTopics - completedTopics}
                  </div>
                  <div className="text-xs text-muted-foreground">Remaining</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Mastery</span>
                  <span className="font-medium">{overallProgress.toFixed(1)}/10</span>
                </div>
                <Progress value={overallProgress * 10} className="h-2" />
              </div>

              <div className="text-center pt-2">
                <Badge className={`${getMasteryColor(overallProgress)} border-0`}>
                  {getMasteryIcon(overallProgress)}
                  <span className="ml-1">{getMasteryLabel(overallProgress)}</span>
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="dark:bg-gray-800/80 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                Practice Problems
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Video className="w-4 h-4 mr-2" />
                Watch Next Video
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Award className="w-4 h-4 mr-2" />
                Take Assessment
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Join Discussion
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
