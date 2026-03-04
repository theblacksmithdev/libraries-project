"use client"

import * as React from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoPlayerContextValue {
  videoRef: React.RefObject<HTMLVideoElement>
  playing: boolean
  muted: boolean
  currentTime: number
  duration: number
  togglePlay: () => void
  toggleMute: () => void
  seek: (time: number) => void
  requestFullscreen: () => void
}

const VideoPlayerContext = React.createContext<VideoPlayerContextValue | null>(
  null
)

function useVideoPlayer() {
  const ctx = React.useContext(VideoPlayerContext)
  if (!ctx) {
    throw new Error("VideoPlayer components must be used within VideoPlayerRoot")
  }
  return ctx
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

interface VideoPlayerRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const VideoPlayerRoot = React.forwardRef<HTMLDivElement, VideoPlayerRootProps>(
  ({ className, children, ...props }, ref) => {
    const videoRef = React.useRef<HTMLVideoElement>(null!)
    const [playing, setPlaying] = React.useState(false)
    const [muted, setMuted] = React.useState(false)
    const [currentTime, setCurrentTime] = React.useState(0)
    const [duration, setDuration] = React.useState(0)

    React.useEffect(() => {
      const video = videoRef.current
      if (!video) return

      const onPlay = () => setPlaying(true)
      const onPause = () => setPlaying(false)
      const onTimeUpdate = () => setCurrentTime(video.currentTime)
      const onLoadedMetadata = () => setDuration(video.duration)
      const onVolumeChange = () => setMuted(video.muted)

      video.addEventListener("play", onPlay)
      video.addEventListener("pause", onPause)
      video.addEventListener("timeupdate", onTimeUpdate)
      video.addEventListener("loadedmetadata", onLoadedMetadata)
      video.addEventListener("volumechange", onVolumeChange)

      return () => {
        video.removeEventListener("play", onPlay)
        video.removeEventListener("pause", onPause)
        video.removeEventListener("timeupdate", onTimeUpdate)
        video.removeEventListener("loadedmetadata", onLoadedMetadata)
        video.removeEventListener("volumechange", onVolumeChange)
      }
    }, [])

    const togglePlay = React.useCallback(() => {
      const video = videoRef.current
      if (!video) return
      if (video.paused) {
        video.play()
      } else {
        video.pause()
      }
    }, [])

    const toggleMute = React.useCallback(() => {
      const video = videoRef.current
      if (!video) return
      video.muted = !video.muted
    }, [])

    const seek = React.useCallback((time: number) => {
      const video = videoRef.current
      if (!video) return
      video.currentTime = time
    }, [])

    const requestFullscreen = React.useCallback(() => {
      const video = videoRef.current
      if (!video) return
      video.requestFullscreen?.()
    }, [])

    const ctx = React.useMemo<VideoPlayerContextValue>(
      () => ({
        videoRef,
        playing,
        muted,
        currentTime,
        duration,
        togglePlay,
        toggleMute,
        seek,
        requestFullscreen,
      }),
      [playing, muted, currentTime, duration, togglePlay, toggleMute, seek, requestFullscreen]
    )

    return (
      <VideoPlayerContext.Provider value={ctx}>
        <div
          ref={ref}
          className={cn("relative group rounded-lg overflow-hidden bg-black", className)}
          {...props}
        >
          {children}
        </div>
      </VideoPlayerContext.Provider>
    )
  }
)
VideoPlayerRoot.displayName = "VideoPlayerRoot"

const VideoPlayerVideo = React.forwardRef<
  HTMLVideoElement,
  React.VideoHTMLAttributes<HTMLVideoElement>
>(({ className, onClick, ...props }, ref) => {
  const { videoRef, togglePlay } = useVideoPlayer()

  return (
    <video
      ref={(node) => {
        ;(videoRef as React.MutableRefObject<HTMLVideoElement | null>).current = node
        if (typeof ref === "function") ref(node)
        else if (ref) ref.current = node
      }}
      className={cn("w-full h-full", className)}
      onClick={(e) => {
        togglePlay()
        onClick?.(e)
      }}
      {...props}
    />
  )
})
VideoPlayerVideo.displayName = "VideoPlayerVideo"

const VideoPlayerControls = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute bottom-0 left-0 right-0 flex items-center gap-2 p-2 bg-black/60 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100",
      className
    )}
    {...props}
  />
))
VideoPlayerControls.displayName = "VideoPlayerControls"

const VideoPlayerPlayButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { playing, togglePlay } = useVideoPlayer()
  return (
    <button
      ref={ref}
      type="button"
      aria-label={playing ? "Pause" : "Play"}
      onClick={togglePlay}
      className={cn("shrink-0 p-1 hover:opacity-80", className)}
      {...props}
    >
      {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
    </button>
  )
})
VideoPlayerPlayButton.displayName = "VideoPlayerPlayButton"

const VideoPlayerProgress = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "min" | "max">
>(({ className, onChange, ...props }, ref) => {
  const { currentTime, duration, seek } = useVideoPlayer()
  return (
    <input
      ref={ref}
      type="range"
      min={0}
      max={duration || 0}
      value={currentTime}
      aria-label="Seek"
      onChange={(e) => {
        seek(Number(e.target.value))
        onChange?.(e)
      }}
      className={cn("flex-1 h-1 accent-primary cursor-pointer", className)}
      {...props}
    />
  )
})
VideoPlayerProgress.displayName = "VideoPlayerProgress"

const VideoPlayerTime = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  const { currentTime, duration } = useVideoPlayer()
  return (
    <span
      ref={ref}
      className={cn("text-xs tabular-nums shrink-0", className)}
      {...props}
    >
      {formatTime(currentTime)} / {formatTime(duration)}
    </span>
  )
})
VideoPlayerTime.displayName = "VideoPlayerTime"

const VideoPlayerMuteButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { muted, toggleMute } = useVideoPlayer()
  return (
    <button
      ref={ref}
      type="button"
      aria-label={muted ? "Unmute" : "Mute"}
      onClick={toggleMute}
      className={cn("shrink-0 p-1 hover:opacity-80", className)}
      {...props}
    >
      {muted ? (
        <VolumeX className="h-4 w-4" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
    </button>
  )
})
VideoPlayerMuteButton.displayName = "VideoPlayerMuteButton"

const VideoPlayerFullscreenButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { requestFullscreen } = useVideoPlayer()
  return (
    <button
      ref={ref}
      type="button"
      aria-label="Fullscreen"
      onClick={requestFullscreen}
      className={cn("shrink-0 p-1 hover:opacity-80", className)}
      {...props}
    >
      <Maximize className="h-4 w-4" />
    </button>
  )
})
VideoPlayerFullscreenButton.displayName = "VideoPlayerFullscreenButton"

export {
  VideoPlayerRoot,
  VideoPlayerVideo,
  VideoPlayerControls,
  VideoPlayerPlayButton,
  VideoPlayerProgress,
  VideoPlayerTime,
  VideoPlayerMuteButton,
  VideoPlayerFullscreenButton,
  formatTime,
}
