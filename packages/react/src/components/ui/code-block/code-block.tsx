"use client"

import * as React from "react"
import { Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const CodeBlockRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-[#0d1117] font-mono text-sm overflow-hidden",
      className
    )}
    {...props}
  />
))
CodeBlockRoot.displayName = "CodeBlockRoot"

interface CodeBlockHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  filename?: string
  language?: string
}

const CodeBlockHeader = React.forwardRef<HTMLDivElement, CodeBlockHeaderProps>(
  ({ className, filename, language, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between px-4 py-2 border-b border-border/20 bg-[#161b22] text-muted-foreground text-xs",
        className
      )}
      {...props}
    >
      <span>{filename || language}</span>
      {children}
    </div>
  )
)
CodeBlockHeader.displayName = "CodeBlockHeader"

interface CodeBlockBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  highlightedHtml?: string
  code: string
  showLineNumbers?: boolean
  highlightLines?: number[]
}

const CodeBlockBody = React.forwardRef<HTMLDivElement, CodeBlockBodyProps>(
  (
    { className, highlightedHtml, code, showLineNumbers = true, highlightLines, ...props },
    ref
  ) => {
    const lines = code.split("\n")

    if (highlightedHtml) {
      return (
        <div ref={ref} className={cn("overflow-auto", className)} {...props}>
          <div className="flex">
            {showLineNumbers && (
              <div
                className="select-none text-right text-muted-foreground pr-4 pl-4 py-4 shrink-0"
                aria-hidden="true"
              >
                {lines.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "leading-relaxed",
                      highlightLines?.includes(i + 1) && "bg-accent/30"
                    )}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            )}
            <div
              className={cn(
                "flex-1 py-4 pr-4 overflow-auto [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_code]:!bg-transparent",
                !showLineNumbers && "pl-4"
              )}
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          </div>
        </div>
      )
    }

    // Plain text fallback (before highlighting loads)
    return (
      <div ref={ref} className={cn("overflow-auto", className)} {...props}>
        <div className="flex">
          {showLineNumbers && (
            <div
              className="select-none text-right text-muted-foreground pr-4 pl-4 py-4 shrink-0"
              aria-hidden="true"
            >
              {lines.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "leading-relaxed",
                    highlightLines?.includes(i + 1) && "bg-accent/30"
                  )}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          )}
          <pre
            className={cn(
              "flex-1 py-4 pr-4 overflow-auto text-gray-300",
              !showLineNumbers && "pl-4"
            )}
          >
            <code>{code}</code>
          </pre>
        </div>
      </div>
    )
  }
)
CodeBlockBody.displayName = "CodeBlockBody"

interface CodeBlockCopyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  code: string
}

const CodeBlockCopyButton = React.forwardRef<
  HTMLButtonElement,
  CodeBlockCopyButtonProps
>(({ className, code, ...props }, ref) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = React.useCallback(async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Copy code"
      onClick={handleCopy}
      className={cn(
        "p-1 rounded hover:bg-white/10 text-muted-foreground hover:text-white transition-colors",
        className
      )}
      {...props}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  )
})
CodeBlockCopyButton.displayName = "CodeBlockCopyButton"

const CodeBlockLineNumbers = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { count: number; highlightLines?: number[] }
>(({ className, count, highlightLines, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "select-none text-right text-muted-foreground pr-4 pl-4 py-4 shrink-0",
      className
    )}
    aria-hidden="true"
    {...props}
  >
    {Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className={cn(
          "leading-relaxed",
          highlightLines?.includes(i + 1) && "bg-accent/30"
        )}
      >
        {i + 1}
      </div>
    ))}
  </div>
))
CodeBlockLineNumbers.displayName = "CodeBlockLineNumbers"

export {
  CodeBlockRoot,
  CodeBlockHeader,
  CodeBlockBody,
  CodeBlockCopyButton,
  CodeBlockLineNumbers,
}
export type { CodeBlockHeaderProps, CodeBlockBodyProps, CodeBlockCopyButtonProps }
