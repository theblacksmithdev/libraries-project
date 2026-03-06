import * as React from "react"
import {
  Alert as AlertRoot,
  AlertTitle,
  AlertDescription,
} from "./alert"

export interface AlertProps
  extends Omit<React.ComponentPropsWithoutRef<typeof AlertRoot>, "title"> {
  /** Alert title */
  title?: React.ReactNode
  /** Alert description text */
  description?: React.ReactNode
  /** Optional icon rendered before the content */
  icon?: React.ReactNode
}

const Alert = React.forwardRef<
  React.ElementRef<typeof AlertRoot>,
  AlertProps
>(({ title, description, icon, children, ...props }, ref) => (
  <AlertRoot ref={ref} {...props}>
    {icon}
    {title && <AlertTitle>{title}</AlertTitle>}
    {description && <AlertDescription>{description}</AlertDescription>}
    {children}
  </AlertRoot>
))
Alert.displayName = "Alert"

export const AlertPrimitives = {
  Root: AlertRoot,
  Title: AlertTitle,
  Description: AlertDescription,
}

export { Alert }
