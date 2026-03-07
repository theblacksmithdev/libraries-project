import type { Meta, StoryObj } from '@storybook/react';

const Welcome = () => (
  <div
    className="flex w-[600px] flex-col gap-6 rounded-2xl p-10"
    style={{
      backgroundColor: '#0a0a0a',
      border: '1px solid #1c1c1c',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.02), 0 8px 40px rgba(0,0,0,0.4)',
    }}
  >
    <div className="flex flex-col items-center gap-2 text-center">
      <span
        className="text-xs font-medium px-2.5 py-0.5 rounded-full"
        style={{ color: '#a78bfa', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)' }}
      >
        @blacksmith-ui/forms
      </span>
      <h1 className="text-2xl font-bold" style={{ color: '#fafafa' }}>Smart Form Components</h1>
      <p className="text-sm" style={{ color: '#737373' }}>
        Zod schema validation + react-hook-form + TanStack React Query
      </p>
    </div>

    <div className="h-px w-full" style={{ backgroundColor: '#1c1c1c' }} />

    <p className="text-center text-sm leading-relaxed" style={{ color: '#a3a3a3' }}>
      Define a Zod schema, drop in field components, and get type-safe validated forms
      with automatic error display. Every field wraps a <strong style={{ color: '#e5e5e5' }}>@blacksmith-ui/react</strong> primitive
      with label, description, and validation message built in.
    </p>

    <div className="h-px w-full" style={{ backgroundColor: '#1c1c1c' }} />

    <div className="flex flex-col items-center gap-3">
      <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#525252' }}>
        17 Field Components
      </p>
      <div className="flex flex-wrap justify-center gap-1.5">
        {[
          'FormInput', 'FormTextarea', 'FormSelect', 'FormCheckbox', 'FormSwitch',
          'FormRadioGroup', 'FormDatePicker', 'FormNumberInput', 'FormSlider',
          'FormRangeSlider', 'FormRating', 'FormTagInput', 'FormColorPicker',
          'FormFileUpload', 'FormPinInput', 'FormSearchInput', 'FieldWrapper',
        ].map((name) => (
          <span
            key={name}
            className="rounded-md px-2 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: 'rgba(167, 139, 250, 0.08)',
              color: '#a78bfa',
              border: '1px solid rgba(167, 139, 250, 0.15)',
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>

    <div className="h-px w-full" style={{ backgroundColor: '#1c1c1c' }} />

    <div className="flex flex-col items-center gap-3">
      <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#525252' }}>
        Also Included
      </p>
      <div className="flex gap-6 text-center">
        {[
          { name: 'useFormMutation', desc: 'React Query mutation hook' },
          { name: 'useFormQuery', desc: 'React Query query hook' },
          { name: 'FormQueryProvider', desc: 'QueryClient provider' },
        ].map((item) => (
          <div key={item.name} className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold" style={{ color: '#e5e5e5' }}>{item.name}</span>
            <span className="text-[11px]" style={{ color: '#525252' }}>{item.desc}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="flex justify-center gap-3 pt-2">
      {['Zod Validation', 'Type-safe', 'Accessible', 'react-hook-form'].map((tag) => (
        <span key={tag} className="text-[11px] font-medium" style={{ color: '#404040' }}>
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const meta: Meta<typeof Welcome> = {
  title: 'Introduction/Welcome',
  component: Welcome,
  parameters: {
    docs: { page: null },
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#000000' },
        { name: 'light', value: '#F5F5F0' },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Welcome>;

export const Default: Story = {};
