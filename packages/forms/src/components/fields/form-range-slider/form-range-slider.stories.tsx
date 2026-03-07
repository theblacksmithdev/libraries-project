import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { Form } from '../../form';
import { FormRangeSlider } from './form-range-slider';

const schema = z.object({ field: z.array(z.number()) });

const meta: Meta<typeof FormRangeSlider> = {
  title: 'Fields/FormRangeSlider',
  component: FormRangeSlider,
  decorators: [
    (Story) => (
      <Form schema={schema} onSubmit={() => {}} defaultValues={{ field: [20, 80] }} className="w-[360px]">
        <Story />
      </Form>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormRangeSlider>;

export const Default: Story = {
  args: { name: 'field', label: 'Price range', min: 0, max: 100 },
};

export const WithStep: Story = {
  args: { name: 'field', label: 'Temperature range', min: 0, max: 100, step: 5, description: 'Select min and max temperature' },
};

export const WithLabels: Story = {
  args: {
    name: 'field',
    label: 'Budget',
    min: 0,
    max: 1000,
    step: 50,
    showLabels: true,
    formatLabel: (value: number) => `$${value}`,
  },
};
