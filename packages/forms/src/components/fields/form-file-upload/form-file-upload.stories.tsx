import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { Form } from '../../form';
import { FormFileUpload } from './form-file-upload';

const schema = z.object({ field: z.any() });

const meta: Meta<typeof FormFileUpload> = {
  title: 'Fields/FormFileUpload',
  component: FormFileUpload,
  decorators: [
    (Story) => (
      <Form schema={schema} onSubmit={() => {}} defaultValues={{ field: null }} className="w-[360px]">
        <Story />
      </Form>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormFileUpload>;

export const Default: Story = {
  args: { name: 'field', label: 'Upload file' },
};

export const ImageOnly: Story = {
  args: { name: 'field', label: 'Profile photo', accept: 'image/*', description: 'JPG, PNG or GIF up to 5MB' },
};

export const Multiple: Story = {
  args: { name: 'field', label: 'Attachments', multiple: true, maxSize: 10 * 1024 * 1024, description: 'Upload multiple files' },
};
