import React, { useEffect } from 'react';
import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      description: 'Toggle light/dark theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
          { value: 'side-by-side', icon: 'sidebyside', title: 'Side by side' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;

      useEffect(() => {
        document.documentElement.classList.remove('dark', 'light');
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        }
      }, [theme]);

      if (theme === 'side-by-side') {
        return (
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div
              className="light rounded-lg border p-6"
              style={{ background: 'hsl(60 20% 95%)', flex: 1 }}
            >
              <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Light
              </div>
              <Story />
            </div>
            <div
              className="dark rounded-lg border p-6"
              style={{ background: 'hsl(48 6% 15%)', flex: 1 }}
            >
              <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Dark
              </div>
              <Story />
            </div>
          </div>
        );
      }

      return <Story />;
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    docs: {
      source: {
        language: 'tsx',
      },
    },
  },
};

export default preview;
