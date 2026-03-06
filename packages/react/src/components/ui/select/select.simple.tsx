"use client"

import * as React from "react"
import {
  Select as SelectRoot,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "./select"

export interface SelectOptionDef {
  /** Option value */
  value: string
  /** Display label */
  label: string
  /** Whether the option is disabled */
  disabled?: boolean
}

export interface SelectGroupDef {
  /** Group label */
  label: string
  /** Options within this group */
  options: SelectOptionDef[]
}

export type SelectOptionOrGroup = SelectOptionDef | SelectGroupDef

function isGroup(item: SelectOptionOrGroup): item is SelectGroupDef {
  return "options" in item
}

export interface SelectProps {
  /** Options or option groups */
  options: SelectOptionOrGroup[]
  /** Controlled value */
  value?: string
  /** Callback when value changes */
  onValueChange?: (value: string) => void
  /** Placeholder text */
  placeholder?: string
  /** Whether the select is disabled */
  disabled?: boolean
  /** Default value (uncontrolled) */
  defaultValue?: string
  /** Form field name */
  name?: string
}

function Select({
  options,
  value,
  onValueChange,
  placeholder,
  disabled,
  defaultValue,
  name,
}: SelectProps) {
  return (
    <SelectRoot
      value={value}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      disabled={disabled}
      name={name}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((item, index) =>
          isGroup(item) ? (
            <SelectGroup key={index}>
              <SelectLabel>{item.label}</SelectLabel>
              {item.options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          ) : (
            <SelectItem key={item.value} value={item.value} disabled={item.disabled}>
              {item.label}
            </SelectItem>
          )
        )}
      </SelectContent>
    </SelectRoot>
  )
}
Select.displayName = "Select"

export const SelectPrimitives = {
  Root: SelectRoot,
  Group: SelectGroup,
  Value: SelectValue,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Label: SelectLabel,
  Item: SelectItem,
  Separator: SelectSeparator,
  ScrollUpButton: SelectScrollUpButton,
  ScrollDownButton: SelectScrollDownButton,
}

export { Select }
