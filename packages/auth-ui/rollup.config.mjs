import path from 'path';
import { fileURLToPath } from 'url';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import alias from '@rollup/plugin-alias';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist/esm',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      exports: 'named',
    },
  ],
  onwarn(warning, warn) {
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('"use client"')) return;
    if (warning.code === 'UNRESOLVED_IMPORT') return;
    warn(warning);
  },
  plugins: [
    alias({
      entries: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
      ],
    }),
    peerDepsExternal(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
      declarationMap: false,
      outDir: undefined,
    }),
    terser({
      compress: {
        pure_getters: true,
        passes: 2,
      },
      format: {
        comments: false,
      },
    }),
  ],
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    '@flatui/react',
    '@flatui/forms',
    'zod',
    'lucide-react',
    'clsx',
    'tailwind-merge',
  ],
};
