import Firebase from 'firebase/app'
import 'firebase/auth'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default {
  namespaced: true,

  state: {
    user: {}
  },

  getters: {
    user(state: { user: any }) {
      return state.user
    },

    isAuthenticated(state: { user: any }) {
      return !!state.user
    }
  },

  mutations: {
    SET_USER(state: { user: any }, payload: any) {
      const user = payload
      state.user = user
    },

    RESET_USER(state: { user: null }) {
      state.user = null
    }
  },

  actions: {
    async signIn({ commit }: any, payload: { email: string; password: string }) {
      const email = payload.email
      const password = payload.password
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, email, password)
        .then((user: any) => {
          commit('SET_USER', user)
          return user;
        })
        .catch((error: any) => {
          throw error
        })
    },

    async signOut({ commit }: any) {
      const auth = getAuth();
      await auth.signOut()
        .then(() => {
          commit('SET_USER', {})
        })
    }
  }
}
