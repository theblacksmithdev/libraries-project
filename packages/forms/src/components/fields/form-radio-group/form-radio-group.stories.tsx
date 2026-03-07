import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { Form } from '../../form';
import { FormRadioGroup } from './form-radio-group';

const schema = z.object({ field: z.string() });

const meta: Meta<typeof FormRadioGroup> = {
  title: 'Fields/FormRadioGroup',
  component: FormRadioGroup,
  decorators: [
    (Story) => (
      <Form schema={schema} onSubmit={() => {}} defaultValues={{ field: '' }} className="w-[360px]">
        <Story />
      </Form>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormRadioGroup>;

export const Vertical: Story = {
  args: {
    name: 'field',
    label: 'Plan',
    options: [
      { value: 'free', label: 'Free — $0/mo' },
      { value: 'pro', label: 'Pro — $19/mo' },
      { value: 'enterprise', label: 'Enterprise — Custom' },
    ],
  },
};

export const Horizontal: Story = {
  args: {
    name: 'field',
    label: 'Size',
    orientation: 'horizontal',
    options: [
      { value: 'sm', label: 'Small' },
      { value: 'md', label: 'Medium' },
      { value: 'lg', label: 'Large' },
    ],
  },
};

export const WithDescription: Story = {
  args: {
    name: 'field',
    label: 'Frequency',
    description: 'How often should we send reports?',
    options: [
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'monthly', label: 'Monthly' },
    ],
  },
};
