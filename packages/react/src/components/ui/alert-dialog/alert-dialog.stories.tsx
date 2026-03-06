import type { Meta, StoryObj } from '@storybook/react'
import { AlertDialog, AlertDialogPrimitives } from '.'

const meta: Meta<typeof AlertDialog> = {
  title: 'Feedback/AlertDialog',
  component: AlertDialog,
  parameters: {
    docs: {
      description: {
        component: 'A modal dialog that interrupts the user to confirm a critical action.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof AlertDialog>

export const Default: Story = {
  render: () => (
    <AlertDialog
      trigger={
        <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Delete Account
        </button>
      }
      title="Are you absolutely sure?"
      description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
      confirmLabel="Continue"
      cancelLabel="Cancel"
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { AlertDialog } from '@blacksmith-ui/react'

<AlertDialog
  trigger={<Button variant="destructive">Delete Account</Button>}
  title="Are you absolutely sure?"
  description="This action cannot be undone."
  confirmLabel="Continue"
  cancelLabel="Cancel"
  onConfirm={() => handleDelete()}
/>`,
      },
    },
  },
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <AlertDialogPrimitives.Root>
      <AlertDialogPrimitives.Trigger asChild>
        <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Delete Account
        </button>
      </AlertDialogPrimitives.Trigger>
      <AlertDialogPrimitives.Content>
        <AlertDialogPrimitives.Header>
          <AlertDialogPrimitives.Title>Are you absolutely sure?</AlertDialogPrimitives.Title>
          <AlertDialogPrimitives.Description>
            This action cannot be undone.
          </AlertDialogPrimitives.Description>
        </AlertDialogPrimitives.Header>
        <AlertDialogPrimitives.Footer>
          <AlertDialogPrimitives.Cancel>Cancel</AlertDialogPrimitives.Cancel>
          <AlertDialogPrimitives.Action>Continue</AlertDialogPrimitives.Action>
        </AlertDialogPrimitives.Footer>
      </AlertDialogPrimitives.Content>
    </AlertDialogPrimitives.Root>
  ),
}
