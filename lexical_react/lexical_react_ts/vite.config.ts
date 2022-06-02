

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'path';
import path from 'path';
import fs from 'fs';
import {replaceCodePlugin} from 'vite-plugin-replace';
import babel from '@rollup/plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    replaceCodePlugin({
      replacements: [
        {
          from: /__DEV__/g,
          to: 'true',
        },
      ],
    }),
    babel({
      babelHelpers: 'bundled',
      babelrc: false,
      configFile: false,
      exclude: '/**/node_modules/**',
      extensions: ['jsx', 'js', 'ts', 'tsx', 'mjs'],
      plugins: [
        '@babel/plugin-transform-flow-strip-types',
        [
          require('./scripts/error-codes/transform-error-messages'),
          {
            noMinify: true,
          },
        ],
      ],
      presets: ['@babel/preset-react'],
    }),
    react(),
  ],
  resolve: {
    alias: {},
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: new URL('./index.html', import.meta.url).pathname,
      },
    },
  },
});
