import {createRouter, createWebHistory} from 'vue-router'
import {useUserStore} from '@/stores/user'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/project-list',
    name: 'ProjectList',
    component: () => import('@/views/ProjectList.vue'),
    meta: {requiresAuth: true}, // 需要登录
  },
  {
    path: '/project/:id',
    name: 'ProjectDetail',
    component: () => import('@/views/ProjectDetail.vue'),
    meta: {requiresAuth: true},
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register/Individual',
    name: 'IndividualRegister',
    component: () => import('@/views/IndividualRegister.vue'),
  },
  {
    path: '/register/org',
    name: 'OrgRegister',
    component: () => import('@/views/OrgRegister.vue'),
  },
  {
    path: '/user-center/individual',
    name: 'IndividualProfileEdit',
    component: () => import('@/views/IndividualProfileEdit.vue'),
    meta: {requiresAuth: true, role: 'INDIVIDUAL'}
  },
  {
    path: '/user-center/org',
    name: 'OrgProfileEdit',
    component: () => import('@/views/OrgProfileEdit.vue'),
    meta: {requiresAuth: true, role: 'ORG'}
  },
  {
    path: '/hash-verification/:transactionHash?',
    name: 'HashVerification',
    component: () => import('@/views/HashVerification.vue'),
    meta: {requiresAuth: true},
  },
  {
    path: '/voucher/:projectId',
    name: 'VoucherDetail',
    component: () => import('@/views/VoucherDetail.vue')
  },
  {
    path: '/org/dashboard',
    name: 'OrgDashboard',
    component: () => import('@/views/OrgDashboard.vue'),
    meta: {requiresAuth: true, role: 'ORG'} // 限制公益组织访问
  },
  {
    path: '/org/assistance/review',
    name: 'AssistanceReview',
    component: () => import('@/views/AssistanceReview.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  // 如果目标路由需要认证且用户未登录，则跳转到登录页
  if (to.meta.requiresAuth && !userStore.userId) {
    // 记录目标路径
    next({path: '/login', query: {redirect: to.fullPath}})
  } else if (to.meta.role && to.meta.role !== userStore.role) {
    next('/403') // 或重定向到合适的页面
  } else {
    next()
  }
})

export default router
