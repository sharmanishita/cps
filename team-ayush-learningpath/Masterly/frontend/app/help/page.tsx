"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { HelpCircle, MessageCircle, Mail, Phone, BookOpen, Video, Search, ExternalLink, Send } from "lucide-react"

export default function HelpPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "support", message: "Hi! How can I help you today?", time: "Just now" },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const faqs = [
    {
      question: "How do I track my learning progress?",
      answer:
        "You can track your progress through the Progress tab in your dashboard. It shows detailed analytics including concepts mastered, time spent, quiz scores, and skill development across different areas.",
    },
    {
      question: "Can I change my learning path?",
      answer:
        "Yes! You can modify your learning path at any time by going to the Learning Paths section. You can add new courses, remove existing ones, or completely switch to a different path based on your goals.",
    },
    {
      question: "How do mock tests work?",
      answer:
        "Mock tests simulate real interview conditions with timed questions across different difficulty levels. After completion, you'll receive detailed feedback, explanations for each question, and recommendations for improvement.",
    },
    {
      question: "What happens if I miss my daily study goal?",
      answer:
        "Missing your daily goal won't affect your overall progress. The system will adjust your recommendations and may suggest shorter sessions to help you get back on track. Consistency is more important than perfection!",
    },
    {
      question: "How are achievements calculated?",
      answer:
        "Achievements are based on various metrics like study streaks, quiz performance, course completions, and skill improvements. Each achievement has specific criteria that you can view in the Progress section.",
    },
    {
      question: "Can I download my certificates?",
      answer:
        "Yes, once you complete a course or learning path, you can download your certificate from the Achievements section. Certificates include verification codes and can be shared on professional networks.",
    },
  ]

  const handleSearch = () => {
    if (searchQuery.trim()) {
      toast({
        title: "Search Results",
        description: `Found ${Math.floor(Math.random() * 10) + 1} articles related to "${searchQuery}"`,
      })
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: chatMessages.length + 1,
        sender: "user",
        message: newMessage,
        time: "Just now",
      }
      setChatMessages([...chatMessages, userMessage])

      // Simulate support response
      setTimeout(() => {
        const supportResponse = {
          id: chatMessages.length + 2,
          sender: "support",
          message:
            "Thanks for your message! I'm looking into that for you. Is there anything specific you'd like me to help you with?",
          time: "Just now",
        }
        setChatMessages((prev) => [...prev, supportResponse])
      }, 1000)

      setNewMessage("")
    }
  }

  const handleContactSubmit = () => {
    if (contactForm.name && contactForm.email && contactForm.subject && contactForm.message) {
      toast({
        title: "Message Sent",
        description: "Your support request has been submitted. We'll get back to you within 24 hours.",
      })
      setContactForm({ name: "", email: "", subject: "", message: "" })
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
    }
  }

  const openUserGuide = () => {
    toast({
      title: "Opening User Guide",
      description: "The comprehensive user guide is opening in a new tab.",
    })
    // In a real app, this would open a new tab with the user guide
    window.open("#", "_blank")
  }

  const openVideoTutorials = () => {
    toast({
      title: "Opening Video Tutorials",
      description: "Video tutorial library is opening in a new tab.",
    })
    // In a real app, this would open a new tab with video tutorials
    window.open("#", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Help & Support</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card
              className="dark:bg-gray-800/80 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={openUserGuide}
            >
              <CardContent className="p-6 text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">User Guide</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Complete guide to using Masterly</p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Guide
                </Button>
              </CardContent>
            </Card>

            <Card
              className="dark:bg-gray-800/80 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={openVideoTutorials}
            >
              <CardContent className="p-6 text-center">
                <Video className="w-8 h-8 mx-auto mb-3 text-green-600" />
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Video Tutorials</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Watch step-by-step tutorials</p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Watch Videos
                </Button>
              </CardContent>
            </Card>

            <Card
              className="dark:bg-gray-800/80 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setChatOpen(true)}
            >
              <CardContent className="p-6 text-center">
                <MessageCircle className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Live Chat</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Chat with our support team</p>
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card className="dark:bg-gray-800/80 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search for help articles, tutorials, or common issues..."
                  className="flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button onClick={handleSearch}>Search</Button>
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card className="dark:bg-gray-800/80 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <HelpCircle className="w-5 h-5 mr-2" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Find quick answers to the most common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-gray-900 dark:text-white">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="dark:bg-gray-800/80 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Mail className="w-5 h-5 mr-2" />
                Contact Support
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Can't find what you're looking for? Send us a message
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">Name *</label>
                  <Input
                    placeholder="Your full name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">Email *</label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">Subject *</label>
                <Input
                  placeholder="Brief description of your issue"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">Message *</label>
                <Textarea
                  placeholder="Please describe your issue in detail..."
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                />
              </div>
              <Button className="w-full" onClick={handleContactSubmit}>
                <Mail className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Support Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Monday - Friday</span>
                  <span className="text-gray-900 dark:text-white">9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Saturday</span>
                  <span className="text-gray-900 dark:text-white">10:00 AM - 4:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Sunday</span>
                  <span className="text-gray-900 dark:text-white">Closed</span>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Other Ways to Reach Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-900 dark:text-white">support@Masterly.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span className="text-gray-900 dark:text-white">+1 (555) 123-HELP</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-900 dark:text-white">Live chat available 24/7</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Live Chat Dialog */}
        <Dialog open={chatOpen} onOpenChange={setChatOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Live Support Chat
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Online</span>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Chat Messages */}
              <div className="h-64 overflow-y-auto space-y-3 p-3 border rounded-lg bg-gray-50 dark:bg-gray-900">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        msg.sender === "user" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 border"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
