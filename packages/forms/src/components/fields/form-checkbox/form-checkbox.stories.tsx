import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { Form } from '../../form';
import { FormCheckbox } from './form-checkbox';

const schema = z.object({ field: z.boolean() });

const meta: Meta<typeof FormCheckbox> = {
  title: 'Fields/FormCheckbox',
  component: FormCheckbox,
  decorators: [
    (Story) => (
      <Form schema={schema} onSubmit={() => {}} defaultValues={{ field: false }} className="w-[360px]">
        <Story />
      </Form>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormCheckbox>;

export const Default: Story = {
  args: { name: 'field', label: 'Accept terms and conditions' },
};

export const WithDescription: Story = {
  args: { name: 'field', label: 'Marketing emails', description: 'Receive product updates and promotional offers' },
};

export const Disabled: Story = {
  args: { name: 'field', label: 'Required agreement', disabled: true },
};
