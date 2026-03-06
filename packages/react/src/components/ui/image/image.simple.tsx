"use client"

import * as React from "react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  ImageRoot,
  ImageImg,
  ImageFallback,
  ImageSkeleton,
} from "./image"
import type { ImageStatus } from "./image"
import { cn } from "@/lib/utils"

export interface ImageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src: string
  /** Alt text for the image */
  alt: string
  /** Image width */
  width?: number | string
  /** Image height */
  height?: number | string
  /** Aspect ratio (e.g. 16/9) — wraps image in AspectRatio */
  aspectRatio?: number
  /** Content shown on error (defaults to ImageOff icon) */
  fallback?: React.ReactNode
  /** Called when the image loads successfully */
  onLoad?: React.ReactEventHandler<HTMLImageElement>
  /** Called when the image fails to load */
  onError?: React.ReactEventHandler<HTMLImageElement>
}

const Image = React.forwardRef<HTMLDivElement, ImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      aspectRatio,
      fallback,
      className,
      onLoad,
      onError,
      ...props
    },
    ref
  ) => {
    const [status, setStatus] = React.useState<ImageStatus>("loading")

    React.useEffect(() => {
      setStatus("loading")
    }, [src])

    const handleLoad: React.ReactEventHandler<HTMLImageElement> = (e) => {
      setStatus("loaded")
      onLoad?.(e)
    }

    const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
      setStatus("error")
      onError?.(e)
    }

    const content = (
      <>
        {status === "loading" && <ImageSkeleton />}
        {status === "error" && (
          <ImageFallback>{fallback}</ImageFallback>
        )}
        <ImageImg
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            status === "loaded" ? "animate-in fade-in" : "sr-only"
          )}
        />
      </>
    )

    return (
      <ImageRoot
        ref={ref}
        className={className}
        style={{ width, height }}
        {...props}
      >
        {aspectRatio ? (
          <AspectRatio ratio={aspectRatio}>{content}</AspectRatio>
        ) : (
          content
        )}
      </ImageRoot>
    )
  }
)
Image.displayName = "Image"

export const ImagePrimitives = {
  Root: ImageRoot,
  Img: ImageImg,
  Fallback: ImageFallback,
  Skeleton: ImageSkeleton,
}

export { Image }
