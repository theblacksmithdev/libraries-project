import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { Form } from '../../form';
import { FormDatePicker } from './form-date-picker';

const schema = z.object({ field: z.date() });

const meta: Meta<typeof FormDatePicker> = {
  title: 'Fields/FormDatePicker',
  component: FormDatePicker,
  decorators: [
    (Story) => (
      <Form schema={schema} onSubmit={() => {}} defaultValues={{ field: undefined }} className="w-[360px]">
        <Story />
      </Form>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormDatePicker>;

export const Default: Story = {
  args: { name: 'field', label: 'Date', placeholder: 'Pick a date' },
};

export const WithDescription: Story = {
  args: { name: 'field', label: 'Start date', placeholder: 'Select start date', description: 'When should the project begin?' },
};

export const CustomFormat: Story = {
  args: { name: 'field', label: 'Birthday', placeholder: 'MM/DD/YYYY', dateFormat: 'MM/dd/yyyy' },
};
