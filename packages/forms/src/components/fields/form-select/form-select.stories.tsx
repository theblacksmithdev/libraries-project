import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { Form } from '../../form';
import { FormSelect } from './form-select';

const schema = z.object({ field: z.string() });

const meta: Meta<typeof FormSelect> = {
  title: 'Fields/FormSelect',
  component: FormSelect,
  decorators: [
    (Story) => (
      <Form schema={schema} onSubmit={() => {}} defaultValues={{ field: '' }} className="w-[360px]">
        <Story />
      </Form>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormSelect>;

export const Default: Story = {
  args: {
    name: 'field',
    label: 'Country',
    placeholder: 'Select a country',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'fi', label: 'Finland' },
      { value: 'de', label: 'Germany' },
      { value: 'jp', label: 'Japan' },
    ],
  },
};

export const WithGroups: Story = {
  args: {
    name: 'field',
    label: 'Framework',
    placeholder: 'Choose a framework',
    options: [
      {
        label: 'Frontend',
        options: [
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' },
          { value: 'svelte', label: 'Svelte' },
        ],
      },
      {
        label: 'Backend',
        options: [
          { value: 'express', label: 'Express' },
          { value: 'fastify', label: 'Fastify' },
          { value: 'hono', label: 'Hono' },
        ],
      },
    ],
  },
};

export const WithDescription: Story = {
  args: {
    name: 'field',
    label: 'Role',
    description: 'This determines your permissions',
    placeholder: 'Select a role',
    options: [
      { value: 'admin', label: 'Admin' },
      { value: 'editor', label: 'Editor' },
      { value: 'viewer', label: 'Viewer' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    name: 'field',
    label: 'Plan',
    placeholder: 'Upgrade to change',
    disabled: true,
    options: [
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Pro' },
    ],
  },
};
