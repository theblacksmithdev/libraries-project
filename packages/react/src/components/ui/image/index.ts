// Simplified wrapper as the primary export
export { Image, ImagePrimitives } from './image.simple'
export type { ImageProps } from './image.simple'

// Sub-parts still available individually (backward compat)
export { ImageRoot, ImageImg, ImageFallback, ImageSkeleton } from './image'
export type { ImageStatus, ImageImgProps } from './image'
