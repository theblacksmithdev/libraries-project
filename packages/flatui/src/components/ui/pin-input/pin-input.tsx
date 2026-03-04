import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const pinSlotVariants = cva(
  "flex items-center justify-center border border-input text-sm font-medium transition-colors",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-sm",
        default: "h-10 w-10 text-base",
        lg: "h-12 w-12 text-lg",
      },
      variant: {
        outline: "bg-transparent",
        filled: "bg-muted",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "outline",
    },
  }
)

export interface PinInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof pinSlotVariants> {
  /** Number of input slots */
  length?: number
  /** Current value */
  value?: string
  /** Called when value changes */
  onChange?: (value: string) => void
  /** Called when all slots are filled */
  onComplete?: (value: string) => void
  /** Mask input like a password */
  mask?: boolean
  /** Allowed input pattern */
  type?: "alphanumeric" | "numeric"
  /** Disabled state */
  disabled?: boolean
  /** Auto-focus first slot on mount */
  autoFocus?: boolean
  /** Placeholder character */
  placeholder?: string
  /** Separator shown every N slots (e.g. 3 for XXX-XXX) */
  separatorAfter?: number[]
}

const PinInput = React.forwardRef<HTMLDivElement, PinInputProps>(
  (
    {
      className,
      size,
      variant,
      length = 6,
      value = "",
      onChange,
      onComplete,
      mask,
      type = "numeric",
      disabled,
      autoFocus,
      placeholder = "○",
      separatorAfter = [],
      ...props
    },
    ref
  ) => {
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

    const chars = React.useMemo(() => {
      const arr = value.split("")
      while (arr.length < length) arr.push("")
      return arr.slice(0, length)
    }, [value, length])

    const focusSlot = (index: number) => {
      if (index >= 0 && index < length) {
        inputRefs.current[index]?.focus()
      }
    }

    const updateValue = (newChars: string[]) => {
      const val = newChars.join("")
      onChange?.(val)
      if (val.length === length && newChars.every((c) => c !== "")) {
        onComplete?.(val)
      }
    }

    const isValidChar = (char: string): boolean => {
      if (type === "numeric") return /^[0-9]$/.test(char)
      return /^[a-zA-Z0-9]$/.test(char)
    }

    const handleInput = (index: number, inputChar: string) => {
      if (!isValidChar(inputChar)) return
      const next = [...chars]
      next[index] = inputChar
      updateValue(next)
      focusSlot(index + 1)
    }

    const handleKeyDown = (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Backspace") {
        e.preventDefault()
        const next = [...chars]
        if (chars[index]) {
          next[index] = ""
          updateValue(next)
        } else if (index > 0) {
          next[index - 1] = ""
          updateValue(next)
          focusSlot(index - 1)
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        focusSlot(index - 1)
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        focusSlot(index + 1)
      }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const pasted = e.clipboardData.getData("text")
      const filtered = pasted
        .split("")
        .filter(isValidChar)
        .slice(0, length)
      if (filtered.length === 0) return
      const next = [...chars]
      for (let i = 0; i < filtered.length; i++) {
        next[i] = filtered[i]
      }
      updateValue(next)
      focusSlot(Math.min(filtered.length, length - 1))
    }

    React.useEffect(() => {
      if (autoFocus) focusSlot(0)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
      >
        {chars.map((char, i) => (
          <React.Fragment key={i}>
            <input
              ref={(el) => {
                inputRefs.current[i] = el
              }}
              type={mask ? "password" : "text"}
              inputMode={type === "numeric" ? "numeric" : "text"}
              value={char}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={1}
              autoComplete="one-time-code"
              aria-label={`Pin digit ${i + 1}`}
              className={cn(
                pinSlotVariants({ size, variant }),
                "rounded-md text-center outline-none placeholder:text-muted-foreground/40 focus:ring-1 focus:ring-ring focus:border-ring disabled:cursor-not-allowed disabled:opacity-50",
                "caret-transparent selection:bg-transparent"
              )}
              onChange={(e) => {
                const v = e.target.value
                if (v.length > 0) {
                  handleInput(i, v[v.length - 1])
                }
              }}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              onFocus={(e) => e.target.select()}
            />
            {separatorAfter.includes(i) && (
              <span className="text-muted-foreground" aria-hidden>
                –
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }
)
PinInput.displayName = "PinInput"

export { PinInput, pinSlotVariants }
