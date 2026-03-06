// Simplified wrapper as the primary export
export { Dialog, DialogPrimitives } from './dialog.simple'
export type { DialogProps } from './dialog.simple'

// Sub-parts still available individually (backward compat)
export {
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './dialog'
