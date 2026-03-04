import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

export interface RangeSliderProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    "value" | "defaultValue" | "onValueChange"
  > {
  /** Current range value [min, max] */
  value?: [number, number]
  /** Default range value */
  defaultValue?: [number, number]
  /** Called when value changes */
  onValueChange?: (value: [number, number]) => void
  /** Show value labels above thumbs */
  showLabels?: boolean
  /** Format the label text */
  formatLabel?: (value: number) => string
}

const RangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  RangeSliderProps
>(
  (
    {
      className,
      value,
      defaultValue = [25, 75],
      onValueChange,
      showLabels,
      formatLabel = String,
      ...props
    },
    ref
  ) => {
    const displayValue = value ?? defaultValue

    return (
      <div className="relative w-full">
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            "relative flex w-full touch-none select-none items-center",
            className
          )}
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange as (value: number[]) => void}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
            <SliderPrimitive.Range className="absolute h-full bg-primary" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="relative block h-4 w-4 rounded-full border border-primary/50 bg-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            {showLabels && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground whitespace-nowrap">
                {formatLabel(displayValue[0])}
              </span>
            )}
          </SliderPrimitive.Thumb>
          <SliderPrimitive.Thumb className="relative block h-4 w-4 rounded-full border border-primary/50 bg-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            {showLabels && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground whitespace-nowrap">
                {formatLabel(displayValue[1])}
              </span>
            )}
          </SliderPrimitive.Thumb>
        </SliderPrimitive.Root>
      </div>
    )
  }
)
RangeSlider.displayName = "RangeSlider"

export { RangeSlider }
