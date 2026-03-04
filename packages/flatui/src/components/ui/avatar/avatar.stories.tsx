import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarPrimitives } from '.'

const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: 'An image element with a fallback for representing the user.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  render: () => (
    <Avatar src="https://github.com/shadcn.png" alt="@shadcn" fallback="CN" />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Avatar } from '@flatui/react'

<Avatar src="https://github.com/shadcn.png" alt="@shadcn" fallback="CN" />`,
      },
    },
  },
}

export const Fallback: Story = {
  render: () => (
    <Avatar fallback="JD" />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Avatar } from '@flatui/react'

<Avatar fallback="JD" />`,
      },
    },
  },
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <AvatarPrimitives.Root>
      <AvatarPrimitives.Image src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarPrimitives.Fallback>CN</AvatarPrimitives.Fallback>
    </AvatarPrimitives.Root>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { AvatarPrimitives } from '@flatui/react'

<AvatarPrimitives.Root>
  <AvatarPrimitives.Image src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarPrimitives.Fallback>CN</AvatarPrimitives.Fallback>
</AvatarPrimitives.Root>`,
      },
    },
  },
}
