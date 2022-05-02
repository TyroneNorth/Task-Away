import { RouteRecordRaw } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';
import UserLayout from 'layouts/UserLayout.vue';
import Tasks from 'pages/Tasks.vue';
import HelpPage from 'pages/HelpPage.vue';
import SettingsPage from 'src/pages/auth/SettingsPage.vue';
import IndexPage from 'src/pages/IndexPage.vue';
import EmailConfirmation from 'src/pages/auth/EmailConfirmation.vue';
import PasswordResetForm from 'src/pages/auth/PasswordResetForm.vue';
import SignUpPage from 'src/pages/auth/SignUpPage.vue';
import supabase from 'src/boot/supabase';
import { Notify } from 'quasar';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: MainLayout,

    children: [
      { path: '/help', name: 'help', component: HelpPage },

      { path: '', name: 'login', component: IndexPage },
      { path: '/register', name: 'register', component: SignUpPage },

      {
        path: '/reset-form',
        name: 'reset-form',
        component: PasswordResetForm,
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
    name: 'home',
    component: UserLayout,

    children: [
      {
        path: '/user/settings',
        name: 'settings',
        component: SettingsPage,
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
          //redireect to login

          if (!supabase.auth.session() && next.name !== 'login') {
            Notify.create({
              message: 'You must be logged in to access this page',
              color: 'negative',
              timeout: 5000,
            });
            return next('/');
          } else {
            next();
          }
        },
      },
      {
        path: '/user/tasks',
        name: 'tasks',
        component: Tasks,
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
          if (
            supabase.auth.onAuthStateChange((event, session) => {
              if (session) {
                console.log('event', event);
                console.log('session', session);
              }
            })
          ) {
            next();
          } else if (
            supabase.auth.onAuthStateChange(() => {
              Notify.create({
                message: 'You must be logged in to access this page',
                color: 'negative',
                timeout: 5000,
              });
              next('/');
            })
          ) {
            next();
          }
        },
      },
      {
        path: '/email-confirmation',
        name: 'email-confirmation',
        component: EmailConfirmation,

        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
          //redireect to login
          if (!supabase.auth.session()) {
            Notify.create({
              message:
                'Did you already sign up?, try your inbox including spam folder or sign up again',
              color: 'negative',
              timeout: 7000,
            });
            return next('/');
          } else {
            next();
          }
        },
      },
      {
        path: '/forgot-password',
        component: PasswordResetForm,
        beforeEnter: (to, from, next) => {
          //redireect to login
          if (!supabase.auth.session()) {
            Notify.create({
              message: 'Your not logged in, use this page instead',
              color: 'negative',
              timeout: 5000,
            });
            return next('/reset-form');
          } else {
            next();
          }
        },
      },
      {
        path: '/user/help',
        name: 'user-help',
        component: HelpPage,
        meta: { requiresAuth: true },
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

export default routes.concat(userRoutes);
