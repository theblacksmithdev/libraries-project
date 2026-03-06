import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FileUpload } from '.'

const meta: Meta<typeof FileUpload> = {
  title: 'Inputs/FileUpload',
  component: FileUpload,
  parameters: {
    docs: {
      description: {
        component:
          'Drag-and-drop file upload area with file list, validation, and remove support.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof FileUpload>

export const Default: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([])
    return <FileUpload value={files} onChange={setFiles} />
  },
  parameters: {
    docs: {
      source: {
        code: `import { FileUpload } from '@blacksmith-ui/react'\n\nconst [files, setFiles] = useState<File[]>([])\n<FileUpload value={files} onChange={setFiles} />`,
      },
    },
  },
}

export const ImagesOnly: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([])
    return <FileUpload value={files} onChange={setFiles} accept="image/*" />
  },
}

export const WithMaxSize: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([])
    return (
      <FileUpload
        value={files}
        onChange={setFiles}
        maxSize={5 * 1024 * 1024}
        accept=".pdf,.doc,.docx"
      />
    )
  },
}

export const Multiple: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([])
    return <FileUpload value={files} onChange={setFiles} multiple />
  },
}

export const Disabled: Story = {
  render: () => <FileUpload disabled />,
}
