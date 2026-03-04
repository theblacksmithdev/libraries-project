// Simplified wrapper as the primary export
export { Breadcrumb, BreadcrumbPrimitives } from './breadcrumb.simple'
export type { BreadcrumbProps, BreadcrumbItemDef } from './breadcrumb.simple'

// Sub-parts still available individually (backward compat)
export {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from './breadcrumb'
