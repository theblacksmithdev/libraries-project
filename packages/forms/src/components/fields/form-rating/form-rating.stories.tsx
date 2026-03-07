import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { Form } from '../../form';
import { FormRating } from './form-rating';

const schema = z.object({ field: z.number() });

const meta: Meta<typeof FormRating> = {
  title: 'Fields/FormRating',
  component: FormRating,
  decorators: [
    (Story) => (
      <Form schema={schema} onSubmit={() => {}} defaultValues={{ field: 0 }} className="w-[360px]">
        <Story />
      </Form>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormRating>;

export const Default: Story = {
  args: { name: 'field', label: 'Rating' },
};

export const FiveStars: Story = {
  args: { name: 'field', label: 'How was your experience?', max: 5, description: 'Rate from 1 to 5 stars' },
};

export const TenStars: Story = {
  args: { name: 'field', label: 'Score', max: 10 },
};
