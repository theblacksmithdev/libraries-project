import type { Config } from 'tailwindcss';
import flatuiConfig from '../react/tailwind.config';

const config: Config = {
  ...flatuiConfig,
  content: ['./src/**/*.{ts,tsx}'],
};

export default config;
