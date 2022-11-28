import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Welcome Page',
    component: () => import('../views/WelcomePage.vue')
  },
  {
    path: '/register',
    name: 'Register Page',
    component: () => import('../views/RegisterPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  hashbang: false,
  routes
})

export default router
