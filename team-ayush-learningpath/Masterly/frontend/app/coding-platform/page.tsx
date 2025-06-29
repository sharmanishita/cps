"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  X,
  Play,
  Send,
  ArrowLeft,
  ArrowRight,
  Trophy,
  Clock,
  Code,
  FileText,
  TestTube,
  Lightbulb,
  RotateCcw,
} from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface TestCase {
  input: string
  output: string
  explanation?: string
}

interface Problem {
  id: number
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  description: string
  examples: { input: string; output: string; explanation?: string }[]
  constraints: string[]
  hints: string[]
  starterCode: {
    python: string
    java: string
    cpp: string
    javascript: string
  }
  testCases: TestCase[]
  solved: boolean
  category: string
  timeLimit?: number
  memoryLimit?: string
}

export default function CodingPlatform() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  const problemId = searchParams.get("problem")
  const source = searchParams.get("source") // 'concept', 'mock-test', 'practice'
  const testId = searchParams.get("testId")
  const courseId = searchParams.get("courseId")
  const conceptId = searchParams.get("conceptId")
  const returnUrl = searchParams.get("returnUrl")

  const [problems] = useState<Problem[]>([
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      category: "Arrays",
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
        },
        {
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]",
        },
      ],
      constraints: [
        "2 <= nums.length <= 10⁴",
        "-10⁹ <= nums[i] <= 10⁹",
        "-10⁹ <= target <= 10⁹",
        "Only one valid answer exists.",
      ],
      hints: [
        "A really brute force way would be to search for all possible pairs of numbers but that would be too slow.",
        "Try using a hash table to store the complement of each number.",
      ],
      starterCode: {
        python: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Write your solution here
    pass`,
        java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
}`,
        cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};`,
        javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your solution here
};`,
      },
      testCases: [
        { input: "[2,7,11,15], 9", output: "[0,1]" },
        { input: "[3,2,4], 6", output: "[1,2]" },
        { input: "[3,3], 6", output: "[0,1]" },
      ],
      solved: false,
      timeLimit: 1000,
      memoryLimit: "256 MB",
    },
    {
      id: 2,
      title: "Valid Parentheses",
      difficulty: "Easy",
      category: "Stack",
      description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
      examples: [
        {
          input: 's = "()"',
          output: "true",
        },
        {
          input: 's = "()[]{}"',
          output: "true",
        },
        {
          input: 's = "(]"',
          output: "false",
        },
      ],
      constraints: ["1 <= s.length <= 10⁴", "s consists of parentheses only '()[]{}'."],
      hints: [
        "Use a stack to keep track of opening brackets.",
        "When you encounter a closing bracket, check if it matches the most recent opening bracket.",
      ],
      starterCode: {
        python: `def isValid(s):
    """
    :type s: str
    :rtype: bool
    """
    # Write your solution here
    pass`,
        java: `class Solution {
    public boolean isValid(String s) {
        // Write your solution here
        return false;
    }
}`,
        cpp: `class Solution {
public:
    bool isValid(string s) {
        // Write your solution here
        return false;
    }
};`,
        javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    // Write your solution here
};`,
      },
      testCases: [
        { input: '"()"', output: "true" },
        { input: '"()[]{}"', output: "true" },
        { input: '"(]"', output: "false" },
        { input: '"([)]"', output: "false" },
      ],
      solved: true,
      timeLimit: 1000,
      memoryLimit: "256 MB",
    },
  ])

  const [currentProblemIndex, setCurrentProblemIndex] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState<"python" | "java" | "cpp" | "javascript">("python")
  const [code, setCode] = useState("")
  const [testResults, setTestResults] = useState<
    { passed: boolean; output: string; expected: string; input: string }[]
  >([])
  const [isRunning, setIsRunning] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [activeTab, setActiveTab] = useState("description")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const currentProblem = problems[currentProblemIndex]

  useEffect(() => {
    if (problemId) {
      const problemIndex = problems.findIndex((p) => p.id === Number.parseInt(problemId))
      if (problemIndex !== -1) {
        setCurrentProblemIndex(problemIndex)
      }
    }
  }, [problemId, problems])

  useEffect(() => {
    setCode(currentProblem.starterCode[selectedLanguage])
    setShowResults(false)
    setTestResults([])
    setIsSubmitted(false)
  }, [currentProblem, selectedLanguage])

  const nextProblem = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1)
    }
  }

  const prevProblem = () => {
    if (currentProblemIndex > 0) {
      setCurrentProblemIndex(currentProblemIndex - 1)
    }
  }

  const handleLanguageChange = (language: "python" | "java" | "cpp" | "javascript") => {
    setSelectedLanguage(language)
    setCode(currentProblem.starterCode[language])
  }

  const runTests = async () => {
    setIsRunning(true)
    setShowResults(false)
    setActiveTab("results")

    // Simulate test execution
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock test results
    const results = currentProblem.testCases.map((testCase, index) => ({
      passed: Math.random() > 0.2, // 80% pass rate for demo
      output: testCase.output,
      expected: testCase.output,
      input: testCase.input,
    }))

    setTestResults(results)
    setShowResults(true)
    setIsRunning(false)
  }

  const submitSolution = async () => {
    setIsRunning(true)

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mark as submitted
    setIsSubmitted(true)
    setIsRunning(false)

    // Show success toast
    toast({
      title: "Solution Submitted!",
      description: "Your solution has been saved successfully.",
    })

    // Save to localStorage for persistence
    const submissionKey = `problem_${currentProblem.id}_${source}`
    localStorage.setItem(
      submissionKey,
      JSON.stringify({
        code,
        language: selectedLanguage,
        timestamp: new Date().toISOString(),
        problemId: currentProblem.id,
        source,
        testId,
        courseId,
        conceptId,
      }),
    )

    // Navigate back based on source
    setTimeout(() => {
      if (source === "mock-test" && testId) {
        router.push(`/mock-tests/${testId}/start`)
      } else if (source === "concept" && courseId && conceptId) {
        router.push(`/courses/${courseId}/concepts/${conceptId}`)
      } else if (returnUrl) {
        router.push(returnUrl)
      } else {
        router.back()
      }
    }, 2000)
  }

  const resetCode = () => {
    setCode(currentProblem.starterCode[selectedLanguage])
    setShowResults(false)
    setTestResults([])
    setIsSubmitted(false)
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

  const getReturnButtonText = () => {
    if (source === "mock-test") return "Back to Mock Test"
    if (source === "concept") return "Back to Concept"
    return "Back"
  }

  const handleReturn = () => {
    if (source === "mock-test" && testId) {
      router.push(`/mock-tests/${testId}/start`)
    } else if (source === "concept" && courseId && conceptId) {
      router.push(`/courses/${courseId}/concepts/${conceptId}`)
    } else if (returnUrl) {
      router.push(returnUrl)
    } else {
      router.back()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={handleReturn}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {getReturnButtonText()}
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Coding Platform</h1>
            {source && (
              <Badge variant="outline" className="capitalize">
                {source.replace("-", " ")}
              </Badge>
            )}
            {isSubmitted && (
              <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                <CheckCircle className="w-3 h-3 mr-1" />
                Submitted
              </Badge>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={prevProblem} disabled={currentProblemIndex === 0}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {currentProblemIndex + 1} / {problems.length}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={nextProblem}
                disabled={currentProblemIndex === problems.length - 1}
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 p-6 h-[calc(100vh-120px)]">
        {/* Problem Description */}
        <div className="space-y-4 overflow-y-auto">
          <Card className="dark:bg-gray-800/80 dark:border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white mb-2">
                    {currentProblemIndex + 1}. {currentProblem.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={getDifficultyColor(currentProblem.difficulty)}>{currentProblem.difficulty}</Badge>
                    <Badge variant="outline">{currentProblem.category}</Badge>
                    {currentProblem.solved && (
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                        <Trophy className="w-3 h-3 mr-1" />
                        Solved
                      </Badge>
                    )}
                  </div>
                </div>

                {currentProblem.timeLimit && (
                  <div className="text-right text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{currentProblem.timeLimit}ms</span>
                    </div>
                    <div>{currentProblem.memoryLimit}</div>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="description" className="flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    Description
                  </TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="hints" className="flex items-center">
                    <Lightbulb className="w-4 h-4 mr-1" />
                    Hints
                  </TabsTrigger>
                  <TabsTrigger value="results" className="flex items-center">
                    <TestTube className="w-4 h-4 mr-1" />
                    Results
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-4">
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 mb-6">
                      {currentProblem.description}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Constraints:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          {currentProblem.constraints.map((constraint, index) => (
                            <li key={index}>{constraint}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="examples" className="mt-4">
                  <div className="space-y-4">
                    {currentProblem.examples.map((example, index) => (
                      <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Example {index + 1}:</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <strong className="text-gray-900 dark:text-white">Input:</strong>{" "}
                            <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">{example.input}</code>
                          </div>
                          <div>
                            <strong className="text-gray-900 dark:text-white">Output:</strong>{" "}
                            <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">{example.output}</code>
                          </div>
                          {example.explanation && (
                            <div>
                              <strong className="text-gray-900 dark:text-white">Explanation:</strong>{" "}
                              <span className="text-gray-600 dark:text-gray-300">{example.explanation}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="hints" className="mt-4">
                  <div className="space-y-3">
                    {currentProblem.hints.map((hint, index) => (
                      <div
                        key={index}
                        className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                      >
                        <div className="flex items-start space-x-2">
                          <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
                          <div>
                            <div className="font-medium text-blue-900 dark:text-blue-300 mb-1">Hint {index + 1}:</div>
                            <div className="text-sm text-blue-800 dark:text-blue-200">{hint}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="results" className="mt-4">
                  {showResults ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">Test Results</h4>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {testResults.filter((r) => r.passed).length} / {testResults.length} passed
                        </div>
                      </div>

                      {testResults.map((result, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border ${
                            result.passed
                              ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                              : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            {result.passed ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <X className="w-4 h-4 text-red-600" />
                            )}
                            <span className="font-medium text-sm">
                              Test Case {index + 1}: {result.passed ? "Passed" : "Failed"}
                            </span>
                          </div>
                          <div className="text-xs space-y-1">
                            <div>
                              <strong>Input:</strong> {result.input}
                            </div>
                            <div>
                              <strong>Expected:</strong> {result.expected}
                            </div>
                            {!result.passed && (
                              <div>
                                <strong>Got:</strong> {result.output}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      Run your code to see test results here
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Code Editor */}
        <div className="space-y-4">
          <Card className="dark:bg-gray-800/80 dark:border-gray-700 h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900 dark:text-white flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Code Editor
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
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
                  <Button variant="outline" size="sm" onClick={resetCode}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col flex-1">
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 font-mono text-sm min-h-[400px] resize-none"
                placeholder="Write your solution here..."
                disabled={isSubmitted}
              />

              <div className="flex items-center justify-between mt-4 pt-4 border-t dark:border-gray-700">
                <div className="text-sm text-muted-foreground">
                  Problem {currentProblemIndex + 1} of {problems.length}
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={runTests} disabled={isRunning || isSubmitted}>
                    {isRunning ? (
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    <span className="ml-2">Run Tests</span>
                  </Button>

                  <Button onClick={submitSolution} disabled={isRunning || isSubmitted}>
                    {isRunning ? (
                      <div className="w-4 h-4 border-2 border-white border-t-gray-300 rounded-full animate-spin" />
                    ) : isSubmitted ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span className="ml-2">{isSubmitted ? "Submitted" : "Submit"}</span>
                  </Button>
                </div>
              </div>

              {isSubmitted && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-2 text-green-800 dark:text-green-200">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Solution submitted successfully! Redirecting back...</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
