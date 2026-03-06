import * as React from "react"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../table/table"
import { Checkbox } from "../checkbox/checkbox"
import { Button } from "../button/button"

/* --------------------------------- Types ---------------------------------- */

export type SortDirection = "asc" | "desc" | null

export interface DataTableState {
  sortColumn: string | null
  sortDirection: SortDirection
  globalFilter: string
  page: number
  pageSize: number
  selectedRows: Set<string>
}

type DataTableAction =
  | { type: "SET_SORT"; column: string }
  | { type: "SET_FILTER"; value: string }
  | { type: "SET_PAGE"; page: number }
  | { type: "TOGGLE_ROW"; id: string }
  | { type: "TOGGLE_ALL"; ids: string[] }

function reducer(state: DataTableState, action: DataTableAction): DataTableState {
  switch (action.type) {
    case "SET_SORT": {
      if (state.sortColumn === action.column) {
        const next: SortDirection =
          state.sortDirection === "asc" ? "desc" : state.sortDirection === "desc" ? null : "asc"
        return { ...state, sortColumn: next ? action.column : null, sortDirection: next, page: 0 }
      }
      return { ...state, sortColumn: action.column, sortDirection: "asc", page: 0 }
    }
    case "SET_FILTER":
      return { ...state, globalFilter: action.value, page: 0 }
    case "SET_PAGE":
      return { ...state, page: action.page }
    case "TOGGLE_ROW": {
      const next = new Set(state.selectedRows)
      if (next.has(action.id)) next.delete(action.id)
      else next.add(action.id)
      return { ...state, selectedRows: next }
    }
    case "TOGGLE_ALL": {
      const allSelected = action.ids.every((id) => state.selectedRows.has(id))
      return { ...state, selectedRows: allSelected ? new Set() : new Set(action.ids) }
    }
  }
}

/* --------------------------------- Context -------------------------------- */

interface DataTableContextValue {
  state: DataTableState
  dispatch: React.Dispatch<DataTableAction>
  totalRows: number
  totalPages: number
}

const DataTableContext = React.createContext<DataTableContextValue | null>(null)

function useDataTable() {
  const ctx = React.useContext(DataTableContext)
  if (!ctx) throw new Error("useDataTable must be used within DataTableRoot")
  return ctx
}

/* -------------------------------- Primitives ------------------------------- */

interface DataTableRootProps extends React.HTMLAttributes<HTMLDivElement> {
  totalRows: number
  pageSize?: number
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

const DataTableRoot = React.forwardRef<HTMLDivElement, DataTableRootProps>(
  (
    {
      className,
      totalRows,
      pageSize = 10,
      sortColumn: controlledSortColumn,
      sortDirection: controlledSortDirection,
      globalFilter: controlledFilter,
      page: controlledPage,
      selectedRows: controlledSelectedRows,
      onSortChange,
      onFilterChange,
      onPageChange,
      onSelectionChange,
      children,
      ...props
    },
    ref
  ) => {
    const [internalState, dispatch] = React.useReducer(reducer, {
      sortColumn: controlledSortColumn ?? null,
      sortDirection: controlledSortDirection ?? null,
      globalFilter: controlledFilter ?? "",
      page: controlledPage ?? 0,
      pageSize,
      selectedRows: controlledSelectedRows ?? new Set<string>(),
    })

    // Merge controlled + internal state
    const state: DataTableState = {
      sortColumn: controlledSortColumn ?? internalState.sortColumn,
      sortDirection: controlledSortDirection ?? internalState.sortDirection,
      globalFilter: controlledFilter ?? internalState.globalFilter,
      page: controlledPage ?? internalState.page,
      pageSize,
      selectedRows: controlledSelectedRows ?? internalState.selectedRows,
    }

    // Fire callbacks after dispatch
    const wrappedDispatch: React.Dispatch<DataTableAction> = React.useCallback(
      (action) => {
        dispatch(action)
        // Notify parent of changes
        if (action.type === "SET_SORT") {
          const next = state.sortColumn === action.column
            ? state.sortDirection === "asc" ? "desc" : state.sortDirection === "desc" ? null : "asc"
            : ("asc" as SortDirection)
          const nextCol = next ? action.column : null
          onSortChange?.(nextCol, next)
        }
        if (action.type === "SET_FILTER") onFilterChange?.(action.value)
        if (action.type === "SET_PAGE") onPageChange?.(action.page)
        if (action.type === "TOGGLE_ROW" || action.type === "TOGGLE_ALL") {
          // We use setTimeout to read the post-dispatch state
          // But since we can compute the new state deterministically:
          const newState = reducer(state, action)
          onSelectionChange?.(newState.selectedRows)
        }
      },
      [state, onSortChange, onFilterChange, onPageChange, onSelectionChange]
    )

    const totalPages = Math.max(1, Math.ceil(totalRows / pageSize))

    return (
      <DataTableContext.Provider value={{ state, dispatch: wrappedDispatch, totalRows, totalPages }}>
        <div ref={ref} className={cn("space-y-4", className)} {...props}>
          {children}
        </div>
      </DataTableContext.Provider>
    )
  }
)
DataTableRoot.displayName = "DataTableRoot"

/* Toolbar */
const DataTableToolbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between", className)}
    {...props}
  />
))
DataTableToolbar.displayName = "DataTableToolbar"

/* Filter input */
interface DataTableFilterProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  /** Placeholder text */
  placeholder?: string
}

const DataTableFilter = React.forwardRef<HTMLInputElement, DataTableFilterProps>(
  ({ className, placeholder = "Filter...", ...props }, ref) => {
    const { state, dispatch } = useDataTable()
    return (
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        value={state.globalFilter}
        onChange={(e) => dispatch({ type: "SET_FILTER", value: e.target.value })}
        className={cn(
          "flex h-9 w-full max-w-sm rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          className
        )}
        {...props}
      />
    )
  }
)
DataTableFilter.displayName = "DataTableFilter"

/* Column header (sortable) */
interface DataTableColumnHeaderProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Column key used for sorting */
  columnKey: string
  /** Whether this column is sortable */
  sortable?: boolean
}

const DataTableColumnHeader = React.forwardRef<HTMLButtonElement, DataTableColumnHeaderProps>(
  ({ className, columnKey, sortable = true, children, ...props }, ref) => {
    const { state, dispatch } = useDataTable()

    if (!sortable) {
      return <span className={className}>{children}</span>
    }

    const isActive = state.sortColumn === columnKey
    const Icon = isActive
      ? state.sortDirection === "asc" ? ArrowUp : ArrowDown
      : ArrowUpDown

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center gap-1 text-left font-medium hover:text-foreground transition-colors",
          className
        )}
        aria-sort={
          isActive
            ? state.sortDirection === "asc" ? "ascending" : "descending"
            : undefined
        }
        onClick={() => dispatch({ type: "SET_SORT", column: columnKey })}
        {...props}
      >
        {children}
        <Icon className="size-3.5" />
      </button>
    )
  }
)
DataTableColumnHeader.displayName = "DataTableColumnHeader"

/* Select all checkbox */
interface DataTableSelectAllProps {
  /** All row IDs on current page */
  rowIds: string[]
  className?: string
}

const DataTableSelectAll = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  DataTableSelectAllProps
>(({ rowIds, className }, ref) => {
  const { state, dispatch } = useDataTable()
  const allSelected = rowIds.length > 0 && rowIds.every((id) => state.selectedRows.has(id))
  const someSelected = rowIds.some((id) => state.selectedRows.has(id))

  return (
    <Checkbox
      ref={ref}
      checked={allSelected ? true : someSelected ? "indeterminate" : false}
      onCheckedChange={() => dispatch({ type: "TOGGLE_ALL", ids: rowIds })}
      aria-label="Select all"
      className={className}
    />
  )
})
DataTableSelectAll.displayName = "DataTableSelectAll"

/* Select row checkbox */
interface DataTableSelectRowProps {
  /** Row ID */
  rowId: string
  className?: string
}

const DataTableSelectRow = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  DataTableSelectRowProps
>(({ rowId, className }, ref) => {
  const { state, dispatch } = useDataTable()

  return (
    <Checkbox
      ref={ref}
      checked={state.selectedRows.has(rowId)}
      onCheckedChange={() => dispatch({ type: "TOGGLE_ROW", id: rowId })}
      aria-label="Select row"
      className={className}
    />
  )
})
DataTableSelectRow.displayName = "DataTableSelectRow"

/* Pagination */
const DataTablePagination = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { state, dispatch, totalRows, totalPages } = useDataTable()
  const hasSelection = state.selectedRows.size > 0

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-between text-sm", className)}
      {...props}
    >
      <div className="text-muted-foreground">
        {hasSelection
          ? `${state.selectedRows.size} of ${totalRows} row(s) selected`
          : `${totalRows} row(s) total`}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">
          Page {state.page + 1} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={state.page === 0}
          onClick={() => dispatch({ type: "SET_PAGE", page: state.page - 1 })}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={state.page >= totalPages - 1}
          onClick={() => dispatch({ type: "SET_PAGE", page: state.page + 1 })}
        >
          Next
        </Button>
      </div>
    </div>
  )
})
DataTablePagination.displayName = "DataTablePagination"

/* Empty state slot */
const DataTableEmpty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-center py-10 text-sm text-muted-foreground", className)}
    {...props}
  >
    {children ?? "No results."}
  </div>
))
DataTableEmpty.displayName = "DataTableEmpty"

export {
  DataTableRoot,
  DataTableToolbar,
  DataTableFilter,
  DataTableColumnHeader,
  DataTableSelectAll,
  DataTableSelectRow,
  DataTablePagination,
  DataTableEmpty,
  DataTableContext,
  useDataTable,
  // Re-export table primitives for convenience
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
}

export type {
  DataTableRootProps,
  DataTableFilterProps,
  DataTableColumnHeaderProps,
  DataTableSelectAllProps,
  DataTableSelectRowProps,
}
