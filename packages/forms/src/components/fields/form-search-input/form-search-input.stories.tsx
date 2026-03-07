import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { Form } from '../../form';
import { FormSearchInput } from './form-search-input';

const schema = z.object({ field: z.string() });

const meta: Meta<typeof FormSearchInput> = {
  title: 'Fields/FormSearchInput',
  component: FormSearchInput,
  decorators: [
    (Story) => (
      <Form schema={schema} onSubmit={() => {}} defaultValues={{ field: '' }} className="w-[360px]">
        <Story />
      </Form>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormSearchInput>;

export const Default: Story = {
  args: { name: 'field', label: 'Search', placeholder: 'Search...' },
};

export const WithDescription: Story = {
  args: { name: 'field', label: 'Find users', placeholder: 'Search by name or email', description: 'Results update as you type' },
};
