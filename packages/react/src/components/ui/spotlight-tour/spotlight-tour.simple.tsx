"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"

import {
  SpotlightOverlay,
  SpotlightTooltip,
  SpotlightTitle,
  SpotlightDescription,
  SpotlightCounter,
  SpotlightNav,
  useTargetRect,
} from "./spotlight-tour"
import type { TourStep, TourLabels } from "./spotlight-tour"

export interface SpotlightTourProps {
  /** Array of tour steps */
  steps: TourStep[]
  /** Controlled open state */
  open?: boolean
  /** Callback when the tour closes */
  onOpenChange?: (open: boolean) => void
  /** Called when the tour is completed (Finish button) */
  onComplete?: () => void
  /** Called when the tour is skipped */
  onSkip?: () => void
  /** Called when the step changes */
  onStepChange?: (step: number) => void
  /** Initial step index */
  startStep?: number
  /** Show skip button */
  showSkip?: boolean
  /** Show step counter */
  showStepCounter?: boolean
  /** Padding around the highlighted element */
  padding?: number
  /** Custom button labels */
  labels?: TourLabels
}

const SpotlightTour = ({
  steps,
  open = false,
  onOpenChange,
  onComplete,
  onSkip,
  onStepChange,
  startStep = 0,
  showSkip = true,
  showStepCounter = true,
  padding = 8,
  labels,
}: SpotlightTourProps) => {
  const [currentStep, setCurrentStep] = React.useState(startStep)
  const [portalContainer, setPortalContainer] = React.useState<HTMLDivElement | null>(null)
  const previousActiveElement = React.useRef<Element | null>(null)
  const tooltipRef = React.useRef<HTMLDivElement>(null)

  const step = steps[currentStep]
  const targetRect = useTargetRect(open ? step?.target : undefined)

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1

  // Manage portal container
  React.useEffect(() => {
    const container = document.createElement("div")
    container.setAttribute("data-spotlight-tour-portal", "")
    document.body.appendChild(container)
    setPortalContainer(container)

    return () => {
      if (container.parentNode) {
        container.parentNode.removeChild(container)
      }
      setPortalContainer(null)
    }
  }, [])

  // Save and restore focus
  React.useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement
      // Focus the tooltip when it opens
      requestAnimationFrame(() => {
        tooltipRef.current?.focus()
      })
    } else {
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus()
      }
      setCurrentStep(startStep)
    }
  }, [open, startStep])

  const goTo = React.useCallback(
    (index: number) => {
      setCurrentStep(index)
      onStepChange?.(index)
    },
    [onStepChange]
  )

  const handleNext = React.useCallback(() => {
    if (isLastStep) {
      onComplete?.()
      onOpenChange?.(false)
    } else {
      goTo(currentStep + 1)
    }
  }, [isLastStep, currentStep, goTo, onComplete, onOpenChange])

  const handleBack = React.useCallback(() => {
    if (!isFirstStep) {
      goTo(currentStep - 1)
    }
  }, [isFirstStep, currentStep, goTo])

  const handleSkip = React.useCallback(() => {
    onSkip?.()
    onOpenChange?.(false)
  }, [onSkip, onOpenChange])

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault()
          handleSkip()
          break
        case "ArrowRight":
          e.preventDefault()
          handleNext()
          break
        case "ArrowLeft":
          e.preventDefault()
          handleBack()
          break
      }
    },
    [handleSkip, handleNext, handleBack]
  )

  if (!open || !step || !portalContainer) return null

  return ReactDOM.createPortal(
    <div onKeyDown={handleKeyDown}>
      <SpotlightOverlay targetRect={targetRect} padding={padding} />

      <SpotlightTooltip
        ref={tooltipRef}
        targetRect={targetRect}
        placement={step.placement}
        padding={padding}
        tabIndex={-1}
      >
        <SpotlightTitle>{step.title}</SpotlightTitle>

        {step.description && (
          <SpotlightDescription>{step.description}</SpotlightDescription>
        )}

        {step.content}

        {showStepCounter && steps.length > 1 && (
          <SpotlightCounter className="mt-2 block">
            {currentStep + 1} of {steps.length}
          </SpotlightCounter>
        )}

        <SpotlightNav
          onBack={handleBack}
          onNext={handleNext}
          onSkip={handleSkip}
          showBack={!isFirstStep}
          showSkip={showSkip}
          isLastStep={isLastStep}
          labels={labels}
        />
      </SpotlightTooltip>
    </div>,
    portalContainer
  )
}
SpotlightTour.displayName = "SpotlightTour"

export const SpotlightTourPrimitives = {
  Overlay: SpotlightOverlay,
  Tooltip: SpotlightTooltip,
  Title: SpotlightTitle,
  Description: SpotlightDescription,
  Counter: SpotlightCounter,
  Nav: SpotlightNav,
}

export { SpotlightTour }
export type { TourStep, TourLabels }
