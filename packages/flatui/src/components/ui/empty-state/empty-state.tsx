import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center",
  {
    variants: {
      variant: {
        default: "py-12",
        compact: "py-6",
        card: "py-12 rounded-lg border bg-card",
        dashed: "py-12 rounded-lg border border-dashed",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  /** Icon to display above the title */
  icon?: React.ReactNode
  /** Title text */
  title: string
  /** Description text below the title */
  description?: string
  /** Action slot (e.g. a Button) */
  action?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(emptyStateVariants({ variant }), className)}
      {...props}
    >
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted [&_svg]:size-6 [&_svg]:text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
)
EmptyState.displayName = "EmptyState"

export { EmptyState, emptyStateVariants }
