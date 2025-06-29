"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, Mail, Lock, Eye, EyeOff, AlertCircle, Github } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import axios from "axios"

// A helper instance of Axios configured to talk to our backend
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true, // This is CRUCIAL for sending cookies automatically
});

export default function LoginPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    })

    // --- UPDATED LOGIC: Connects to backend login ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            // This is now a real API call to your backend
            await api.post('/auth/login', {
                email: formData.email,
                password: formData.password,
            });
            // If successful, redirect to the dashboard
            router.push("/dashboard");
        } catch (err: any) {
            // If the backend returns an error, display it
            setError(err.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false)
        }
    }

    // --- UPDATED LOGIC: Connects to backend Google OAuth ---
    const handleSocialLogin = (provider: string) => {
        // This is a simple redirect. The backend handles the entire OAuth flow.
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
            setError("Frontend configuration error: API URL is not set.");
            return;
        }
        window.location.href = `${apiUrl}/auth/${provider.toLowerCase()}`;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header (No Changes) */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Masterly
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back</h1>
                    <p className="text-gray-600 dark:text-gray-400">Sign in to continue your learning journey</p>
                </div>

                <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <CardHeader className="space-y-1 pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
                            <ThemeToggle />
                        </div>
                        <CardDescription>Enter your credentials to access your account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {/* --- Social Login Buttons (Updated) --- */}
                        <div className="space-y-3">
                            <Button
                                variant="outline"
                                className="w-full h-12 text-left justify-start space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700"
                                onClick={() => handleSocialLogin("Google")}
                                disabled={isLoading}
                            >
                                <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" className="w-4 h-4">
                                        {/* Google SVG paths */}
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                </div>
                                <span>Continue with Google</span>
                            </Button>
                            {/* Microsoft and GitHub buttons have been removed */}
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><Separator className="w-full" /></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with email</span></div>
                        </div>

                        {/* Email/Password Form (No Changes) */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input id="email" name="email" type="email" autoComplete="email" placeholder="Enter your email" className="pl-10 h-12" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" className="pl-10 pr-10 h-12" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="remember" checked={formData.rememberMe} onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })} />
                                    <Label htmlFor="remember" className="text-sm">Remember me</Label>
                                </div>
                                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">Forgot password?</Link>
                            </div>

                            <Button type="submit" className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" disabled={isLoading}>
                                {isLoading ? (<div className="flex items-center space-x-2"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Signing in...</span></div>) : ("Sign In")}
                            </Button>
                        </form>

                        <div className="text-center pt-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Don't have an account?{" "}
                                <Link href="/signup" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium">Sign up</Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer (No Changes) */}
                <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
                    <p>
                        By signing in, you agree to our{" "}
                        <Link href="/terms" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">Terms of Service</Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">Privacy Policy</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
