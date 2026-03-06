// Simplified wrapper as the primary export
export { AlertDialog, AlertDialogPrimitives } from './alert-dialog.simple'
export type { AlertDialogProps } from './alert-dialog.simple'

// Sub-parts still available individually (backward compat)
export {
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from './alert-dialog'
