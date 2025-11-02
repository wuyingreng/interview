import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools()
  ],
  server: {
     host: '0.0.0.0',
    port: 8081, // 修改为新的端口号
    // 其他配置...
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.ts', '.tsx', '.json', '.vue'],
    mainFields: ['module', 'jsnext:main', 'jsnext'],
    conditions: ['import', 'module', 'browser', 'default']
  },
})
