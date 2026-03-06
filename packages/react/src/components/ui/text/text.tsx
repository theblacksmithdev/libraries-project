import * as React from "react"

import { cn } from "@/lib/utils"
import { type StyleProps, splitStyleProps, buildStyleClasses } from "@/lib/style-props"

export type TextVariant = 'body' | 'label' | 'caption' | 'overline'

const textVariantDefaults: Record<TextVariant, Partial<StyleProps>> = {
  body: { fontSize: 'base' },
  label: { fontSize: 'sm', fontWeight: 'medium' },
  caption: { fontSize: 'sm', color: 'muted-foreground' },
  overline: { fontSize: 'sm', fontWeight: 'semibold' },
}

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    StyleProps {
  /** Render as a different element */
  as?: React.ElementType
  /** Typography preset */
  variant?: TextVariant
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ as: Comp = "span", className, variant = "body", ...allProps }, ref) => {
    const { styleClasses, restProps } = splitStyleProps(allProps)
    const variantClasses = buildStyleClasses(textVariantDefaults[variant])

    return (
      <Comp
        ref={ref}
        className={cn(variantClasses, styleClasses, className)}
        {...restProps}
      />
    )
  }
)
Text.displayName = "Text"

export { Text }
