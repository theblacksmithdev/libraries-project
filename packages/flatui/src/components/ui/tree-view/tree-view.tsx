import * as React from "react"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

/* -------------------------------- Contexts -------------------------------- */

interface TreeViewContextValue {
  selectedId: string | undefined
  onSelect: (id: string) => void
}

const TreeViewContext = React.createContext<TreeViewContextValue>({
  selectedId: undefined,
  onSelect: () => {},
})

interface TreeViewItemContextValue {
  depth: number
  isOpen: boolean
  toggle: () => void
}

const TreeViewItemContext = React.createContext<TreeViewItemContextValue>({
  depth: 0,
  isOpen: false,
  toggle: () => {},
})

/* -------------------------------- Primitives ------------------------------- */

interface TreeViewRootProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Currently selected item id (controlled) */
  selectedId?: string
  /** Callback when an item is selected */
  onSelect?: (id: string) => void
}

const TreeViewRoot = React.forwardRef<HTMLDivElement, TreeViewRootProps>(
  ({ className, selectedId: controlledSelectedId, onSelect: onControlledSelect, ...props }, ref) => {
    const [internalSelectedId, setInternalSelectedId] = React.useState<string | undefined>()
    const selectedId = controlledSelectedId ?? internalSelectedId
    const onSelect = React.useCallback(
      (id: string) => {
        onControlledSelect?.(id)
        if (controlledSelectedId === undefined) setInternalSelectedId(id)
      },
      [onControlledSelect, controlledSelectedId]
    )

    return (
      <TreeViewContext.Provider value={{ selectedId, onSelect }}>
        <div ref={ref} role="tree" className={cn("space-y-0.5", className)} {...props} />
      </TreeViewContext.Provider>
    )
  }
)
TreeViewRoot.displayName = "TreeViewRoot"

interface TreeViewItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique id for this item */
  itemId: string
  /** Nesting depth (set automatically in simple wrapper) */
  depth?: number
  /** Whether expandable children are initially open */
  defaultOpen?: boolean
}

const TreeViewItem = React.forwardRef<HTMLDivElement, TreeViewItemProps>(
  ({ className, itemId, depth = 0, defaultOpen = false, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen)
    const toggle = React.useCallback(() => setIsOpen((o) => !o), [])

    const hasChildren = React.Children.toArray(children).some(
      (child) => React.isValidElement(child) && child.type === TreeViewItemContent
    )

    return (
      <TreeViewItemContext.Provider value={{ depth, isOpen, toggle }}>
        <div
          ref={ref}
          role="treeitem"
          aria-expanded={hasChildren ? isOpen : undefined}
          className={cn("", className)}
          {...props}
        >
          {children}
        </div>
      </TreeViewItemContext.Provider>
    )
  }
)
TreeViewItem.displayName = "TreeViewItem"

const TreeViewItemTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { itemId?: string }
>(({ className, itemId, children, ...props }, ref) => {
  const { depth, isOpen, toggle } = React.useContext(TreeViewItemContext)
  const { selectedId, onSelect } = React.useContext(TreeViewContext)
  const isSelected = itemId !== undefined && selectedId === itemId

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex w-full items-center gap-1 rounded-md py-1 text-sm hover:bg-muted/50 transition-colors",
        isSelected && "bg-accent text-accent-foreground",
        className
      )}
      style={{ paddingLeft: `${depth * 16 + 8}px` }}
      onClick={() => {
        toggle()
        if (itemId) onSelect(itemId)
      }}
      {...props}
    >
      {children}
    </button>
  )
})
TreeViewItemTrigger.displayName = "TreeViewItemTrigger"

const TreeViewItemContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isOpen } = React.useContext(TreeViewItemContext)
  if (!isOpen) return null
  return <div ref={ref} className={cn("", className)} {...props} />
})
TreeViewItemContent.displayName = "TreeViewItemContent"

const TreeViewLeaf = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { itemId: string; depth?: number }
>(({ className, itemId, depth = 0, children, ...props }, ref) => {
  const { selectedId, onSelect } = React.useContext(TreeViewContext)
  const isSelected = selectedId === itemId

  return (
    <button
      ref={ref}
      type="button"
      role="treeitem"
      className={cn(
        "flex w-full items-center gap-1 rounded-md py-1 text-sm hover:bg-muted/50 transition-colors",
        isSelected && "bg-accent text-accent-foreground",
        className
      )}
      style={{ paddingLeft: `${depth * 16 + 8}px` }}
      onClick={() => onSelect(itemId)}
      {...props}
    >
      {children}
    </button>
  )
})
TreeViewLeaf.displayName = "TreeViewLeaf"

const TreeViewItemIcon = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { expandable?: boolean }
>(({ className, expandable, children, ...props }, ref) => {
  const { isOpen } = React.useContext(TreeViewItemContext)

  if (expandable) {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex shrink-0 transition-transform duration-200 [&_svg]:size-4",
          isOpen && "rotate-90",
          className
        )}
        {...props}
      >
        <ChevronRight />
      </span>
    )
  }

  return (
    <span
      ref={ref}
      className={cn("inline-flex shrink-0 [&_svg]:size-4", className)}
      {...props}
    >
      {children}
    </span>
  )
})
TreeViewItemIcon.displayName = "TreeViewItemIcon"

export {
  TreeViewRoot,
  TreeViewItem,
  TreeViewItemTrigger,
  TreeViewItemContent,
  TreeViewLeaf,
  TreeViewItemIcon,
  TreeViewContext,
  TreeViewItemContext,
}

export type { TreeViewRootProps, TreeViewItemProps }
