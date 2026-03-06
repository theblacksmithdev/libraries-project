import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const dividerVariants = cva("shrink-0", {
  variants: {
    orientation: {
      horizontal: "w-full",
      vertical: "h-full self-stretch",
    },
    variant: {
      solid: "",
      dashed: "",
      dotted: "",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "solid",
  },
})

const lineStyles: Record<string, string> = {
  solid: "border-solid",
  dashed: "border-dashed",
  dotted: "border-dotted",
}

export interface DividerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof dividerVariants> {
  /** Label displayed in the center of the divider */
  label?: React.ReactNode
  /** Position of the label along the divider */
  labelPosition?: "start" | "center" | "end"
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      className,
      orientation = "horizontal",
      variant = "solid",
      label,
      labelPosition = "center",
      ...props
    },
    ref
  ) => {
    const borderStyle = lineStyles[variant ?? "solid"]

    if (!label) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation={orientation ?? "horizontal"}
          className={cn(
            dividerVariants({ orientation, variant }),
            orientation === "horizontal"
              ? cn("border-t border-border", borderStyle)
              : cn("border-l border-border", borderStyle),
            className
          )}
          {...props}
        />
      )
    }

    if (orientation === "vertical") {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cn(
            "flex flex-col items-center self-stretch",
            className
          )}
          {...props}
        >
          <div
            className={cn(
              "border-l border-border",
              borderStyle,
              labelPosition === "start" ? "flex-none h-4" : "flex-1"
            )}
          />
          <span className="px-0 py-2 text-xs text-muted-foreground">{label}</span>
          <div
            className={cn(
              "border-l border-border",
              borderStyle,
              labelPosition === "end" ? "flex-none h-4" : "flex-1"
            )}
          />
        </div>
      )
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn(
          "flex items-center w-full",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "border-t border-border",
            borderStyle,
            labelPosition === "start" ? "flex-none w-4" : "flex-1"
          )}
        />
        <span className="px-3 text-xs text-muted-foreground whitespace-nowrap">
          {label}
        </span>
        <div
          className={cn(
            "border-t border-border",
            borderStyle,
            labelPosition === "end" ? "flex-none w-4" : "flex-1"
          )}
        />
      </div>
    )
  }
)
Divider.displayName = "Divider"

export { Divider, dividerVariants }
