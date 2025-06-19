"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { TrendingUp, Clock, Brain, Calendar, Star, CheckCircle } from "lucide-react"

export default function ProgressPage() {
  const weeklyProgress = [
    { day: "Mon", concepts: 3, time: 2.5, quizzes: 1 },
    { day: "Tue", concepts: 5, time: 3.2, quizzes: 2 },
    { day: "Wed", concepts: 2, time: 1.8, quizzes: 1 },
    { day: "Thu", concepts: 4, time: 2.9, quizzes: 3 },
    { day: "Fri", concepts: 6, time: 4.1, quizzes: 2 },
    { day: "Sat", concepts: 3, time: 2.2, quizzes: 1 },
    { day: "Sun", concepts: 4, time: 3.0, quizzes: 2 },
  ]

  const monthlyProgress = [
    { month: "Aug", score: 65, concepts: 45 },
    { month: "Sep", score: 72, concepts: 58 },
    { month: "Oct", score: 78, concepts: 67 },
    { month: "Nov", score: 85, concepts: 72 },
    { month: "Dec", score: 89, concepts: 78 },
  ]

  const skillDistribution = [
    { name: "Data Structures", value: 85, color: "#3b82f6" },
    { name: "Algorithms", value: 78, color: "#10b981" },
    { name: "System Design", value: 65, color: "#f59e0b" },
    { name: "Machine Learning", value: 45, color: "#ef4444" },
    { name: "Web Development", value: 92, color: "#8b5cf6" },
  ]

  const radarData = [
    { subject: "Problem Solving", A: 85, fullMark: 100 },
    { subject: "Code Quality", A: 78, fullMark: 100 },
    { subject: "Speed", A: 65, fullMark: 100 },
    { subject: "Debugging", A: 82, fullMark: 100 },
    { subject: "Testing", A: 70, fullMark: 100 },
    { subject: "Documentation", A: 75, fullMark: 100 },
  ]

  const learningStats = [
    { label: "Total Study Time", value: "156h 30m", icon: Clock, color: "text-blue-600" },
    { label: "Concepts Mastered", value: "234", icon: CheckCircle, color: "text-green-600" },
    { label: "Quizzes Completed", value: "89", icon: Brain, color: "text-purple-600" },
    { label: "Average Score", value: "87%", icon: Star, color: "text-yellow-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Learning Analytics</h1>
          <p className="text-muted-foreground text-gray-600 dark:text-gray-300">
            Track your progress and identify areas for improvement
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {learningStats.map((stat, index) => (
            <Card key={index} className="dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">{stat.label}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <p className="text-xs text-muted-foreground text-gray-600 dark:text-gray-300">
                  {index === 0 && "+12h this week"}
                  {index === 1 && "+18 this week"}
                  {index === 2 && "+7 this week"}
                  {index === 3 && "+3% this month"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Weekly Activity */}
              <Card className="dark:bg-gray-800/80 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900 dark:text-white">
                    <Calendar className="w-5 h-5 mr-2" />
                    Weekly Activity
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Your learning activity over the past week
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ChartContainer
                    config={{
                      concepts: { label: "Concepts", color: "hsl(var(--chart-1))" },
                      time: { label: "Hours", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyProgress} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                        <XAxis dataKey="day" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="concepts" fill="var(--color-concepts)" name="Concepts" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Monthly Progress */}
              <Card className="dark:bg-gray-800/80 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900 dark:text-white">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Monthly Progress
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Your improvement over the past 5 months
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ChartContainer
                    config={{
                      score: { label: "Average Score", color: "hsl(var(--chart-1))" },
                      concepts: { label: "Concepts Learned", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyProgress} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="#3b82f6"
                          name="Average Score %"
                          strokeWidth={3}
                          dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Current Courses Progress */}
            <Card className="dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Current Courses Progress</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Your progress in enrolled courses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { name: "Data Structures & Algorithms", progress: 75, concepts: "34/45", nextTopic: "Binary Trees" },
                  { name: "System Design", progress: 45, concepts: "14/32", nextTopic: "Load Balancing" },
                  { name: "Machine Learning", progress: 20, concepts: "12/58", nextTopic: "Linear Regression" },
                ].map((course, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white">{course.name}</h4>
                      <Badge variant="outline">{course.progress}%</Badge>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <div className="flex items-center justify-between text-sm text-muted-foreground text-gray-600 dark:text-gray-300">
                      <span>{course.concepts} concepts</span>
                      <span>Next: {course.nextTopic}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Performance Radar */}
              <Card className="dark:bg-gray-800/80 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Performance Analysis</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Your strengths and areas for improvement
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ChartContainer
                    config={{
                      performance: { label: "Performance", color: "hsl(var(--chart-1))" },
                    }}
                    className="h-[400px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                        <PolarGrid stroke="#374151" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: "#6b7280", fontSize: 12 }} />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#6b7280", fontSize: 10 }} />
                        <Radar
                          name="Performance"
                          dataKey="A"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Quiz Performance */}
              <Card className="dark:bg-gray-800/80 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Quiz Performance Trends</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Your quiz scores over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { quiz: "Arrays & Strings", score: 92, date: "2 days ago", difficulty: "Medium" },
                      { quiz: "Linked Lists", score: 88, date: "5 days ago", difficulty: "Easy" },
                      { quiz: "Trees & Graphs", score: 76, date: "1 week ago", difficulty: "Hard" },
                      { quiz: "Dynamic Programming", score: 84, date: "2 weeks ago", difficulty: "Hard" },
                      { quiz: "Sorting Algorithms", score: 95, date: "3 weeks ago", difficulty: "Medium" },
                    ].map((quiz, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{quiz.quiz}</h4>
                          <p className="text-sm text-muted-foreground text-gray-600 dark:text-gray-300">{quiz.date}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge
                            variant={
                              quiz.difficulty === "Easy"
                                ? "secondary"
                                : quiz.difficulty === "Medium"
                                  ? "default"
                                  : "destructive"
                            }
                          >
                            {quiz.difficulty}
                          </Badge>
                          <div
                            className={`text-lg font-bold ${quiz.score >= 90 ? "text-green-600" : quiz.score >= 75 ? "text-blue-600" : "text-yellow-600"}`}
                          >
                            {quiz.score}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Skill Distribution */}
              <Card className="dark:bg-gray-800/80 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Skill Proficiency</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Your current skill levels across different domains
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ChartContainer
                    config={{
                      skills: { label: "Skills", color: "hsl(var(--chart-1))" },
                    }}
                    className="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={skillDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {skillDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Skill Progress */}
              <Card className="dark:bg-gray-800/80 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Detailed Skill Breakdown</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Progress in each skill area
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {skillDistribution.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.value}%</span>
                      </div>
                      <Progress value={skill.value} className="h-2" />
                      <div className="text-xs text-muted-foreground text-gray-600 dark:text-gray-300">
                        {skill.value >= 80 ? "Expert" : skill.value >= 60 ? "Intermediate" : "Beginner"}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recommended Focus Areas */}
            <Card className="dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Recommended Focus Areas</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Based on your current progress and goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      area: "Machine Learning",
                      reason: "Lowest proficiency score",
                      priority: "High",
                      color: "border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800",
                    },
                    {
                      area: "System Design",
                      reason: "Important for interviews",
                      priority: "Medium",
                      color: "border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800",
                    },
                    {
                      area: "Advanced Algorithms",
                      reason: "Next logical step",
                      priority: "Low",
                      color: "border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800",
                    },
                  ].map((item, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${item.color}`}>
                      <h4 className="font-medium mb-2 text-gray-900 dark:text-white">{item.area}</h4>
                      <p className="text-sm text-muted-foreground text-gray-600 dark:text-gray-300 mb-3">
                        {item.reason}
                      </p>
                      <Badge
                        variant={
                          item.priority === "High"
                            ? "destructive"
                            : item.priority === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {item.priority} Priority
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
