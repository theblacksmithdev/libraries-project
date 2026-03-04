import type { Meta, StoryObj } from '@storybook/react'
import { AspectRatio } from '.'

const meta: Meta<typeof AspectRatio> = {
  title: 'Layout/AspectRatio',
  component: AspectRatio,
  parameters: {
    docs: {
      description: {
        component: 'Displays content within a desired ratio.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof AspectRatio>

export const Default: Story = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-md flex items-center justify-center">
        <span className="text-muted-foreground text-sm">16 : 9</span>
      </AspectRatio>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { AspectRatio } from '@flatui/react'

<AspectRatio ratio={16 / 9} className="bg-muted">
  <img src="..." alt="..." className="object-cover" />
</AspectRatio>`,
      },
    },
  },
}
