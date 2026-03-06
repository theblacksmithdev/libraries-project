"use client"

import * as React from "react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  VideoPlayerRoot,
  VideoPlayerVideo,
  VideoPlayerControls,
  VideoPlayerPlayButton,
  VideoPlayerProgress,
  VideoPlayerTime,
  VideoPlayerMuteButton,
  VideoPlayerFullscreenButton,
} from "./video-player"
import { cn } from "@/lib/utils"

export interface VideoPlayerProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onPlay" | "onPause" | "onEnded"
  > {
  /** Video source URL */
  src: string
  /** Poster image URL */
  poster?: string
  /** Auto-play the video */
  autoPlay?: boolean
  /** Start muted */
  muted?: boolean
  /** Loop the video */
  loop?: boolean
  /** Show custom controls overlay (default: true) */
  controls?: boolean
  /** Aspect ratio (e.g. 16/9) */
  aspectRatio?: number
  /** Called when video starts playing */
  onPlay?: React.ReactEventHandler<HTMLVideoElement>
  /** Called when video is paused */
  onPause?: React.ReactEventHandler<HTMLVideoElement>
  /** Called when video ends */
  onEnded?: React.ReactEventHandler<HTMLVideoElement>
}

const VideoPlayer = React.forwardRef<HTMLDivElement, VideoPlayerProps>(
  (
    {
      src,
      poster,
      autoPlay,
      muted,
      loop,
      controls = true,
      aspectRatio,
      className,
      onPlay,
      onPause,
      onEnded,
      ...props
    },
    ref
  ) => {
    const [controlsVisible, setControlsVisible] = React.useState(true)
    const hideTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    const resetHideTimer = React.useCallback(() => {
      setControlsVisible(true)
      if (hideTimer.current) clearTimeout(hideTimer.current)
      hideTimer.current = setTimeout(() => setControlsVisible(false), 3000)
    }, [])

    React.useEffect(() => {
      resetHideTimer()
      return () => {
        if (hideTimer.current) clearTimeout(hideTimer.current)
      }
    }, [resetHideTimer])

    const content = (
      <VideoPlayerRoot
        ref={ref}
        className={cn(className)}
        onMouseMove={resetHideTimer}
        onMouseEnter={() => setControlsVisible(true)}
        {...props}
      >
        <VideoPlayerVideo
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
        />
        {controls && (
          <VideoPlayerControls
            className={controlsVisible ? "opacity-100" : undefined}
          >
            <VideoPlayerPlayButton />
            <VideoPlayerTime />
            <VideoPlayerProgress />
            <VideoPlayerMuteButton />
            <VideoPlayerFullscreenButton />
          </VideoPlayerControls>
        )}
      </VideoPlayerRoot>
    )

    if (aspectRatio) {
      return <AspectRatio ratio={aspectRatio}>{content}</AspectRatio>
    }

    return content
  }
)
VideoPlayer.displayName = "VideoPlayer"

export const VideoPlayerPrimitives = {
  Root: VideoPlayerRoot,
  Video: VideoPlayerVideo,
  Controls: VideoPlayerControls,
  PlayButton: VideoPlayerPlayButton,
  Progress: VideoPlayerProgress,
  Time: VideoPlayerTime,
  MuteButton: VideoPlayerMuteButton,
  FullscreenButton: VideoPlayerFullscreenButton,
}

export { VideoPlayer }
