import { createApp } from 'vue'
// 1. 不再直接从 'pinia' 引入 createPinia
// import { createPinia } from 'pinia' 

// 引入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import pinia from './store' // 2. 而是从我们创建的 index.js 文件中引入 pinia 实例

// 引入全局样式
import './assets/styles/main.css'

const app = createApp(App)

// 全局注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 3. 使用引入的 pinia 实例
app.use(pinia) 
app.use(router)
app.use(ElementPlus)

app.mount('#app')

