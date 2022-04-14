import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/tasks', component: () => import('pages/Tasks.vue'), meta: { requiresAuth: true } },
    { path: '/help', component: () => import('pages/HelpPage.vue') },
    { path: '/set', component: () => import('src/pages/auth/SettingsPage.vue'), meta: { requiresAuth: true } },
    { path: '', component: () => import('src/pages/IndexPage.vue') },],


  },

  // Authentication
  {
    path: '/:beforeEnter(.*)*',
    component: () => import('src/pages/IndexPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
