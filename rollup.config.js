import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: './dist/index.js',
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
    external: ['dotenv/config', 'express', 'mongodb'],
    plugins: [
      commonjs(),
      json(),
      resolve({
        extensions: ['.ts', '.js'],
      }),
      typescript({
        sourceMap: true,
      }),
    ],
  },
];
