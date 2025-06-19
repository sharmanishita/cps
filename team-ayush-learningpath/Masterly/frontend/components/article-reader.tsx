"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, FileText, ArrowLeft, ArrowRight } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface Article {
  id: number
  title: string
  readTime: string
  content: string
  read: boolean
}

interface ArticleReaderProps {
  articles: Article[]
}

export function ArticleReader({ articles }: ArticleReaderProps) {
  const [currentArticle, setCurrentArticle] = useState(articles[0])
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextArticle = () => {
    if (currentIndex < articles.length - 1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      setCurrentArticle(articles[nextIndex])
    }
  }

  const prevArticle = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1
      setCurrentIndex(prevIndex)
      setCurrentArticle(articles[prevIndex])
    }
  }

  const markAsRead = () => {
    // In real app, this would update the backend
    console.log("Marking article as read:", currentArticle.id)
  }

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      {/* Article Content */}
      <div className="lg:col-span-3">
        <Card className="dark:bg-gray-800/80 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-gray-900 dark:text-white mb-2">{currentArticle.title}</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{currentArticle.readTime}</span>
                  </span>
                  {currentArticle.read && (
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Read
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={prevArticle} disabled={currentIndex === 0}>
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextArticle}
                  disabled={currentIndex === articles.length - 1}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown>{currentArticle.content}</ReactMarkdown>
            </div>

            <div className="mt-8 pt-6 border-t dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Article {currentIndex + 1} of {articles.length}
                </div>
                {!currentArticle.read && (
                  <Button onClick={markAsRead}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Read
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Article List */}
      <div>
        <Card className="dark:bg-gray-800/80 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Reading List</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {articles.map((article, index) => (
              <div
                key={article.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  currentArticle.id === article.id
                    ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
                onClick={() => {
                  setCurrentArticle(article)
                  setCurrentIndex(index)
                }}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <FileText className="w-4 h-4 text-purple-500" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-gray-900 dark:text-white">{article.title}</h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                      <span>{article.readTime}</span>
                      {article.read && (
                        <Badge variant="outline" className="text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Read
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
