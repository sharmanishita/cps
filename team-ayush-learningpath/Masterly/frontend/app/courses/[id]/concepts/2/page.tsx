"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CheckCircle,
  FileText,
  Video,
  Code,
  BookOpen,
  ArrowLeft,
  Trophy,
  Play,
  Pause,
  Clock,
  Send,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

export default function ArraySearchingPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("videos")
  const [currentVideo, setCurrentVideo] = useState(0)
  const [currentArticle, setCurrentArticle] = useState(0)
  const [currentProblem, setCurrentProblem] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState("python")
  const [code, setCode] = useState(`def linear_search(arr, target):
    # Write your code here
    pass`)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes

  // Mock data
  const conceptData = {
    id: 2,
    title: "Array Searching",
    description: "Linear search, binary search, and search optimizations",
    masteryScore: 8.7,
    progress: {
      videosWatched: 3,
      totalVideos: 3,
      problemsSolved: 12,
      totalProblems: 15,
      articlesRead: 2,
      totalArticles: 2,
      quizCompleted: true,
    },
  }

  const videos = [
    {
      id: 1,
      title: "Linear Search Algorithm",
      duration: "10:30",
      thumbnail: "/placeholder.svg?height=180&width=320",
      watched: true,
    },
    {
      id: 2,
      title: "Binary Search Implementation",
      duration: "15:45",
      thumbnail: "/placeholder.svg?height=180&width=320",
      watched: true,
    },
    {
      id: 3,
      title: "Search Algorithm Optimizations",
      duration: "12:20",
      thumbnail: "/placeholder.svg?height=180&width=320",
      watched: true,
    },
  ]

  const articles = [
    {
      id: 1,
      title: "Understanding Search Algorithms",
      readTime: "10 min read",
      content: `# Understanding Search Algorithms

Search algorithms are fundamental to computer science and are used to locate specific elements within data structures.

## Linear Search

Linear search is the simplest search algorithm. It sequentially checks each element until the target is found or the end is reached.

### Algorithm:
\`\`\`python
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1
\`\`\`

**Time Complexity:** O(n)
**Space Complexity:** O(1)

## Binary Search

Binary search is much more efficient but requires the array to be sorted. It repeatedly divides the search interval in half.

### Algorithm:
\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
\`\`\`

**Time Complexity:** O(log n)
**Space Complexity:** O(1)

## When to Use Each

- **Linear Search**: Use when the array is unsorted or small
- **Binary Search**: Use when the array is sorted and you need efficiency

Understanding these algorithms is crucial for efficient programming and forms the basis for more complex search techniques.`,
      read: true,
    },
    {
      id: 2,
      title: "Advanced Search Techniques",
      readTime: "8 min read",
      content: `# Advanced Search Techniques

Beyond basic linear and binary search, there are several advanced techniques for specific scenarios...`,
      read: true,
    },
  ]

  const problems = [
    {
      id: 1,
      title: "Linear Search Implementation",
      difficulty: "Easy",
      description: `Implement linear search to find the index of a target element in an array.

**Example:**
Input: arr = [2, 3, 4, 10, 40], target = 10
Output: 3

**Constraints:**
- 1 ≤ array length ≤ 1000
- -1000 ≤ array[i] ≤ 1000`,
      solved: true,
    },
    {
      id: 2,
      title: "Binary Search Implementation",
      difficulty: "Medium",
      description: `Implement binary search on a sorted array.

**Example:**
Input: arr = [2, 3, 4, 10, 40], target = 10
Output: 3

**Constraints:**
- Array is sorted in ascending order
- 1 ≤ array length ≤ 1000`,
      solved: true,
    },
  ]

  const quizQuestions = [
    {
      id: 1,
      question: "What is the time complexity of linear search?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correct: 2,
    },
    {
      id: 2,
      question: "What is the prerequisite for binary search?",
      options: [
        "Array must be sorted",
        "Array must be unsorted",
        "Array must have unique elements",
        "Array must be of even length",
      ],
      correct: 0,
    },
    {
      id: 3,
      question: "What is the time complexity of binary search?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correct: 1,
    },
    {
      id: 4,
      question: "In binary search, what happens when the middle element is greater than the target?",
      options: ["Search the left half", "Search the right half", "Return the middle index", "Search both halves"],
      correct: 0,
    },
    {
      id: 5,
      question: "Which search algorithm is better for unsorted arrays?",
      options: ["Binary search", "Linear search", "Both are equal", "Neither works"],
      correct: 1,
    },
  ]

  const getMasteryColor = (score: number) => {
    if (score >= 8) return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300"
    if (score >= 7) return "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
    if (score >= 5) return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300"
    return "text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300"
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
            <Link href={`/courses/${params.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
              Data Structures & Algorithms
            </Link>
            <span>•</span>
            <span>Arrays</span>
            <span>•</span>
            <span>{conceptData.title}</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{conceptData.title}</h1>
              <p className="text-muted-foreground">{conceptData.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <Badge className={`${getMasteryColor(conceptData.masteryScore)} border-0`}>
                <Trophy className="w-4 h-4 mr-1" />
                Mastery: {conceptData.masteryScore.toFixed(1)}/10
              </Badge>
              <Button variant="outline" asChild>
                <Link href={`/courses/${params.id}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Course
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mb-6 dark:bg-gray-800/80 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Video className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Videos</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {conceptData.progress.videosWatched}/{conceptData.progress.totalVideos}
                </div>
                <Progress
                  value={(conceptData.progress.videosWatched / conceptData.progress.totalVideos) * 100}
                  className="h-2 mt-2"
                />
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <FileText className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Articles</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {conceptData.progress.articlesRead}/{conceptData.progress.totalArticles}
                </div>
                <Progress
                  value={(conceptData.progress.articlesRead / conceptData.progress.totalArticles) * 100}
                  className="h-2 mt-2"
                />
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Code className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Problems</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {conceptData.progress.problemsSolved}/{conceptData.progress.totalProblems}
                </div>
                <Progress
                  value={(conceptData.progress.problemsSolved / conceptData.progress.totalProblems) * 100}
                  className="h-2 mt-2"
                />
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <BookOpen className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Quiz</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {conceptData.progress.quizCompleted ? "✓" : "○"}
                </div>
                <Progress value={conceptData.progress.quizCompleted ? 100 : 0} className="h-2 mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content - Same structure as Array Basics but with different content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="videos" className="flex items-center space-x-2">
              <Video className="w-4 h-4" />
              <span>
                Videos ({conceptData.progress.videosWatched}/{conceptData.progress.totalVideos})
              </span>
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>
                Articles ({conceptData.progress.articlesRead}/{conceptData.progress.totalArticles})
              </span>
            </TabsTrigger>
            <TabsTrigger value="problems" className="flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span>
                Problems ({conceptData.progress.problemsSolved}/{conceptData.progress.totalProblems})
              </span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Quiz {conceptData.progress.quizCompleted ? "✓" : ""}</span>
            </TabsTrigger>
          </TabsList>

          {/* Videos Tab */}
          <TabsContent value="videos">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="dark:bg-gray-800/80 dark:border-gray-700">
                  <CardContent className="p-0">
                    <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
                      <img
                        src={videos[currentVideo].thumbnail || "/placeholder.svg"}
                        alt={videos[currentVideo].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white bg-black/50 hover:bg-black/70 w-16 h-16"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {videos[currentVideo].title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{videos[currentVideo].duration}</span>
                        </span>
                        {videos[currentVideo].watched && (
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="dark:bg-gray-800/80 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Video Lectures</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {videos.map((video, index) => (
                      <div
                        key={video.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          currentVideo === index
                            ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        }`}
                        onClick={() => setCurrentVideo(index)}
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            className="w-16 h-10 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                              {index + 1}. {video.title}
                            </h4>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                              <span>{video.duration}</span>
                              {video.watched && (
                                <Badge variant="outline" className="text-xs">
                                  Watched
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Articles Tab */}
          <TabsContent value="articles">
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <Card className="dark:bg-gray-800/80 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 dark:text-white mb-2">
                      {articles[currentArticle].title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{articles[currentArticle].readTime}</span>
                      </span>
                      {articles[currentArticle].read && (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Read
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <div className="whitespace-pre-wrap">{articles[currentArticle].content}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="dark:bg-gray-800/80 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Reading List</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {articles.map((article, index) => (
                      <div
                        key={article.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          currentArticle === index
                            ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        }`}
                        onClick={() => setCurrentArticle(index)}
                      >
                        <h4 className="font-medium text-sm text-gray-900 dark:text-white">{article.title}</h4>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                          <span>{article.readTime}</span>
                          {article.read && (
                            <Badge variant="outline" className="text-xs">
                              Read
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Problems Tab */}
          <TabsContent value="problems">
            <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-300px)]">
              <div className="space-y-4">
                <Card className="dark:bg-gray-800/80 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-white mb-2">
                      {currentProblem + 1}. {problems[currentProblem].title}
                    </CardTitle>
                    <Badge
                      className={
                        problems[currentProblem].difficulty === "Easy"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                      }
                    >
                      {problems[currentProblem].difficulty}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                      {problems[currentProblem].description}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="dark:bg-gray-800/80 dark:border-gray-700 h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-gray-900 dark:text-white">Code Editor</CardTitle>
                      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="java">Java</SelectItem>
                          <SelectItem value="cpp">C++</SelectItem>
                          <SelectItem value="javascript">JavaScript</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <Textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="flex-1 font-mono text-sm min-h-[300px] resize-none"
                      placeholder="Write your solution here..."
                    />
                    <div className="flex items-center justify-between mt-4 pt-4 border-t dark:border-gray-700">
                      <div className="text-sm text-muted-foreground">
                        Problem {currentProblem + 1} of {problems.length}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline">
                          <Play className="w-4 h-4 mr-2" />
                          Run Tests
                        </Button>
                        <Button>
                          <Send className="w-4 h-4 mr-2" />
                          Submit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Quiz Tab */}
          <TabsContent value="quiz">
            {!quizStarted ? (
              <Card className="dark:bg-gray-800/80 dark:border-gray-700 max-w-2xl mx-auto">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-gray-900 dark:text-white mb-4">Array Searching Quiz</CardTitle>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-6 text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5" />
                        <span>5 minutes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Trophy className="w-5 h-5" />
                        <span>5 questions</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <Button onClick={() => setQuizStarted(true)} size="lg" className="px-8">
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="dark:bg-gray-800/80 dark:border-gray-700 max-w-4xl mx-auto">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-900 dark:text-white">
                      Question {currentQuestion + 1} of {quizQuestions.length}
                    </CardTitle>
                    <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      <Clock className="w-4 h-4" />
                      <span className="font-mono">{formatTime(timeLeft)}</span>
                    </div>
                  </div>
                  <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-2" />
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      {quizQuestions[currentQuestion].question}
                    </h2>
                    <div className="space-y-3">
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const newAnswers = [...selectedAnswers]
                            newAnswers[currentQuestion] = index
                            setSelectedAnswers(newAnswers)
                          }}
                          className={`w-full p-4 text-left rounded-lg border transition-colors ${
                            selectedAnswers[currentQuestion] === index
                              ? "bg-blue-50 border-blue-300 text-blue-900 dark:bg-blue-900/20 dark:border-blue-600 dark:text-blue-300"
                              : "bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-700/50 dark:border-gray-600 dark:hover:bg-gray-600/50 text-gray-900 dark:text-white"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                      disabled={currentQuestion === 0}
                    >
                      Previous
                    </Button>
                    <div className="text-sm text-muted-foreground">
                      {selectedAnswers.filter((answer) => answer !== undefined).length} of {quizQuestions.length}{" "}
                      answered
                    </div>
                    <Button
                      onClick={() => {
                        if (currentQuestion < quizQuestions.length - 1) {
                          setCurrentQuestion(currentQuestion + 1)
                        } else {
                          setShowResults(true)
                        }
                      }}
                      disabled={selectedAnswers[currentQuestion] === undefined}
                    >
                      {currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
