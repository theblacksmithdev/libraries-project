import type { Meta, StoryObj } from '@storybook/react'
import { Box } from '.'

const meta: Meta<typeof Box> = {
  title: 'Primitives/Box',
  component: Box,
  parameters: {
    docs: {
      description: {
        component:
          'A polymorphic container that maps typed style props to Tailwind classes. Use instead of raw className strings for type-safe styling.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Box>

export const Default: Story = {
  render: () => (
    <Box p="md" bg="primary" color="primary-foreground" rounded="lg" shadow="md">
      Styled with props, not className
    </Box>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Box } from '@flatui/react'

<Box p="md" bg="primary" color="primary-foreground" rounded="lg" shadow="md">
  Styled with props, not className
</Box>`,
      },
    },
  },
}

export const AsSection: Story = {
  render: () => (
    <Box as="section" p="lg" bg="muted" rounded="md">
      Rendered as a &lt;section&gt; element
    </Box>
  ),
}

export const LayoutExample: Story = {
  render: () => (
    <Box display="flex" gap="md" align="center" p="md" bg="card" rounded="lg" borderWidth="1">
      <Box p="sm" bg="primary" color="primary-foreground" rounded="md">One</Box>
      <Box p="sm" bg="secondary" color="secondary-foreground" rounded="md">Two</Box>
      <Box p="sm" bg="accent" color="accent-foreground" rounded="md">Three</Box>
    </Box>
  ),
}
