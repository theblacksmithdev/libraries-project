import type { Config } from 'tailwindcss';
import blacksmithConfig from '../react/tailwind.config';

const config: Config = {
  ...blacksmithConfig,
  content: ['./src/**/*.{ts,tsx}'],
};

export default config;
