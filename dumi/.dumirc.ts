import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'data-ui',
  },
  jsMinifier: 'terser'
});
