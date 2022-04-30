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

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const $q = useQuasar();

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

  const getCurrentUser = () =>
    new Promise((resolve, reject) => {
      const removeListener = onAuthStateChanged(
        getAuth(),
        (user) => {
          removeListener();
          resolve(user);
        },
        reject
      );

      Router.beforeEach(async (to, from, next) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const user = await getCurrentUser();
        if (to.matched.some((record) => record.meta.requiresAuth)) {
          if (user) {
            next('/tasks');
          } else {
            next('/');
          }
        } else if (to.matched.some((record) => record.meta.requiresNoAuth)) {
          if (!user) {
            next();
          } else {
            next('/');
          }
        } else if (to.matched.some((record) => record.meta.requiresVerify)) {
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
    });

  return Router;
});
