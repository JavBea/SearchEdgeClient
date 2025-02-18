// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import About from '../components/About.vue'
import ChatPage from '../components/ChatPage.vue'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'

const routes = [
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
    path: '/register',  // Register 页面路径
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/login',  // login 页面路径
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/',  // login 页面路径
    name: 'Home',
    component: LoginPage,
  }
]

const router = createRouter({
  history: createWebHistory(),  // 使用 HTML5 history 模式
  routes  // 路由配置
})


// 路由守卫
// router.beforeEach((to, from, next) => {
//   // 如果是通过手动输入 URL 访问且路径不是根路径，跳转到根路径
//   if (!router.app.$data.isCodeRedirect && to.path !== '/') {
//     next('/');
//   } else {
//     next();  // 允许访问根路径和 chat 页面
//   }
// });


export default router
