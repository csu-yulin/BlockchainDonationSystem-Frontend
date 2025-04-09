import {createApp} from 'vue'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from '@/App.vue'
import router from '@/router'
import '@/style/style.css' // 引入 Tailwind 样式

// 创建 Vue 应用实例
const app = createApp(App)

// 配置 Pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 注册插件
app.use(pinia)       // 状态管理
app.use(router)      // 路由

// 挂载应用
app.mount('#app')
