"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// --- Added LogOut icon for the new button ---
import { BookOpen, Trophy, Target, Clock, TrendingUp, Play, CheckCircle, Brain, Calendar, Award, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"

// --- Define an interface for the user data we expect from the backend ---
interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'user' | 'admin';
}

// --- API client configured to communicate with the backend ---
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

export default function Dashboard() {
    const router = useRouter();
    // --- State to hold user data and loading status ---
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // --- This hook runs once when the page loads to fetch the logged-in user's data ---
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // We use the '/auth/me' route to get the current user's profile
                const response = await api.get('/auth/me');
                setUser(response.data);
            } catch (err) {
                console.error("Not authorized, redirecting to login.", err);
                router.push('/login'); // If user is not logged in, redirect them
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, [router]);

    // --- This function handles the logout process ---
    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            router.push('/login'); // Redirect to login page on successful logout
        } catch (err) {
            console.error("Logout failed:", err);
            // Optionally, show an error toast to the user
        }
    };

    // --- All your hardcoded data remains exactly as it was ---
    const recentCourses = [
        { title: "Data Structures & Algorithms", progress: 75, nextLesson: "Binary Trees", timeSpent: "24h 30m", concepts: { completed: 34, total: 45 }, },
        { title: "System Design", progress: 45, nextLesson: "Load Balancing", timeSpent: "18h 15m", concepts: { completed: 14, total: 32 }, },
        { title: "Machine Learning", progress: 20, nextLesson: "Linear Regression", timeSpent: "8h 45m", concepts: { completed: 12, total: 58 }, },
    ];
    const achievements = [
        { title: "First Course Completed", icon: Trophy, color: "text-yellow-500" },
        { title: "7-Day Streak", icon: Target, color: "text-blue-500" },
        { title: "Quiz Master", icon: Brain, color: "text-purple-500" },
        { title: "Fast Learner", icon: TrendingUp, color: "text-green-500" },
    ];
    const upcomingTests = [
        { title: "DSA Mock Test #3", date: "Tomorrow", duration: "90 min" },
        { title: "System Design Interview", date: "Dec 28", duration: "60 min" },
        { title: "ML Fundamentals Quiz", date: "Dec 30", duration: "45 min" },
    ];

    // --- Display a simple loading message while fetching data ---
    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading Dashboard...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Header */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        {/* --- DYNAMIC USER NAME --- */}
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, {user?.firstName}!</h1>
                        <p className="text-gray-600 dark:text-gray-300">Continue your learning journey</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button
                            asChild
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <Link href="/learning-paths">
                                <Brain className="w-4 h-4 mr-2" />
                                Create Learning Path
                            </Link>
                        </Button>
                        <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                            {/* --- DYNAMIC AVATAR FALLBACK --- */}
                            <AvatarFallback>{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
                        </Avatar>
                        {/* --- FUNCTIONAL LOGOUT BUTTON --- */}
                        <Button variant="ghost" size="icon" onClick={handleLogout} title="Sign Out">
                            <LogOut className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>


            <div className="p-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="dark:bg-gray-800/80 dark:border-gray-700">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">+2 from last month</p>
                        </CardContent>
                    </Card>

                    <Card className="dark:bg-gray-800/80 dark:border-gray-700">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Concepts Mastered</CardTitle>
                            <Trophy className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">89</div>
                            <p className="text-xs text-muted-foreground">+12 this week</p>
                        </CardContent>
                    </Card>

                    <Card className="dark:bg-gray-800/80 dark:border-gray-700">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
                            <Target className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">15 days</div>
                            <p className="text-xs text-muted-foreground">Keep it up!</p>
                        </CardContent>
                    </Card>

                    <Card className="dark:bg-gray-800/80 dark:border-gray-700">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">52h</div>
                            <p className="text-xs text-muted-foreground">This month</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Continue Learning */}
                        <Card className="dark:bg-gray-800/80 dark:border-gray-700">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Play className="w-5 h-5 mr-2 text-blue-600" />
                                    Continue Learning
                                </CardTitle>
                                <CardDescription>Pick up where you left off</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {recentCourses.map((course, index) => (
                                    <div
                                        key={index}
                                        className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">{course.title}</h3>
                                            <Badge variant="secondary">{course.progress}% Complete</Badge>
                                        </div>

                                        <Progress value={course.progress} className="mb-3" />

                                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-3">
                                            <span>Next: {course.nextLesson}</span>
                                            <span>{course.timeSpent} spent</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                                {course.concepts.completed}/{course.concepts.total} concepts
                                            </span>
                                            <Button size="sm" asChild>
                                                <Link href={`/courses/${course.title.toLowerCase().replace(/\s+/g, "-")}`}>Continue</Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Learning Path Recommendation */}
                        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 dark:from-gray-800/90 dark:to-gray-700/90 dark:bg-gray-800/80 dark:border-gray-700">
                            <CardHeader>
                                <CardTitle className="flex items-center text-blue-700 dark:text-blue-300">
                                    <Brain className="w-5 h-5 mr-2" />
                                    Recommended Learning Path
                                </CardTitle>
                                <CardDescription className="text-gray-600 dark:text-gray-300">
                                    Based on your progress and goals
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                                            Full Stack Developer Path
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                                            Complete your journey from algorithms to system design with our curated path
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            <span className="text-sm text-gray-900 dark:text-white">DSA Fundamentals</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">System Design</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-500 rounded-full"></div>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">Backend Development</span>
                                        </div>
                                    </div>

                                    <Button className="w-full" asChild>
                                        <Link href="/learning-paths">View Full Path</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Achievements */}
                        <Card className="dark:bg-gray-800/80 dark:border-gray-700">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Award className="w-5 h-5 mr-2 text-yellow-600" />
                                    Recent Achievements
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {achievements.map((achievement, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                                    >
                                        <achievement.icon className={`w-5 h-5 ${achievement.color}`} />
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">{achievement.title}</span>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full" size="sm" asChild>
                                    <Link href="/progress?tab=achievements">View All Achievements</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Upcoming Tests */}
                        <Card className="dark:bg-gray-800/80 dark:border-gray-700">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                                    Upcoming Tests
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {upcomingTests.map((test, index) => (
                                    <div key={index} className="border dark:border-gray-700 rounded-lg p-3">
                                        <h4 className="font-medium text-sm text-gray-900 dark:text-white">{test.title}</h4>
                                        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300 mt-1">
                                            <span>{test.date}</span>
                                            <span>{test.duration}</span>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full" size="sm" asChild>
                                    <Link href="/mock-tests">View All Tests</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Performance Chart */}
                        <Card className="dark:bg-gray-800/80 dark:border-gray-700">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                                    Weekly Progress
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Concepts Learned</span>
                                        <span className="font-medium">12</span>
                                    </div>
                                    <Progress value={80} />

                                    <div className="flex items-center justify-between text-sm">
                                        <span>Quizzes Completed</span>
                                        <span className="font-medium">8</span>
                                    </div>
                                    <Progress value={65} />

                                    <div className="flex items-center justify-between text-sm">
                                        <span>Study Time</span>
                                        <span className="font-medium">15h</span>
                                    </div>
                                    <Progress value={90} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}