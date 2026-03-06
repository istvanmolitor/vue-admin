import type { RouteRecordRaw } from 'vue-router';

const adminRoutes: RouteRecordRaw[] = [
  // Auth routes
  {
    path: '/admin/login',
    name: 'admin.login',
    component: () => import('@user/views/auth/Login.vue'),
    meta: { requiresAuth: false, guestOnly: true }
  },
  {
    path: '/admin/forgot-password',
    name: 'admin.forgot-password',
    component: () => import('@user/views/auth/ForgotPassword.vue'),
    meta: { requiresAuth: false, guestOnly: true }
  },
  {
    path: '/admin/profile',
    name: 'admin.profile',
    component: () => import('@user/views/auth/Profile.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/change-password',
    name: 'admin.change-password',
    component: () => import('@user/views/auth/ChangePassword.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/logout',
    name: 'admin.logout',
    component: { template: '' },
    meta: { requiresAuth: false }
  },
  // Dashboard
  {
    path: '/admin',
    name: 'admin.dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  }
];

export default adminRoutes;
