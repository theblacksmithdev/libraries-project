import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TagInput } from '.'

const meta: Meta<typeof TagInput> = {
  title: 'Inputs/TagInput',
  component: TagInput,
  parameters: {
    docs: {
      description: {
        component:
          'Input that creates dismissible tags/chips. Supports Enter and comma delimiters, paste splitting, and max tag limits.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof TagInput>

export const Default: Story = {
  render: () => {
    const [tags, setTags] = React.useState<string[]>(['React', 'TypeScript'])
    return <TagInput value={tags} onChange={setTags} />
  },
  parameters: {
    docs: {
      source: {
        code: `import { TagInput } from '@blacksmith-ui/react'\n\nconst [tags, setTags] = useState(['React', 'TypeScript'])\n<TagInput value={tags} onChange={setTags} />`,
      },
    },
  },
}

export const Empty: Story = {
  render: () => {
    const [tags, setTags] = React.useState<string[]>([])
    return <TagInput value={tags} onChange={setTags} placeholder="Add skills..." />
  },
}

export const MaxTags: Story = {
  render: () => {
    const [tags, setTags] = React.useState(['One', 'Two'])
    return (
      <div className="space-y-2">
        <TagInput value={tags} onChange={setTags} max={3} />
        <p className="text-xs text-muted-foreground">{tags.length}/3 tags</p>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <TagInput value={['Read', 'Only']} disabled />
  ),
}

export const ManyTags: Story = {
  render: () => {
    const [tags, setTags] = React.useState([
      'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular',
      'Svelte', 'Next.js', 'Remix',
    ])
    return <TagInput value={tags} onChange={setTags} />
  },
}
