import type { Meta, StoryObj } from '@storybook/react'
import { Stack, HStack, VStack } from '.'

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-md bg-primary/10 border border-primary/20 px-4 py-2 text-sm">
    {children}
  </div>
)

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    docs: {
      description: {
        component:
          'Flexbox layout shorthand for vertical and horizontal spacing. Includes HStack and VStack convenience components.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Stack>

export const Default: Story = {
  render: () => (
    <Stack>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Stack } from '@blacksmith-ui/react'\n\n<Stack>\n  <div>Item 1</div>\n  <div>Item 2</div>\n  <div>Item 3</div>\n</Stack>`,
      },
    },
  },
}

export const Horizontal: Story = {
  render: () => (
    <HStack gap={4}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </HStack>
  ),
}

export const Vertical: Story = {
  render: () => (
    <VStack gap={4}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </VStack>
  ),
}

export const WithAlignment: Story = {
  render: () => (
    <HStack gap={4} align="center" justify="between" className="w-full">
      <Box>Left</Box>
      <Box>Center</Box>
      <Box>Right</Box>
    </HStack>
  ),
}

export const CustomGap: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-muted-foreground mb-2">gap=1</p>
        <HStack gap={1}>
          <Box>A</Box><Box>B</Box><Box>C</Box>
        </HStack>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">gap=4</p>
        <HStack gap={4}>
          <Box>A</Box><Box>B</Box><Box>C</Box>
        </HStack>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">gap=8</p>
        <HStack gap={8}>
          <Box>A</Box><Box>B</Box><Box>C</Box>
        </HStack>
      </div>
    </div>
  ),
}

export const Wrapping: Story = {
  render: () => (
    <HStack gap={2} wrap className="max-w-xs">
      {Array.from({ length: 8 }, (_, i) => (
        <Box key={i}>Tag {i + 1}</Box>
      ))}
    </HStack>
  ),
}

export const Centered: Story = {
  render: () => (
    <Stack align="center" justify="center" className="h-48 border border-dashed rounded-md">
      <Box>Centered content</Box>
    </Stack>
  ),
}
