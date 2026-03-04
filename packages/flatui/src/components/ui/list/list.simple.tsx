import * as React from "react"
import {
  ListRoot,
  ListItem,
  ListItemLeading,
  ListItemContent,
  ListItemTitle,
  ListItemDescription,
  ListItemTrailing,
} from "./list"

export interface ListItemDef {
  /** Unique key for the item */
  key?: string
  /** Leading slot (icon, avatar, etc.) */
  leading?: React.ReactNode
  /** Item title */
  title: React.ReactNode
  /** Item description */
  description?: React.ReactNode
  /** Trailing slot (badge, action, etc.) */
  trailing?: React.ReactNode
  /** Click handler for the item */
  onClick?: () => void
}

export interface ListProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ListRoot>, "children"> {
  /** List item definitions */
  items: ListItemDef[]
  /** Show dividers between items */
  divided?: boolean
  /** Make items interactive */
  interactive?: boolean
}

const List = React.forwardRef<
  React.ElementRef<typeof ListRoot>,
  ListProps
>(({ items, divided, interactive, ...props }, ref) => (
  <ListRoot ref={ref} divided={divided} {...props}>
    {items.map((item, index) => (
      <ListItem
        key={item.key ?? index}
        interactive={interactive || !!item.onClick}
        onClick={item.onClick}
      >
        {item.leading && <ListItemLeading>{item.leading}</ListItemLeading>}
        <ListItemContent>
          <ListItemTitle>{item.title}</ListItemTitle>
          {item.description && (
            <ListItemDescription>{item.description}</ListItemDescription>
          )}
        </ListItemContent>
        {item.trailing && <ListItemTrailing>{item.trailing}</ListItemTrailing>}
      </ListItem>
    ))}
  </ListRoot>
))
List.displayName = "List"

export const ListPrimitives = {
  Root: ListRoot,
  Item: ListItem,
  ItemLeading: ListItemLeading,
  ItemContent: ListItemContent,
  ItemTitle: ListItemTitle,
  ItemDescription: ListItemDescription,
  ItemTrailing: ListItemTrailing,
}

export { List }
