// Simplified wrapper as the primary export
export { List, ListPrimitives } from './list.simple'
export type { ListProps, ListItemDef } from './list.simple'

// Sub-parts still available individually (backward compat)
export {
  ListRoot,
  ListItem,
  ListItemLeading,
  ListItemContent,
  ListItemTitle,
  ListItemDescription,
  ListItemTrailing,
} from './list'
