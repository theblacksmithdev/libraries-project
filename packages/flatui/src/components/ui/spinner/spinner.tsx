import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const spinnerVariants = cva("inline-flex items-center justify-center", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  /** Visual style of the spinner */
  variant?: "spinner" | "dots" | "bars"
  /** Screen-reader label */
  label?: string
}

const SpinnerCircle = React.forwardRef<SVGSVGElement, { className?: string }>(
  ({ className }, ref) => (
    <svg
      ref={ref}
      className={cn("animate-spin", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
)
SpinnerCircle.displayName = "SpinnerCircle"

const SpinnerDots = ({ className }: { className?: string }) => (
  <span className={cn("inline-flex items-center gap-1", className)}>
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="h-1.5 w-1.5 rounded-full bg-current animate-bounce"
        style={{ animationDelay: `${i * 150}ms` }}
      />
    ))}
  </span>
)

const SpinnerBars = ({ className }: { className?: string }) => (
  <>
    <style>{`
      @keyframes flatui-bar-scale {
        0%, 40%, 100% { transform: scaleY(0.4); }
        20% { transform: scaleY(1); }
      }
    `}</style>
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-0.5 h-full rounded-full bg-current"
          style={{
            animation: "flatui-bar-scale 1.2s ease-in-out infinite",
            animationDelay: `${i * 100}ms`,
          }}
        />
      ))}
    </span>
  </>
)

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, variant = "spinner", label, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-label={label ?? "Loading"}
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      {variant === "spinner" && <SpinnerCircle className="h-full w-full" />}
      {variant === "dots" && <SpinnerDots className="h-full" />}
      {variant === "bars" && <SpinnerBars className="h-full" />}
      {label && <span className="sr-only">{label}</span>}
    </div>
  )
)
Spinner.displayName = "Spinner"

export { Spinner, spinnerVariants }
