import type { RouteRecordRaw } from 'vue-router'
import DashboardLayout from '../components/layout/DashboardLayout.vue'
import Settings from '../components/Settings.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/settings',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'settings',
        component: Settings,
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
]

export default routes
