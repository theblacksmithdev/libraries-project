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
