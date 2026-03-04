import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowUp } from "lucide-react"

import { cn } from "@/lib/utils"

const backToTopVariants = cva(
  "fixed z-50 inline-flex items-center justify-center rounded-full border shadow-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      size: {
        sm: "h-8 w-8 [&_svg]:size-3.5",
        default: "h-10 w-10 [&_svg]:size-4",
        lg: "h-12 w-12 [&_svg]:size-5",
      },
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "bg-background text-foreground hover:bg-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      position: {
        "bottom-right": "bottom-6 right-6",
        "bottom-left": "bottom-6 left-6",
        "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
      position: "bottom-right",
    },
  }
)

export interface BackToTopProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof backToTopVariants> {
  /** Scroll threshold in pixels before the button appears */
  threshold?: number
  /** Custom icon */
  icon?: React.ReactNode
  /** Smooth scroll behavior */
  smooth?: boolean
  /** Custom scroll target (default: window) */
  scrollTarget?: React.RefObject<HTMLElement | null>
  /** Always visible (skip scroll detection) */
  alwaysVisible?: boolean
}

const BackToTop = React.forwardRef<HTMLButtonElement, BackToTopProps>(
  (
    {
      className,
      size,
      variant,
      position,
      threshold = 300,
      icon,
      smooth = true,
      scrollTarget,
      alwaysVisible = false,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(alwaysVisible)

    React.useEffect(() => {
      if (alwaysVisible) return

      const target = scrollTarget?.current ?? window
      const handleScroll = () => {
        const scrollY =
          target === window
            ? window.scrollY
            : (target as HTMLElement).scrollTop
        setVisible(scrollY > threshold)
      }

      target.addEventListener("scroll", handleScroll, { passive: true })
      handleScroll()
      return () => target.removeEventListener("scroll", handleScroll)
    }, [threshold, scrollTarget, alwaysVisible])

    const scrollToTop = () => {
      const target = scrollTarget?.current ?? window
      if (target === window) {
        window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" })
      } else {
        ;(target as HTMLElement).scrollTo({
          top: 0,
          behavior: smooth ? "smooth" : "auto",
        })
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Back to top"
        onClick={scrollToTop}
        className={cn(
          backToTopVariants({ size, variant, position }),
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0 pointer-events-none",
          className
        )}
        {...props}
      >
        {icon ?? <ArrowUp />}
      </button>
    )
  }
)
BackToTop.displayName = "BackToTop"

export { BackToTop, backToTopVariants }
