"use client"

import * as React from "react"
import { ImageOff } from "lucide-react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type ImageStatus = "loading" | "loaded" | "error"

const ImageRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  />
))
ImageRoot.displayName = "ImageRoot"

interface ImageImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: number
}

const ImageImg = React.forwardRef<HTMLImageElement, ImageImgProps>(
  ({ className, aspectRatio, ...props }, ref) => {
    const imgElement = (
      <img
        ref={ref}
        className={cn("object-cover w-full h-full", className)}
        {...props}
      />
    )

    if (aspectRatio) {
      return <AspectRatio ratio={aspectRatio}>{imgElement}</AspectRatio>
    }

    return imgElement
  }
)
ImageImg.displayName = "ImageImg"

const ImageFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center bg-muted text-muted-foreground",
      className
    )}
    {...props}
  >
    {children || <ImageOff className="h-8 w-8" />}
  </div>
))
ImageFallback.displayName = "ImageFallback"

const ImageSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, _ref) => (
  <Skeleton
    className={cn("h-full w-full", className)}
    {...props}
  />
))
ImageSkeleton.displayName = "ImageSkeleton"

export { ImageRoot, ImageImg, ImageFallback, ImageSkeleton }
export type { ImageStatus, ImageImgProps }
