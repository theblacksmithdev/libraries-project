import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

export interface TagInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Current tags */
  value?: string[]
  /** Called when tags change */
  onChange?: (tags: string[]) => void
  /** Placeholder for the text input */
  placeholder?: string
  /** Maximum number of tags */
  max?: number
  /** Disabled state */
  disabled?: boolean
  /** Keys that trigger tag creation */
  delimiter?: string[]
  /** Allow duplicate tags */
  allowDuplicates?: boolean
}

const TagInput = React.forwardRef<HTMLDivElement, TagInputProps>(
  (
    {
      className,
      value = [],
      onChange,
      placeholder = "Add tag...",
      max,
      disabled,
      delimiter = ["Enter", ","],
      allowDuplicates = false,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState("")
    const inputRef = React.useRef<HTMLInputElement>(null)

    const addTag = (tag: string) => {
      const trimmed = tag.trim()
      if (!trimmed) return
      if (!allowDuplicates && value.includes(trimmed)) return
      if (max && value.length >= max) return
      onChange?.([...value, trimmed])
      setInputValue("")
    }

    const removeTag = (index: number) => {
      onChange?.(value.filter((_, i) => i !== index))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (delimiter.includes(e.key)) {
        e.preventDefault()
        addTag(inputValue)
      } else if (
        e.key === "Backspace" &&
        inputValue === "" &&
        value.length > 0
      ) {
        removeTag(value.length - 1)
      }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (delimiter.includes(",")) {
        const text = e.clipboardData.getData("text")
        if (text.includes(",")) {
          e.preventDefault()
          const parts = text.split(",")
          let current = [...value]
          for (const part of parts) {
            const trimmed = part.trim()
            if (!trimmed) continue
            if (!allowDuplicates && current.includes(trimmed)) continue
            if (max && current.length >= max) break
            current = [...current, trimmed]
          }
          onChange?.(current)
        }
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent px-3 py-1.5 text-sm transition-colors focus-within:ring-1 focus-within:ring-ring",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        onClick={() => inputRef.current?.focus()}
        {...props}
      >
        {value.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeTag(i)
                }}
                className="rounded-sm text-secondary-foreground/70 hover:text-secondary-foreground"
                aria-label={`Remove ${tag}`}
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={value.length === 0 ? placeholder : ""}
          disabled={disabled}
          className="min-w-[80px] flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
          aria-label={placeholder}
        />
      </div>
    )
  }
)
TagInput.displayName = "TagInput"

export { TagInput }
