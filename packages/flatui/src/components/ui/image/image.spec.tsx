import { render, screen, fireEvent } from '@testing-library/react'
import { Image, ImagePrimitives } from '.'

describe('Image', () => {
  it('renders the image element', () => {
    render(<Image src="https://example.com/photo.jpg" alt="Test" />)
    const img = screen.getByRole('img', { hidden: true })
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg')
    expect(img).toHaveAttribute('alt', 'Test')
  })

  it('shows skeleton while loading', () => {
    render(
      <Image
        src="https://example.com/photo.jpg"
        alt="Test"
        data-testid="image-root"
      />
    )
    const root = screen.getByTestId('image-root')
    // Skeleton should be present (has animate-pulse class)
    const skeleton = root.querySelector('.animate-pulse')
    expect(skeleton).toBeInTheDocument()
  })

  it('shows fallback on error', () => {
    render(
      <Image
        src="https://broken.url/img.jpg"
        alt="Test"
        fallback={<span>Image failed</span>}
        data-testid="image-root"
      />
    )
    const img = screen.getByRole('img', { hidden: true })
    fireEvent.error(img)
    expect(screen.getByText('Image failed')).toBeInTheDocument()
  })

  it('shows default fallback icon on error when no fallback prop', () => {
    render(
      <Image
        src="https://broken.url/img.jpg"
        alt="Test"
        data-testid="image-root"
      />
    )
    const img = screen.getByRole('img', { hidden: true })
    fireEvent.error(img)
    const root = screen.getByTestId('image-root')
    // Default fallback renders an SVG icon
    expect(root.querySelector('svg')).toBeInTheDocument()
  })

  it('calls onLoad when image loads', () => {
    const onLoad = vi.fn()
    render(
      <Image src="https://example.com/photo.jpg" alt="Test" onLoad={onLoad} />
    )
    const img = screen.getByRole('img', { hidden: true })
    fireEvent.load(img)
    expect(onLoad).toHaveBeenCalledTimes(1)
  })

  it('calls onError when image fails', () => {
    const onError = vi.fn()
    render(
      <Image src="https://broken.url/img.jpg" alt="Test" onError={onError} />
    )
    const img = screen.getByRole('img', { hidden: true })
    fireEvent.error(img)
    expect(onError).toHaveBeenCalledTimes(1)
  })

  it('renders with aspect ratio', () => {
    render(
      <Image
        src="https://example.com/photo.jpg"
        alt="Test"
        aspectRatio={16 / 9}
        data-testid="image-root"
      />
    )
    const root = screen.getByTestId('image-root')
    // AspectRatio adds a style with aspect-ratio or padding-bottom
    expect(root.querySelector('[style]')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Image
        src="https://example.com/photo.jpg"
        alt="Test"
        className="custom-class"
        data-testid="image-root"
      />
    )
    expect(screen.getByTestId('image-root')).toHaveClass('custom-class')
  })

  it('renders compound primitives', () => {
    render(
      <ImagePrimitives.Root data-testid="root">
        <ImagePrimitives.Img src="https://example.com/photo.jpg" alt="Test" />
      </ImagePrimitives.Root>
    )
    expect(screen.getByTestId('root')).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})
