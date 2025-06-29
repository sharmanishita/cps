"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, FileText, Video, Code, BookOpen, ArrowLeft, Trophy, Target, Zap } from "lucide-react"
import Link from "next/link"
import { VideoPlayer } from "@/components/video-player"
import { ArticleReader } from "@/components/article-reader"
import { QuizPlatform } from "@/components/quiz-platform"

interface ConceptData {
  id: number
  title: string
  description: string
  topicId: number
  topicTitle: string
  videos: any[]
  articles: any[]
  problems: any[]
  quiz: any
  masteryScore: number
  progress: {
    videosWatched: number
    totalVideos: number
    problemsSolved: number
    totalProblems: number
    articlesRead: number
    totalArticles: number
    quizCompleted: boolean
  }
}

// Mock data - in real app, this would come from API
const conceptsData: { [key: string]: ConceptData } = {
  "1": {
    id: 1,
    title: "Array Basics",
    description: "Introduction to arrays, declaration, and basic operations",
    topicId: 1,
    topicTitle: "Arrays",
    masteryScore: 9.2,
    progress: {
      videosWatched: 4,
      totalVideos: 4,
      problemsSolved: 8,
      totalProblems: 10,
      articlesRead: 3,
      totalArticles: 3,
      quizCompleted: true,
    },
    videos: [
      {
        id: 1,
        title: "What are Arrays?",
        duration: "8:30",
        thumbnail: "/placeholder.svg?height=180&width=320",
        url: "https://example.com/video1",
        watched: true,
        watchTime: 510,
        totalTime: 510,
      },
      {
        id: 2,
        title: "Array Declaration in Different Languages",
        duration: "12:45",
        thumbnail: "/placeholder.svg?height=180&width=320",
        url: "https://example.com/video2",
        watched: true,
        watchTime: 765,
        totalTime: 765,
      },
      {
        id: 3,
        title: "Array Indexing and Access",
        duration: "10:20",
        thumbnail: "/placeholder.svg?height=180&width=320",
        url: "https://example.com/video3",
        watched: true,
        watchTime: 620,
        totalTime: 620,
      },
      {
        id: 4,
        title: "Common Array Operations",
        duration: "15:15",
        thumbnail: "/placeholder.svg?height=180&width=320",
        url: "https://example.com/video4",
        watched: true,
        watchTime: 915,
        totalTime: 915,
      },
    ],
    articles: [
      {
        id: 1,
        title: "Understanding Arrays: A Comprehensive Guide",
        readTime: "8 min read",
        content: `# Understanding Arrays: A Comprehensive Guide

Arrays are one of the most fundamental data structures in computer science. They provide a way to store multiple elements of the same type in a contiguous block of memory.

## What is an Array?

An array is a collection of elements, each identified by an index or key. Arrays are used to store multiple values in a single variable, instead of declaring separate variables for each value.

## Key Characteristics

1. **Fixed Size**: Most arrays have a fixed size that is determined when the array is created
2. **Homogeneous Elements**: All elements in an array are of the same data type
3. **Indexed Access**: Elements can be accessed using their index position
4. **Contiguous Memory**: Array elements are stored in consecutive memory locations

## Array Declaration

### In Python:
\`\`\`python
# Creating an array
numbers = [1, 2, 3, 4, 5]
names = ["Alice", "Bob", "Charlie"]
\`\`\`

### In Java:
\`\`\`java
// Declaration and initialization
int[] numbers = {1, 2, 3, 4, 5};
String[] names = {"Alice", "Bob", "Charlie"};
\`\`\`

### In C++:
\`\`\`cpp
// Static array
int numbers[5] = {1, 2, 3, 4, 5};
\`\`\`

## Common Operations

### 1. Accessing Elements
Elements in an array can be accessed using their index:
\`\`\`python
first_element = numbers[0]  # Gets the first element
last_element = numbers[-1]  # Gets the last element (Python)
\`\`\`

### 2. Modifying Elements
\`\`\`python
numbers[0] = 10  # Changes first element to 10
\`\`\`

### 3. Finding Length
\`\`\`python
length = len(numbers)  # Python
\`\`\`

## Time Complexity

- **Access**: O(1) - Direct access using index
- **Search**: O(n) - Linear search through elements
- **Insertion**: O(n) - May need to shift elements
- **Deletion**: O(n) - May need to shift elements

## Advantages

1. **Fast Access**: O(1) time complexity for accessing elements
2. **Memory Efficient**: Minimal memory overhead
3. **Cache Friendly**: Contiguous memory layout improves cache performance

## Disadvantages

1. **Fixed Size**: Cannot easily resize (in most languages)
2. **Insertion/Deletion**: Expensive operations requiring element shifting
3. **Memory Waste**: May allocate more memory than needed

## Real-world Applications

- **Image Processing**: Storing pixel values
- **Mathematical Computations**: Matrices and vectors
- **Database Systems**: Storing records
- **Game Development**: Storing game states and positions

Arrays form the foundation for many other data structures and algorithms, making them essential to understand for any programmer.`,
        read: true,
      },
      {
        id: 2,
        title: "Array Memory Layout and Performance",
        readTime: "6 min read",
        content: "# Array Memory Layout and Performance\n\nUnderstanding how arrays are stored in memory...",
        read: true,
      },
      {
        id: 3,
        title: "Best Practices for Array Usage",
        readTime: "5 min read",
        content: "# Best Practices for Array Usage\n\nWhen working with arrays, there are several best practices...",
        read: true,
      },
    ],
    problems: [
      {
        id: 1,
        title: "Find Maximum Element",
        difficulty: "Easy",
        description: `Given an array of integers, find and return the maximum element.

**Example:**
Input: [3, 7, 2, 9, 1]
Output: 9

**Constraints:**
- 1 ≤ array length ≤ 1000
- -1000 ≤ array[i] ≤ 1000`,
        starterCode: {
          python: `def find_max(arr):
    # Write your code here
    pass`,
          java: `public class Solution {
    public int findMax(int[] arr) {
        // Write your code here
        return 0;
    }
}`,
          cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int findMax(vector<int>& arr) {
        // Write your code here
        return 0;
    }
};`,
          javascript: `function findMax(arr) {
    // Write your code here
}`,
        },
        testCases: [
          { input: "[3, 7, 2, 9, 1]", output: "9" },
          { input: "[-5, -2, -10, -1]", output: "-1" },
          { input: "[42]", output: "42" },
        ],
        solved: true,
      },
      {
        id: 2,
        title: "Array Sum",
        difficulty: "Easy",
        description: `Calculate the sum of all elements in an array.

**Example:**
Input: [1, 2, 3, 4, 5]
Output: 15

**Constraints:**
- 1 ≤ array length ≤ 1000
- -1000 ≤ array[i] ≤ 1000`,
        starterCode: {
          python: `def array_sum(arr):
    # Write your code here
    pass`,
          java: `public class Solution {
    public int arraySum(int[] arr) {
        // Write your code here
        return 0;
    }
}`,
          cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int arraySum(vector<int>& arr) {
        // Write your code here
        return 0;
    }
};`,
          javascript: `function arraySum(arr) {
    // Write your code here
}`,
        },
        testCases: [
          { input: "[1, 2, 3, 4, 5]", output: "15" },
          { input: "[-1, -2, -3]", output: "-6" },
          { input: "[0, 0, 0]", output: "0" },
        ],
        solved: true,
      },
    ],
    quiz: {
      id: 1,
      title: "Array Basics Quiz",
      timeLimit: 300, // 5 minutes
      questions: [
        {
          id: 1,
          question: "What is the time complexity of accessing an element in an array by index?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          correct: 0,
        },
        {
          id: 2,
          question: "Which of the following is true about arrays?",
          options: [
            "Arrays can store elements of different data types",
            "Array size can be changed dynamically in all languages",
            "Array elements are stored in contiguous memory locations",
            "Arrays always start with index 1",
          ],
          correct: 2,
        },
        {
          id: 3,
          question: "What happens when you try to access an array element beyond its bounds?",
          options: [
            "Returns null",
            "Returns 0",
            "Causes an error or undefined behavior",
            "Automatically extends the array",
          ],
          correct: 2,
        },
        {
          id: 4,
          question: "In most programming languages, array indexing starts from:",
          options: ["0", "1", "-1", "Depends on the language"],
          correct: 0,
        },
        {
          id: 5,
          question: "What is the space complexity of an array with n elements?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          correct: 2,
        },
      ],
      completed: true,
      score: 5,
      totalQuestions: 5,
    },
  },
}

export default function ConceptPage({ params }: { params: { id: string; conceptId: string } }) {
  const [activeTab, setActiveTab] = useState("videos")
  const [concept, setConcept] = useState<ConceptData | null>(null)

  useEffect(() => {
    // In real app, fetch concept data from API
    const conceptData = conceptsData[params.conceptId]
    if (conceptData) {
      setConcept(conceptData)

      // Set active tab based on progress - go to first incomplete section
      if (conceptData.progress.videosWatched < conceptData.progress.totalVideos) {
        setActiveTab("videos")
      } else if (conceptData.progress.articlesRead < conceptData.progress.totalArticles) {
        setActiveTab("articles")
      } else if (conceptData.progress.problemsSolved < conceptData.progress.totalProblems) {
        setActiveTab("problems")
      } else if (!conceptData.progress.quizCompleted) {
        setActiveTab("quiz")
      }
    }
  }, [params.conceptId])

  if (!concept) {
    return <div>Loading...</div>
  }

  const getMasteryColor = (score: number) => {
    if (score >= 8) return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300"
    if (score >= 7) return "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
    if (score >= 5) return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300"
    return "text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300"
  }

  const getMasteryIcon = (score: number) => {
    if (score >= 8) return <Trophy className="w-4 h-4" />
    if (score >= 7) return <CheckCircle className="w-4 h-4" />
    if (score >= 5) return <Target className="w-4 h-4" />
    return <Zap className="w-4 h-4" />
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
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    }
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
            <span>{concept.topicTitle}</span>
            <span>•</span>
            <span>{concept.title}</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{concept.title}</h1>
              <p className="text-muted-foreground">{concept.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <Badge className={`${getMasteryColor(concept.masteryScore)} border-0`}>
                {getMasteryIcon(concept.masteryScore)}
                <span className="ml-1">Mastery: {concept.masteryScore.toFixed(1)}/10</span>
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
                  {concept.progress.videosWatched}/{concept.progress.totalVideos}
                </div>
                <Progress
                  value={(concept.progress.videosWatched / concept.progress.totalVideos) * 100}
                  className="h-2 mt-2"
                />
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <FileText className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Articles</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {concept.progress.articlesRead}/{concept.progress.totalArticles}
                </div>
                <Progress
                  value={(concept.progress.articlesRead / concept.progress.totalArticles) * 100}
                  className="h-2 mt-2"
                />
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Code className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Problems</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {concept.progress.problemsSolved}/{concept.progress.totalProblems}
                </div>
                <Progress
                  value={(concept.progress.problemsSolved / concept.progress.totalProblems) * 100}
                  className="h-2 mt-2"
                />
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <BookOpen className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Quiz</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {concept.progress.quizCompleted ? "✓" : "○"}
                </div>
                <Progress value={concept.progress.quizCompleted ? 100 : 0} className="h-2 mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="videos" className="flex items-center space-x-2">
              <Video className="w-4 h-4" />
              <span>
                Videos ({concept.progress.videosWatched}/{concept.progress.totalVideos})
              </span>
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>
                Articles ({concept.progress.articlesRead}/{concept.progress.totalArticles})
              </span>
            </TabsTrigger>
            <TabsTrigger value="problems" className="flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span>
                Problems ({concept.progress.problemsSolved}/{concept.progress.totalProblems})
              </span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Quiz {concept.progress.quizCompleted ? "✓" : ""}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos">
            <VideoPlayer videos={concept.videos} />
          </TabsContent>

          <TabsContent value="articles">
            <ArticleReader articles={concept.articles} />
          </TabsContent>

          <TabsContent value="problems">
            <div className="space-y-4">
              {concept.problems.map((problem, index) => (
                <Card key={problem.id} className="dark:bg-gray-800/80 dark:border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg text-gray-900 dark:text-white">
                          {index + 1}. {problem.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                          {problem.solved && (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                              <Trophy className="w-3 h-3 mr-1" />
                              Solved
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button asChild>
                        <Link
                          href={`/coding-platform?problem=${problem.id}&source=concept&courseId=${params.id}&conceptId=${params.conceptId}&returnUrl=${encodeURIComponent(`/courses/${params.id}/concepts/${params.conceptId}`)}`}
                        >
                          <Code className="w-4 h-4 mr-2" />
                          Solve Problem
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {problem.description.split("\n")[0]}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{problem.testCases.length} test cases</span>
                      <span>Points: {problem.points || 10}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quiz">
            <QuizPlatform quiz={concept.quiz} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
