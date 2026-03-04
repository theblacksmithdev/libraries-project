// Simplified wrapper as the primary export
export { Table, TablePrimitives } from './table.simple'
export type { TableProps, ColumnDef } from './table.simple'

// Sub-parts still available individually (backward compat)
export {
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './table'
