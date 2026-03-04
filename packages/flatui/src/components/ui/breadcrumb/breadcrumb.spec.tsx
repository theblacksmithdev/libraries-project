import { render, screen } from '@testing-library/react'
import { Breadcrumb, BreadcrumbPrimitives, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from '.'

describe('Breadcrumb', () => {
  it('renders simplified with items', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Widget' },
        ]}
      />
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Widget')).toBeInTheDocument()
  })

  it('renders compound primitives', () => {
    render(
      <BreadcrumbPrimitives.Root>
        <BreadcrumbPrimitives.List>
          <BreadcrumbPrimitives.Item>
            <BreadcrumbPrimitives.Page>Page</BreadcrumbPrimitives.Page>
          </BreadcrumbPrimitives.Item>
        </BreadcrumbPrimitives.List>
      </BreadcrumbPrimitives.Root>
    )
    expect(screen.getByText('Page')).toBeInTheDocument()
  })

  it('exports sub-parts for backward compat', () => {
    render(
      <BreadcrumbPrimitives.Root>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbPage>Legacy</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </BreadcrumbPrimitives.Root>
    )
    expect(screen.getByText('Legacy')).toBeInTheDocument()
  })
})
