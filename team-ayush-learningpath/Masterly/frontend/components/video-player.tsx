"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize, CheckCircle, Clock } from "lucide-react"

interface Video {
  id: number
  title: string
  duration: string
  thumbnail: string
  url: string
  watched: boolean
  watchTime: number
  totalTime: number
}

interface VideoPlayerProps {
  videos: Video[]
}

export function VideoPlayer({ videos }: VideoPlayerProps) {
  const [currentVideo, setCurrentVideo] = useState(videos[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      const newTime = (value[0] / 100) * duration
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10
    }
  }

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Video Player */}
      <div className="lg:col-span-2">
        <Card className="dark:bg-gray-800/80 dark:border-gray-700">
          <CardContent className="p-0">
            <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-full"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                poster={currentVideo.thumbnail}
              >
                <source src={currentVideo.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="space-y-2">
                  <Progress
                    value={duration ? (currentTime / duration) * 100 : 0}
                    className="h-1 cursor-pointer"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      const percent = ((e.clientX - rect.left) / rect.width) * 100
                      handleSeek([percent])
                    }}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                        onClick={skipBackward}
                      >
                        <SkipBack className="w-4 h-4" />
                      </Button>

                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={togglePlay}>
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                        onClick={skipForward}
                      >
                        <SkipForward className="w-4 h-4" />
                      </Button>

                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleMute}>
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>

                      <span className="text-white text-sm">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{currentVideo.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{currentVideo.duration}</span>
                </span>
                {currentVideo.watched && (
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Video Playlist */}
      <div>
        <Card className="dark:bg-gray-800/80 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Video Lectures</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  currentVideo.id === video.id
                    ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
                onClick={() => setCurrentVideo(video)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-16 h-10 object-cover rounded"
                    />
                    {video.watched && (
                      <div className="absolute -top-1 -right-1">
                        <CheckCircle className="w-4 h-4 text-green-500 bg-white rounded-full" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                      {index + 1}. {video.title}
                    </h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                      <span>{video.duration}</span>
                      {video.watched && (
                        <Badge variant="outline" className="text-xs">
                          Watched
                        </Badge>
                      )}
                    </div>
                    {video.watchTime > 0 && (
                      <Progress value={(video.watchTime / video.totalTime) * 100} className="h-1 mt-2" />
                    )}
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
