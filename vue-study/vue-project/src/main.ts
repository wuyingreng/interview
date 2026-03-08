import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
// 导入 Toast 组件
import Toast from './components/Global/AppComponent/Toast.vue'
const app = createApp(App)

// ==========================================
// 应用配置区域
// ⚠️ 重要：所有配置必须在 app.mount() 之前完成！
// ==========================================

// 配置应用级错误处理器
app.config.errorHandler = (err, instance, info) => {
  console.error('========== 应用级错误捕获 ==========')
  console.error('错误对象:', err)
  console.error('组件实例:', instance)
  console.error('错误信息:', info)
  console.error('=====================================')
}

// 全局注册 Toast 组件
// 注册后可以在任何组件中直接使用 <Toast />，无需导入
app.component('Toast', Toast)

// 使用插件
app.use(createPinia())
app.use(router)
app.use(ElementPlus)

// ==========================================
// 挂载应用
// ✅ 确保所有配置完成后才挂载！
// ==========================================
app.mount('#app')
