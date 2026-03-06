// Simplified wrapper as the primary export
export { DataTable, DataTablePrimitives } from './data-table.simple'
export type { DataTableProps, DataTableColumnDef } from './data-table.simple'

// Primitives still available individually (backward compat)
export {
  DataTableRoot,
  DataTableToolbar,
  DataTableFilter,
  DataTableColumnHeader,
  DataTableSelectAll,
  DataTableSelectRow,
  DataTablePagination,
  DataTableEmpty,
  useDataTable,
} from './data-table'

export type { DataTableState, SortDirection } from './data-table'
