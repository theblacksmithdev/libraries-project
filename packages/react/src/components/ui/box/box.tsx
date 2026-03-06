import * as React from "react"

import { cn } from "@/lib/utils"
import { type StyleProps, splitStyleProps } from "@/lib/style-props"

export interface BoxProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    StyleProps {
  /** Render as a different element */
  as?: React.ElementType
}

const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ as: Comp = "div", className, ...allProps }, ref) => {
    const { styleClasses, restProps } = splitStyleProps(allProps)
    return <Comp ref={ref} className={cn(styleClasses, className)} {...restProps} />
  }
)
Box.displayName = "Box"

export { Box }
