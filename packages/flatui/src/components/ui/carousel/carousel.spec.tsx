import { render, screen } from '@testing-library/react'
import { Carousel, CarouselContent, CarouselItem } from '.'

beforeAll(() => {
  globalThis.IntersectionObserver = class IntersectionObserver {
    readonly root = null
    readonly rootMargin = ''
    readonly thresholds = [] as number[]
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return [] }
  } as unknown as typeof globalThis.IntersectionObserver
})

describe('Carousel', () => {
  it('renders', () => {
    render(<Carousel><CarouselContent><CarouselItem>Slide</CarouselItem></CarouselContent></Carousel>)
    expect(screen.getByText('Slide')).toBeInTheDocument()
  })
})
