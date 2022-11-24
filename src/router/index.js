import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Welcome Page',
    component: () => import('../views/WelcomePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
