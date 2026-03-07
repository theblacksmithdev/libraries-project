import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { Form } from '../../form';
import { FormColorPicker } from './form-color-picker';

const schema = z.object({ field: z.string() });

const meta: Meta<typeof FormColorPicker> = {
  title: 'Fields/FormColorPicker',
  component: FormColorPicker,
  decorators: [
    (Story) => (
      <Form schema={schema} onSubmit={() => {}} defaultValues={{ field: '#3b82f6' }} className="w-[360px]">
        <Story />
      </Form>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormColorPicker>;

export const Default: Story = {
  args: { name: 'field', label: 'Brand color' },
};

export const WithSwatches: Story = {
  args: {
    name: 'field',
    label: 'Theme color',
    swatches: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'],
    description: 'Pick from presets or enter a custom color',
  },
};

export const WithPlaceholder: Story = {
  args: { name: 'field', label: 'Accent color', placeholder: '#000000' },
};
