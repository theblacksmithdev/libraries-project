import type { Meta, StoryObj } from '@storybook/react'
import { Mail, Star, Trash2, User, ChevronRight } from 'lucide-react'
import { List, ListPrimitives } from '.'

const meta: Meta<typeof List> = {
  title: 'Data Display/List',
  component: List,
  parameters: {
    docs: {
      description: {
        component: 'Structured list with leading/trailing slots for icons, actions, and metadata.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof List>

export const Default: Story = {
  render: () => (
    <div className="w-[400px] rounded-lg border">
      <List
        divided
        items={[
          { leading: <Mail className="size-5" />, title: 'Messages', description: '3 unread messages', trailing: <ChevronRight className="size-4 text-muted-foreground" /> },
          { leading: <Star className="size-5" />, title: 'Favorites', description: '12 saved items', trailing: <ChevronRight className="size-4 text-muted-foreground" /> },
          { leading: <User className="size-5" />, title: 'Profile', description: 'Manage your account', trailing: <ChevronRight className="size-4 text-muted-foreground" /> },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { List } from '@forge-ui/react'
import { Mail, Star, User } from 'lucide-react'

<List
  divided
  items={[
    { leading: <Mail />, title: 'Messages', description: '3 unread' },
    { leading: <Star />, title: 'Favorites', description: '12 saved' },
    { leading: <User />, title: 'Profile' },
  ]}
/>`,
      },
    },
  },
}

export const Interactive: Story = {
  render: () => (
    <div className="w-[400px] rounded-lg border">
      <List
        divided
        interactive
        items={[
          { leading: <Mail className="size-5" />, title: 'Inbox', description: 'View your messages' },
          { leading: <Trash2 className="size-5" />, title: 'Trash', description: 'Deleted items' },
        ]}
      />
    </div>
  ),
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <div className="w-[400px] rounded-lg border">
      <ListPrimitives.Root divided>
        <ListPrimitives.Item interactive>
          <ListPrimitives.ItemLeading><Mail className="size-5" /></ListPrimitives.ItemLeading>
          <ListPrimitives.ItemContent>
            <ListPrimitives.ItemTitle>Custom item</ListPrimitives.ItemTitle>
            <ListPrimitives.ItemDescription>With primitives</ListPrimitives.ItemDescription>
          </ListPrimitives.ItemContent>
          <ListPrimitives.ItemTrailing>
            <span className="rounded bg-primary px-2 py-0.5 text-xs text-primary-foreground">New</span>
          </ListPrimitives.ItemTrailing>
        </ListPrimitives.Item>
      </ListPrimitives.Root>
    </div>
  ),
}
