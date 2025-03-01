import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cmd-panel',
      component: () => import('../views/CmdPanel.vue'),
    },
    {
      path: '/connection',
      name: 'connection',
      component: () => import('../views/Connection.vue'),
    },
    {
      path: '/logview',
      name: 'log-view',
      component: () => import('../views/LogView.vue'),
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../views/Setting.vue'),
    },
  ],
})

export default router
