import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cmd-panel',
      component: () => import('../views/CmdPanel.vue'),
    },
    {
      path: '/generator',
      name: 'generator',
      component: () => import('../views/Generator.vue'),
    },
    {
      path: '/connection',
      name: 'connection',
      component: () => import('../views/Connection.vue'),
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../views/Setting.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
    },
  ],
})

export default router
