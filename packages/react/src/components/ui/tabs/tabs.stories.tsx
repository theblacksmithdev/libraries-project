import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsPrimitives } from '.'

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: 'A set of layered sections of content shown one at a time.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: () => (
    <Tabs
      defaultValue="account"
      className="w-[400px]"
      tabs={[
        {
          value: 'account',
          label: 'Account',
          content: (
            <div className="rounded-md border p-4">
              <p className="text-sm text-muted-foreground">
                Make changes to your account here. Click save when you&apos;re done.
              </p>
            </div>
          ),
        },
        {
          value: 'password',
          label: 'Password',
          content: (
            <div className="rounded-md border p-4">
              <p className="text-sm text-muted-foreground">
                Change your password here. After saving, you&apos;ll be logged out.
              </p>
            </div>
          ),
        },
      ]}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Tabs } from '@blacksmith-ui/react'

<Tabs
  defaultValue="account"
  tabs={[
    { value: 'account', label: 'Account', content: <p>Account settings</p> },
    { value: 'password', label: 'Password', content: <p>Password settings</p> },
  ]}
/>`,
      },
    },
  },
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <TabsPrimitives.Root defaultValue="account" className="w-[400px]">
      <TabsPrimitives.List className="grid w-full grid-cols-2">
        <TabsPrimitives.Trigger value="account">Account</TabsPrimitives.Trigger>
        <TabsPrimitives.Trigger value="password">Password</TabsPrimitives.Trigger>
      </TabsPrimitives.List>
      <TabsPrimitives.Content value="account" className="rounded-md border p-4">
        <p className="text-sm text-muted-foreground">
          Make changes to your account here.
        </p>
      </TabsPrimitives.Content>
      <TabsPrimitives.Content value="password" className="rounded-md border p-4">
        <p className="text-sm text-muted-foreground">
          Change your password here.
        </p>
      </TabsPrimitives.Content>
    </TabsPrimitives.Root>
  ),
}
