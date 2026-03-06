import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertTriangle, CheckCircle, Info, X, XCircle } from "lucide-react"

import { cn } from "@/lib/utils"

const alertBannerVariants = cva(
  "relative flex w-full items-start gap-3 border-b px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        info: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800",
        success:
          "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800",
        warning:
          "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800",
        error:
          "bg-red-50 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-800",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

const defaultIcons: Record<string, React.ReactNode> = {
  info: <Info className="h-4 w-4" />,
  success: <CheckCircle className="h-4 w-4" />,
  warning: <AlertTriangle className="h-4 w-4" />,
  error: <XCircle className="h-4 w-4" />,
}

export interface AlertBannerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertBannerVariants> {
  /** Banner title */
  title?: React.ReactNode
  /** Custom icon override; pass `null` to hide */
  icon?: React.ReactNode | null
  /** Show a dismiss button */
  dismissible?: boolean
  /** Called when dismiss button is clicked */
  onDismiss?: () => void
  /** Optional action element (e.g. a button) */
  action?: React.ReactNode
}

const AlertBanner = React.forwardRef<HTMLDivElement, AlertBannerProps>(
  (
    {
      className,
      variant = "info",
      title,
      icon,
      dismissible,
      onDismiss,
      action,
      children,
      ...props
    },
    ref
  ) => {
    const resolvedIcon = icon === null ? null : (icon ?? defaultIcons[variant ?? "info"])

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertBannerVariants({ variant }), className)}
        {...props}
      >
        {resolvedIcon && (
          <span className="mt-0.5 shrink-0">{resolvedIcon}</span>
        )}
        <div className="flex-1 min-w-0">
          {title && <p className="font-medium">{title}</p>}
          {children && <div className={cn(title && "mt-1")}>{children}</div>}
        </div>
        {action && <div className="shrink-0 self-center">{action}</div>}
        {dismissible && (
          <button
            type="button"
            onClick={onDismiss}
            className="shrink-0 self-start rounded-sm p-0.5 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
AlertBanner.displayName = "AlertBanner"

export { AlertBanner, alertBannerVariants }
