// Simplified wrapper as the primary export
export { Pagination, PaginationPrimitives } from './pagination.simple'
export type { PaginationProps } from './pagination.simple'

// Sub-parts still available individually (backward compat)
export {
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from './pagination'
