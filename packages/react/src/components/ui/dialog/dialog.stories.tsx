import type { Meta, StoryObj } from '@storybook/react'
import { Dialog, DialogPrimitives } from '.'

const meta: Meta<typeof Dialog> = {
  title: 'Overlay/Dialog',
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component: 'A modal dialog overlaid on the primary window.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: () => (
    <Dialog
      trigger={
        <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Edit Profile
        </button>
      }
      title="Edit profile"
      description="Make changes to your profile here. Click save when you're done."
      footer={
        <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Save changes
        </button>
      }
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="name" className="text-right text-sm">Name</label>
          <input id="name" defaultValue="Pedro Duarte" className="col-span-3 rounded-md border px-3 py-2 text-sm" />
        </div>
      </div>
    </Dialog>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Dialog } from '@blacksmith-ui/react'

<Dialog
  trigger={<Button>Edit Profile</Button>}
  title="Edit profile"
  description="Make changes to your profile here."
  footer={<Button>Save changes</Button>}
>
  {/* form fields */}
</Dialog>`,
      },
    },
  },
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <DialogPrimitives.Root>
      <DialogPrimitives.Trigger asChild>
        <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Edit Profile
        </button>
      </DialogPrimitives.Trigger>
      <DialogPrimitives.Content className="sm:max-w-[425px]">
        <DialogPrimitives.Header>
          <DialogPrimitives.Title>Edit profile</DialogPrimitives.Title>
          <DialogPrimitives.Description>
            Make changes to your profile here.
          </DialogPrimitives.Description>
        </DialogPrimitives.Header>
        <DialogPrimitives.Footer>
          <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Save changes
          </button>
        </DialogPrimitives.Footer>
      </DialogPrimitives.Content>
    </DialogPrimitives.Root>
  ),
}
