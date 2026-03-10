import * as React from "react"

import { cn } from "@/lib/utils"
import {
  type FlexDirectionToken,
  type SpacingToken,
  type AlignToken,
  type JustifyToken,
  type WrapToken,
  type StyleProps,
  splitStyleProps,
} from "@/lib/style-props"

export interface FlexProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    StyleProps {
  /** Render as a different element */
  as?: React.ElementType
  /** Flex direction: row | row-reverse | col | col-reverse */
  direction?: FlexDirectionToken
  /** Gap between items: 0 | unit | xs | sm | md | lg | xl | 2xl */
  gap?: SpacingToken
  /** Align items: start | center | end | stretch | baseline */
  align?: AlignToken
  /** Justify content: start | center | end | between | around | evenly */
  justify?: JustifyToken
  /** Flex wrap: wrap | nowrap | wrap-reverse */
  wrap?: WrapToken
}

const Flex = React.forwardRef<HTMLElement, FlexProps>(
  ({ as: Comp = "div", className, ...allProps }, ref) => {
    const { styleClasses, restProps } = splitStyleProps(allProps)
    return (
      <Comp
        ref={ref}
        className={cn("flex", styleClasses, className)}
        {...restProps}
      />
    )
  }
)
Flex.displayName = "Flex"

export { Flex }
