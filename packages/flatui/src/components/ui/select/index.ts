// Simplified wrapper as the primary export
export { Select, SelectPrimitives } from './select.simple'
export type { SelectProps, SelectOptionDef, SelectGroupDef, SelectOptionOrGroup } from './select.simple'

// Sub-parts still available individually (backward compat)
export {
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from './select'
