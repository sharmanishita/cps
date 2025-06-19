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
import { BookOpen, Mail, Lock, Eye, EyeOff, AlertCircle, User, Github, CheckCircle, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: true,
  })

  const getPasswordStrength = (password: string) => {
    let strength = 0
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }

    strength = Object.values(checks).filter(Boolean).length
    return { strength: (strength / 5) * 100, checks }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the Terms of Service")
      setIsLoading(false)
      return
    }

    if (passwordStrength.strength < 60) {
      setError("Please choose a stronger password")
      setIsLoading(false)
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      router.push("/dashboard")
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignup = async (provider: string) => {
    setIsLoading(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/dashboard")
    } catch (err) {
      setError(`${provider} signup failed. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  const getStrengthColor = (strength: number) => {
    if (strength < 40) return "bg-red-500"
    if (strength < 80) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = (strength: number) => {
    if (strength < 40) return "Weak"
    if (strength < 80) return "Medium"
    return "Strong"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Masterly
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create your account</h1>
          <p className="text-gray-600 dark:text-gray-400">Start your personalized learning journey today</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
              <ThemeToggle />
            </div>
            <CardDescription>Create your account to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Social Signup Buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-12 text-left justify-start space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleSocialSignup("Google")}
                disabled={isLoading}
              >
                <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </div>
                <span>Sign up with Google</span>
              </Button>

              <Button
                variant="outline"
                className="w-full h-12 text-left justify-start space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleSocialSignup("Microsoft")}
                disabled={isLoading}
              >
                <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4">
                    <path fill="#f25022" d="M1 1h10v10H1z" />
                    <path fill="#00a4ef" d="M13 1h10v10H13z" />
                    <path fill="#7fba00" d="M1 13h10v10H1z" />
                    <path fill="#ffb900" d="M13 13h10v10H13z" />
                  </svg>
                </div>
                <span>Sign up with Microsoft</span>
              </Button>

              <Button
                variant="outline"
                className="w-full h-12 text-left justify-start space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleSocialSignup("GitHub")}
                disabled={isLoading}
              >
                <Github className="w-5 h-5" />
                <span>Sign up with GitHub</span>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or sign up with email</span>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      className="pl-10 h-12"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    className="h-12"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    className="pl-10 h-12"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="pl-10 pr-10 h-12"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Password strength</span>
                      <span
                        className={`font-medium ${passwordStrength.strength >= 80 ? "text-green-600" : passwordStrength.strength >= 40 ? "text-yellow-600" : "text-red-600"}`}
                      >
                        {getStrengthText(passwordStrength.strength)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength.strength)}`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div
                        className={`flex items-center space-x-1 ${passwordStrength.checks.length ? "text-green-600" : "text-gray-400"}`}
                      >
                        {passwordStrength.checks.length ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                        <span>8+ characters</span>
                      </div>
                      <div
                        className={`flex items-center space-x-1 ${passwordStrength.checks.uppercase ? "text-green-600" : "text-gray-400"}`}
                      >
                        {passwordStrength.checks.uppercase ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                        <span>Uppercase</span>
                      </div>
                      <div
                        className={`flex items-center space-x-1 ${passwordStrength.checks.lowercase ? "text-green-600" : "text-gray-400"}`}
                      >
                        {passwordStrength.checks.lowercase ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                        <span>Lowercase</span>
                      </div>
                      <div
                        className={`flex items-center space-x-1 ${passwordStrength.checks.number ? "text-green-600" : "text-gray-400"}`}
                      >
                        {passwordStrength.checks.number ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                        <span>Number</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10 h-12"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-600">Passwords do not match</p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.subscribeNewsletter}
                    onCheckedChange={(checked) => setFormData({ ...formData, subscribeNewsletter: checked as boolean })}
                  />
                  <Label htmlFor="newsletter" className="text-sm">
                    Subscribe to our newsletter for learning tips and updates
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isLoading || !formData.agreeToTerms}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
