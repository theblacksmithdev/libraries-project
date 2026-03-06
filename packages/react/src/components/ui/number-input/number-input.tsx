import * as React from "react"
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const numberInputVariants = cva(
  "flex items-center rounded-md border border-input transition-colors focus-within:ring-1 focus-within:ring-ring",
  {
    variants: {
      size: {
        sm: "h-8",
        default: "h-9",
        lg: "h-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange" | "value">,
    VariantProps<typeof numberInputVariants> {
  /** Current value */
  value?: number
  /** Called when value changes */
  onChange?: (value: number) => void
  /** Minimum allowed value */
  min?: number
  /** Maximum allowed value */
  max?: number
  /** Step increment */
  step?: number
  /** Stepper button style */
  stepper?: "inline" | "split"
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      size,
      value,
      onChange,
      min,
      max,
      step = 1,
      disabled,
      stepper = "inline",
      ...props
    },
    ref
  ) => {
    const clamp = React.useCallback(
      (v: number) => {
        let clamped = v
        if (min != null) clamped = Math.max(min, clamped)
        if (max != null) clamped = Math.min(max, clamped)
        return clamped
      },
      [min, max]
    )

    const increment = () => {
      const next = clamp((value ?? 0) + step)
      onChange?.(next)
    }

    const decrement = () => {
      const next = clamp((value ?? 0) - step)
      onChange?.(next)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value
      if (raw === "" || raw === "-") return
      const parsed = Number(raw)
      if (!Number.isNaN(parsed)) {
        onChange?.(clamp(parsed))
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault()
        increment()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        decrement()
      }
    }

    const canIncrement = max == null || (value ?? 0) < max
    const canDecrement = min == null || (value ?? 0) > min

    if (stepper === "split") {
      return (
        <div className={cn(numberInputVariants({ size }), className)}>
          <button
            type="button"
            onClick={decrement}
            disabled={disabled || !canDecrement}
            className="flex shrink-0 items-center justify-center px-2 text-muted-foreground hover:text-foreground disabled:opacity-50"
            aria-label="Decrease"
            tabIndex={-1}
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <input
            ref={ref}
            type="text"
            inputMode="numeric"
            value={value ?? ""}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className="w-full flex-1 bg-transparent text-center text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            {...props}
          />
          <button
            type="button"
            onClick={increment}
            disabled={disabled || !canIncrement}
            className="flex shrink-0 items-center justify-center px-2 text-muted-foreground hover:text-foreground disabled:opacity-50"
            aria-label="Increase"
            tabIndex={-1}
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      )
    }

    return (
      <div className={cn(numberInputVariants({ size }), className)}>
        <input
          ref={ref}
          type="text"
          inputMode="numeric"
          value={value ?? ""}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="w-full flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          {...props}
        />
        <div className="flex shrink-0 flex-col border-l">
          <button
            type="button"
            onClick={increment}
            disabled={disabled || !canIncrement}
            className="flex flex-1 items-center justify-center px-1.5 text-muted-foreground hover:text-foreground disabled:opacity-50"
            aria-label="Increase"
            tabIndex={-1}
          >
            <ChevronUp className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={decrement}
            disabled={disabled || !canDecrement}
            className="flex flex-1 items-center justify-center border-t px-1.5 text-muted-foreground hover:text-foreground disabled:opacity-50"
            aria-label="Decrease"
            tabIndex={-1}
          >
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>
    )
  }
)
NumberInput.displayName = "NumberInput"

export { NumberInput, numberInputVariants }
