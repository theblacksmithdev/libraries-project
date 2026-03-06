import type { Meta, StoryObj } from '@storybook/react'
import { ToggleGroup, ToggleGroupPrimitives } from '.'

const meta: Meta<typeof ToggleGroup> = {
  title: 'Inputs/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    docs: {
      description: {
        component: 'A group of toggle controls meant to be used together.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ToggleGroup>

export const Default: Story = {
  render: () => (
    <ToggleGroup
      type="multiple"
      items={[
        { value: 'bold', label: 'Bold' },
        { value: 'italic', label: 'Italic' },
        { value: 'underline', label: 'Underline' },
      ]}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { ToggleGroup } from '@forge-ui/react'

<ToggleGroup
  type="multiple"
  items={[
    { value: 'bold', label: 'Bold' },
    { value: 'italic', label: 'Italic' },
    { value: 'underline', label: 'Underline' },
  ]}
/>`,
      },
    },
  },
}

export const Single: Story = {
  render: () => (
    <ToggleGroup
      type="single"
      defaultValue="center"
      items={[
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
      ]}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<ToggleGroup
  type="single"
  defaultValue="center"
  items={[
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
  ]}
/>`,
      },
    },
  },
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <ToggleGroupPrimitives.Root type="multiple">
      <ToggleGroupPrimitives.Item value="bold" aria-label="Toggle bold">Bold</ToggleGroupPrimitives.Item>
      <ToggleGroupPrimitives.Item value="italic" aria-label="Toggle italic">Italic</ToggleGroupPrimitives.Item>
      <ToggleGroupPrimitives.Item value="underline" aria-label="Toggle underline">Underline</ToggleGroupPrimitives.Item>
    </ToggleGroupPrimitives.Root>
  ),
}
