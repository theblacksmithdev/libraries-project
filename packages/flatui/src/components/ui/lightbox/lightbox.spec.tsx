import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { Lightbox } from '.'
import type { LightboxImageItem } from '.'

const galleryImages: LightboxImageItem[] = [
  { src: '/img1.jpg', alt: 'Image 1', caption: 'First image' },
  { src: '/img2.jpg', alt: 'Image 2', caption: 'Second image' },
  { src: '/img3.jpg', alt: 'Image 3', caption: 'Third image' },
]

const singleImage: LightboxImageItem[] = [
  { src: '/solo.jpg', alt: 'Solo image' },
]

describe('Lightbox', () => {
  it('renders nothing when closed', () => {
    render(<Lightbox images={galleryImages} open={false} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders dialog when open', () => {
    render(<Lightbox images={galleryImages} open />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('displays the correct image', () => {
    render(<Lightbox images={galleryImages} open startIndex={1} />)
    const img = screen.getByAltText('Image 2')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/img2.jpg')
  })

  it('navigates to next image with ArrowRight', () => {
    render(<Lightbox images={galleryImages} open startIndex={0} />)
    expect(screen.getByAltText('Image 1')).toBeInTheDocument()

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'ArrowRight' })
    expect(screen.getByAltText('Image 2')).toBeInTheDocument()
  })

  it('navigates to previous image with ArrowLeft', () => {
    render(<Lightbox images={galleryImages} open startIndex={2} />)
    expect(screen.getByAltText('Image 3')).toBeInTheDocument()

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'ArrowLeft' })
    expect(screen.getByAltText('Image 2')).toBeInTheDocument()
  })

  it('clamps at first image (does not go below 0)', () => {
    render(<Lightbox images={galleryImages} open startIndex={0} />)
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'ArrowLeft' })
    expect(screen.getByAltText('Image 1')).toBeInTheDocument()
  })

  it('clamps at last image (does not go beyond length)', () => {
    render(<Lightbox images={galleryImages} open startIndex={2} />)
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'ArrowRight' })
    expect(screen.getByAltText('Image 3')).toBeInTheDocument()
  })

  it('shows counter text', () => {
    render(<Lightbox images={galleryImages} open startIndex={1} />)
    expect(screen.getByText('2 / 3')).toBeInTheDocument()
  })

  it('shows caption', () => {
    render(<Lightbox images={galleryImages} open startIndex={0} />)
    expect(screen.getByText('First image')).toBeInTheDocument()
  })

  it('hides nav buttons for single image', () => {
    render(<Lightbox images={singleImage} open />)
    expect(screen.queryByLabelText('Previous image')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Next image')).not.toBeInTheDocument()
  })

  it('hides counter for single image', () => {
    render(<Lightbox images={singleImage} open />)
    expect(screen.queryByText(/\d+ \/ \d+/)).not.toBeInTheDocument()
  })

  it('calls onIndexChange when navigating', () => {
    const onIndexChange = vi.fn()
    render(
      <Lightbox
        images={galleryImages}
        open
        startIndex={0}
        onIndexChange={onIndexChange}
      />
    )

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'ArrowRight' })
    expect(onIndexChange).toHaveBeenCalledWith(1)
  })

  it('disables prev button on first image', () => {
    render(<Lightbox images={galleryImages} open startIndex={0} />)
    expect(screen.getByLabelText('Previous image')).toBeDisabled()
  })

  it('disables next button on last image', () => {
    render(<Lightbox images={galleryImages} open startIndex={2} />)
    expect(screen.getByLabelText('Next image')).toBeDisabled()
  })

  it('calls onOpenChange when closing', () => {
    const onOpenChange = vi.fn()
    render(<Lightbox images={galleryImages} open onOpenChange={onOpenChange} />)
    fireEvent.click(screen.getByText('Close'))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
