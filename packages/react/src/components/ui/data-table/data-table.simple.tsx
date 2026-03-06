import * as React from "react"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import {
  DataTableRoot,
  DataTableToolbar,
  DataTableFilter,
  DataTableColumnHeader,
  DataTableSelectAll,
  DataTableSelectRow,
  DataTablePagination,
  DataTableEmpty,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  type SortDirection,
} from "./data-table"

/* --------------------------------- Types ---------------------------------- */

export interface DataTableColumnDef<T> {
  /** Key to access row data */
  key: keyof T & string
  /** Column header label */
  header: React.ReactNode
  /** Custom cell renderer */
  cell?: (row: T) => React.ReactNode
  /** Whether this column is sortable (default: true) */
  sortable?: boolean
  /** Whether this column is filterable (default: true) */
  filterable?: boolean
}

export interface DataTableProps<T> {
  /** Column definitions */
  columns: DataTableColumnDef<T>[]
  /** Row data */
  data: T[]
  /** Key extractor for rows */
  rowKey: keyof T & string
  /** Enable row selection with checkboxes */
  selectable?: boolean
  /** Enable global filter input */
  filterable?: boolean
  /** Filter placeholder text */
  filterPlaceholder?: string
  /** Page size for pagination (0 = no pagination) */
  pageSize?: number
  /** Additional class name */
  className?: string

  /** Controlled sort column */
  sortColumn?: string | null
  /** Controlled sort direction */
  sortDirection?: SortDirection
  /** Controlled filter */
  globalFilter?: string
  /** Controlled page */
  page?: number
  /** Controlled selected rows */
  selectedRows?: Set<string>
  /** Sort change callback */
  onSortChange?: (column: string | null, direction: SortDirection) => void
  /** Filter change callback */
  onFilterChange?: (value: string) => void
  /** Page change callback */
  onPageChange?: (page: number) => void
  /** Selection change callback */
  onSelectionChange?: (selected: Set<string>) => void
}

/* -------------------------------- Component ------------------------------- */

function DataTableInner<T extends Record<string, any>>(
  {
    columns,
    data,
    rowKey,
    selectable = false,
    filterable = false,
    filterPlaceholder,
    pageSize = 10,
    className,
    sortColumn,
    sortDirection,
    globalFilter: controlledFilter,
    page: controlledPage,
    selectedRows: controlledSelectedRows,
    onSortChange,
    onFilterChange,
    onPageChange,
    onSelectionChange,
  }: DataTableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  // Internal state for uncontrolled use
  const [internalSortColumn, setInternalSortColumn] = React.useState<string | null>(sortColumn ?? null)
  const [internalSortDirection, setInternalSortDirection] = React.useState<SortDirection>(sortDirection ?? null)
  const [internalFilter, setInternalFilter] = React.useState(controlledFilter ?? "")
  const [internalPage, setInternalPage] = React.useState(controlledPage ?? 0)
  const [internalSelectedRows, setInternalSelectedRows] = React.useState<Set<string>>(
    controlledSelectedRows ?? new Set()
  )

  const activeSortColumn = sortColumn !== undefined ? sortColumn : internalSortColumn
  const activeSortDirection = sortDirection !== undefined ? sortDirection : internalSortDirection
  const activeFilter = controlledFilter !== undefined ? controlledFilter : internalFilter
  const activePage = controlledPage !== undefined ? controlledPage : internalPage
  const activeSelectedRows = controlledSelectedRows !== undefined ? controlledSelectedRows : internalSelectedRows

  // Filterable column keys
  const filterableKeys = columns
    .filter((col) => col.filterable !== false)
    .map((col) => col.key)

  // Filter data
  const filteredData = React.useMemo(() => {
    if (!activeFilter) return data
    const lowerFilter = activeFilter.toLowerCase()
    return data.filter((row) =>
      filterableKeys.some((key) => {
        const val = row[key]
        return val != null && String(val).toLowerCase().includes(lowerFilter)
      })
    )
  }, [data, activeFilter, filterableKeys])

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!activeSortColumn || !activeSortDirection) return filteredData
    const col = activeSortColumn
    return [...filteredData].sort((a, b) => {
      const aVal = a[col]
      const bVal = b[col]
      if (aVal == null && bVal == null) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true })
      return activeSortDirection === "asc" ? cmp : -cmp
    })
  }, [filteredData, activeSortColumn, activeSortDirection])

  // Paginate
  const usePagination = pageSize > 0
  const totalRows = sortedData.length
  const totalPages = usePagination ? Math.max(1, Math.ceil(totalRows / pageSize)) : 1
  const pageData = usePagination
    ? sortedData.slice(activePage * pageSize, (activePage + 1) * pageSize)
    : sortedData

  const rowIds = pageData.map((row) => String(row[rowKey]))

  // Handlers
  const handleSort = (column: string) => {
    let nextDir: SortDirection
    if (activeSortColumn === column) {
      nextDir = activeSortDirection === "asc" ? "desc" : activeSortDirection === "desc" ? null : "asc"
    } else {
      nextDir = "asc"
    }
    const nextCol = nextDir ? column : null
    if (sortColumn === undefined) {
      setInternalSortColumn(nextCol)
      setInternalSortDirection(nextDir)
    }
    onSortChange?.(nextCol, nextDir)
  }

  const handleFilter = (value: string) => {
    if (controlledFilter === undefined) {
      setInternalFilter(value)
      setInternalPage(0)
    }
    onFilterChange?.(value)
  }

  const handlePage = (page: number) => {
    if (controlledPage === undefined) setInternalPage(page)
    onPageChange?.(page)
  }

  const handleToggleRow = (id: string) => {
    const next = new Set(activeSelectedRows)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    if (controlledSelectedRows === undefined) setInternalSelectedRows(next)
    onSelectionChange?.(next)
  }

  const handleToggleAll = () => {
    const allSelected = rowIds.every((id) => activeSelectedRows.has(id))
    const next = allSelected ? new Set<string>() : new Set(rowIds)
    if (controlledSelectedRows === undefined) setInternalSelectedRows(next)
    onSelectionChange?.(next)
  }

  return (
    <div ref={ref} className={className}>
      <div className="space-y-4">
        {(filterable || selectable) && (
          <div className="flex items-center justify-between">
            {filterable && (
              <input
                type="text"
                placeholder={filterPlaceholder ?? "Filter..."}
                value={activeFilter}
                onChange={(e) => handleFilter(e.target.value)}
                className="flex h-9 w-full max-w-sm rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            )}
            {selectable && activeSelectedRows.size > 0 && (
              <span className="text-sm text-muted-foreground">
                {activeSelectedRows.size} selected
              </span>
            )}
          </div>
        )}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {selectable && (
                  <TableHead className="w-[40px]">
                    <input
                      type="checkbox"
                      checked={rowIds.length > 0 && rowIds.every((id) => activeSelectedRows.has(id))}
                      ref={(el) => {
                        if (el) {
                          el.indeterminate =
                            rowIds.some((id) => activeSelectedRows.has(id)) &&
                            !rowIds.every((id) => activeSelectedRows.has(id))
                        }
                      }}
                      onChange={handleToggleAll}
                      aria-label="Select all"
                      className="h-4 w-4"
                    />
                  </TableHead>
                )}
                {columns.map((col) => (
                  <TableHead key={col.key}>
                    {col.sortable !== false ? (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 font-medium hover:text-foreground transition-colors"
                        aria-sort={
                          activeSortColumn === col.key
                            ? activeSortDirection === "asc" ? "ascending" : "descending"
                            : undefined
                        }
                        onClick={() => handleSort(col.key)}
                      >
                        {col.header}
                        {activeSortColumn === col.key ? (
                          activeSortDirection === "asc" ? (
                            <ArrowUp className="size-3.5" />
                          ) : (
                            <ArrowDown className="size-3.5" />
                          )
                        ) : (
                          <ArrowUpDown className="size-3.5" />
                        )}
                      </button>
                    ) : (
                      col.header
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              ) : (
                pageData.map((row) => {
                  const id = String(row[rowKey])
                  const isSelected = activeSelectedRows.has(id)
                  return (
                    <TableRow key={id} data-state={isSelected ? "selected" : undefined}>
                      {selectable && (
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleRow(id)}
                            aria-label="Select row"
                            className="h-4 w-4"
                          />
                        </TableCell>
                      )}
                      {columns.map((col) => (
                        <TableCell key={col.key}>
                          {col.cell ? col.cell(row) : (row[col.key] as React.ReactNode)}
                        </TableCell>
                      ))}
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>

        {usePagination && (
          <div className="flex items-center justify-between text-sm">
            <div className="text-muted-foreground">
              {selectable && activeSelectedRows.size > 0
                ? `${activeSelectedRows.size} of ${totalRows} row(s) selected`
                : `${totalRows} row(s) total`}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">
                Page {activePage + 1} of {totalPages}
              </span>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-sm hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                disabled={activePage === 0}
                onClick={() => handlePage(activePage - 1)}
              >
                Previous
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-sm hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                disabled={activePage >= totalPages - 1}
                onClick={() => handlePage(activePage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const DataTable = React.forwardRef(DataTableInner) as <T extends Record<string, any>>(
  props: DataTableProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement

export const DataTablePrimitives = {
  Root: DataTableRoot,
  Toolbar: DataTableToolbar,
  Filter: DataTableFilter,
  ColumnHeader: DataTableColumnHeader,
  SelectAll: DataTableSelectAll,
  SelectRow: DataTableSelectRow,
  Pagination: DataTablePagination,
  Empty: DataTableEmpty,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
}

export { DataTable }
