import type { Meta, StoryObj } from '@storybook/react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '.'

const meta: Meta<typeof Carousel> = {
  title: 'Data Display/Carousel',
  component: Carousel,
  parameters: {
    docs: {
      description: {
        component: 'A carousel with motion and swipe gestures built on Embla.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Carousel>

export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {[1, 2, 3, 4, 5].map((i) => (
          <CarouselItem key={i}>
            <div className="flex aspect-square items-center justify-center rounded-md border bg-card p-6">
              <span className="text-4xl font-semibold">{i}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  parameters: {
    docs: {
      source: {
        code: `import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@blacksmith-ui/react'

<Carousel className="w-full max-w-xs">
  <CarouselContent>
    {items.map((item) => (
      <CarouselItem key={item.id}>
        <Card>{item.content}</Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
      },
    },
  },
}
