// Simplified wrapper as the primary export
export { Stepper, StepperPrimitives } from './stepper.simple'
export type { StepperProps, StepDef } from './stepper.simple'

// Sub-parts still available individually (backward compat)
export {
  StepperRoot,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
} from './stepper'

export type { StepStatus } from './stepper'
