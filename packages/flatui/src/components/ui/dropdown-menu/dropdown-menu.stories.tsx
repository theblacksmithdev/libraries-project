import type { Meta, StoryObj } from '@storybook/react'
import { DropdownMenu, DropdownMenuPrimitives } from '.'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Overlay/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    docs: {
      description: {
        component: 'Displays a menu triggered by a button.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
  render: () => (
    <DropdownMenu
      trigger={
        <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm">
          Open Menu
        </button>
      }
      items={[
        { type: 'label', label: 'My Account' },
        { type: 'separator' },
        { label: 'Profile' },
        { label: 'Billing' },
        { label: 'Team' },
        { label: 'Subscription' },
      ]}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { DropdownMenu } from '@flatui/react'

<DropdownMenu
  trigger={<Button variant="outline">Open Menu</Button>}
  items={[
    { type: 'label', label: 'My Account' },
    { type: 'separator' },
    { label: 'Profile', onSelect: () => {} },
    { label: 'Billing', onSelect: () => {} },
    { label: 'Subscription', onSelect: () => {} },
  ]}
/>`,
      },
    },
  },
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <DropdownMenuPrimitives.Root>
      <DropdownMenuPrimitives.Trigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm">
          Open Menu
        </button>
      </DropdownMenuPrimitives.Trigger>
      <DropdownMenuPrimitives.Content className="w-56">
        <DropdownMenuPrimitives.Label>My Account</DropdownMenuPrimitives.Label>
        <DropdownMenuPrimitives.Separator />
        <DropdownMenuPrimitives.Item>Profile</DropdownMenuPrimitives.Item>
        <DropdownMenuPrimitives.Item>Billing</DropdownMenuPrimitives.Item>
        <DropdownMenuPrimitives.Item>Team</DropdownMenuPrimitives.Item>
      </DropdownMenuPrimitives.Content>
    </DropdownMenuPrimitives.Root>
  ),
}
