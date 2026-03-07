import type { Config } from 'tailwindcss';
import blacksmithConfig from '../react/tailwind.config';

const config: Config = {
  ...blacksmithConfig,
  content: [
    './src/**/*.{ts,tsx}',
    '../react/src/**/*.{ts,tsx}',
    '../forms/src/**/*.{ts,tsx}',
  ],
};

export default config;
