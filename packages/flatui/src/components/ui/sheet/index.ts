// Simplified wrapper as the primary export
export { Sheet, SheetPrimitives } from './sheet.simple'
export type { SheetProps } from './sheet.simple'

// Sub-parts still available individually (backward compat)
export {
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from './sheet'
