import * as React from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statCardVariants = cva("rounded-lg p-6 text-card-foreground", {
  variants: {
    variant: {
      default: "border bg-card",
      elevated: "border bg-card shadow-md",
      minimal: "bg-transparent",
      highlighted: "border-primary bg-primary/5",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  /** Label above the value */
  label: string
  /** Primary value to display */
  value: React.ReactNode
  /** Trend direction */
  trend?: "up" | "down" | "neutral"
  /** Trend value text (e.g. "+12%") */
  trendValue?: string
  /** Icon displayed in the header */
  icon?: React.ReactNode
  /** Description text below the value */
  description?: string
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, label, value, trend, trendValue, icon, description, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(statCardVariants({ variant }), className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        {icon && (
          <span className="text-muted-foreground [&_svg]:size-4">
            {icon}
          </span>
        )}
      </div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      {(trendValue || description) && (
        <div className="mt-1 flex items-center gap-1 text-xs">
          {trendValue && (
            <span
              className={cn(
                "flex items-center gap-0.5 font-medium",
                trend === "up" && "text-emerald-600",
                trend === "down" && "text-red-600",
                trend === "neutral" && "text-muted-foreground"
              )}
            >
              {trend === "up" && <TrendingUp className="size-3" />}
              {trend === "down" && <TrendingDown className="size-3" />}
              {trendValue}
            </span>
          )}
          {description && (
            <span className="text-muted-foreground">{description}</span>
          )}
        </div>
      )}
    </div>
  )
)
StatCard.displayName = "StatCard"

export { StatCard, statCardVariants }
