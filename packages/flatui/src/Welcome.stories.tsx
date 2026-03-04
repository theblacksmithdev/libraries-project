import type { Meta, StoryObj } from '@storybook/react';

const StarIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 2 L22.5 15.5 L36 14 L24 20 L36 26 L22.5 24.5 L20 38 L17.5 24.5 L4 26 L16 20 L4 14 L17.5 15.5 Z"
      fill="#d97757"
      stroke="#d97757"
      strokeWidth="0.5"
      strokeLinejoin="round"
    />
  </svg>
);

const ColorSwatch = ({ hex, label }: { hex: string; label: string }) => (
  <div className="flex flex-col items-center gap-1.5">
    <div
      className="h-12 w-12 rounded-xl border border-black/[0.08]"
      style={{ backgroundColor: hex }}
    />
    <span className="text-xs font-medium" style={{ color: '#6b6a68' }}>
      {label}
    </span>
    <span className="font-mono text-[10px]" style={{ color: '#b0aea5' }}>
      {hex}
    </span>
  </div>
);

const Welcome = () => (
  <div
    className="flex min-h-[520px] w-[640px] flex-col items-center justify-center gap-8 rounded-2xl p-12"
    style={{
      backgroundColor: '#faf9f5',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      boxShadow: '0 0.25rem 1.25rem rgba(0, 0, 0, 0.035)',
    }}
  >
    <StarIcon />

    <div className="flex flex-col items-center gap-2 text-center">
      <h1 className="text-4xl font-semibold tracking-tight" style={{ color: '#141413' }}>
        FlatUI
      </h1>
      <p className="text-lg" style={{ color: '#6b6a68' }}>
        Warm, human React components powered by Tailwind CSS.
      </p>
    </div>

    <div className="flex flex-col items-center gap-1">
      <p className="text-sm font-medium" style={{ color: '#b0aea5' }}>
        Inspired by Anthropic's design language
      </p>
      <p className="text-xs" style={{ color: '#b0aea5' }}>
        Warm minimalism · Terracotta accents · Whisper-quiet shadows
      </p>
    </div>

    <div className="my-2 h-px w-full" style={{ backgroundColor: '#e8e6dc' }} />

    <div className="flex flex-col items-center gap-4">
      <p className="text-xs font-medium uppercase tracking-widest" style={{ color: '#b0aea5' }}>
        Palette
      </p>
      <div className="flex gap-6">
        <ColorSwatch hex="#141413" label="Dark" />
        <ColorSwatch hex="#faf9f5" label="Light" />
        <ColorSwatch hex="#d97757" label="Orange" />
        <ColorSwatch hex="#6a9bcc" label="Blue" />
        <ColorSwatch hex="#788c5d" label="Green" />
        <ColorSwatch hex="#e8e6dc" label="Gray" />
      </div>
    </div>

    <div className="flex flex-col items-center gap-3">
      <p className="text-xs font-medium uppercase tracking-widest" style={{ color: '#b0aea5' }}>
        15 Components
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {[
          'Button',
          'Input',
          'Select',
          'Checkbox',
          'Card',
          'Modal',
          'Tabs',
          'Accordion',
          'Toast',
          'Tooltip',
          'Dropdown',
          'Table',
          'Badge',
          'Avatar',
          'Tag',
        ].map((name) => (
          <span
            key={name}
            className="rounded-lg px-2.5 py-1 text-xs font-medium"
            style={{
              backgroundColor: '#F5F5F0',
              color: '#6b6a68',
              border: '1px solid rgba(0, 0, 0, 0.06)',
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>

    <p className="mt-2 text-center text-xs leading-relaxed" style={{ color: '#b0aea5' }}>
      Zero dependencies · Fully accessible · className overrides · Tree-shakeable
    </p>
  </div>
);

const meta: Meta<typeof Welcome> = {
  title: 'Introduction/Welcome',
  component: Welcome,
  parameters: {
    docs: { page: null },
    layout: 'centered',
    backgrounds: {
      default: 'warm',
      values: [
        { name: 'warm', value: '#F5F5F0' },
        { name: 'dark', value: '#2b2a27' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Welcome>;

export const Default: Story = {};
