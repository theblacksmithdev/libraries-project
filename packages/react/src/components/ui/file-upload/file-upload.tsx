import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { File, UploadCloud, X } from "lucide-react"

import { cn } from "@/lib/utils"

const dropzoneVariants = cva(
  "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 text-center transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-muted-foreground/25 hover:border-muted-foreground/50",
        active: "border-primary bg-primary/5",
        error: "border-destructive bg-destructive/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface FileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof dropzoneVariants> {
  /** Called with selected files */
  onChange?: (files: File[]) => void
  /** Accepted file types (e.g. "image/*,.pdf") */
  accept?: string
  /** Allow multiple files */
  multiple?: boolean
  /** Maximum file size in bytes */
  maxSize?: number
  /** Disabled state */
  disabled?: boolean
  /** Currently selected files (controlled) */
  value?: File[]
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      onChange,
      accept,
      multiple,
      maxSize,
      disabled,
      value,
      children,
      ...props
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const validate = React.useCallback(
      (files: File[]): File[] => {
        if (maxSize) {
          const oversized = files.filter((f) => f.size > maxSize)
          if (oversized.length > 0) {
            setError(`File too large (max ${formatFileSize(maxSize)})`)
            return files.filter((f) => f.size <= maxSize)
          }
        }
        setError(null)
        return files
      },
      [maxSize]
    )

    const handleFiles = React.useCallback(
      (fileList: FileList | null) => {
        if (!fileList) return
        const valid = validate(Array.from(fileList))
        if (valid.length > 0) onChange?.(valid)
      },
      [onChange, validate]
    )

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      if (!disabled) setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      if (!disabled) handleFiles(e.dataTransfer.files)
    }

    const handleClick = () => {
      if (!disabled) inputRef.current?.click()
    }

    const handleRemove = (index: number) => {
      if (value) {
        const next = value.filter((_, i) => i !== index)
        onChange?.(next)
      }
    }

    const variant = error ? "error" : isDragging ? "active" : "default"

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          className={cn(
            dropzoneVariants({ variant }),
            disabled && "pointer-events-none opacity-50",
            "cursor-pointer"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              handleClick()
            }
          }}
          aria-label="Upload files"
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={(e) => handleFiles(e.target.files)}
            className="sr-only"
            tabIndex={-1}
          />
          {children ?? (
            <>
              <UploadCloud className="mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">
                Drag &amp; drop or click to upload
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {accept
                  ? `Accepted: ${accept}`
                  : "Any file type accepted"}
                {maxSize && ` (max ${formatFileSize(maxSize)})`}
              </p>
            </>
          )}
        </div>
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
        {value && value.length > 0 && (
          <ul className="space-y-1">
            {value.map((file, i) => (
              <li
                key={`${file.name}-${i}`}
                className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
              >
                <File className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="flex-1 truncate">{file.name}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemove(i)
                  }}
                  className="shrink-0 rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
)
FileUpload.displayName = "FileUpload"

export { FileUpload, dropzoneVariants }
