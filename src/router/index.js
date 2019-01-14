// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件：
import Login from '@/components/login/Login'
import NotFound from '@/components/404/NotFound'

// 修改为按需加载的方式
const Home = () => import('@/components/home/Home')
const Users = () => import('@/components/users/Users')
const Roles = () => import('@/components/roles/Roles')
const Rights = () => import('@/components/rights/Rights')
const Categories = () => import('@/components/categories/Categories')
const Goods = () => import('@/components/goods/Goods')
const GoodsAdd = () => import('@/components/goods-add/GoodsAdd')
// import Home from '@/components/home/Home'
// import Users from '@/components/users/Users'
// import Roles from '@/components/roles/Roles'
// import Rights from '@/components/rights/Rights'
// import Categories from '@/components/categories/Categories'
// import Goods from '@/components/goods/Goods'
// import GoodsAdd from '@/components/goods-add/GoodsAdd'

// 安装插件
Vue.use(VueRouter)

// 创建路由实例并导出
const router = new VueRouter({
  routes: [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  {
    path: '/home',
    component: Home,
    name: 'home',
    children: [{
      path: '/users',
      component: Users
    },
    {
      path: '/roles',
      component: Roles
    },
    {
      path: '/rights',
      component: Rights
    },
    {
      path: '/categories',
      component: Categories
    },
    {
      path: '/goods/:page?',
      component: Goods
    },
    {
      path: '/goods-add',
      component: GoodsAdd
    }
    ]
  },
  {
    path: '*',
    component: NotFound
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
