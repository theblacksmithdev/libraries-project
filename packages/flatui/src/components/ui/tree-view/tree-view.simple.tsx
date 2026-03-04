import * as React from "react"
import {
  TreeViewRoot,
  TreeViewItem,
  TreeViewItemTrigger,
  TreeViewItemContent,
  TreeViewLeaf,
  TreeViewItemIcon,
} from "./tree-view"

export interface TreeNodeDef {
  /** Unique id */
  id: string
  /** Label to display */
  label: React.ReactNode
  /** Custom icon */
  icon?: React.ReactNode
  /** Child nodes */
  children?: TreeNodeDef[]
  /** Start expanded */
  defaultOpen?: boolean
}

export interface TreeViewProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TreeViewRoot>, "children"> {
  /** Recursive tree node definitions */
  nodes: TreeNodeDef[]
}

function renderNodes(nodes: TreeNodeDef[], depth: number): React.ReactNode {
  return nodes.map((node) => {
    if (node.children && node.children.length > 0) {
      return (
        <TreeViewItem
          key={node.id}
          itemId={node.id}
          depth={depth}
          defaultOpen={node.defaultOpen}
        >
          <TreeViewItemTrigger itemId={node.id}>
            <TreeViewItemIcon expandable />
            {node.icon && <TreeViewItemIcon>{node.icon}</TreeViewItemIcon>}
            <span>{node.label}</span>
          </TreeViewItemTrigger>
          <TreeViewItemContent>
            {renderNodes(node.children, depth + 1)}
          </TreeViewItemContent>
        </TreeViewItem>
      )
    }

    return (
      <TreeViewLeaf key={node.id} itemId={node.id} depth={depth}>
        <span className="inline-flex w-4" />
        {node.icon && <TreeViewItemIcon>{node.icon}</TreeViewItemIcon>}
        <span>{node.label}</span>
      </TreeViewLeaf>
    )
  })
}

const TreeView = React.forwardRef<
  React.ElementRef<typeof TreeViewRoot>,
  TreeViewProps
>(({ nodes, ...props }, ref) => (
  <TreeViewRoot ref={ref} {...props}>
    {renderNodes(nodes, 0)}
  </TreeViewRoot>
))
TreeView.displayName = "TreeView"

export const TreeViewPrimitives = {
  Root: TreeViewRoot,
  Item: TreeViewItem,
  ItemTrigger: TreeViewItemTrigger,
  ItemContent: TreeViewItemContent,
  Leaf: TreeViewLeaf,
  ItemIcon: TreeViewItemIcon,
}

export { TreeView }
