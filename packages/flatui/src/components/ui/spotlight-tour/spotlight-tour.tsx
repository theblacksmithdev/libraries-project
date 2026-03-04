"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"

export interface TourStep {
  /** CSS selector for the target element */
  target: string
  /** Step title */
  title: string
  /** Step description */
  description?: string
  /** Tooltip placement relative to the target */
  placement?: "top" | "bottom" | "left" | "right"
  /** Custom content to render in the tooltip */
  content?: React.ReactNode
}

export interface TourLabels {
  next?: string
  back?: string
  skip?: string
  finish?: string
}

// --- Primitives ---

interface SpotlightOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  targetRect: DOMRect | null
  padding?: number
}

const SpotlightOverlay = React.forwardRef<HTMLDivElement, SpotlightOverlayProps>(
  ({ targetRect, padding = 8, className, ...props }, ref) => {
    return (
      <>
        {/* Click blocker behind everything */}
        <div
          className="fixed inset-0 z-[9998]"
          aria-hidden="true"
        />
        {/* Spotlight cutout */}
        <div
          ref={ref}
          className={cn("fixed z-[9999] rounded-md pointer-events-none", className)}
          style={
            targetRect
              ? {
                  top: targetRect.top - padding,
                  left: targetRect.left - padding,
                  width: targetRect.width + padding * 2,
                  height: targetRect.height + padding * 2,
                  boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
                }
              : {
                  top: 0,
                  left: 0,
                  width: 0,
                  height: 0,
                  boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
                }
          }
          {...props}
        />
      </>
    )
  }
)
SpotlightOverlay.displayName = "SpotlightOverlay"

interface SpotlightTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  targetRect: DOMRect | null
  placement?: "top" | "bottom" | "left" | "right"
  padding?: number
}

const SpotlightTooltip = React.forwardRef<HTMLDivElement, SpotlightTooltipProps>(
  ({ targetRect, placement = "bottom", padding = 8, className, children, ...props }, ref) => {
    const tooltipStyle = React.useMemo((): React.CSSProperties => {
      if (!targetRect) {
        return {
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }
      }

      const gap = 12
      const base: React.CSSProperties = { position: "fixed" }

      switch (placement) {
        case "top":
          return {
            ...base,
            bottom: window.innerHeight - targetRect.top + padding + gap,
            left: targetRect.left + targetRect.width / 2,
            transform: "translateX(-50%)",
          }
        case "bottom":
          return {
            ...base,
            top: targetRect.bottom + padding + gap,
            left: targetRect.left + targetRect.width / 2,
            transform: "translateX(-50%)",
          }
        case "left":
          return {
            ...base,
            top: targetRect.top + targetRect.height / 2,
            right: window.innerWidth - targetRect.left + padding + gap,
            transform: "translateY(-50%)",
          }
        case "right":
          return {
            ...base,
            top: targetRect.top + targetRect.height / 2,
            left: targetRect.right + padding + gap,
            transform: "translateY(-50%)",
          }
      }
    }, [targetRect, placement, padding])

    return (
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Product tour"
        className={cn(
          "fixed z-[10000] w-80 rounded-lg border bg-popover p-4 text-popover-foreground shadow-lg",
          className
        )}
        style={tooltipStyle}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SpotlightTooltip.displayName = "SpotlightTooltip"

const SpotlightTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
SpotlightTitle.displayName = "SpotlightTitle"

const SpotlightDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-1 text-sm text-muted-foreground", className)}
    {...props}
  />
))
SpotlightDescription.displayName = "SpotlightDescription"

const SpotlightCounter = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-live="polite"
    className={cn("text-xs text-muted-foreground", className)}
    {...props}
  />
))
SpotlightCounter.displayName = "SpotlightCounter"

interface SpotlightNavProps extends React.HTMLAttributes<HTMLDivElement> {
  onBack?: () => void
  onNext?: () => void
  onSkip?: () => void
  showBack?: boolean
  showSkip?: boolean
  isLastStep?: boolean
  labels?: TourLabels
}

const SpotlightNav = React.forwardRef<HTMLDivElement, SpotlightNavProps>(
  (
    {
      className,
      onBack,
      onNext,
      onSkip,
      showBack = true,
      showSkip = true,
      isLastStep = false,
      labels = {},
      ...props
    },
    ref
  ) => {
    const nextLabel = isLastStep ? (labels.finish ?? "Finish") : (labels.next ?? "Next")
    const backLabel = labels.back ?? "Back"
    const skipLabel = labels.skip ?? "Skip"

    return (
      <div
        ref={ref}
        className={cn("mt-4 flex items-center justify-between", className)}
        {...props}
      >
        <div>
          {showSkip && (
            <button
              type="button"
              onClick={onSkip}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {skipLabel}
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {showBack && (
            <button
              type="button"
              onClick={onBack}
              className="rounded-md border px-3 py-1.5 text-xs transition-colors hover:bg-accent"
            >
              {backLabel}
            </button>
          )}
          <button
            type="button"
            onClick={onNext}
            className="rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {nextLabel}
          </button>
        </div>
      </div>
    )
  }
)
SpotlightNav.displayName = "SpotlightNav"

// --- Hook for target measurement ---

function useTargetRect(selector: string | undefined) {
  const [rect, setRect] = React.useState<DOMRect | null>(null)

  React.useEffect(() => {
    if (!selector) {
      setRect(null)
      return
    }

    const element = document.querySelector(selector)
    if (!element) {
      setRect(null)
      return
    }

    const updateRect = () => {
      setRect(element.getBoundingClientRect())
    }

    // Initial measurement
    element.scrollIntoView({ behavior: "smooth", block: "nearest" })
    updateRect()

    // Listen for resize/scroll
    window.addEventListener("resize", updateRect)
    window.addEventListener("scroll", updateRect, true)

    const observer = new ResizeObserver(updateRect)
    observer.observe(element)

    return () => {
      window.removeEventListener("resize", updateRect)
      window.removeEventListener("scroll", updateRect, true)
      observer.disconnect()
    }
  }, [selector])

  return rect
}

export {
  SpotlightOverlay,
  SpotlightTooltip,
  SpotlightTitle,
  SpotlightDescription,
  SpotlightCounter,
  SpotlightNav,
  useTargetRect,
}
