import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/', name: 'Home', component: () => import('@/views/Home.vue'),
  },
  {path: '/project-list', name: 'ProjectList', component: () => import('@/views/ProjectList.vue')},
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
