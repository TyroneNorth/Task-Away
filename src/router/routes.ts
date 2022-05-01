import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
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

      { path: '', name: 'login', component: IndexPage },
      { path: '/email-confirmation', component: EmailConfirmation },
      {
        path: '/forgot-password',
        component: PasswordResetForm,
        beforeEnter: (to) => {
          // only allow navigation to reset password
          // if we actually clicked a proper reset password link
          // which provides the type=recovery hash key
          if (!to.hash.includes('type=recovery')) {
            if (supabase.auth.user()) return '/user/tasks';
            return '';
          }
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'not-found',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

const userRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    component: UserLayout,
    name: 'home',
    meta: {
      requiresAuth: true,
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

const router = createRouter({
  history: createWebHistory(process.env.VITE_SUPABASE_URL),
  routes: [...routes, ...userRoutes],
});

supabase.auth.onAuthStateChange((event) => {
  console.log(event);
  if (event == 'SIGNED_OUT') return router.push('');
  if (event == 'SIGNED_IN') {
    const routeName = router.currentRoute.value.name;
    console.log('routeName', routeName);
  }
});

router.beforeEach((to) => {
  supabase.auth.onAuthStateChange((user) => {
    if (!user) {
      to.name = 'login';
    }
  });
});

export default routes.concat(userRoutes);
