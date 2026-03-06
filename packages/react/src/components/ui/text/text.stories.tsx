import type { Meta, StoryObj } from '@storybook/react'
import { Text } from '.'

const meta: Meta<typeof Text> = {
  title: 'Primitives/Text',
  component: Text,
  parameters: {
    docs: {
      description: {
        component:
          'A typography-focused primitive with preset variants (body, label, caption, overline) and style props for ad-hoc customization.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Text>

export const Default: Story = {
  render: () => <Text>Default body text</Text>,
  parameters: {
    docs: {
      source: {
        code: `import { Text } from '@blacksmith-ui/react'

<Text>Default body text</Text>`,
      },
    },
  },
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Text variant="body">Body — default, text-base</Text>
      <Text variant="label">Label — text-sm, font-medium</Text>
      <Text variant="caption">Caption — text-sm, muted-foreground</Text>
      <Text variant="overline">Overline — text-sm, font-semibold</Text>
    </div>
  ),
}

export const CustomStyleProps: Story = {
  render: () => (
    <Text fontSize="3xl" fontWeight="extrabold" color="primary">
      Custom styled text
    </Text>
  ),
}

export const AsHeading: Story = {
  render: () => (
    <Text as="h1" fontSize="4xl" fontWeight="bold">
      Rendered as an h1
    </Text>
  ),
}
