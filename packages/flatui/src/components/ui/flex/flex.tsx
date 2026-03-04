import * as React from "react"

import { Box, type BoxProps } from "@/components/ui/box"

export interface FlexProps extends BoxProps {}

const Flex = React.forwardRef<HTMLElement, FlexProps>(
  (props, ref) => <Box ref={ref} display="flex" {...props} />
)
Flex.displayName = "Flex"

export { Flex }
