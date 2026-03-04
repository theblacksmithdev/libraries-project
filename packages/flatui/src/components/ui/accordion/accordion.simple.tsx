import * as React from "react"
import {
  Accordion as AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion"

export interface AccordionItemDef {
  /** Unique value for the item */
  value: string
  /** Trigger label content */
  trigger: React.ReactNode
  /** Panel content */
  content: React.ReactNode
  /** Whether the item is disabled */
  disabled?: boolean
}

export type AccordionProps = React.ComponentPropsWithoutRef<typeof AccordionRoot> & {
  /** Accordion items to render */
  items: AccordionItemDef[]
}

function Accordion({ items, ...props }: AccordionProps) {
  return (
    <AccordionRoot {...props}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value} disabled={item.disabled}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  )
}
Accordion.displayName = "Accordion"

export const AccordionPrimitives = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
}

export { Accordion }
