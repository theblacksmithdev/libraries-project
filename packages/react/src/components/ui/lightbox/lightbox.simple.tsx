"use client"

import * as React from "react"

import {
  LightboxRoot,
  LightboxTrigger,
  LightboxContent,
  LightboxImage as LightboxImg,
  LightboxNav,
  LightboxClose,
  LightboxCaption,
  LightboxCounter,
  LightboxOverlay,
  LightboxPortal,
} from "./lightbox"

export interface LightboxImageItem {
  src: string
  alt?: string
  caption?: string
}

export interface LightboxProps {
  /** Array of images to display */
  images: LightboxImageItem[]
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Index of the image to show initially */
  startIndex?: number
  /** Show image counter (e.g. "2 / 5") */
  showCounter?: boolean
  /** Show image captions */
  showCaption?: boolean
  /** Callback when the current index changes */
  onIndexChange?: (index: number) => void
  /** Custom trigger element */
  trigger?: React.ReactNode
}

const Lightbox = ({
  images,
  open,
  onOpenChange,
  startIndex = 0,
  showCounter = true,
  showCaption = true,
  onIndexChange,
  trigger,
}: LightboxProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(startIndex)
  const isGallery = images.length > 1

  React.useEffect(() => {
    setCurrentIndex(startIndex)
  }, [startIndex])

  const goTo = React.useCallback(
    (index: number) => {
      setCurrentIndex(index)
      onIndexChange?.(index)
    },
    [onIndexChange]
  )

  const goPrev = React.useCallback(() => {
    if (currentIndex > 0) goTo(currentIndex - 1)
  }, [currentIndex, goTo])

  const goNext = React.useCallback(() => {
    if (currentIndex < images.length - 1) goTo(currentIndex + 1)
  }, [currentIndex, images.length, goTo])

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        goPrev()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        goNext()
      }
    },
    [goPrev, goNext]
  )

  const currentImage = images[currentIndex]

  if (!currentImage) return null

  return (
    <LightboxRoot open={open} onOpenChange={onOpenChange}>
      {trigger && <LightboxTrigger asChild>{trigger}</LightboxTrigger>}
      <LightboxContent onKeyDown={handleKeyDown}>
        <LightboxClose />

        {showCounter && isGallery && (
          <LightboxCounter>
            {currentIndex + 1} / {images.length}
          </LightboxCounter>
        )}

        {isGallery && (
          <LightboxNav
            direction="prev"
            onClick={goPrev}
            disabled={currentIndex === 0}
          />
        )}

        <LightboxImg src={currentImage.src} alt={currentImage.alt || ""} />

        {isGallery && (
          <LightboxNav
            direction="next"
            onClick={goNext}
            disabled={currentIndex === images.length - 1}
          />
        )}

        {showCaption && currentImage.caption && (
          <LightboxCaption>{currentImage.caption}</LightboxCaption>
        )}
      </LightboxContent>
    </LightboxRoot>
  )
}
Lightbox.displayName = "Lightbox"

export const LightboxPrimitives = {
  Root: LightboxRoot,
  Trigger: LightboxTrigger,
  Portal: LightboxPortal,
  Overlay: LightboxOverlay,
  Content: LightboxContent,
  Image: LightboxImg,
  Nav: LightboxNav,
  Close: LightboxClose,
  Caption: LightboxCaption,
  Counter: LightboxCounter,
}

export { Lightbox }
