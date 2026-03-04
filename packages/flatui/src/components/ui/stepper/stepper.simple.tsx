import * as React from "react"
import {
  StepperRoot,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
  type StepStatus,
} from "./stepper"

export interface StepDef {
  /** Step title */
  title: React.ReactNode
  /** Optional description */
  description?: React.ReactNode
  /** Custom icon override */
  icon?: React.ReactNode
  /** Mark this step as optional */
  optional?: boolean
}

export interface StepperProps
  extends Omit<React.ComponentPropsWithoutRef<typeof StepperRoot>, "children"> {
  /** Step definitions */
  steps: StepDef[]
  /** Index of the currently active step (0-based) */
  activeStep: number
  /** Called when a completed or active step is clicked */
  onStepClick?: (index: number) => void
  /** Layout orientation */
  orientation?: "horizontal" | "vertical"
}

function getStatus(index: number, activeStep: number): StepStatus {
  if (index < activeStep) return "completed"
  if (index === activeStep) return "active"
  return "upcoming"
}

const Stepper = React.forwardRef<
  React.ElementRef<typeof StepperRoot>,
  StepperProps
>(({ steps, activeStep, onStepClick, orientation = "horizontal", ...props }, ref) => (
  <StepperRoot ref={ref} orientation={orientation} {...props}>
    {steps.map((step, index) => {
      const status = getStatus(index, activeStep)
      const isLast = index === steps.length - 1
      const isClickable = onStepClick && status !== "upcoming"

      const indicator = (
        <StepperIndicator status={status}>
          {step.icon ?? index + 1}
        </StepperIndicator>
      )

      const content = (
        <>
          <StepperTitle>{step.title}</StepperTitle>
          {step.description && (
            <StepperDescription>{step.description}</StepperDescription>
          )}
          {step.optional && (
            <span className="text-xs text-muted-foreground">Optional</span>
          )}
        </>
      )

      return (
        <React.Fragment key={index}>
          <StepperItem status={status}>
            {orientation === "horizontal" ? (
              isClickable ? (
                <StepperTrigger onClick={() => onStepClick(index)}>
                  {indicator}
                  <div className="text-center">{content}</div>
                </StepperTrigger>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  {indicator}
                  <div className="text-center">{content}</div>
                </div>
              )
            ) : isClickable ? (
              <StepperTrigger onClick={() => onStepClick(index)}>
                {indicator}
                <div>{content}</div>
              </StepperTrigger>
            ) : (
              <>
                {indicator}
                <div className="pb-8">{content}</div>
              </>
            )}
          </StepperItem>
          {!isLast && (
            <StepperSeparator completed={status === "completed"} />
          )}
        </React.Fragment>
      )
    })}
  </StepperRoot>
))
Stepper.displayName = "Stepper"

export const StepperPrimitives = {
  Root: StepperRoot,
  Item: StepperItem,
  Trigger: StepperTrigger,
  Indicator: StepperIndicator,
  Title: StepperTitle,
  Description: StepperDescription,
  Separator: StepperSeparator,
}

export { Stepper }
