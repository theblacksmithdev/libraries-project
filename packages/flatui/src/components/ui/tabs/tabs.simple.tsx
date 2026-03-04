import * as React from "react"
import {
  Tabs as TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./tabs"

export interface TabDef {
  /** Unique value for the tab */
  value: string
  /** Tab label */
  label: React.ReactNode
  /** Tab panel content */
  content: React.ReactNode
  /** Whether the tab is disabled */
  disabled?: boolean
}

export type TabsProps = Omit<React.ComponentPropsWithoutRef<typeof TabsRoot>, "children"> & {
  /** Tab definitions */
  tabs: TabDef[]
}

function Tabs({ tabs, ...props }: TabsProps) {
  return (
    <TabsRoot {...props}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} disabled={tab.disabled}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </TabsRoot>
  )
}
Tabs.displayName = "Tabs"

export const TabsPrimitives = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
}

export { Tabs }
