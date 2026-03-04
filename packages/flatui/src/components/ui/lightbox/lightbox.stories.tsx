import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Lightbox } from '.'
import type { LightboxImageItem } from '.'

const sampleImages: LightboxImageItem[] = [
  {
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200',
    alt: 'Mountain landscape',
    caption: 'Beautiful mountain landscape at sunset',
  },
  {
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200',
    alt: 'Nature scene',
    caption: 'Serene nature scene with golden light',
  },
  {
    src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200',
    alt: 'Forest path',
    caption: 'A winding path through an ancient forest',
  },
  {
    src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200',
    alt: 'Waterfall',
    caption: 'Majestic waterfall in a tropical setting',
  },
  {
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200',
    alt: 'Lake view',
    caption: 'Calm lake reflecting the surrounding mountains',
  },
]

const meta: Meta<typeof Lightbox> = {
  title: 'Overlay/Lightbox',
  component: Lightbox,
  parameters: {
    docs: {
      description: {
        component:
          'Full-screen image preview overlay with gallery navigation support.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Lightbox>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    const [startIndex, setStartIndex] = React.useState(0)

    return (
      <div>
        <div className="grid grid-cols-3 gap-2 max-w-lg">
          {sampleImages.map((img, i) => (
            <button
              key={img.src}
              onClick={() => {
                setStartIndex(i)
                setOpen(true)
              }}
              className="overflow-hidden rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-32 w-full object-cover transition-transform hover:scale-105"
              />
            </button>
          ))}
        </div>
        <Lightbox
          images={sampleImages}
          open={open}
          onOpenChange={setOpen}
          startIndex={startIndex}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        code: `import { Lightbox } from '@flatui/react'

const images = [
  { src: '/photo1.jpg', alt: 'Photo 1', caption: 'First photo' },
  { src: '/photo2.jpg', alt: 'Photo 2', caption: 'Second photo' },
]

<Lightbox
  images={images}
  open={open}
  onOpenChange={setOpen}
  startIndex={0}
/>`,
      },
    },
  },
}

export const SingleImage: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    const image = sampleImages[0]

    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          className="overflow-hidden rounded-md"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="h-48 w-72 object-cover"
          />
        </button>
        <Lightbox
          images={[image]}
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    )
  },
}

export const WithCaptions: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true)

    return (
      <Lightbox
        images={sampleImages}
        open={open}
        onOpenChange={setOpen}
        showCaption
        showCounter
      />
    )
  },
}

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    const [index, setIndex] = React.useState(0)

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            className="rounded bg-primary px-3 py-1.5 text-sm text-primary-foreground"
            onClick={() => setOpen(true)}
          >
            Open Lightbox
          </button>
          <span className="text-sm text-muted-foreground self-center">
            Current index: {index}
          </span>
        </div>
        <Lightbox
          images={sampleImages}
          open={open}
          onOpenChange={setOpen}
          startIndex={index}
          onIndexChange={setIndex}
        />
      </div>
    )
  },
}
