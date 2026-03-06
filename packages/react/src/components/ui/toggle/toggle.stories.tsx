import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from '.'

const meta: Meta<typeof Toggle> = {
  title: 'Inputs/Toggle',
  component: Toggle,
  parameters: {
    docs: {
      description: {
        component: 'A two-state button that can be toggled on or off.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  render: () => (<Toggle aria-label="Toggle bold">Bold</Toggle>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Toggle } from '@forge-ui/react'

<Toggle aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>`,
      },
    },
  },
}

export const Outline: Story = {
  render: () => (<Toggle variant="outline" aria-label="Toggle italic">Italic</Toggle>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Toggle variant="outline" aria-label="Toggle italic">
  <Italic className="h-4 w-4" />
</Toggle>`,
      },
    },
  },
}
