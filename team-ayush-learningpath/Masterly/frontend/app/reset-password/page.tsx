"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, Lock, Eye, EyeOff, AlertCircle, CheckCircle, X } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (passwordStrength.strength < 60) {
      setError("Please choose a stronger password")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSuccess(true)

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (err) {
      setError("Failed to reset password. Please try again.")
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

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Masterly
              </span>
            </div>
          </div>

          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Password Reset Successful!</CardTitle>
                <CardDescription className="mt-2">
                  Your password has been successfully updated. You can now sign in with your new password.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Redirecting to sign in page in 3 seconds...
                </p>
                <Button className="w-full" asChild>
                  <Link href="/login">Continue to Sign In</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Invalid Reset Link</CardTitle>
              <CardDescription>
                This password reset link is invalid or has expired. Please request a new one.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/forgot-password">Request New Reset Link</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Set new password</h1>
          <p className="text-gray-600 dark:text-gray-400">Choose a strong password to secure your account</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
              <ThemeToggle />
            </div>
            <CardDescription>Enter your new password below</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
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
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
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

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Updating password...</span>
                  </div>
                ) : (
                  "Update Password"
                )}
              </Button>
            </form>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Remember your password?{" "}
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
