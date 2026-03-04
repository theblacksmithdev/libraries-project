import * as React from "react"
import { Pipette } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PopoverPrimitives } from "@/components/ui/popover"

const DEFAULT_SWATCHES = [
  "#ef4444", "#f97316", "#f59e0b", "#eab308",
  "#84cc16", "#22c55e", "#14b8a6", "#06b6d4",
  "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7",
  "#d946ef", "#ec4899", "#f43f5e", "#000000",
]

export interface ColorPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Current color value (hex string) */
  value?: string
  /** Called when color changes */
  onChange?: (color: string) => void
  /** Preset color swatches */
  swatches?: string[]
  /** Disable the input */
  disabled?: boolean
  /** Placeholder when no color is selected */
  placeholder?: string
}

const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      className,
      value = "",
      onChange,
      swatches = DEFAULT_SWATCHES,
      disabled,
      placeholder = "Pick a color",
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState(value)

    React.useEffect(() => {
      setInputValue(value)
    }, [value])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value
      setInputValue(v)
      if (/^#[0-9a-fA-F]{6}$/.test(v)) {
        onChange?.(v)
      }
    }

    const handleInputBlur = () => {
      if (/^#[0-9a-fA-F]{6}$/.test(inputValue)) {
        onChange?.(inputValue)
      } else {
        setInputValue(value)
      }
    }

    const handleNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value
      setInputValue(v)
      onChange?.(v)
    }

    const handleSwatchClick = (color: string) => {
      setInputValue(color)
      onChange?.(color)
    }

    return (
      <div ref={ref} className={cn("inline-flex", className)} {...props}>
        <PopoverPrimitives.Root>
          <PopoverPrimitives.Trigger asChild>
            <Button
              variant="outline"
              size="default"
              disabled={disabled}
              className="w-full justify-start gap-2 font-normal"
            >
              {value ? (
                <span
                  className="h-4 w-4 shrink-0 rounded-sm border border-border"
                  style={{ backgroundColor: value }}
                />
              ) : (
                <Pipette className="h-4 w-4 shrink-0 text-muted-foreground" />
              )}
              <span className={cn(!value && "text-muted-foreground")}>
                {value || placeholder}
              </span>
            </Button>
          </PopoverPrimitives.Trigger>
          <PopoverPrimitives.Content className="w-64 p-3" align="start">
            <div className="space-y-3">
              <div className="grid grid-cols-8 gap-1.5">
                {swatches.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={cn(
                      "h-6 w-6 rounded-sm border border-border transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      value === color && "ring-2 ring-ring ring-offset-1"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => handleSwatchClick(color)}
                    aria-label={color}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <label className="relative shrink-0">
                  <input
                    type="color"
                    value={value || "#000000"}
                    onChange={handleNativeChange}
                    className="sr-only"
                  />
                  <span
                    className="block h-8 w-8 cursor-pointer rounded-md border border-border"
                    style={{ backgroundColor: value || "#000000" }}
                  />
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="#000000"
                  className="flex h-8 w-full rounded-md border border-input bg-transparent px-2 py-1 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  maxLength={7}
                />
              </div>
            </div>
          </PopoverPrimitives.Content>
        </PopoverPrimitives.Root>
      </div>
    )
  }
)
ColorPicker.displayName = "ColorPicker"

export { ColorPicker }
