import type { Meta, StoryObj } from '@storybook/react'
import { DollarSign, Users, Activity, CreditCard } from 'lucide-react'
import { StatCard } from '.'

const meta: Meta<typeof StatCard> = {
  title: 'Data Display/StatCard',
  component: StatCard,
  parameters: {
    docs: {
      description: {
        component: 'Displays a statistic with label, value, trend indicator, and optional icon.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof StatCard>

export const Default: Story = {
  render: () => (
    <div className="w-[250px]">
      <StatCard
        label="Total Revenue"
        value="$45,231.89"
        trend="up"
        trendValue="+20.1%"
        description="from last month"
        icon={<DollarSign />}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { StatCard } from '@blacksmith-ui/react'
import { DollarSign } from 'lucide-react'

<StatCard
  label="Total Revenue"
  value="$45,231.89"
  trend="up"
  trendValue="+20.1%"
  description="from last month"
  icon={<DollarSign />}
/>`,
      },
    },
  },
}

export const TrendDown: Story = {
  render: () => (
    <div className="w-[250px]">
      <StatCard
        label="Active Users"
        value="1,234"
        trend="down"
        trendValue="-4.5%"
        description="from last week"
        icon={<Users />}
      />
    </div>
  ),
}

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-lg">
      <StatCard label="Revenue" value="$45,231" trend="up" trendValue="+20%" icon={<DollarSign />} />
      <StatCard label="Users" value="2,350" trend="up" trendValue="+180" icon={<Users />} />
      <StatCard label="Active Now" value="573" trend="neutral" trendValue="0%" icon={<Activity />} />
      <StatCard label="Sales" value="12,234" trend="down" trendValue="-2%" icon={<CreditCard />} />
    </div>
  ),
}
