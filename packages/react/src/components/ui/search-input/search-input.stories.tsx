import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SearchInput } from '.'

const meta: Meta<typeof SearchInput> = {
  title: 'Inputs/SearchInput',
  component: SearchInput,
  parameters: {
    docs: {
      description: {
        component:
          'Input with search icon, clear button, and loading state. Hides native browser search cancel button for consistent styling.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof SearchInput>

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    return (
      <SearchInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
        placeholder="Search..."
      />
    )
  },
  parameters: {
    docs: {
      source: {
        code: `import { SearchInput } from '@forge-ui/react'\n\nconst [value, setValue] = useState('')\n<SearchInput\n  value={value}\n  onChange={(e) => setValue(e.target.value)}\n  onClear={() => setValue('')}\n  placeholder="Search..."\n/>`,
      },
    },
  },
}

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = React.useState('react components')
    return (
      <SearchInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
        placeholder="Search..."
      />
    )
  },
}

export const Loading: Story = {
  render: () => (
    <SearchInput value="loading..." loading placeholder="Search..." readOnly />
  ),
}

export const Disabled: Story = {
  render: () => (
    <SearchInput placeholder="Search..." disabled />
  ),
}
