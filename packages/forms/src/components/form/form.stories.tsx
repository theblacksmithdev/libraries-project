import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { Button } from '@blacksmith-ui/react';
import { Form } from './form';
import { FormInput } from '../fields/form-input';
import { FormTextarea } from '../fields/form-textarea';
import { FormSelect } from '../fields/form-select';
import { FormCheckbox } from '../fields/form-checkbox';
import { FormSwitch } from '../fields/form-switch';
import { FormRadioGroup } from '../fields/form-radio-group';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

// --- Basic Form ---

const basicSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

export const Basic: Story = {
  render: () => (
    <Form
      schema={basicSchema}
      onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
      defaultValues={{ name: '', email: '' }}
      className="w-[400px]"
    >
      <FormInput name="name" label="Full Name" placeholder="Jane Doe" />
      <FormInput name="email" label="Email" type="email" placeholder="jane@example.com" />
      <Button type="submit" className="w-full">Submit</Button>
    </Form>
  ),
};

// --- Contact Form ---

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(1, 'Select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const ContactForm: Story = {
  render: () => (
    <Form
      schema={contactSchema}
      onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
      defaultValues={{ name: '', email: '', subject: '', message: '' }}
      className="w-[440px]"
    >
      <FormInput name="name" label="Name" placeholder="Your name" />
      <FormInput name="email" label="Email" type="email" placeholder="you@example.com" />
      <FormSelect
        name="subject"
        label="Subject"
        placeholder="Select a subject"
        options={[
          { value: 'general', label: 'General Inquiry' },
          { value: 'support', label: 'Technical Support' },
          { value: 'billing', label: 'Billing' },
          { value: 'feedback', label: 'Feedback' },
        ]}
      />
      <FormTextarea name="message" label="Message" placeholder="How can we help?" rows={4} />
      <Button type="submit" className="w-full">Send Message</Button>
    </Form>
  ),
};

// --- Settings Form ---

const settingsSchema = z.object({
  displayName: z.string().min(1, 'Display name is required'),
  bio: z.string().optional(),
  notifications: z.boolean().default(false),
  marketing: z.boolean().default(false),
  theme: z.string().default('system'),
});

export const SettingsForm: Story = {
  render: () => (
    <Form
      schema={settingsSchema}
      onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
      defaultValues={{ displayName: 'Jane Doe', bio: '', notifications: true, marketing: false, theme: 'system' }}
      className="w-[440px]"
    >
      <FormInput name="displayName" label="Display Name" placeholder="Your display name" />
      <FormTextarea name="bio" label="Bio" description="Brief description for your profile" placeholder="Tell us about yourself" rows={3} />
      <FormSwitch name="notifications" label="Email Notifications" description="Receive email notifications about account activity" />
      <FormCheckbox name="marketing" label="Marketing emails" description="Receive tips, product updates, and offers" />
      <FormRadioGroup
        name="theme"
        label="Theme Preference"
        options={[
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
          { value: 'system', label: 'System' },
        ]}
      />
      <Button type="submit" className="w-full">Save Settings</Button>
    </Form>
  ),
};

// --- Validation Modes ---

const validationSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const ValidateOnBlur: Story = {
  name: 'Validation: onBlur (default)',
  render: () => (
    <Form
      schema={validationSchema}
      onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
      defaultValues={{ email: '', password: '' }}
      mode="onBlur"
      className="w-[400px]"
    >
      <FormInput name="email" label="Email" type="email" placeholder="Type and tab away to see validation" />
      <FormInput name="password" label="Password" type="password" placeholder="Min 8 characters" />
      <Button type="submit" className="w-full">Submit</Button>
    </Form>
  ),
};

export const ValidateOnSubmit: Story = {
  name: 'Validation: onSubmit',
  render: () => (
    <Form
      schema={validationSchema}
      onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
      defaultValues={{ email: '', password: '' }}
      mode="onSubmit"
      className="w-[400px]"
    >
      <FormInput name="email" label="Email" type="email" placeholder="Errors show on submit only" />
      <FormInput name="password" label="Password" type="password" placeholder="Min 8 characters" />
      <Button type="submit" className="w-full">Submit</Button>
    </Form>
  ),
};

// --- With Mutation Error ---

export const WithMutationError: Story = {
  name: 'Mutation Error',
  render: () => (
    <Form
      schema={basicSchema}
      onSubmit={() => {}}
      defaultValues={{ name: 'Jane', email: 'jane@example.com' }}
      mutation={{ error: new Error('Network error: Unable to reach the server. Please try again.'), isPending: false }}
      className="w-[400px]"
    >
      <FormInput name="name" label="Full Name" />
      <FormInput name="email" label="Email" type="email" />
      <Button type="submit" className="w-full">Submit</Button>
    </Form>
  ),
};

// --- Disabled State ---

export const Disabled: Story = {
  render: () => (
    <Form
      schema={basicSchema}
      onSubmit={() => {}}
      defaultValues={{ name: 'Jane Doe', email: 'jane@example.com' }}
      className="w-[400px]"
    >
      <FormInput name="name" label="Full Name" disabled />
      <FormInput name="email" label="Email" type="email" disabled />
      <Button type="submit" className="w-full" disabled>Submitting...</Button>
    </Form>
  ),
};
