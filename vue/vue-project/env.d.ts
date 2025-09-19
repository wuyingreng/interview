/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 支持文件夹导入
declare module '@/components/*' {
  const component: any
  export default component
}

declare module '../components/*' {
  const component: any
  export default component
}
