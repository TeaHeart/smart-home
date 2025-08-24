import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/index.js'
import { storeToRefs } from 'pinia'

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
      path: '/demo',
      name: 'demo',
      component: () => import('../views/DemoView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const { loginUser } = storeToRefs(authStore)
  console.log('router', from.path, '=>', to.path)
  const isAuthenticated = loginUser.value.username
  if (to.path !== '/auth' && !isAuthenticated) {
    next('/auth')
  } else if (to.path === '/auth' && isAuthenticated) {
    next('/overview')
  } else {
    next()
  }
})

export default router
