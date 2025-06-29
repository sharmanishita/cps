"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Play, Send, ArrowLeft, ArrowRight, Trophy, X } from "lucide-react"

interface TestCase {
  input: string
  output: string
}

interface Problem {
  id: number
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  description: string
  starterCode: {
    python: string
    java: string
    cpp: string
    javascript: string
  }
  testCases: TestCase[]
  solved: boolean
}

interface ProblemSolverProps {
  problems: Problem[]
}

export function ProblemSolver({ problems }: ProblemSolverProps) {
  const [currentProblem, setCurrentProblem] = useState(problems[0])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof currentProblem.starterCode>("python")
  const [code, setCode] = useState(currentProblem.starterCode.python)
  const [testResults, setTestResults] = useState<{ passed: boolean; output: string; expected: string }[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const nextProblem = () => {
    if (currentIndex < problems.length - 1) {
      const nextIndex = currentIndex + 1
      const nextProblem = problems[nextIndex]
      setCurrentIndex(nextIndex)
      setCurrentProblem(nextProblem)
      setCode(nextProblem.starterCode[selectedLanguage])
      setShowResults(false)
      setTestResults([])
    }
  }

  const prevProblem = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1
      const prevProblem = problems[prevIndex]
      setCurrentIndex(prevIndex)
      setCurrentProblem(prevProblem)
      setCode(prevProblem.starterCode[selectedLanguage])
      setShowResults(false)
      setTestResults([])
    }
  }

  const handleLanguageChange = (language: keyof typeof currentProblem.starterCode) => {
    setSelectedLanguage(language)
    setCode(currentProblem.starterCode[language])
  }

  const runTests = async () => {
    setIsRunning(true)
    setShowResults(false)

    // Simulate test execution
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock test results
    const results = currentProblem.testCases.map((testCase, index) => ({
      passed: Math.random() > 0.3, // 70% pass rate for demo
      output: testCase.output,
      expected: testCase.output,
    }))

    setTestResults(results)
    setShowResults(true)
    setIsRunning(false)
  }

  const submitSolution = async () => {
    setIsRunning(true)

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock successful submission
    console.log("Solution submitted for problem:", currentProblem.id)
    setIsRunning(false)
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

  return (
    <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
      {/* Problem Description */}
      <div className="space-y-4">
        <Card className="dark:bg-gray-800/80 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-gray-900 dark:text-white mb-2">
                  {currentIndex + 1}. {currentProblem.title}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className={getDifficultyColor(currentProblem.difficulty)}>{currentProblem.difficulty}</Badge>
                  {currentProblem.solved && (
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      <Trophy className="w-3 h-3 mr-1" />
                      Solved
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={prevProblem} disabled={currentIndex === 0}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextProblem}
                  disabled={currentIndex === problems.length - 1}
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                {currentProblem.description}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Cases */}
        <Card className="dark:bg-gray-800/80 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Test Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentProblem.testCases.map((testCase, index) => (
                <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900 dark:text-white mb-1">Test Case {index + 1}:</div>
                    <div className="space-y-1 text-gray-600 dark:text-gray-300">
                      <div>
                        <strong>Input:</strong> {testCase.input}
                      </div>
                      <div>
                        <strong>Expected Output:</strong> {testCase.output}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        {showResults && (
          <Card className="dark:bg-gray-800/80 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
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
                    {!result.passed && (
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        <div>Expected: {result.expected}</div>
                        <div>Got: {result.output}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Code Editor */}
      <div className="space-y-4">
        <Card className="dark:bg-gray-800/80 dark:border-gray-700 h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900 dark:text-white">Code Editor</CardTitle>
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
            </div>
          </CardHeader>

          <CardContent className="flex flex-col h-full">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 font-mono text-sm min-h-[400px] resize-none"
              placeholder="Write your solution here..."
            />

            <div className="flex items-center justify-between mt-4 pt-4 border-t dark:border-gray-700">
              <div className="text-sm text-muted-foreground">
                Problem {currentIndex + 1} of {problems.length}
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={runTests} disabled={isRunning}>
                  {isRunning ? (
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  <span className="ml-2">Run Tests</span>
                </Button>

                <Button onClick={submitSolution} disabled={isRunning}>
                  {isRunning ? (
                    <div className="w-4 h-4 border-2 border-white border-t-gray-300 rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span className="ml-2">Submit</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
