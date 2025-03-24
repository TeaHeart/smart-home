import { createRouter, createWebHashHistory } from 'vue-router'
import { storeToRefs } from 'pinia'
import useAuthStore from '../stores/auth.js'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/auth',
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue'),
    },
    {
      path: '/overview',
      name: 'overview',
      component: () => import('../views/OverviewView.vue'),
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserView.vue'),
    },
    {
      path: '/device',
      name: 'device',
      component: () => import('../views/DeviceView.vue'),
    },
    {
      path: '/device-monitor',
      name: 'device-monitor',
      component: () => import('../views/DeviceMonitorView.vue'),
    },
    {
      path: '/device-mock',
      name: 'device-mock',
      component: () => import('../views/DeviceMockView.vue'),
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('../views/MessageView.vue'),
    },
    {
      path: '/message-databoard',
      name: 'message-databoard',
      component: () => import('../views/MessageDataBoardView.vue'),
    },
    {
      path: '/rule',
      name: 'rule',
      component: () => import('../views/RuleView.vue'),
    },
    {
      path: '/rule-designer',
      name: 'rule-designer',
      component: () => import('../views/RuleDesingerView.vue'),
      children: [
        {
          path: ':id',
          component: () => import('../views/RuleDesingerView.vue'),
        },
      ],
    },
    {
      path: '/log',
      name: 'log',
      component: () => import('../views/LogView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export async function setupRouterGuards() {
  const authStore = useAuthStore()
  const { me } = authStore
  const { loginUser } = storeToRefs(authStore)
  await me()
  router.beforeEach((to, from, next) => {
    console.log(from.path, '=>', to.path)
    const isAuthenticated = loginUser.value.username
    if (to.path !== '/auth' && !isAuthenticated) {
      next('/auth')
    } else if (to.path === '/auth' && isAuthenticated) {
      next('/overview')
    } else {
      next()
    }
  })
}

export default router
