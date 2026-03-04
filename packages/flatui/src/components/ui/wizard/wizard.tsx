import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/* --------------------------------- Context -------------------------------- */

interface WizardContextValue {
  activeStep: number
  totalSteps: number
  orientation: "horizontal" | "vertical"
  goTo: (step: number) => void
  next: () => void
  prev: () => void
}

const WizardContext = React.createContext<WizardContextValue>({
  activeStep: 0,
  totalSteps: 0,
  orientation: "horizontal",
  goTo: () => {},
  next: () => {},
  prev: () => {},
})

export const useWizard = () => React.useContext(WizardContext)

/* --------------------------------- Variants -------------------------------- */

const wizardIndicatorVariants = cva(
  "relative z-10 flex shrink-0 items-center justify-center rounded-full border text-sm font-medium h-8 w-8 [&_svg]:size-3.5",
  {
    variants: {
      status: {
        completed: "border-primary bg-primary text-primary-foreground",
        active: "border-primary bg-background text-primary",
        upcoming: "border-muted-foreground/25 bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { status: "upcoming" },
  }
)

/* --------------------------------- Types ---------------------------------- */

export interface WizardStepDef {
  title: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  content: React.ReactNode
  optional?: boolean
}

export interface WizardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Step definitions with content */
  steps: WizardStepDef[]
  /** Current active step (controlled) */
  activeStep?: number
  /** Called when step changes */
  onStepChange?: (step: number) => void
  /** Layout orientation for the step header */
  orientation?: "horizontal" | "vertical"
  /** Show navigation buttons */
  showNavigation?: boolean
  /** Label for the back button */
  backLabel?: React.ReactNode
  /** Label for the next button */
  nextLabel?: React.ReactNode
  /** Label for the final step button */
  completeLabel?: React.ReactNode
  /** Called when the last step's next button is clicked */
  onComplete?: () => void
}

type StepStatus = "completed" | "active" | "upcoming"

function getStatus(index: number, activeStep: number): StepStatus {
  if (index < activeStep) return "completed"
  if (index === activeStep) return "active"
  return "upcoming"
}

/* -------------------------------- Component ------------------------------- */

const Wizard = React.forwardRef<HTMLDivElement, WizardProps>(
  (
    {
      className,
      steps,
      activeStep: controlledStep,
      onStepChange,
      orientation = "horizontal",
      showNavigation = true,
      backLabel = "Back",
      nextLabel = "Next",
      completeLabel = "Complete",
      onComplete,
      ...props
    },
    ref
  ) => {
    const [internalStep, setInternalStep] = React.useState(0)
    const activeStep = controlledStep ?? internalStep

    const goTo = React.useCallback(
      (step: number) => {
        const clamped = Math.max(0, Math.min(step, steps.length - 1))
        if (controlledStep === undefined) setInternalStep(clamped)
        onStepChange?.(clamped)
      },
      [controlledStep, onStepChange, steps.length]
    )

    const next = React.useCallback(() => {
      if (activeStep === steps.length - 1) {
        onComplete?.()
      } else {
        goTo(activeStep + 1)
      }
    }, [activeStep, steps.length, goTo, onComplete])

    const prev = React.useCallback(() => goTo(activeStep - 1), [activeStep, goTo])

    const ctx = React.useMemo<WizardContextValue>(
      () => ({ activeStep, totalSteps: steps.length, orientation, goTo, next, prev }),
      [activeStep, steps.length, orientation, goTo, next, prev]
    )

    const isLast = activeStep === steps.length - 1

    if (orientation === "vertical") {
      return (
        <WizardContext.Provider value={ctx}>
          <div ref={ref} className={cn("flex gap-6", className)} {...props}>
            {/* Vertical step list */}
            <div className="flex flex-col">
              {steps.map((step, i) => {
                const status = getStatus(i, activeStep)
                const isLastStep = i === steps.length - 1
                return (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={cn(wizardIndicatorVariants({ status }))}>
                        {status === "completed" ? <Check /> : (step.icon ?? i + 1)}
                      </div>
                      {!isLastStep && (
                        <div
                          className={cn(
                            "w-0.5 flex-1 min-h-[24px]",
                            status === "completed" ? "bg-primary" : "bg-border"
                          )}
                        />
                      )}
                    </div>
                    <div className="pb-6">
                      <button
                        type="button"
                        className={cn(
                          "text-left bg-transparent border-none p-0",
                          status !== "upcoming" && "cursor-pointer"
                        )}
                        onClick={() => status !== "upcoming" && goTo(i)}
                        disabled={status === "upcoming"}
                      >
                        <p className="text-sm font-medium leading-none">{step.title}</p>
                        {step.description && (
                          <p className="mt-1 text-xs text-muted-foreground">{step.description}</p>
                        )}
                      </button>
                      {step.optional && (
                        <span className="text-xs text-muted-foreground">Optional</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            {/* Content panel */}
            <div className="flex-1">
              <div data-wizard-content>{steps[activeStep]?.content}</div>
              {showNavigation && (
                <div className="mt-6 flex gap-2">
                  <Button variant="outline" onClick={prev} disabled={activeStep === 0}>
                    {backLabel}
                  </Button>
                  <Button onClick={next}>
                    {isLast ? completeLabel : nextLabel}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </WizardContext.Provider>
      )
    }

    return (
      <WizardContext.Provider value={ctx}>
        <div ref={ref} className={cn("space-y-6", className)} {...props}>
          {/* Horizontal step header */}
          <div className="flex items-center">
            {steps.map((step, i) => {
              const status = getStatus(i, activeStep)
              const isLastStep = i === steps.length - 1
              return (
                <React.Fragment key={i}>
                  <button
                    type="button"
                    className={cn(
                      "flex items-center gap-2 bg-transparent border-none p-0",
                      status !== "upcoming" && "cursor-pointer"
                    )}
                    onClick={() => status !== "upcoming" && goTo(i)}
                    disabled={status === "upcoming"}
                    aria-current={status === "active" ? "step" : undefined}
                  >
                    <div className={cn(wizardIndicatorVariants({ status }))}>
                      {status === "completed" ? <Check /> : (step.icon ?? i + 1)}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium leading-none">{step.title}</p>
                      {step.description && (
                        <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>
                      )}
                    </div>
                  </button>
                  {!isLastStep && (
                    <div
                      className={cn(
                        "mx-3 h-0.5 flex-1",
                        status === "completed" ? "bg-primary" : "bg-border"
                      )}
                      aria-hidden
                    />
                  )}
                </React.Fragment>
              )
            })}
          </div>
          {/* Content panel */}
          <div data-wizard-content>{steps[activeStep]?.content}</div>
          {/* Navigation buttons */}
          {showNavigation && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={prev} disabled={activeStep === 0}>
                {backLabel}
              </Button>
              <Button onClick={next}>
                {isLast ? completeLabel : nextLabel}
              </Button>
            </div>
          )}
        </div>
      </WizardContext.Provider>
    )
  }
)
Wizard.displayName = "Wizard"

export { Wizard, wizardIndicatorVariants }
