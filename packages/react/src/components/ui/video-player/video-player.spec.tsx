import { render, screen, fireEvent } from '@testing-library/react'
import { VideoPlayer, VideoPlayerPrimitives } from '.'

// Mock HTMLMediaElement methods not available in jsdom
beforeAll(() => {
  Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    configurable: true,
    value: vi.fn().mockResolvedValue(undefined),
  })
  Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
    configurable: true,
    value: vi.fn(),
  })
  Object.defineProperty(HTMLMediaElement.prototype, 'requestFullscreen', {
    configurable: true,
    value: vi.fn(),
  })
})

describe('VideoPlayer', () => {
  it('renders a video element', () => {
    render(<VideoPlayer src="https://example.com/video.mp4" />)
    const video = document.querySelector('video')
    expect(video).toBeInTheDocument()
    expect(video).toHaveAttribute('src', 'https://example.com/video.mp4')
  })

  it('shows controls by default', () => {
    render(<VideoPlayer src="https://example.com/video.mp4" />)
    expect(screen.getByLabelText('Play')).toBeInTheDocument()
    expect(screen.getByLabelText('Mute')).toBeInTheDocument()
    expect(screen.getByLabelText('Fullscreen')).toBeInTheDocument()
    expect(screen.getByLabelText('Seek')).toBeInTheDocument()
  })

  it('hides controls when controls={false}', () => {
    render(<VideoPlayer src="https://example.com/video.mp4" controls={false} />)
    expect(screen.queryByLabelText('Play')).not.toBeInTheDocument()
  })

  it('toggles play/pause on button click', () => {
    render(<VideoPlayer src="https://example.com/video.mp4" />)
    const playBtn = screen.getByLabelText('Play')
    fireEvent.click(playBtn)
    const video = document.querySelector('video')!
    expect(video.play).toHaveBeenCalled()
  })

  it('toggles mute on button click', () => {
    render(<VideoPlayer src="https://example.com/video.mp4" />)
    const muteBtn = screen.getByLabelText('Mute')
    fireEvent.click(muteBtn)
    const video = document.querySelector('video')!
    expect(video.muted).toBe(true)
  })

  it('displays time as 0:00 / 0:00 initially', () => {
    render(<VideoPlayer src="https://example.com/video.mp4" />)
    expect(screen.getByText('0:00 / 0:00')).toBeInTheDocument()
  })

  it('renders poster attribute', () => {
    render(
      <VideoPlayer
        src="https://example.com/video.mp4"
        poster="https://example.com/poster.jpg"
      />
    )
    const video = document.querySelector('video')
    expect(video).toHaveAttribute('poster', 'https://example.com/poster.jpg')
  })

  it('applies custom className', () => {
    render(
      <VideoPlayer
        src="https://example.com/video.mp4"
        className="custom-class"
        data-testid="player"
      />
    )
    expect(screen.getByTestId('player')).toHaveClass('custom-class')
  })

  it('renders compound primitives', () => {
    render(
      <VideoPlayerPrimitives.Root data-testid="root">
        <VideoPlayerPrimitives.Video src="https://example.com/video.mp4" />
        <VideoPlayerPrimitives.Controls>
          <VideoPlayerPrimitives.PlayButton />
        </VideoPlayerPrimitives.Controls>
      </VideoPlayerPrimitives.Root>
    )
    expect(screen.getByTestId('root')).toBeInTheDocument()
    expect(screen.getByLabelText('Play')).toBeInTheDocument()
  })
})
