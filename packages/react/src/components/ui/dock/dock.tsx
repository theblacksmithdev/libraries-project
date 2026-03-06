import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* --------------------------------- Variants -------------------------------- */

const dockVariants = cva(
  "inline-flex items-end gap-1 rounded-2xl border bg-background/80 px-2 py-1.5 backdrop-blur-md",
  {
    variants: {
      position: {
        bottom: "",
        left: "flex-col items-center",
        right: "flex-col items-center",
      },
    },
    defaultVariants: {
      position: "bottom",
    },
  }
)

/* --------------------------------- Types ---------------------------------- */

export interface DockItemDef {
  /** Icon element */
  icon: React.ReactNode
  /** Tooltip label */
  label: string
  /** Click handler */
  onClick?: () => void
  /** Mark as active */
  active?: boolean
  /** Custom href (renders as anchor) */
  href?: string
}

export interface DockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dockVariants> {
  /** Dock item definitions */
  items: DockItemDef[]
  /** Enable magnification effect on hover */
  magnification?: boolean
  /** Base icon size in pixels */
  iconSize?: number
  /** Max icon size during magnification */
  maxIconSize?: number
}

/* -------------------------------- Component ------------------------------- */

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      position = "bottom",
      items,
      magnification = true,
      iconSize = 32,
      maxIconSize = 48,
      ...props
    },
    ref
  ) => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

    const getScale = (index: number): number => {
      if (!magnification || hoveredIndex === null) return 1
      const distance = Math.abs(index - hoveredIndex)
      if (distance === 0) return maxIconSize / iconSize
      if (distance === 1) return 1 + (maxIconSize / iconSize - 1) * 0.5
      if (distance === 2) return 1 + (maxIconSize / iconSize - 1) * 0.15
      return 1
    }

    return (
      <div
        ref={ref}
        role="toolbar"
        aria-label="Dock"
        className={cn(dockVariants({ position }), className)}
        onMouseLeave={() => setHoveredIndex(null)}
        {...props}
      >
        {items.map((item, i) => {
          const scale = getScale(i)
          const size = iconSize * scale

          const content = (
            <>
              <span
                className="flex items-center justify-center [&_svg]:h-full [&_svg]:w-full"
                style={{ width: size, height: size }}
              >
                {item.icon}
              </span>
              {item.active && (
                <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-foreground" />
              )}
            </>
          )

          const sharedClassName = cn(
            "relative flex flex-col items-center rounded-lg p-1 transition-transform duration-200 ease-out",
            "hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          )

          const sharedProps = {
            onMouseEnter: () => setHoveredIndex(i),
            'aria-label': item.label,
            title: item.label,
          }

          if (item.href) {
            return (
              <a
                key={i}
                href={item.href}
                className={sharedClassName}
                {...sharedProps}
              >
                {content}
              </a>
            )
          }

          return (
            <button
              key={i}
              type="button"
              onClick={item.onClick}
              className={cn(sharedClassName, "border-none bg-transparent")}
              {...sharedProps}
            >
              {content}
            </button>
          )
        })}
      </div>
    )
  }
)
Dock.displayName = "Dock"

export { Dock, dockVariants }
