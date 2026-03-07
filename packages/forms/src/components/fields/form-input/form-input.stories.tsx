import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { Form } from '../../form';
import { FormInput } from './form-input';

const meta: Meta<typeof FormInput> = {
  title: 'Fields/FormInput',
  component: FormInput,
  decorators: [
    (Story) => {
      const schema = z.object({ field: z.string() });
      return (
        <Form schema={schema} onSubmit={() => {}} defaultValues={{ field: '' }} className="w-[360px]">
          <Story />
        </Form>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof FormInput>;

export const Default: Story = {
  args: { name: 'field', label: 'Username', placeholder: 'Enter your username' },
};

export const WithDescription: Story = {
  args: { name: 'field', label: 'Email', placeholder: 'you@example.com', description: 'We will never share your email' },
};

export const Password: Story = {
  args: { name: 'field', label: 'Password', type: 'password', placeholder: 'Enter password' },
};

export const Disabled: Story = {
  args: { name: 'field', label: 'Locked Field', placeholder: 'Cannot edit', disabled: true },
};

export const WithValidation: Story = {
  render: () => {
    const schema = z.object({ email: z.string().email('Please enter a valid email') });
    return (
      <Form schema={schema} onSubmit={() => {}} defaultValues={{ email: '' }} mode="onBlur" className="w-[360px]">
        <FormInput name="email" label="Email" type="email" placeholder="Type invalid email and tab away" />
      </Form>
    );
  },
};
