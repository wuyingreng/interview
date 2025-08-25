import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import { defineConfig } from 'rollup';

export default defineConfig({
  // 开发模式下启用watch
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**'
  },
  input: 'src/main.jsx',
  output: [
    {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: false,
    },
  ],
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    babel({
      presets: ['@babel/preset-react', '@babel/preset-env'],
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    replace({      'process.env.NODE_ENV': JSON.stringify('development'),      preventAssignment: true,    }),    // 生产环境不启用代码压缩    // 如需启用压缩，可添加以下插件并移除注释    // terser(),
    postcss({
      extract: true,
      modules: false,
    }),
    image(),
  ],
});