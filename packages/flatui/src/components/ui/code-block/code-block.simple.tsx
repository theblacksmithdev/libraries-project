"use client"

import * as React from "react"
import {
  CodeBlockRoot,
  CodeBlockHeader,
  CodeBlockBody,
  CodeBlockCopyButton,
  CodeBlockLineNumbers,
} from "./code-block"
import { cn } from "@/lib/utils"

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The code string to display */
  code: string
  /** Language for syntax highlighting (e.g. "typescript", "python") */
  language?: string
  /** Optional filename shown in the header */
  filename?: string
  /** Show line numbers (default: true) */
  showLineNumbers?: boolean
  /** Show copy button (default: true) */
  showCopyButton?: boolean
  /** Line numbers to highlight */
  highlightLines?: number[]
  /** Shiki theme name (default: "github-dark") */
  theme?: string
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      code,
      language,
      filename,
      showLineNumbers = true,
      showCopyButton = true,
      highlightLines,
      theme = "github-dark",
      className,
      ...props
    },
    ref
  ) => {
    const [highlightedHtml, setHighlightedHtml] = React.useState<string>("")

    React.useEffect(() => {
      let cancelled = false

      async function highlight() {
        if (!language) return
        try {
          const { codeToHtml } = await import("shiki")
          const html = await codeToHtml(code, {
            lang: language,
            theme,
          })
          if (!cancelled) {
            setHighlightedHtml(html)
          }
        } catch {
          // Silently fall back to plain text
        }
      }

      highlight()
      return () => {
        cancelled = true
      }
    }, [code, language, theme])

    const showHeader = filename || language || showCopyButton

    return (
      <CodeBlockRoot ref={ref} className={cn(className)} {...props}>
        {showHeader && (
          <CodeBlockHeader filename={filename} language={language}>
            {showCopyButton && <CodeBlockCopyButton code={code} />}
          </CodeBlockHeader>
        )}
        <CodeBlockBody
          code={code}
          highlightedHtml={highlightedHtml}
          showLineNumbers={showLineNumbers}
          highlightLines={highlightLines}
        />
      </CodeBlockRoot>
    )
  }
)
CodeBlock.displayName = "CodeBlock"

export const CodeBlockPrimitives = {
  Root: CodeBlockRoot,
  Header: CodeBlockHeader,
  Body: CodeBlockBody,
  CopyButton: CodeBlockCopyButton,
  LineNumbers: CodeBlockLineNumbers,
}

export { CodeBlock }
