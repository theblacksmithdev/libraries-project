import type { Meta, StoryObj } from '@storybook/react';

const AnvilIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="40" height="40" rx="12" fill="#18181b" />
    <path
      d="M14 30 L24 14 L34 30 Z"
      fill="none"
      stroke="#a78bfa"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="24" cy="26" r="3" fill="#a78bfa" />
  </svg>
);

const ColorSwatch = ({ color, label, value }: { color: string; label: string; value: string }) => (
  <div className="flex flex-col items-center gap-1.5">
    <div
      className="h-10 w-10 rounded-lg"
      style={{ backgroundColor: color, border: '1px solid rgba(255,255,255,0.06)' }}
    />
    <span className="text-[11px] font-medium" style={{ color: '#a3a3a3' }}>
      {label}
    </span>
    <span className="font-mono text-[10px]" style={{ color: '#525252' }}>
      {value}
    </span>
  </div>
);

const Pill = ({ children }: { children: string }) => (
  <span
    className="rounded-md px-2.5 py-1 text-xs font-medium"
    style={{
      backgroundColor: 'rgba(167, 139, 250, 0.08)',
      color: '#a78bfa',
      border: '1px solid rgba(167, 139, 250, 0.15)',
    }}
  >
    {children}
  </span>
);

const StatBlock = ({ number, label }: { number: string; label: string }) => (
  <div className="flex flex-col items-center gap-0.5">
    <span className="text-2xl font-bold" style={{ color: '#e5e5e5' }}>{number}</span>
    <span className="text-[11px] font-medium" style={{ color: '#525252' }}>{label}</span>
  </div>
);

const Welcome = () => (
  <div
    className="flex w-[680px] flex-col gap-8 rounded-2xl p-10"
    style={{
      backgroundColor: '#0a0a0a',
      border: '1px solid #1c1c1c',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.02), 0 8px 40px rgba(0,0,0,0.4)',
    }}
  >
    {/* Header */}
    <div className="flex flex-col items-center gap-4 text-center">
      <AnvilIcon />
      <div className="flex flex-col items-center gap-1.5">
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#fafafa' }}>
          BlacksmithUI
        </h1>
        <p className="text-sm" style={{ color: '#737373' }}>
          A modern React component library with clean, flat design
        </p>
      </div>
    </div>

    {/* Stats */}
    <div className="flex justify-center gap-10">
      <StatBlock number="60+" label="Components" />
      <StatBlock number="3" label="Packages" />
      <StatBlock number="6" label="Themes" />
    </div>

    {/* Divider */}
    <div className="h-px w-full" style={{ backgroundColor: '#1c1c1c' }} />

    {/* Description */}
    <p className="text-center text-sm leading-relaxed" style={{ color: '#a3a3a3' }}>
      Built for the <strong style={{ color: '#e5e5e5' }}>blacksmith-cli</strong> ecosystem and any React project.
      Accessible components on Radix UI, styled with Tailwind CSS, fully typed in TypeScript.
      Three composable layers — primitives, smart forms, and authentication flows.
    </p>

    {/* Divider */}
    <div className="h-px w-full" style={{ backgroundColor: '#1c1c1c' }} />

    {/* Palette */}
    <div className="flex flex-col items-center gap-4">
      <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#525252' }}>
        Default Palette
      </p>
      <div className="flex gap-5">
        <ColorSwatch color="#141413" label="Dark" value="hsl(60 3% 8%)" />
        <ColorSwatch color="#f5f4ee" label="Light" value="hsl(60 20% 95%)" />
        <ColorSwatch color="#d97757" label="Primary" value="hsl(18 62% 60%)" />
        <ColorSwatch color="#6a9bcc" label="Secondary" value="hsl(210 45% 61%)" />
        <ColorSwatch color="#e8e6dc" label="Muted" value="hsl(48 16% 89%)" />
        <ColorSwatch color="#c45a3c" label="Destructive" value="hsl(16 53% 50%)" />
      </div>
    </div>

    {/* Divider */}
    <div className="h-px w-full" style={{ backgroundColor: '#1c1c1c' }} />

    {/* Packages */}
    <div className="flex flex-col items-center gap-4">
      <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#525252' }}>
        Packages
      </p>
      <div className="flex w-full flex-col gap-2">
        {[
          { name: '@blacksmith-ui/react', desc: 'Core primitives — layout, inputs, overlays, feedback, data display' },
          { name: '@blacksmith-ui/forms', desc: 'Form fields with Zod validation + React Query hooks' },
          { name: '@blacksmith-ui/auth', desc: 'Login, register, password reset with adapter pattern' },
        ].map((pkg) => (
          <div
            key={pkg.name}
            className="flex flex-col gap-0.5 rounded-lg px-4 py-3"
            style={{ backgroundColor: '#111', border: '1px solid #1c1c1c' }}
          >
            <span className="text-sm font-semibold" style={{ color: '#e5e5e5' }}>{pkg.name}</span>
            <span className="text-xs" style={{ color: '#525252' }}>{pkg.desc}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Divider */}
    <div className="h-px w-full" style={{ backgroundColor: '#1c1c1c' }} />

    {/* Component tags */}
    <div className="flex flex-col items-center gap-3">
      <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#525252' }}>
        Components
      </p>
      <div className="flex flex-wrap justify-center gap-1.5">
        {[
          'Button', 'Input', 'Select', 'Checkbox', 'Switch', 'Card', 'Dialog',
          'Tabs', 'Accordion', 'Toast', 'Tooltip', 'Dropdown', 'Table', 'DataTable',
          'Badge', 'Avatar', 'Calendar', 'DatePicker', 'Slider', 'Sidebar',
          'CommandPalette', 'Chart', 'Carousel', 'CodeBlock', 'FileUpload',
        ].map((name) => (
          <Pill key={name}>{name}</Pill>
        ))}
        <span
          className="rounded-md px-2.5 py-1 text-xs font-medium"
          style={{ color: '#525252' }}
        >
          +35 more
        </span>
      </div>
    </div>

    {/* Footer */}
    <div className="flex flex-col items-center gap-1 pt-2">
      <div className="flex flex-wrap justify-center gap-3">
        {['Accessible', 'Themeable', 'Tree-shakable', 'TypeScript', 'Dark Mode', 'SSR Ready'].map((tag) => (
          <span key={tag} className="text-[11px] font-medium" style={{ color: '#404040' }}>
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-2 text-xs" style={{ color: '#333' }}>
        by Tobi Sholanke
      </p>
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
        { name: 'warm', value: '#F5F5F0' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Welcome>;

export const Default: Story = {};
