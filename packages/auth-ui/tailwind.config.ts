import type { Config } from 'tailwindcss';
import flatuiConfig from '../flatui/tailwind.config';

const config: Config = {
  ...flatuiConfig,
  content: [
    './src/**/*.{ts,tsx}',
    '../flatui/src/**/*.{ts,tsx}',
    '../forms/src/**/*.{ts,tsx}',
  ],
};

export default config;
