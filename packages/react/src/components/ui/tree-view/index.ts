// Simplified wrapper as the primary export
export { TreeView, TreeViewPrimitives } from './tree-view.simple'
export type { TreeViewProps, TreeNodeDef } from './tree-view.simple'

// Sub-parts still available individually (backward compat)
export {
  TreeViewRoot,
  TreeViewItem,
  TreeViewItemTrigger,
  TreeViewItemContent,
  TreeViewLeaf,
  TreeViewItemIcon,
} from './tree-view'
