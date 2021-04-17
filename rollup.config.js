import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/index.ts',
  context: 'this',
  output: [
    {
      entryFileNames: 'simplFactory.min.js',
      dir: 'dist',
      format: 'cjs',
      exports: 'auto',
      plugins: [
        terser()
      ]
    }, {
      entryFileNames: 'simplFactory.js',
      dir: 'dist',
      format: 'cjs',
      exports: 'auto'
    }
  ],
  plugins: [
    commonjs(),
    typescript(),
    nodeResolve()
  ]
};
