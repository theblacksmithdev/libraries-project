import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@blacksmith-ui/react'
import { cn } from '../../lib/utils'

export interface AuthLayoutProps {
  /** Card heading */
  title: string
  /** Card subheading */
  description?: string
  /** Card body */
  children: React.ReactNode
  /** Footer content (links, etc.) */
  footer?: React.ReactNode
  /** Additional className on the outermost wrapper */
  className?: string
  /** Max width class (default: max-w-md) */
  maxWidth?: string
}

export function AuthLayout({
  title,
  description,
  children,
  footer,
  className,
  maxWidth = 'max-w-md',
}: AuthLayoutProps) {
  return (
    <div className={cn('flex min-h-full items-center justify-center p-4', className)}>
      <Card className={cn('w-full', maxWidth)}>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          {description && (
            <CardDescription>{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>{children}</CardContent>
        {footer && <CardFooter className="flex-col gap-2">{footer}</CardFooter>}
      </Card>
    </div>
  )
}
