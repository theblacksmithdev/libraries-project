"use client"

import * as React from "react"
import {
  ToggleGroup as ToggleGroupRoot,
  ToggleGroupItem,
} from "./toggle-group"

export interface ToggleGroupItemDef {
  /** Unique value for the item */
  value: string
  /** Item label content */
  label: React.ReactNode
  /** Whether the item is disabled */
  disabled?: boolean
}

export type ToggleGroupProps = Omit<
  React.ComponentPropsWithoutRef<typeof ToggleGroupRoot>,
  "children"
> & {
  /** Toggle items to render */
  items: ToggleGroupItemDef[]
}

function ToggleGroup({ items, ...props }: ToggleGroupProps) {
  return (
    <ToggleGroupRoot {...(props as React.ComponentPropsWithoutRef<typeof ToggleGroupRoot>)}>
      {items.map((item) => (
        <ToggleGroupItem
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          aria-label={typeof item.label === "string" ? item.label : undefined}
        >
          {item.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroupRoot>
  )
}
ToggleGroup.displayName = "ToggleGroup"

export const ToggleGroupPrimitives = {
  Root: ToggleGroupRoot,
  Item: ToggleGroupItem,
}

export { ToggleGroup }
