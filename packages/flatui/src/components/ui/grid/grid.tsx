import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const gridVariants = cva("grid", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      12: "grid-cols-12",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-items-start",
      center: "justify-items-center",
      end: "justify-items-end",
      stretch: "justify-items-stretch",
    },
    flow: {
      row: "grid-flow-row",
      col: "grid-flow-col",
      dense: "grid-flow-dense",
      "row-dense": "grid-flow-row-dense",
      "col-dense": "grid-flow-col-dense",
    },
  },
  defaultVariants: {
    columns: 1,
    gap: 4,
    align: "stretch",
    justify: "stretch",
    flow: "row",
  },
})

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  /** Render as a different element */
  as?: React.ElementType
  /** Responsive columns: sets sm:grid-cols-N, md:grid-cols-N, lg:grid-cols-N */
  responsive?: {
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 12
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 12
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 12
    xl?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  }
}

const responsiveColsMap: Record<string, Record<number, string>> = {
  sm: {
    1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3",
    4: "sm:grid-cols-4", 5: "sm:grid-cols-5", 6: "sm:grid-cols-6", 12: "sm:grid-cols-12",
  },
  md: {
    1: "md:grid-cols-1", 2: "md:grid-cols-2", 3: "md:grid-cols-3",
    4: "md:grid-cols-4", 5: "md:grid-cols-5", 6: "md:grid-cols-6", 12: "md:grid-cols-12",
  },
  lg: {
    1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3",
    4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-6", 12: "lg:grid-cols-12",
  },
  xl: {
    1: "xl:grid-cols-1", 2: "xl:grid-cols-2", 3: "xl:grid-cols-3",
    4: "xl:grid-cols-4", 5: "xl:grid-cols-5", 6: "xl:grid-cols-6", 12: "xl:grid-cols-12",
  },
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, columns, gap, align, justify, flow, as: Comp = "div", responsive, ...props }, ref) => {
    const responsiveClasses = responsive
      ? Object.entries(responsive)
          .map(([bp, cols]) => cols != null ? responsiveColsMap[bp]?.[cols] : undefined)
          .filter(Boolean)
          .join(" ")
      : undefined

    return (
      <Comp
        ref={ref}
        className={cn(
          gridVariants({ columns, gap, align, justify, flow }),
          responsiveClasses,
          className
        )}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns to span */
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | "full"
  /** Starting column */
  start?: 1 | 2 | 3 | 4 | 5 | 6 | 7
}

const spanMap: Record<string | number, string> = {
  1: "col-span-1", 2: "col-span-2", 3: "col-span-3",
  4: "col-span-4", 5: "col-span-5", 6: "col-span-6",
  12: "col-span-12", full: "col-span-full",
}

const startMap: Record<number, string> = {
  1: "col-start-1", 2: "col-start-2", 3: "col-start-3",
  4: "col-start-4", 5: "col-start-5", 6: "col-start-6", 7: "col-start-7",
}

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, span, start, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        span != null && spanMap[span],
        start != null && startMap[start],
        className
      )}
      {...props}
    />
  )
)
GridItem.displayName = "GridItem"

export { Grid, GridItem, gridVariants }
