import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '.'

const meta: Meta<typeof Button> = {
  title: 'Inputs/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Displays a button or a component that looks like a button.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  render: () => (<Button>Button</Button>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Button } from '@forge-ui/react'

<Button>Button</Button>`,
      },
    },
  },
}

export const Destructive: Story = {
  render: () => (<Button variant="destructive">Destructive</Button>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Button variant="destructive">Destructive</Button>`,
      },
    },
  },
}

export const Outline: Story = {
  render: () => (<Button variant="outline">Outline</Button>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Button variant="outline">Outline</Button>`,
      },
    },
  },
}

export const Secondary: Story = {
  render: () => (<Button variant="secondary">Secondary</Button>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Button variant="secondary">Secondary</Button>`,
      },
    },
  },
}

export const Ghost: Story = {
  render: () => (<Button variant="ghost">Ghost</Button>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Button variant="ghost">Ghost</Button>`,
      },
    },
  },
}

export const Link: Story = {
  render: () => (<Button variant="link">Link</Button>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Button variant="link">Link</Button>`,
      },
    },
  },
}

export const WithIcon: Story = {
  render: () => (
    <Button>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      Add Item
    </Button>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Button } from '@forge-ui/react'
import { Plus } from 'lucide-react'

<Button>
  <Plus className="mr-2 h-4 w-4" />
  Add Item
</Button>`,
      },
    },
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Button } from '@forge-ui/react'

<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Plus /></Button>`,
      },
    },
  },
}
