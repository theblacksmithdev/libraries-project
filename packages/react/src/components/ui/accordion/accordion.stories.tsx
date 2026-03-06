import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionPrimitives } from '.'

const meta: Meta<typeof Accordion> = {
  title: 'Navigation/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component: 'A vertically stacked set of interactive headings that reveal content.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  render: () => (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      items={[
        { value: 'item-1', trigger: 'Is it accessible?', content: 'Yes. It adheres to the WAI-ARIA design pattern.' },
        { value: 'item-2', trigger: 'Is it styled?', content: 'Yes. It comes with default styles that match the Anthropic palette.' },
        { value: 'item-3', trigger: 'Is it animated?', content: "Yes. It's animated by default with smooth open/close transitions." },
      ]}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Accordion } from '@forge-ui/react'

<Accordion
  type="single"
  collapsible
  items={[
    { value: 'item-1', trigger: 'Is it accessible?', content: 'Yes. It adheres to the WAI-ARIA design pattern.' },
    { value: 'item-2', trigger: 'Is it styled?', content: 'Yes. It comes with default styles.' },
  ]}
/>`,
      },
    },
  },
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <AccordionPrimitives.Root type="single" collapsible className="w-full">
      <AccordionPrimitives.Item value="item-1">
        <AccordionPrimitives.Trigger>Is it accessible?</AccordionPrimitives.Trigger>
        <AccordionPrimitives.Content>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionPrimitives.Content>
      </AccordionPrimitives.Item>
      <AccordionPrimitives.Item value="item-2">
        <AccordionPrimitives.Trigger>Is it styled?</AccordionPrimitives.Trigger>
        <AccordionPrimitives.Content>
          Yes. It comes with default styles that match the Anthropic palette.
        </AccordionPrimitives.Content>
      </AccordionPrimitives.Item>
    </AccordionPrimitives.Root>
  ),
}
