import * as React from "react"

import { cn } from "@/lib/utils"

/* -------------------------------- Primitives ------------------------------- */

interface ListRootProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Show dividers between items */
  divided?: boolean
}

const ListRoot = React.forwardRef<HTMLUListElement, ListRootProps>(
  ({ className, divided, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn(divided && "divide-y divide-border", className)}
      role="list"
      {...props}
    />
  )
)
ListRoot.displayName = "ListRoot"

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /** Make the item interactive (hover effects) */
  interactive?: boolean
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, interactive, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(
        "flex items-center gap-3 px-3 py-3",
        interactive && "cursor-pointer hover:bg-muted/50 transition-colors",
        className
      )}
      {...props}
    />
  )
)
ListItem.displayName = "ListItem"

const ListItemLeading = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex shrink-0 items-center text-muted-foreground [&_svg]:size-5", className)}
    {...props}
  />
))
ListItemLeading.displayName = "ListItemLeading"

const ListItemContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1 min-w-0", className)} {...props} />
))
ListItemContent.displayName = "ListItemContent"

const ListItemTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm font-medium leading-tight", className)}
    {...props}
  />
))
ListItemTitle.displayName = "ListItemTitle"

const ListItemDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground truncate", className)}
    {...props}
  />
))
ListItemDescription.displayName = "ListItemDescription"

const ListItemTrailing = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex shrink-0 items-center", className)}
    {...props}
  />
))
ListItemTrailing.displayName = "ListItemTrailing"

export {
  ListRoot,
  ListItem,
  ListItemLeading,
  ListItemContent,
  ListItemTitle,
  ListItemDescription,
  ListItemTrailing,
}

export type { ListRootProps, ListItemProps }
