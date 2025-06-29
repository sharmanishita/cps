import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Brain, Target, TrendingUp, Users, ArrowRight, Play, Star, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LandingPage() {
  const courses = [
    {
      title: "Data Structures & Algorithms",
      description: "Master the fundamentals with 200+ problems",
      level: "Beginner to Advanced",
      duration: "8 weeks",
      students: "50K+",
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300",
      concepts: 45,
    },
    {
      title: "System Design",
      description: "Learn to design scalable systems",
      level: "Intermediate",
      duration: "6 weeks",
      students: "30K+",
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300",
      concepts: 32,
    },
    {
      title: "Machine Learning",
      description: "From basics to advanced ML algorithms",
      level: "Intermediate",
      duration: "10 weeks",
      students: "25K+",
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=300",
      concepts: 58,
    },
  ]

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning Paths",
      description: "Get personalized learning recommendations based on your current knowledge and goals",
    },
    {
      icon: Target,
      title: "Adaptive Assessments",
      description: "Dynamic quizzes that adapt to your learning pace and identify knowledge gaps",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Visual progress tracking with detailed analytics and performance insights",
    },
    {
      icon: Users,
      title: "Peer Learning",
      description: "Connect with fellow learners and participate in study groups and discussions",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Masterly
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#courses"
              className="text-gray-600 hover:text-blue-600 transition-colors dark:text-gray-300 dark:hover:text-blue-400"
            >
              Courses
            </Link>
            <Link
              href="#features"
              className="text-gray-600 hover:text-blue-600 transition-colors dark:text-gray-300 dark:hover:text-blue-400"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-gray-600 hover:text-blue-600 transition-colors dark:text-gray-300 dark:hover:text-blue-400"
            >
              Pricing
            </Link>
            <ThemeToggle />
            <Button variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">🚀 AI-Powered Learning Platform</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Master Skills with
              <br />
              Personalized Learning
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience adaptive learning that evolves with you. Get personalized paths, track progress visually, and
              master concepts through interactive quizzes and real-world projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                asChild
              >
                <Link href="/dashboard">
                  Start Learning <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="group">
                <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-blue-600">100K+</div>
                <div className="text-gray-600 dark:text-gray-300">Active Learners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">500+</div>
                <div className="text-gray-600 dark:text-gray-300">Courses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600">95%</div>
                <div className="text-gray-600 dark:text-gray-300">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600">24/7</div>
                <div className="text-gray-600 dark:text-gray-300">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100">✨ Why Choose Masterly</Badge>
            <h2 className="text-4xl font-bold mb-4">Personalized Learning Experience</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our AI-driven platform adapts to your learning style and pace, ensuring optimal knowledge retention
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-gray-900 dark:border-gray-700"
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Visualization */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Visual Learning Paths</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See your learning journey mapped out visually with clear milestones and progress tracking
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 shadow-2xl dark:bg-gray-900 dark:border-gray-700">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Data Structures Learning Path</h3>
                  <p className="text-gray-600 dark:text-gray-300">Beginner to Advanced • 8 weeks</p>
                </div>
                <Badge className="bg-green-100 text-green-700">75% Complete</Badge>
              </div>

              <div className="relative">
                {/* Learning Path Nodes */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <span className="text-sm mt-2 font-medium text-gray-900 dark:text-white">Arrays</span>
                  </div>
                  <div className="flex-1 h-1 bg-green-500 mx-2"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <span className="text-sm mt-2 font-medium text-gray-900 dark:text-white">Linked Lists</span>
                  </div>
                  <div className="flex-1 h-1 bg-green-500 mx-2"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <span className="text-sm mt-2 font-medium text-gray-900 dark:text-white">Stacks</span>
                  </div>
                  <div className="flex-1 h-1 bg-gray-300 mx-2"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 font-bold">
                      4
                    </div>
                    <span className="text-sm mt-2 font-medium text-gray-900 dark:text-white">Trees</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mt-6 dark:bg-gray-700">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Current: Stacks & Queues</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Progress: 3/5 concepts</span>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-600">
                      <div className="w-3/5 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">📚 Popular Courses</Badge>
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Master In-Demand Skills</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose from our curated selection of courses designed by industry experts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-gray-900 dark:border-gray-700"
              >
                <div className="relative">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-white/90 text-gray-700">{course.level}</Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{course.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{course.students} students</span>
                  </div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">{course.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <span>⏱️ {course.duration}</span>
                    <span>📖 {course.concepts} concepts</span>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href="/dashboard">Start Learning</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of learners who have accelerated their careers with personalized learning paths
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">
                Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-gray-400 hover:bg-white hover:text-blue-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Masterly</span>
              </div>
              <p className="text-gray-400">Empowering learners worldwide with personalized education technology.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Learning Paths
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Mock Tests
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Certifications
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Masterly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
