import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { useQuasar } from 'quasar';
import routes from './routes';
import userRoutes from './routes';
import supabase from 'src/boot/supabase';
import { ref } from 'vue';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const isAuthenticated = ref(false);
  if (supabase.auth.user()?.role === 'authenticated') {
    isAuthenticated.value = true;
  }

  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  function getCurrentUser() {
    return supabase.auth.user();
  }

  Router.beforeEach(async (to, from, next) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await getCurrentUser();
    if (to.matched.some((userRoutes) => userRoutes.meta.requiresAuth)) {
      if (user) {
        next('/tasks');
      } else {
        next('/');
      }
    } else if (
      to.matched.some((userRoutes) => userRoutes.meta.requiresNoAuth)
    ) {
      if (!user) {
        next();
      } else {
        next('/');
      }
    } else if (
      to.matched.some((userRoutes) => userRoutes.meta.requiresVerify)
    ) {
      if (user) {
        next();
      } else {
        next('/');
      }
    } else {
      console.log('else');
      next();
    }
  });
  return Router;
});
