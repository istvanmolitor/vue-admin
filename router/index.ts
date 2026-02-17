import type { RouteRecordRaw } from 'vue-router'

const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin/settings',
    name: 'admin-settings',
    component: () => import('../views/Settings.vue'),
    meta: { requiresAuth: true }
  },
]

export default adminRoutes
