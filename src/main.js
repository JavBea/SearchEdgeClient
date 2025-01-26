// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

// main.js
import { createApp } from 'vue'
import App from './App.vue'

// 导入 router 配置
import router from './router' 

// 导入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//导入Pinia
import { createPinia } from 'pinia'


const pinia = createPinia()
const app = createApp(App)


app.use(router)  // 使用路由
app.use(pinia)  // 使用 pinia
app.use(ElementPlus)  // 使用 ElementPlus
app.mount('#app')  // 挂载到 DOM 元素
