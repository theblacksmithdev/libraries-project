import type { Meta, StoryObj } from '@storybook/react'
import { Folder, File, FileText, Image } from 'lucide-react'
import { TreeView, TreeViewPrimitives } from '.'

const meta: Meta<typeof TreeView> = {
  title: 'Data Display/TreeView',
  component: TreeView,
  parameters: {
    docs: {
      description: {
        component: 'Recursive expandable tree view with selection and depth tracking.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof TreeView>

export const Default: Story = {
  render: () => (
    <div className="w-[300px] rounded-lg border p-2">
      <TreeView
        nodes={[
          {
            id: 'src',
            label: 'src',
            icon: <Folder />,
            defaultOpen: true,
            children: [
              {
                id: 'components',
                label: 'components',
                icon: <Folder />,
                children: [
                  { id: 'button', label: 'Button.tsx', icon: <File /> },
                  { id: 'card', label: 'Card.tsx', icon: <File /> },
                ],
              },
              { id: 'index', label: 'index.ts', icon: <FileText /> },
              { id: 'styles', label: 'styles.css', icon: <FileText /> },
            ],
          },
          {
            id: 'public',
            label: 'public',
            icon: <Folder />,
            children: [
              { id: 'logo', label: 'logo.png', icon: <Image /> },
            ],
          },
          { id: 'readme', label: 'README.md', icon: <FileText /> },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { TreeView } from '@blacksmith-ui/react'
import { Folder, File } from 'lucide-react'

<TreeView
  nodes={[
    {
      id: 'src',
      label: 'src',
      icon: <Folder />,
      defaultOpen: true,
      children: [
        { id: 'index', label: 'index.ts', icon: <File /> },
      ],
    },
  ]}
/>`,
      },
    },
  },
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <div className="w-[300px] rounded-lg border p-2">
      <TreeViewPrimitives.Root>
        <TreeViewPrimitives.Item itemId="folder" depth={0} defaultOpen>
          <TreeViewPrimitives.ItemTrigger itemId="folder">
            <TreeViewPrimitives.ItemIcon expandable />
            <TreeViewPrimitives.ItemIcon><Folder /></TreeViewPrimitives.ItemIcon>
            <span>Folder</span>
          </TreeViewPrimitives.ItemTrigger>
          <TreeViewPrimitives.ItemContent>
            <TreeViewPrimitives.Leaf itemId="file1" depth={1}>
              <span className="inline-flex w-4" />
              <TreeViewPrimitives.ItemIcon><File /></TreeViewPrimitives.ItemIcon>
              <span>File 1</span>
            </TreeViewPrimitives.Leaf>
          </TreeViewPrimitives.ItemContent>
        </TreeViewPrimitives.Item>
      </TreeViewPrimitives.Root>
    </div>
  ),
}
