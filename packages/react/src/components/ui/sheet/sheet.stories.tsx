import type { Meta, StoryObj } from '@storybook/react'
import { Sheet, SheetPrimitives } from '.'

const meta: Meta<typeof Sheet> = {
  title: 'Overlay/Sheet',
  component: Sheet,
  parameters: {
    docs: {
      description: {
        component: 'A panel that slides in from the side, extending the Dialog component.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Sheet>

export const Default: Story = {
  render: () => (
    <Sheet
      trigger={
        <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Open Sheet
        </button>
      }
      title="Edit profile"
      description="Make changes to your profile here. Click save when you're done."
    >
      <div className="py-4">
        <p className="text-sm text-muted-foreground">Sheet body content here.</p>
      </div>
    </Sheet>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Sheet } from '@forge-ui/react'

<Sheet
  trigger={<Button>Open Sheet</Button>}
  title="Edit profile"
  description="Make changes here."
>
  {/* content */}
</Sheet>`,
      },
    },
  },
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <SheetPrimitives.Root>
      <SheetPrimitives.Trigger asChild>
        <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Open Sheet
        </button>
      </SheetPrimitives.Trigger>
      <SheetPrimitives.Content>
        <SheetPrimitives.Header>
          <SheetPrimitives.Title>Edit profile</SheetPrimitives.Title>
          <SheetPrimitives.Description>
            Make changes to your profile here.
          </SheetPrimitives.Description>
        </SheetPrimitives.Header>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">Sheet body content here.</p>
        </div>
      </SheetPrimitives.Content>
    </SheetPrimitives.Root>
  ),
}
