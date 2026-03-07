import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { Form } from '../../form';
import { FormPinInput } from './form-pin-input';

const schema = z.object({ field: z.string() });

const meta: Meta<typeof FormPinInput> = {
  title: 'Fields/FormPinInput',
  component: FormPinInput,
  decorators: [
    (Story) => (
      <Form schema={schema} onSubmit={() => {}} defaultValues={{ field: '' }} className="w-[360px]">
        <Story />
      </Form>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormPinInput>;

export const Default: Story = {
  args: { name: 'field', label: 'Verification code', length: 6 },
};

export const FourDigit: Story = {
  args: { name: 'field', label: 'PIN', length: 4, type: 'numeric', description: 'Enter your 4-digit PIN' },
};

export const Masked: Story = {
  args: { name: 'field', label: 'Security code', length: 6, mask: true, type: 'numeric' },
};

export const Alphanumeric: Story = {
  args: { name: 'field', label: 'Invite code', length: 8, type: 'alphanumeric', description: 'Letters and numbers accepted' },
};
