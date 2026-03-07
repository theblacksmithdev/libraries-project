import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { Form } from '../../form';
import { FormSwitch } from './form-switch';

const schema = z.object({ field: z.boolean() });

const meta: Meta<typeof FormSwitch> = {
  title: 'Fields/FormSwitch',
  component: FormSwitch,
  decorators: [
    (Story) => (
      <Form schema={schema} onSubmit={() => {}} defaultValues={{ field: false }} className="w-[360px]">
        <Story />
      </Form>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormSwitch>;

export const Default: Story = {
  args: { name: 'field', label: 'Dark mode' },
};

export const WithDescription: Story = {
  args: { name: 'field', label: 'Notifications', description: 'Get notified about important updates' },
};

export const Disabled: Story = {
  args: { name: 'field', label: 'Two-factor auth', description: 'Contact admin to change', disabled: true },
};
