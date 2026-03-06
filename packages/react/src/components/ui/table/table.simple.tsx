import * as React from "react"
import {
  Table as TableRoot,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./table"

export interface ColumnDef<T> {
  /** Key to access row data */
  key: keyof T & string
  /** Column header label */
  header: React.ReactNode
  /** Custom cell renderer — defaults to `row[key]` */
  cell?: (row: T) => React.ReactNode
}

export interface TableProps<T> {
  /** Column definitions */
  columns: ColumnDef<T>[]
  /** Row data */
  data: T[]
  /** Table caption */
  caption?: React.ReactNode
  /** Key extractor for rows — defaults to index */
  rowKey?: keyof T & string
  /** Additional class name for the table */
  className?: string
}

function TableInner<T extends Record<string, unknown>>(
  { columns, data, caption, rowKey, className }: TableProps<T>,
  ref: React.ForwardedRef<HTMLTableElement>
) {
  return (
    <TableRoot ref={ref} className={className}>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.key}>{col.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={rowKey ? String(row[rowKey]) : index}>
            {columns.map((col) => (
              <TableCell key={col.key}>
                {col.cell ? col.cell(row) : (row[col.key] as React.ReactNode)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableRoot>
  )
}

const Table = React.forwardRef(TableInner) as <T extends Record<string, unknown>>(
  props: TableProps<T> & { ref?: React.Ref<HTMLTableElement> }
) => React.ReactElement

export const TablePrimitives = {
  Root: TableRoot,
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Head: TableHead,
  Row: TableRow,
  Cell: TableCell,
  Caption: TableCaption,
}

export { Table }
