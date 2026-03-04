import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

/* --------------------------------- Context -------------------------------- */

export type StepStatus = "completed" | "active" | "upcoming"

interface StepperContextValue {
  orientation: "horizontal" | "vertical"
}

const StepperContext = React.createContext<StepperContextValue>({
  orientation: "horizontal",
})

/* --------------------------------- Variants -------------------------------- */

const stepperIndicatorVariants = cva(
  "relative z-10 flex shrink-0 items-center justify-center rounded-full border text-sm font-medium h-9 w-9 [&_svg]:size-4",
  {
    variants: {
      status: {
        completed: "border-primary bg-primary text-primary-foreground",
        active: "border-primary bg-background text-primary",
        upcoming:
          "border-muted-foreground/25 bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { status: "upcoming" },
  }
)

/* -------------------------------- Primitives ------------------------------- */

interface StepperRootProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
}

const StepperRoot = React.forwardRef<HTMLDivElement, StepperRootProps>(
  ({ className, orientation = "horizontal", children, ...props }, ref) => (
    <StepperContext.Provider value={{ orientation }}>
      <div
        ref={ref}
        role="list"
        className={cn(
          orientation === "horizontal"
            ? "flex items-start"
            : "flex flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </StepperContext.Provider>
  )
)
StepperRoot.displayName = "StepperRoot"

interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: StepStatus
}

const StepperItem = React.forwardRef<HTMLDivElement, StepperItemProps>(
  ({ className, status = "upcoming", children, ...props }, ref) => {
    const { orientation } = React.useContext(StepperContext)
    return (
      <div
        ref={ref}
        data-status={status}
        aria-current={status === "active" ? "step" : undefined}
        className={cn(
          orientation === "horizontal"
            ? "flex flex-1 items-center last:flex-none"
            : "flex gap-4",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
StepperItem.displayName = "StepperItem"

export interface StepperTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const StepperTrigger = React.forwardRef<HTMLButtonElement, StepperTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { orientation } = React.useContext(StepperContext)
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "flex items-center gap-3 bg-transparent border-none p-0 cursor-pointer disabled:cursor-default disabled:opacity-100",
          orientation === "horizontal" && "flex-col gap-2",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
StepperTrigger.displayName = "StepperTrigger"

interface StepperIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperIndicatorVariants> {}

const StepperIndicator = React.forwardRef<HTMLDivElement, StepperIndicatorProps>(
  ({ className, status, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(stepperIndicatorVariants({ status }), className)}
      {...props}
    >
      {status === "completed" ? <Check /> : children}
    </div>
  )
)
StepperIndicator.displayName = "StepperIndicator"

const StepperTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm font-medium leading-none", className)}
    {...props}
  />
))
StepperTitle.displayName = "StepperTitle"

const StepperDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-1 text-xs text-muted-foreground", className)}
    {...props}
  />
))
StepperDescription.displayName = "StepperDescription"

const StepperSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { completed?: boolean }
>(({ className, completed, ...props }, ref) => {
  const { orientation } = React.useContext(StepperContext)
  return (
    <div
      ref={ref}
      className={cn(
        completed ? "bg-primary" : "bg-border",
        orientation === "horizontal"
          ? "mx-2 h-0.5 flex-1"
          : "ml-[18px] w-0.5 min-h-[24px]",
        className
      )}
      aria-hidden
      {...props}
    />
  )
})
StepperSeparator.displayName = "StepperSeparator"

export {
  StepperRoot,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
  StepperContext,
  stepperIndicatorVariants,
}

export type { StepperRootProps, StepperItemProps, StepperIndicatorProps }
