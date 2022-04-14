import supabase from 'src/boot/supabase';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export default {
  namespaced: true,

  state: {
    user: supabase.auth.user(),
  },

  getters: {
    user(state: { user: any }) {
      return state.user;
    },

    isAuthenticated(state: { user: any }) {
      return !!state.user;
    },
  },

  mutations: {
    SET_USER(state: { user: any }, payload: any) {
      const user = payload;
      state.user = user;
    },

    RESET_USER(state: { user: null }) {
      state.user = null;
    },
  },

  actions: {
    login(email: any, password: any) {
      const $q = useQuasar();
      const $router = useRouter();
      const { } = supabase.auth.signIn({
        email: email,
        password: password,
      }).then(() => {
        $q.notify({
          message: 'User logged in successfully',
          color: 'positive',
          icon: 'checkmark_circle_outline',
          position: 'top',
        });
        console.log('User created');
        $router.push('/tasks');
      }
      ).catch((error: string) => {
        $q.notify({
          message: 'Error logging in',
          color: 'negative',
          icon: 'close_circle_outline',
          position: 'top',
        });
        console.log(error);
      }
      );

    },

    async signOut({ commit }: any) {
      await supabase.auth.signOut().then(() => {
        commit('SET_USER', {});
      });
    },

    async signUp({ commit }: any, payload: { email: any; password: any }) {
      const email = payload.email;
      const password = payload.password;

      await supabase.auth
        .signUp(email, password)
        .then((user: any) => {
          commit('SET_USER', user);
          return user;
        })
        .catch((error: any) => {
          throw error;
        });
    },
  },
};
