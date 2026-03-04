// Simplified wrapper as the primary export
export { VideoPlayer, VideoPlayerPrimitives } from './video-player.simple'
export type { VideoPlayerProps } from './video-player.simple'

// Sub-parts still available individually (backward compat)
export {
  VideoPlayerRoot,
  VideoPlayerVideo,
  VideoPlayerControls,
  VideoPlayerPlayButton,
  VideoPlayerProgress,
  VideoPlayerTime,
  VideoPlayerMuteButton,
  VideoPlayerFullscreenButton,
} from './video-player'
