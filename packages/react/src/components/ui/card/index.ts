// Simplified wrapper as the primary export
export { Card, CardPrimitives } from './card.simple'
export type { CardProps } from './card.simple'

// Sub-parts still available individually (backward compat)
export { CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './card'
