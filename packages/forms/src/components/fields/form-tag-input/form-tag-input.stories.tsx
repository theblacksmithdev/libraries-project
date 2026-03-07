import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { Form } from '../../form';
import { FormTagInput } from './form-tag-input';

const schema = z.object({ field: z.array(z.string()) });

const meta: Meta<typeof FormTagInput> = {
  title: 'Fields/FormTagInput',
  component: FormTagInput,
  decorators: [
    (Story) => (
      <Form schema={schema} onSubmit={() => {}} defaultValues={{ field: [] }} className="w-[360px]">
        <Story />
      </Form>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormTagInput>;

export const Default: Story = {
  args: { name: 'field', label: 'Tags', placeholder: 'Add a tag...' },
};

export const WithMax: Story = {
  args: { name: 'field', label: 'Skills', placeholder: 'Add skill...', max: 5, description: 'Add up to 5 skills' },
};

export const WithDescription: Story = {
  args: { name: 'field', label: 'Keywords', placeholder: 'Type and press Enter', description: 'Press Enter or comma to add' },
};
