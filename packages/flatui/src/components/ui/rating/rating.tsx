import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Star, StarHalf } from "lucide-react"

import { cn } from "@/lib/utils"

const ratingVariants = cva("inline-flex items-center gap-0.5", {
  variants: {
    size: {
      sm: "[&_svg]:size-4",
      md: "[&_svg]:size-5",
      lg: "[&_svg]:size-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof ratingVariants> {
  /** Current rating value */
  value: number
  /** Called when the user selects a rating */
  onChange?: (value: number) => void
  /** Maximum number of stars */
  max?: number
  /** Custom icon element (replaces default star) */
  icon?: React.ReactElement
  /** Display only — no interaction */
  readOnly?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Whether to allow half-star precision */
  precision?: "full" | "half"
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      size,
      value,
      onChange,
      max = 5,
      icon,
      readOnly,
      disabled,
      precision = "full",
      ...props
    },
    ref
  ) => {
    const [hoverValue, setHoverValue] = React.useState<number | null>(null)
    const isInteractive = !readOnly && !disabled && !!onChange

    const displayValue = hoverValue ?? value

    const handleClick = (starValue: number) => {
      if (isInteractive) onChange?.(starValue)
    }

    const handleMouseEnter = (starValue: number) => {
      if (isInteractive) setHoverValue(starValue)
    }

    const handleMouseLeave = () => {
      if (isInteractive) setHoverValue(null)
    }

    const renderStar = (index: number) => {
      const starNumber = index + 1
      const isFull = displayValue >= starNumber
      const isHalf =
        precision === "half" &&
        !isFull &&
        displayValue >= starNumber - 0.5

      const filled = isFull || isHalf
      const isChecked = Math.round(displayValue) === starNumber

      const starElement = isHalf ? (
        <span className="relative inline-flex">
          <Star className="text-muted-foreground" />
          <span className="absolute inset-0 overflow-hidden w-1/2">
            {icon ? (
              React.cloneElement(icon, {
                className: cn("text-amber-400 fill-amber-400", icon.props.className),
              })
            ) : (
              <Star className="text-amber-400 fill-amber-400" />
            )}
          </span>
        </span>
      ) : icon ? (
        React.cloneElement(icon, {
          className: cn(
            isFull
              ? "text-amber-400 fill-amber-400"
              : "text-muted-foreground",
            icon.props.className
          ),
        })
      ) : (
        <Star
          className={cn(
            isFull
              ? "text-amber-400 fill-amber-400"
              : "text-muted-foreground"
          )}
        />
      )

      if (!isInteractive) {
        return (
          <span
            key={index}
            role="radio"
            aria-checked={isChecked}
            aria-label={`${starNumber} star${starNumber !== 1 ? "s" : ""}`}
          >
            {starElement}
          </span>
        )
      }

      const halfHandlers =
        precision === "half"
          ? {
              onMouseMove: (e: React.MouseEvent<HTMLSpanElement>) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const isLeft = e.clientX - rect.left < rect.width / 2
                setHoverValue(isLeft ? starNumber - 0.5 : starNumber)
              },
              onClick: (e: React.MouseEvent<HTMLSpanElement>) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const isLeft = e.clientX - rect.left < rect.width / 2
                handleClick(isLeft ? starNumber - 0.5 : starNumber)
              },
            }
          : {
              onMouseEnter: () => handleMouseEnter(starNumber),
              onClick: () => handleClick(starNumber),
            }

      return (
        <span
          key={index}
          role="radio"
          aria-checked={isChecked}
          aria-label={`${starNumber} star${starNumber !== 1 ? "s" : ""}`}
          tabIndex={0}
          className="cursor-pointer transition-transform hover:scale-110"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              handleClick(starNumber)
            }
          }}
          {...halfHandlers}
        >
          {starElement}
        </span>
      )
    }

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label={`Rating: ${value} out of ${max} stars`}
        className={cn(
          ratingVariants({ size }),
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {Array.from({ length: max }, (_, i) => renderStar(i))}
      </div>
    )
  }
)
Rating.displayName = "Rating"

export { Rating, ratingVariants }
