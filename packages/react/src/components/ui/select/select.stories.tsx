import type { Meta, StoryObj } from '@storybook/react'
import { Select, SelectPrimitives } from '.'

const meta: Meta<typeof Select> = {
  title: 'Inputs/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: 'Displays a list of options for the user to pick from.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: () => (
    <Select
      placeholder="Select a fruit"
      options={[
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'blueberry', label: 'Blueberry' },
        { value: 'grapes', label: 'Grapes' },
        { value: 'pineapple', label: 'Pineapple' },
      ]}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Select } from '@forge-ui/react'

<Select
  placeholder="Select a fruit"
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
  ]}
/>`,
      },
    },
  },
}

export const WithGroups: Story = {
  render: () => (
    <Select
      placeholder="Select a fruit"
      options={[
        {
          label: 'Fruits',
          options: [
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
          ],
        },
        {
          label: 'Vegetables',
          options: [
            { value: 'carrot', label: 'Carrot' },
            { value: 'potato', label: 'Potato' },
          ],
        },
      ]}
    />
  ),
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <SelectPrimitives.Root>
      <SelectPrimitives.Trigger className="w-[180px]">
        <SelectPrimitives.Value placeholder="Select a fruit" />
      </SelectPrimitives.Trigger>
      <SelectPrimitives.Content>
        <SelectPrimitives.Group>
          <SelectPrimitives.Label>Fruits</SelectPrimitives.Label>
          <SelectPrimitives.Item value="apple">Apple</SelectPrimitives.Item>
          <SelectPrimitives.Item value="banana">Banana</SelectPrimitives.Item>
        </SelectPrimitives.Group>
      </SelectPrimitives.Content>
    </SelectPrimitives.Root>
  ),
}
