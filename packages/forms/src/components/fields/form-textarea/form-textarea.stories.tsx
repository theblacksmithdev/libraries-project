import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { Form } from '../../form';
import { FormTextarea } from './form-textarea';

const schema = z.object({ field: z.string() });

const meta: Meta<typeof FormTextarea> = {
  title: 'Fields/FormTextarea',
  component: FormTextarea,
  decorators: [
    (Story) => (
      <Form schema={schema} onSubmit={() => {}} defaultValues={{ field: '' }} className="w-[360px]">
        <Story />
      </Form>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormTextarea>;

export const Default: Story = {
  args: { name: 'field', label: 'Message', placeholder: 'Write your message...' },
};

export const WithDescription: Story = {
  args: { name: 'field', label: 'Bio', placeholder: 'Tell us about yourself', description: 'Max 500 characters', rows: 4 },
};

export const Disabled: Story = {
  args: { name: 'field', label: 'Notes', placeholder: 'Read only', disabled: true },
};
