import { render, screen, fireEvent } from '@testing-library/react'
import { TreeView, TreeViewPrimitives, TreeViewItem, TreeViewItemTrigger, TreeViewItemContent, TreeViewLeaf } from '.'

describe('TreeView', () => {
  it('renders simplified with nodes', () => {
    render(
      <TreeView
        nodes={[
          {
            id: 'parent',
            label: 'Parent',
            defaultOpen: true,
            children: [{ id: 'child', label: 'Child' }],
          },
          { id: 'leaf', label: 'Leaf' },
        ]}
      />
    )
    expect(screen.getByText('Parent')).toBeInTheDocument()
    expect(screen.getByText('Child')).toBeInTheDocument()
    expect(screen.getByText('Leaf')).toBeInTheDocument()
  })

  it('expands and collapses on click', () => {
    render(
      <TreeView
        nodes={[
          {
            id: 'folder',
            label: 'Folder',
            children: [{ id: 'file', label: 'File' }],
          },
        ]}
      />
    )
    expect(screen.queryByText('File')).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('Folder'))
    expect(screen.getByText('File')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Folder'))
    expect(screen.queryByText('File')).not.toBeInTheDocument()
  })

  it('renders compound primitives', () => {
    render(
      <TreeViewPrimitives.Root>
        <TreeViewPrimitives.Item itemId="item" depth={0} defaultOpen>
          <TreeViewPrimitives.ItemTrigger itemId="item">
            <span>Trigger</span>
          </TreeViewPrimitives.ItemTrigger>
          <TreeViewPrimitives.ItemContent>
            <TreeViewPrimitives.Leaf itemId="leaf" depth={1}>
              <span>Leaf</span>
            </TreeViewPrimitives.Leaf>
          </TreeViewPrimitives.ItemContent>
        </TreeViewPrimitives.Item>
      </TreeViewPrimitives.Root>
    )
    expect(screen.getByText('Trigger')).toBeInTheDocument()
    expect(screen.getByText('Leaf')).toBeInTheDocument()
  })

  it('exports sub-parts for backward compat', () => {
    render(
      <TreeViewPrimitives.Root>
        <TreeViewItem itemId="legacy" depth={0} defaultOpen>
          <TreeViewItemTrigger itemId="legacy">
            <span>Legacy trigger</span>
          </TreeViewItemTrigger>
          <TreeViewItemContent>
            <TreeViewLeaf itemId="leaf" depth={1}>
              <span>Legacy leaf</span>
            </TreeViewLeaf>
          </TreeViewItemContent>
        </TreeViewItem>
      </TreeViewPrimitives.Root>
    )
    expect(screen.getByText('Legacy trigger')).toBeInTheDocument()
    expect(screen.getByText('Legacy leaf')).toBeInTheDocument()
  })

  it('has proper ARIA attributes', () => {
    render(
      <TreeView
        nodes={[
          {
            id: 'parent',
            label: 'Parent',
            children: [{ id: 'child', label: 'Child' }],
          },
        ]}
      />
    )
    expect(screen.getByRole('tree')).toBeInTheDocument()
    expect(screen.getByRole('treeitem')).toHaveAttribute('aria-expanded', 'false')
  })
})
