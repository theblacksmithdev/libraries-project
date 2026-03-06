import type { Meta, StoryObj } from '@storybook/react'
import { Image, ImagePrimitives } from '.'

const meta: Meta<typeof Image> = {
  title: 'Media/Image',
  component: Image,
  parameters: {
    docs: {
      description: {
        component:
          'An image component with loading skeleton, error fallback, and optional aspect ratio.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Image>

export const Default: Story = {
  render: () => (
    <div className="w-[400px]">
      <Image
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="A beautiful landscape"
        width={400}
        height={300}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Image } from '@forge-ui/react'

<Image
  src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
  alt="A beautiful landscape"
  width={400}
  height={300}
/>`,
      },
    },
  },
}

export const WithAspectRatio: Story = {
  render: () => (
    <div className="w-[400px]">
      <Image
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="Landscape in 16:9"
        aspectRatio={16 / 9}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Image } from '@forge-ui/react'

<Image
  src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
  alt="Landscape in 16:9"
  aspectRatio={16 / 9}
/>`,
      },
    },
  },
}

export const WithFallback: Story = {
  name: 'Error / Fallback',
  render: () => (
    <div className="w-[400px] h-[300px]">
      <Image
        src="https://broken.url/does-not-exist.jpg"
        alt="Broken image"
        width={400}
        height={300}
        fallback={<span className="text-sm">Failed to load image</span>}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Image } from '@forge-ui/react'

<Image
  src="https://broken.url/does-not-exist.jpg"
  alt="Broken image"
  width={400}
  height={300}
  fallback={<span>Failed to load image</span>}
/>`,
      },
    },
  },
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <ImagePrimitives.Root className="w-[400px] h-[300px]">
      <ImagePrimitives.Img
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="Landscape"
      />
    </ImagePrimitives.Root>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { ImagePrimitives } from '@forge-ui/react'

<ImagePrimitives.Root className="w-[400px] h-[300px]">
  <ImagePrimitives.Img
    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
    alt="Landscape"
  />
</ImagePrimitives.Root>`,
      },
    },
  },
}
