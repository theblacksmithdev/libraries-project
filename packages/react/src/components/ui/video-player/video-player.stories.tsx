import type { Meta, StoryObj } from '@storybook/react'
import { VideoPlayer, VideoPlayerPrimitives } from '.'

const SAMPLE_VIDEO =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
const SAMPLE_POSTER =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'

const meta: Meta<typeof VideoPlayer> = {
  title: 'Media/VideoPlayer',
  component: VideoPlayer,
  parameters: {
    docs: {
      description: {
        component:
          'A styled HTML5 video player with custom controls overlay including play/pause, progress, mute, and fullscreen.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof VideoPlayer>

export const Default: Story = {
  render: () => (
    <div className="w-[640px]">
      <VideoPlayer src={SAMPLE_VIDEO} aspectRatio={16 / 9} />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { VideoPlayer } from '@forge-ui/react'

<VideoPlayer src="https://example.com/video.mp4" aspectRatio={16 / 9} />`,
      },
    },
  },
}

export const WithPoster: Story = {
  render: () => (
    <div className="w-[640px]">
      <VideoPlayer
        src={SAMPLE_VIDEO}
        poster={SAMPLE_POSTER}
        aspectRatio={16 / 9}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { VideoPlayer } from '@forge-ui/react'

<VideoPlayer
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
  aspectRatio={16 / 9}
/>`,
      },
    },
  },
}

export const Autoplay: Story = {
  render: () => (
    <div className="w-[640px]">
      <VideoPlayer src={SAMPLE_VIDEO} autoPlay muted aspectRatio={16 / 9} />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { VideoPlayer } from '@forge-ui/react'

<VideoPlayer src="https://example.com/video.mp4" autoPlay muted aspectRatio={16 / 9} />`,
      },
    },
  },
}

export const NoControls: Story = {
  render: () => (
    <div className="w-[640px]">
      <VideoPlayer
        src={SAMPLE_VIDEO}
        controls={false}
        aspectRatio={16 / 9}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { VideoPlayer } from '@forge-ui/react'

<VideoPlayer src="https://example.com/video.mp4" controls={false} aspectRatio={16 / 9} />`,
      },
    },
  },
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <div className="w-[640px]">
      <VideoPlayerPrimitives.Root>
        <VideoPlayerPrimitives.Video src={SAMPLE_VIDEO} />
        <VideoPlayerPrimitives.Controls>
          <VideoPlayerPrimitives.PlayButton />
          <VideoPlayerPrimitives.Time />
          <VideoPlayerPrimitives.Progress />
          <VideoPlayerPrimitives.MuteButton />
          <VideoPlayerPrimitives.FullscreenButton />
        </VideoPlayerPrimitives.Controls>
      </VideoPlayerPrimitives.Root>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { VideoPlayerPrimitives } from '@forge-ui/react'

<VideoPlayerPrimitives.Root>
  <VideoPlayerPrimitives.Video src="https://example.com/video.mp4" />
  <VideoPlayerPrimitives.Controls>
    <VideoPlayerPrimitives.PlayButton />
    <VideoPlayerPrimitives.Time />
    <VideoPlayerPrimitives.Progress />
    <VideoPlayerPrimitives.MuteButton />
    <VideoPlayerPrimitives.FullscreenButton />
  </VideoPlayerPrimitives.Controls>
</VideoPlayerPrimitives.Root>`,
      },
    },
  },
}
