"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Star,
  Clock,
  Users,
  BookOpen,
  Play,
  Code,
  Database,
  Brain,
  Palette,
  Globe,
  Smartphone,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Courses")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedSort, setSelectedSort] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { name: "All Courses", count: 150, active: true },
    { name: "Programming", count: 45, icon: Code },
    { name: "Data Science", count: 32, icon: Database },
    { name: "AI/ML", count: 28, icon: Brain },
    { name: "Design", count: 25, icon: Palette },
    { name: "Web Dev", count: 38, icon: Globe },
    { name: "Mobile", count: 22, icon: Smartphone },
  ]

  const allCourses = [
    {
      id: 1,
      title: "Complete Data Structures & Algorithms",
      instructor: "Sarah Chen",
      description: "Master DSA with 300+ problems and detailed explanations",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
      students: "45K+",
      duration: "12 weeks",
      level: "Beginner to Advanced",
      price: "$99",
      concepts: 85,
      quizzes: 25,
      projects: 8,
      enrolled: true,
      progress: 65,
      category: "Programming",
      skills: ["Arrays", "Trees", "Graphs", "Dynamic Programming"],
    },
    {
      id: 2,
      title: "System Design Masterclass",
      instructor: "Mike Rodriguez",
      description: "Learn to design scalable systems like Netflix, Uber",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      students: "32K+",
      duration: "8 weeks",
      level: "Intermediate",
      price: "$129",
      concepts: 45,
      quizzes: 15,
      projects: 6,
      enrolled: true,
      progress: 30,
      category: "Programming",
      skills: ["Load Balancing", "Databases", "Caching", "Microservices"],
    },
    {
      id: 3,
      title: "Machine Learning A-Z",
      instructor: "Dr. Emily Watson",
      description: "From linear regression to deep neural networks",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      students: "28K+",
      duration: "16 weeks",
      level: "Intermediate",
      price: "$149",
      concepts: 95,
      quizzes: 30,
      projects: 12,
      enrolled: false,
      progress: 0,
      category: "AI/ML",
      skills: ["Regression", "Classification", "Neural Networks", "NLP"],
    },
    {
      id: 4,
      title: "React & Next.js Complete Guide",
      instructor: "Ankit Thompson",
      description: "Build modern web applications with React ecosystem",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
      students: "38K+",
      duration: "10 weeks",
      level: "Beginner",
      price: "$89",
      concepts: 65,
      quizzes: 20,
      projects: 10,
      enrolled: false,
      progress: 0,
      category: "Web Dev",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      id: 5,
      title: "Mobile App Development with Flutter",
      instructor: "Lisa Park",
      description: "Create beautiful cross-platform mobile applications",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.5,
      students: "22K+",
      duration: "12 weeks",
      level: "Intermediate",
      price: "$119",
      concepts: 75,
      quizzes: 22,
      projects: 8,
      enrolled: false,
      progress: 0,
      category: "Mobile",
      skills: ["Flutter", "Dart", "Firebase", "State Management"],
    },
    {
      id: 6,
      title: "UI/UX Design Fundamentals",
      instructor: "David Kim",
      description: "Learn design principles and create stunning interfaces",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      students: "25K+",
      duration: "8 weeks",
      level: "Beginner",
      price: "$79",
      concepts: 45,
      quizzes: 15,
      projects: 6,
      enrolled: false,
      progress: 0,
      category: "Design",
      skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
    },
  ]

  // Filter courses based on search and filters
  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "All Courses" || course.category === selectedCategory

    const matchesLevel =
      selectedLevel === "all" ||
      (selectedLevel === "beginner" && course.level.toLowerCase().includes("beginner")) ||
      (selectedLevel === "intermediate" && course.level.toLowerCase().includes("intermediate")) ||
      (selectedLevel === "advanced" && course.level.toLowerCase().includes("advanced"))

    return matchesSearch && matchesCategory && matchesLevel
  })

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (selectedSort) {
      case "rating":
        return b.rating - a.rating
      case "students":
        return Number.parseInt(b.students.replace(/\D/g, "")) - Number.parseInt(a.students.replace(/\D/g, ""))
      case "price-low":
        return Number.parseInt(a.price.replace(/\D/g, "")) - Number.parseInt(b.price.replace(/\D/g, ""))
      case "price-high":
        return Number.parseInt(b.price.replace(/\D/g, "")) - Number.parseInt(a.price.replace(/\D/g, ""))
      case "newest":
        return b.id - a.id
      default: // popular
        return Number.parseInt(b.students.replace(/\D/g, "")) - Number.parseInt(a.students.replace(/\D/g, ""))
    }
  })

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All Courses")
    setSelectedLevel("all")
    setSelectedSort("popular")
  }

  const hasActiveFilters =
    searchQuery || selectedCategory !== "All Courses" || selectedLevel !== "all" || selectedSort !== "popular"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Explore Courses</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Discover courses tailored to your learning goals</p>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search courses, instructors, or topics..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {hasActiveFilters && <div className="w-2 h-2 bg-blue-500 rounded-full ml-2" />}
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Level</label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Sort By</label>
                  <Select value={selectedSort} onValueChange={setSelectedSort}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2 flex items-end">
                  {hasActiveFilters && (
                    <Button variant="outline" onClick={clearFilters} className="flex items-center">
                      <X className="w-4 h-4 mr-2" />
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            Showing {sortedCourses.length} of {allCourses.length} courses
            {searchQuery && ` for "${searchQuery}"`}
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
                    <div className="flex items-center space-x-3">
                      {category.icon && <category.icon className="w-4 h-4" />}
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Courses Grid */}
          <div className="lg:col-span-3">
            {sortedCourses.length === 0 ? (
              <Card className="dark:bg-gray-800/80 dark:border-gray-700">
                <CardContent className="text-center py-12">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No courses found</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <Button onClick={clearFilters}>Clear all filters</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {sortedCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 dark:bg-gray-800/80 dark:border-gray-700"
                  >
                    <div className="relative">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-3 left-3 bg-white/90 text-gray-700">{course.level}</Badge>
                      {course.enrolled && (
                        <Badge className="absolute top-3 right-3 bg-green-500 text-white">Enrolled</Badge>
                      )}
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{course.rating}</span>
                          <span className="text-sm text-gray-500">({course.students})</span>
                        </div>
                        <span className="text-lg font-bold text-blue-600">{course.price}</span>
                      </div>

                      <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-300">by {course.instructor}</p>
                      <CardDescription className="mt-2">{course.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {course.enrolled && (
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600 dark:text-gray-300">Progress</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      )}

                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.concepts}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Skills you'll learn:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {course.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {course.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{course.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        {course.enrolled ? (
                          <Button className="flex-1" asChild>
                            <Link href={`/courses/${course.id}`}>
                              <Play className="w-4 h-4 mr-2" />
                              Continue Learning
                            </Link>
                          </Button>
                        ) : (
                          <>
                            <Button className="flex-1" asChild>
                              <Link href={`/courses/${course.id}`}>Enroll Now</Link>
                            </Button>
                            <Button variant="outline" size="icon">
                              <BookOpen className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Load More */}
            {sortedCourses.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Courses
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
