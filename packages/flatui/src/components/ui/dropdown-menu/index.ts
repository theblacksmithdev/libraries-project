// Simplified wrapper as the primary export
export { DropdownMenu, DropdownMenuPrimitives } from './dropdown-menu.simple'
export type { DropdownMenuProps, MenuItemDef, MenuSeparatorDef, MenuLabelDef, DropdownMenuItemDef } from './dropdown-menu.simple'

// Sub-parts still available individually (backward compat)
export {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './dropdown-menu'
