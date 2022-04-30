import { RouteRecordRaw } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';
import UserLayout from 'layouts/UserLayout.vue';
import Tasks from 'pages/Tasks.vue';
import HelpPage from 'pages/HelpPage.vue';
import SettingsPage from 'src/pages/auth/SettingsPage.vue';
import IndexPage from 'src/pages/IndexPage.vue';
import supabase from 'src/boot/supabase';
import { Notify } from 'quasar';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '/help', component: HelpPage },

      { path: '', component: IndexPage },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

const userRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    component: UserLayout,
    meta: {
      requiresAuth: true,
    },
    beforeEnter(to, from, next) {
      const currentUser = supabase.auth.user();
      const requiresAuth = to.matched.some(
        (record) => record.meta.requiresAuth
      );
      if (requiresAuth && !currentUser) {
        Notify.create({
          message: 'You must be logged in to view this page',
          color: 'negative',
        });
        next('/');
      } else {
        next();
      }
    },

    children: [
      {
        path: '/user/settings',
        component: SettingsPage,
        meta: { requiresAuth: true },
      },
      {
        path: '/user/tasks',
        component: Tasks,
        meta: { requiresAuth: true },
      },
      {
        path: '/user/help',
        component: HelpPage,
        meta: { requiresAuth: true },
      },
    ],
  },
];

export default routes.concat(userRoutes);
