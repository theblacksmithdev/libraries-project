import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import {
  Card as CardRoot,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
} from "./card"

export interface CardProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CardRoot>, "title">,
    VariantProps<typeof cardVariants> {
  /** Card title */
  title?: React.ReactNode
  /** Card description shown below the title */
  description?: React.ReactNode
  /** Footer content */
  footer?: React.ReactNode
}

const Card = React.forwardRef<
  React.ElementRef<typeof CardRoot>,
  CardProps
>(({ title, description, footer, children, variant, ...props }, ref) => (
  <CardRoot ref={ref} variant={variant} {...props}>
    {(title || description) && (
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
    )}
    {children && <CardContent>{children}</CardContent>}
    {footer && <CardFooter>{footer}</CardFooter>}
  </CardRoot>
))
Card.displayName = "Card"

export const CardPrimitives = {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
}

export { Card }
