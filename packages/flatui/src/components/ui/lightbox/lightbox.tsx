"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

import { cn } from "@/lib/utils"

const LightboxRoot = DialogPrimitive.Root

const LightboxTrigger = DialogPrimitive.Trigger

const LightboxPortal = DialogPrimitive.Portal

const LightboxOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
LightboxOverlay.displayName = "LightboxOverlay"

const LightboxClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    className={cn(
      "absolute right-4 top-4 z-50 rounded-sm text-white/70 transition-opacity hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black",
      className
    )}
    {...props}
  >
    <X className="h-6 w-6" />
    <span className="sr-only">Close</span>
  </DialogPrimitive.Close>
))
LightboxClose.displayName = "LightboxClose"

const LightboxContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <LightboxPortal>
    <LightboxOverlay />
    <DialogPrimitive.Content
      ref={ref}
      aria-describedby={undefined}
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center outline-none",
        className
      )}
      {...props}
    >
      <DialogPrimitive.Title className="sr-only">
        Image viewer
      </DialogPrimitive.Title>
      <DialogPrimitive.Description className="sr-only">
        Full screen image preview
      </DialogPrimitive.Description>
      {children}
    </DialogPrimitive.Content>
  </LightboxPortal>
))
LightboxContent.displayName = "LightboxContent"

const LightboxImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, alt = "", ...props }, ref) => (
  <img
    ref={ref}
    alt={alt}
    className={cn("object-contain max-h-[85vh] max-w-[90vw]", className)}
    {...props}
  />
))
LightboxImage.displayName = "LightboxImage"

interface LightboxNavProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "prev" | "next"
}

const LightboxNav = React.forwardRef<HTMLButtonElement, LightboxNavProps>(
  ({ className, direction, ...props }, ref) => {
    const Icon = direction === "prev" ? ChevronLeft : ChevronRight
    const label = direction === "prev" ? "Previous image" : "Next image"
    const positionClass = direction === "prev" ? "left-4" : "right-4"

    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/50 p-2 text-white/70 transition-colors hover:bg-black/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-30 disabled:cursor-not-allowed",
          positionClass,
          className
        )}
        {...props}
      >
        <Icon className="h-6 w-6" />
      </button>
    )
  }
)
LightboxNav.displayName = "LightboxNav"

const LightboxCaption = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-3 text-center text-sm text-white/80", className)}
    {...props}
  />
))
LightboxCaption.displayName = "LightboxCaption"

const LightboxCounter = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-live="polite"
    className={cn(
      "absolute top-4 left-1/2 -translate-x-1/2 z-50 text-sm text-white/70",
      className
    )}
    {...props}
  />
))
LightboxCounter.displayName = "LightboxCounter"

export {
  LightboxRoot,
  LightboxTrigger,
  LightboxPortal,
  LightboxOverlay,
  LightboxContent,
  LightboxImage,
  LightboxNav,
  LightboxClose,
  LightboxCaption,
  LightboxCounter,
}
