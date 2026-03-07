import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { Form } from '../../form';
import { FormNumberInput } from './form-number-input';

const schema = z.object({ field: z.number() });

const meta: Meta<typeof FormNumberInput> = {
  title: 'Fields/FormNumberInput',
  component: FormNumberInput,
  decorators: [
    (Story) => (
      <Form schema={schema} onSubmit={() => {}} defaultValues={{ field: 1 }} className="w-[360px]">
        <Story />
      </Form>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormNumberInput>;

export const Default: Story = {
  args: { name: 'field', label: 'Quantity', min: 1, max: 99 },
};

export const WithStep: Story = {
  args: { name: 'field', label: 'Price', min: 0, max: 1000, step: 5, placeholder: '0' },
};

export const WithDescription: Story = {
  args: { name: 'field', label: 'Team size', min: 1, max: 50, description: 'Number of seats in your plan' },
};
