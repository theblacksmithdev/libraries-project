// Simplified wrapper as the primary export
export { CodeBlock, CodeBlockPrimitives } from './code-block.simple'
export type { CodeBlockProps } from './code-block.simple'

// Sub-parts still available individually (backward compat)
export {
  CodeBlockRoot,
  CodeBlockHeader,
  CodeBlockBody,
  CodeBlockCopyButton,
  CodeBlockLineNumbers,
} from './code-block'
export type {
  CodeBlockHeaderProps,
  CodeBlockBodyProps,
  CodeBlockCopyButtonProps,
} from './code-block'
