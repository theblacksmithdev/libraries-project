"use client"

import * as React from "react"
import {
  DropdownMenu as DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from "./dropdown-menu"

export interface MenuItemDef {
  /** Item label */
  label: React.ReactNode
  /** Callback when the item is selected */
  onSelect?: () => void
  /** Whether the item is disabled */
  disabled?: boolean
  /** Keyboard shortcut label */
  shortcut?: string
  /** Icon element */
  icon?: React.ReactNode
  /** Destructive styling */
  variant?: "destructive"
}

export interface MenuSeparatorDef {
  type: "separator"
}

export interface MenuLabelDef {
  type: "label"
  label: React.ReactNode
}

export type DropdownMenuItemDef = MenuItemDef | MenuSeparatorDef | MenuLabelDef

function isSeparator(item: DropdownMenuItemDef): item is MenuSeparatorDef {
  return "type" in item && item.type === "separator"
}

function isLabel(item: DropdownMenuItemDef): item is MenuLabelDef {
  return "type" in item && item.type === "label"
}

export interface DropdownMenuProps {
  /** Trigger element */
  trigger: React.ReactNode
  /** Menu items */
  items: DropdownMenuItemDef[]
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Preferred side of the trigger */
  side?: React.ComponentPropsWithoutRef<typeof DropdownMenuContent>["side"]
  /** Preferred alignment against the trigger */
  align?: React.ComponentPropsWithoutRef<typeof DropdownMenuContent>["align"]
}

function DropdownMenu({
  trigger,
  items,
  open,
  onOpenChange,
  side,
  align,
}: DropdownMenuProps) {
  return (
    <DropdownMenuRoot open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent side={side} align={align}>
        {items.map((item, index) => {
          if (isSeparator(item)) {
            return <DropdownMenuSeparator key={index} />
          }
          if (isLabel(item)) {
            return <DropdownMenuLabel key={index}>{item.label}</DropdownMenuLabel>
          }
          return (
            <DropdownMenuItem
              key={index}
              disabled={item.disabled}
              onSelect={item.onSelect}
              className={item.variant === "destructive" ? "text-destructive focus:text-destructive" : undefined}
            >
              {item.icon}
              {item.label}
              {item.shortcut && (
                <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenuRoot>
  )
}
DropdownMenu.displayName = "DropdownMenu"

export const DropdownMenuPrimitives = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioItem: DropdownMenuRadioItem,
  Label: DropdownMenuLabel,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
  Group: DropdownMenuGroup,
  Portal: DropdownMenuPortal,
  Sub: DropdownMenuSub,
  SubContent: DropdownMenuSubContent,
  SubTrigger: DropdownMenuSubTrigger,
  RadioGroup: DropdownMenuRadioGroup,
}

export { DropdownMenu }
