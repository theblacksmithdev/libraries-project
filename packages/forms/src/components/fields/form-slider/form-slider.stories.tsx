import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { Form } from '../../form';
import { FormSlider } from './form-slider';

const schema = z.object({ field: z.number() });

const meta: Meta<typeof FormSlider> = {
  title: 'Fields/FormSlider',
  component: FormSlider,
  decorators: [
    (Story) => (
      <Form schema={schema} onSubmit={() => {}} defaultValues={{ field: 50 }} className="w-[360px]">
        <Story />
      </Form>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormSlider>;

export const Default: Story = {
  args: { name: 'field', label: 'Volume', min: 0, max: 100 },
};

export const WithStep: Story = {
  args: { name: 'field', label: 'Brightness', min: 0, max: 100, step: 10, description: 'Adjust in increments of 10' },
};

export const Disabled: Story = {
  args: { name: 'field', label: 'Opacity', min: 0, max: 100, disabled: true },
};
