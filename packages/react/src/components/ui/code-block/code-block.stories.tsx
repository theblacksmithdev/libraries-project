import type { Meta, StoryObj } from '@storybook/react'
import { CodeBlock, CodeBlockPrimitives } from '.'

const meta: Meta<typeof CodeBlock> = {
  title: 'Media/CodeBlock',
  component: CodeBlock,
  parameters: {
    docs: {
      description: {
        component:
          'A syntax-highlighted code display with line numbers, copy button, and optional filename header. Powered by Shiki.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CodeBlock>

const tsCode = `interface User {
  id: string
  name: string
  email: string
}

async function getUser(id: string): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`)
  if (!res.ok) throw new Error("User not found")
  return res.json()
}`

const pythonCode = `from dataclasses import dataclass

@dataclass
class User:
    id: str
    name: str
    email: str

async def get_user(user_id: str) -> User:
    async with httpx.AsyncClient() as client:
        response = await client.get(f"/api/users/{user_id}")
        response.raise_for_status()
        return User(**response.json())`

const jsonCode = `{
  "name": "@blacksmith-ui/react",
  "version": "0.1.0",
  "dependencies": {
    "shiki": "^3.2.0",
    "tailwind-merge": "^3.5.0"
  }
}`

export const Default: Story = {
  render: () => (
    <div className="w-[640px]">
      <CodeBlock code={tsCode} language="typescript" filename="user.ts" />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { CodeBlock } from '@blacksmith-ui/react'

<CodeBlock code={code} language="typescript" filename="user.ts" />`,
      },
    },
  },
}

export const Python: Story = {
  render: () => (
    <div className="w-[640px]">
      <CodeBlock code={pythonCode} language="python" filename="user.py" />
    </div>
  ),
}

export const JSON: Story = {
  render: () => (
    <div className="w-[640px]">
      <CodeBlock code={jsonCode} language="json" filename="package.json" />
    </div>
  ),
}

export const WithFilename: Story = {
  render: () => (
    <div className="w-[640px]">
      <CodeBlock
        code={tsCode}
        language="typescript"
        filename="src/services/user.ts"
      />
    </div>
  ),
}

export const NoLineNumbers: Story = {
  render: () => (
    <div className="w-[640px]">
      <CodeBlock
        code={tsCode}
        language="typescript"
        showLineNumbers={false}
      />
    </div>
  ),
}

export const HighlightLines: Story = {
  render: () => (
    <div className="w-[640px]">
      <CodeBlock
        code={tsCode}
        language="typescript"
        filename="user.ts"
        highlightLines={[7, 8, 9, 10]}
      />
    </div>
  ),
}

export const LongCode: Story = {
  render: () => {
    const longCode = Array.from(
      { length: 50 },
      (_, i) => `console.log("Line ${i + 1}: Hello, world!")`
    ).join('\n')
    return (
      <div className="w-[640px] max-h-[400px]">
        <CodeBlock
          code={longCode}
          language="javascript"
          filename="long-file.js"
          className="max-h-[400px]"
        />
      </div>
    )
  },
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <div className="w-[640px]">
      <CodeBlockPrimitives.Root>
        <CodeBlockPrimitives.Header filename="example.ts">
          <CodeBlockPrimitives.CopyButton code={tsCode} />
        </CodeBlockPrimitives.Header>
        <CodeBlockPrimitives.Body code={tsCode} showLineNumbers />
      </CodeBlockPrimitives.Root>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { CodeBlockPrimitives } from '@blacksmith-ui/react'

<CodeBlockPrimitives.Root>
  <CodeBlockPrimitives.Header filename="example.ts">
    <CodeBlockPrimitives.CopyButton code={code} />
  </CodeBlockPrimitives.Header>
  <CodeBlockPrimitives.Body code={code} showLineNumbers />
</CodeBlockPrimitives.Root>`,
      },
    },
  },
}
