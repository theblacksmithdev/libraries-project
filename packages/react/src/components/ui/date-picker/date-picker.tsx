import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { PopoverPrimitives } from "@/components/ui/popover"

export interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Currently selected date */
  value?: Date
  /** Called when a date is selected */
  onChange?: (date: Date | undefined) => void
  /** Placeholder text */
  placeholder?: string
  /** Date format string (date-fns format) */
  dateFormat?: string
  /** Disabled state */
  disabled?: boolean
  /** Props forwarded to the Calendar component */
  calendarProps?: Omit<
    React.ComponentPropsWithoutRef<typeof Calendar>,
    "mode" | "selected" | "onSelect"
  >
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      className,
      value,
      onChange,
      placeholder = "Pick a date",
      dateFormat = "PPP",
      disabled,
      calendarProps,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)

    const handleSelect = (date: Date | undefined) => {
      onChange?.(date)
      setOpen(false)
    }

    return (
      <div ref={ref} className={cn("inline-flex", className)} {...props}>
        <PopoverPrimitives.Root open={open} onOpenChange={setOpen}>
          <PopoverPrimitives.Trigger asChild>
            <Button
              variant="outline"
              disabled={disabled}
              className={cn(
                "w-full justify-start gap-2 font-normal",
                !value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="h-4 w-4 shrink-0" />
              {value ? format(value, dateFormat) : placeholder}
            </Button>
          </PopoverPrimitives.Trigger>
          <PopoverPrimitives.Content className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={handleSelect}
              autoFocus
              {...calendarProps}
            />
          </PopoverPrimitives.Content>
        </PopoverPrimitives.Root>
      </div>
    )
  }
)
DatePicker.displayName = "DatePicker"

export interface DateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Currently selected date range */
  value?: DateRange
  /** Called when range changes */
  onChange?: (range: DateRange | undefined) => void
  /** Placeholder text */
  placeholder?: string
  /** Date format string */
  dateFormat?: string
  /** Disabled state */
  disabled?: boolean
  /** Props forwarded to the Calendar component */
  calendarProps?: Omit<
    React.ComponentPropsWithoutRef<typeof Calendar>,
    "mode" | "selected" | "onSelect"
  >
}

const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      className,
      value,
      onChange,
      placeholder = "Pick a date range",
      dateFormat = "PP",
      disabled,
      calendarProps,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)

    const displayText = React.useMemo(() => {
      if (!value?.from) return null
      if (!value.to) return format(value.from, dateFormat)
      return `${format(value.from, dateFormat)} – ${format(value.to, dateFormat)}`
    }, [value, dateFormat])

    return (
      <div ref={ref} className={cn("inline-flex", className)} {...props}>
        <PopoverPrimitives.Root open={open} onOpenChange={setOpen}>
          <PopoverPrimitives.Trigger asChild>
            <Button
              variant="outline"
              disabled={disabled}
              className={cn(
                "w-full justify-start gap-2 font-normal",
                !value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="h-4 w-4 shrink-0" />
              {displayText ?? placeholder}
            </Button>
          </PopoverPrimitives.Trigger>
          <PopoverPrimitives.Content className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={value}
              onSelect={onChange}
              numberOfMonths={2}
              autoFocus
              {...calendarProps}
            />
          </PopoverPrimitives.Content>
        </PopoverPrimitives.Root>
      </div>
    )
  }
)
DateRangePicker.displayName = "DateRangePicker"

export { DatePicker, DateRangePicker }
