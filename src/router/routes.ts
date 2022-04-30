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
    beforeEnter(to, from) {
      if (!supabase.auth.user() && to.path !== '') {
        Notify.create({
          message: 'Please login to access this page',
          color: 'negative',
          timeout: 5000,
        });
        console.log(
          'Authenticaton error, user is not logged in or does not have correct permission to access resource. Routing from ',
          from
        );
        return {
          name: '',
          params: { pathMatch: to.path.split('/'.slice(1)) },
          query: to.query,
          hash: to.hash,
        };
      } else {
        return { message: 'You are already logged in!' };
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
