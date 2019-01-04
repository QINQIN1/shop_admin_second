// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件：
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import Users from '@/components/users/Users'

// 安装插件
 Vue.use(VueRouter)

// 创建路由实例并导出
const router = new VueRouter({
  routes: [{
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
      path: '/home',
      component: Home,
      name: 'home',
      children:[{
        path:'/users',
        component:Users
      }]
    }
  ]
})
// 导航守卫
// 全局导航守卫，任何一个路由的切换都会经过全局导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
    return
  }

  const token = localStorage.getItem('token')
  if (token) {
    // 登录
    next()
  } else {
    // 没有登录
    next('/login')
  }
})

export default router
