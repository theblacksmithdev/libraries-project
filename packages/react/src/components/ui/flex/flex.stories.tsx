import type { Meta, StoryObj } from '@storybook/react'
import { Flex } from '.'
import { Box } from '../box'

const meta: Meta<typeof Flex> = {
  title: 'Primitives/Flex',
  component: Flex,
  parameters: {
    docs: {
      description: {
        component:
          'A Box with display="flex" baked in. Shorthand for common flex layouts.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Flex>

export const Default: Story = {
  render: () => (
    <Flex align="center" gap="md" p="md" bg="card" rounded="lg" borderWidth="1">
      <Box p="sm" bg="primary" color="primary-foreground" rounded="md">Item 1</Box>
      <Box p="sm" bg="secondary" color="secondary-foreground" rounded="md">Item 2</Box>
      <Box p="sm" bg="accent" color="accent-foreground" rounded="md">Item 3</Box>
    </Flex>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Flex, Box } from '@blacksmith-ui/react'

<Flex align="center" gap="md" p="md">
  <Box p="sm" bg="primary" color="primary-foreground" rounded="md">Item 1</Box>
  <Box p="sm" bg="secondary" color="secondary-foreground" rounded="md">Item 2</Box>
</Flex>`,
      },
    },
  },
}

export const SpaceBetween: Story = {
  render: () => (
    <Flex justify="between" align="center" p="md" bg="muted" rounded="lg">
      <span>Left</span>
      <span>Right</span>
    </Flex>
  ),
}

export const Column: Story = {
  render: () => (
    <Flex direction="col" gap="sm" p="md" bg="card" rounded="lg" borderWidth="1">
      <Box p="sm" bg="muted" rounded="md">Row 1</Box>
      <Box p="sm" bg="muted" rounded="md">Row 2</Box>
      <Box p="sm" bg="muted" rounded="md">Row 3</Box>
    </Flex>
  ),
}
