import { RouteRecordRaw } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';
import UserLayout from 'layouts/UserLayout.vue';
import Tasks from 'pages/Tasks.vue';
import HelpPage from 'pages/HelpPage.vue';
import SettingsPage from 'src/pages/auth/SettingsPage.vue';
import IndexPage from 'src/pages/IndexPage.vue';
import EmailConfirmation from 'src/pages/auth/EmailConfirmation.vue';
import PasswordResetForm from 'src/pages/auth/PasswordResetForm.vue';
import supabase from 'src/boot/supabase';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,

    children: [
      { path: '/help', component: HelpPage },

      { path: '', component: IndexPage },
      { path: '/email-confirmation', component: EmailConfirmation },
      {
        path: '/forgot-password',
        component: PasswordResetForm,
        beforeEnter(to, from, next) {
          supabase.auth.onAuthStateChange((user) => {
            const currentUser = user;

            if (currentUser) next();
            else if (!currentUser) next('');
            else next();
          });
        },
      },
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
      supabase.auth.onAuthStateChange((user) => {
        const currentUser = user;
        const requiresAuth = to.matched.some(
          (record) => record.meta.requiresAuth
        );
        if (requiresAuth && !currentUser) next('');
        else if (!requiresAuth && currentUser) next('/user');
        else next();
      });
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
