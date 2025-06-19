"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import {
  Bell,
  Shield,
  Download,
  Trash2,
  User,
  Target,
  Camera,
  Eye,
  EyeOff,
  Smartphone,
  Key,
  AlertTriangle,
} from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=80&width=80")

  // Form states
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [profileForm, setProfileForm] = useState({
    firstName: "Ankit",
    lastName: "Pandey",
    email: "Ankit.Pandey@example.com",
    phone: "+91 9234121XXX",
    bio: "Passionate learner focused on software engineering and system design",
  })

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
        toast({
          title: "Photo Updated",
          description: "Your profile photo has been updated successfully.",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setProfileImage("/placeholder.svg?height=80&width=80")
    toast({
      title: "Photo Removed",
      description: "Your profile photo has been removed.",
    })
  }

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match.",
        variant: "destructive",
      })
      return
    }

    if (passwordForm.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    // Simulate password change
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    })
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  const handleEnable2FA = () => {
    setTwoFactorEnabled(true)
    toast({
      title: "2FA Enabled",
      description: "Two-factor authentication has been enabled for your account.",
    })
  }

  const handleDisable2FA = () => {
    setTwoFactorEnabled(false)
    toast({
      title: "2FA Disabled",
      description: "Two-factor authentication has been disabled.",
    })
  }

  const handleProfileSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    })
  }

  const handleDataExport = () => {
    toast({
      title: "Export Started",
      description: "Your data export has been initiated. You'll receive an email when it's ready.",
    })
  }

  const handleAccountDelete = () => {
    toast({
      title: "Account Deletion",
      description: "Account deletion request has been submitted. You'll receive a confirmation email.",
      variant: "destructive",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your account preferences and settings</p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card className="dark:bg-gray-800/80 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Update your personal information and profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profileImage || "/placeholder.svg"} />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        <Camera className="w-4 h-4 mr-2" />
                        Change Photo
                      </label>
                    </Button>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={handleRemovePhoto}
                    >
                      Remove Photo
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profileForm.firstName}
                    onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profileForm.lastName}
                    onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                />
              </div>

              <Button onClick={handleProfileSave}>Save Changes</Button>
            </CardContent>
          </Card>

          {/* Learning Preferences */}
          <Card className="dark:bg-gray-800/80 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Target className="w-5 h-5 mr-2" />
                Learning Preferences
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Customize your learning experience and goals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dailyGoal">Daily Study Goal (hours)</Label>
                  <Select defaultValue="2">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="3">3 hours</SelectItem>
                      <SelectItem value="4">4+ hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Preferred Difficulty</Label>
                  <Select defaultValue="intermediate">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-advance lessons</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Automatically move to the next lesson after completion
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show hints during quizzes</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Display helpful hints when you're stuck</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Practice reminders</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Get reminded to practice concepts you haven't reviewed
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="dark:bg-gray-800/80 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Receive updates about your progress and new content
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Get notified about study reminders and achievements
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly progress reports</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Receive a summary of your weekly learning progress
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Course recommendations</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Get personalized course and content recommendations
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="dark:bg-gray-800/80 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Shield className="w-5 h-5 mr-2" />
                Privacy & Security
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Manage your privacy settings and account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Profile visibility</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Make your profile visible to other learners
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show progress publicly</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Display your learning progress on your public profile
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />

              {/* Change Password Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Key className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>Enter your current password and choose a new one.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handlePasswordChange}>Update Password</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Two-Factor Authentication */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Smartphone className="w-4 h-4 mr-2" />
                    {twoFactorEnabled ? "Manage" : "Enable"} Two-Factor Authentication
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Two-Factor Authentication</DialogTitle>
                    <DialogDescription>
                      {twoFactorEnabled
                        ? "Two-factor authentication is currently enabled for your account."
                        : "Add an extra layer of security to your account."}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    {!twoFactorEnabled ? (
                      <>
                        <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
                          <h4 className="font-medium mb-2">Setup Instructions:</h4>
                          <ol className="text-sm space-y-1 list-decimal list-inside">
                            <li>Download an authenticator app (Google Authenticator, Authy, etc.)</li>
                            <li>Scan the QR code with your app</li>
                            <li>Enter the 6-digit code from your app</li>
                          </ol>
                        </div>
                        <div className="flex justify-center p-4 border rounded-lg">
                          <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            <span className="text-sm text-gray-500">QR Code</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="verification-code">Verification Code</Label>
                          <Input id="verification-code" placeholder="Enter 6-digit code" maxLength={6} />
                        </div>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950">
                          <div className="flex items-center space-x-2">
                            <Shield className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-green-800 dark:text-green-200">
                              Two-factor authentication is active
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Your account is protected with two-factor authentication. You can disable it below if needed.
                        </p>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    {!twoFactorEnabled ? (
                      <Button onClick={handleEnable2FA}>Enable 2FA</Button>
                    ) : (
                      <Button variant="destructive" onClick={handleDisable2FA}>
                        Disable 2FA
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Data & Storage */}
          <Card className="dark:bg-gray-800/80 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Download className="w-5 h-5 mr-2" />
                Data & Storage
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Manage your data and account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Download your data</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Export all your learning data and progress</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleDataExport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
              <Separator />

              {/* Delete Account Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-red-600">Delete account</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center text-red-600">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Delete Account
                    </DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove all your data
                      from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950 dark:border-red-800">
                      <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">What will be deleted:</h4>
                      <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                        <li>• All your learning progress and achievements</li>
                        <li>• Your profile and personal information</li>
                        <li>• All course enrollments and certificates</li>
                        <li>• Your subscription and billing history</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="delete-confirmation">Type "DELETE" to confirm</Label>
                      <Input id="delete-confirmation" placeholder="DELETE" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="destructive" onClick={handleAccountDelete}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
