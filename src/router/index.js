// router/index.js
import { createRouter, createWebHistory } from 'vue-router'  // Vue 3 用 createRouter
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import ChatPage from '../components/ChatPage.vue'
import LoginPage from '../components/LoginPage.vue'

const routes = [
  {
    path: '/',  // 根路径
    name: 'HomePage',
    component: Home
  },
  {
    path: '/about',  // About 页面路径
    name: 'AboutPage',
    component: About
  },
  {
    path: '/chat',  // Chat 页面路径
    name: 'ChatPage',
    component: ChatPage
  },
  {
    path: '/login',  // login 页面路径
    name: 'LoginPage',
    component: LoginPage
  }
]

const router = createRouter({
  history: createWebHistory(),  // 使用 HTML5 history 模式
  routes  // 路由配置
})

export default router
