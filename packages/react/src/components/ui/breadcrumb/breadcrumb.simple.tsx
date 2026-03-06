import * as React from "react"
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./breadcrumb"

export interface BreadcrumbItemDef {
  /** Display label */
  label: React.ReactNode
  /** Link href — omit for current page (last item) */
  href?: string
}

export interface BreadcrumbProps {
  /** Breadcrumb items */
  items: BreadcrumbItemDef[]
  /** Custom separator (defaults to ChevronRight icon) */
  separator?: React.ReactNode
}

function Breadcrumb({ items, separator }: BreadcrumbProps) {
  return (
    <BreadcrumbRoot>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <BreadcrumbSeparator>
                {separator}
              </BreadcrumbSeparator>
            )}
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbRoot>
  )
}
Breadcrumb.displayName = "Breadcrumb"

export const BreadcrumbPrimitives = {
  Root: BreadcrumbRoot,
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Page: BreadcrumbPage,
  Separator: BreadcrumbSeparator,
  Ellipsis: BreadcrumbEllipsis,
}

export { Breadcrumb }
