import type { Meta, StoryObj } from '@storybook/react'
import { HoverCard, HoverCardPrimitives } from '.'

const meta: Meta<typeof HoverCard> = {
  title: 'Overlay/HoverCard',
  component: HoverCard,
  parameters: {
    docs: {
      description: {
        component: 'A card that appears when hovering over a trigger.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof HoverCard>

export const Default: Story = {
  render: () => (
    <HoverCard
      trigger={<button className="text-sm underline underline-offset-4">@nextjs</button>}
    >
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">@nextjs</h4>
        <p className="text-sm text-muted-foreground">
          The React Framework &ndash; created and maintained by @vercel.
        </p>
        <p className="text-xs text-muted-foreground">Joined December 2021</p>
      </div>
    </HoverCard>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { HoverCard } from '@flatui/react'

<HoverCard trigger={<a href="#">@nextjs</a>}>
  <h4>@nextjs</h4>
  <p>The React Framework created by @vercel.</p>
</HoverCard>`,
      },
    },
  },
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <HoverCardPrimitives.Root>
      <HoverCardPrimitives.Trigger asChild>
        <button className="text-sm underline underline-offset-4">@nextjs</button>
      </HoverCardPrimitives.Trigger>
      <HoverCardPrimitives.Content className="w-80">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">@nextjs</h4>
          <p className="text-sm text-muted-foreground">
            The React Framework &ndash; created and maintained by @vercel.
          </p>
        </div>
      </HoverCardPrimitives.Content>
    </HoverCardPrimitives.Root>
  ),
}
