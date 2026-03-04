import { render, screen, fireEvent } from '@testing-library/react'
import { CodeBlock, CodeBlockPrimitives } from '.'

// Mock shiki to avoid async bundle loading in tests
vi.mock('shiki', () => ({
  codeToHtml: vi.fn().mockResolvedValue(
    '<pre class="shiki"><code><span>const x = 1;</span></code></pre>'
  ),
}))

// Mock clipboard API
const writeText = vi.fn().mockResolvedValue(undefined)
Object.assign(navigator, {
  clipboard: { writeText },
})

const sampleCode = `function hello() {
  console.log("Hello, world!")
}

hello()`

describe('CodeBlock', () => {
  it('renders code text', () => {
    render(<CodeBlock code={sampleCode} />)
    expect(screen.getByText(/function hello/)).toBeInTheDocument()
  })

  it('shows filename in header', () => {
    render(<CodeBlock code={sampleCode} filename="hello.ts" language="typescript" />)
    expect(screen.getByText('hello.ts')).toBeInTheDocument()
  })

  it('shows language when no filename', () => {
    render(<CodeBlock code={sampleCode} language="typescript" />)
    expect(screen.getByText('typescript')).toBeInTheDocument()
  })

  it('copy button copies code to clipboard', async () => {
    render(<CodeBlock code={sampleCode} language="typescript" />)
    const copyBtn = screen.getByLabelText('Copy code')
    fireEvent.click(copyBtn)
    expect(writeText).toHaveBeenCalledWith(sampleCode)
  })

  it('shows line numbers by default', () => {
    render(<CodeBlock code={sampleCode} data-testid="code-block" />)
    // 5 lines of code → line numbers 1-5
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('hides line numbers when showLineNumbers={false}', () => {
    render(
      <CodeBlock
        code={sampleCode}
        showLineNumbers={false}
        data-testid="code-block"
      />
    )
    const root = screen.getByTestId('code-block')
    // Line number gutter contains select-none class
    const lineNumberGutter = root.querySelector('.select-none')
    expect(lineNumberGutter).not.toBeInTheDocument()
  })

  it('hides copy button when showCopyButton={false}', () => {
    render(
      <CodeBlock code={sampleCode} language="typescript" showCopyButton={false} />
    )
    expect(screen.queryByLabelText('Copy code')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <CodeBlock code={sampleCode} className="custom-class" data-testid="code-block" />
    )
    expect(screen.getByTestId('code-block')).toHaveClass('custom-class')
  })

  it('renders without language as plain text', () => {
    render(<CodeBlock code="just some text" />)
    expect(screen.getByText('just some text')).toBeInTheDocument()
  })

  it('renders compound primitives', () => {
    render(
      <CodeBlockPrimitives.Root data-testid="root">
        <CodeBlockPrimitives.Header filename="test.js" />
        <CodeBlockPrimitives.Body code={sampleCode} />
      </CodeBlockPrimitives.Root>
    )
    expect(screen.getByTestId('root')).toBeInTheDocument()
    expect(screen.getByText('test.js')).toBeInTheDocument()
  })
})
