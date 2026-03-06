// Simplified wrapper as the primary export
export { Avatar, AvatarPrimitives } from './avatar.simple'
export type { AvatarProps } from './avatar.simple'

// Sub-parts still available individually (backward compat)
export { AvatarImage, AvatarFallback } from './avatar'
