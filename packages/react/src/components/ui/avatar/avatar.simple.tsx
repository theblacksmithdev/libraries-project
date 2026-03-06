"use client"

import * as React from "react"
import {
  Avatar as AvatarRoot,
  AvatarImage,
  AvatarFallback,
} from "./avatar"

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarRoot> {
  /** Image source URL */
  src?: string
  /** Alt text for the avatar image */
  alt?: string
  /** Fallback content shown when image is unavailable */
  fallback?: React.ReactNode
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarRoot>,
  AvatarProps
>(({ src, alt, fallback, ...props }, ref) => (
  <AvatarRoot ref={ref} {...props}>
    {src && <AvatarImage src={src} alt={alt} />}
    {fallback && <AvatarFallback>{fallback}</AvatarFallback>}
  </AvatarRoot>
))
Avatar.displayName = "Avatar"

export const AvatarPrimitives = {
  Root: AvatarRoot,
  Image: AvatarImage,
  Fallback: AvatarFallback,
}

export { Avatar }
