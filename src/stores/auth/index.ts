// Pinia User Store for Authoriation and Authentication
import supabase from 'src/boot/supabase';
import { Session, Provider } from '@supabase/gotrue-js/dist/main/lib/types';
import { defineStore } from 'pinia';
import { Credentials } from 'src/components/models';
import { ref } from 'vue';
import { Notify } from 'quasar';
export const userSession = ref<Session | null>(null);

export const useUserStore = defineStore('auth', {
  state: () => ({
    /** @type {unknown} */
    user: supabase.auth.user(),
    /** @type {unknown} */
    session: supabase.auth.session(),
  }),

  getters: {
    /**
     * Retrieve the current user
     * @returns {unknown}
     */
    getUser() {
      this.user = supabase.auth.user();
    },
    /**
     * Retrieve the current session
     * @returns {unknown}
     */
    getSession() {
      this.session = supabase.auth.session();
    },
  },

  actions: {
    /*
     * Handles user login via email + password into a supabase session.
     * If not password is empty, it will send a magic link to the users email address.
     */
    async handleLogin(credentials: Credentials) {
      try {
        const { error, user, session } = await supabase.auth.signIn({
          email: credentials.email,
          password: credentials.password,
        });

        if (error) {
          Notify.create({
            message: error.message,
            color: 'negative',
            timeout: 5000,
          });
        } else {
          Notify.create({
            message: 'Successfully logged in!',
            color: 'positive',
            timeout: 2000,
          });
        }

        console.log('user', user);
        // update store
        this.user = user;
        this.session = session;
      } catch (error) {
        console.error('Error thrown:', error);
        alert(error);
        return error;
      }
      return this.user;
    },

    /*
     * Handles signup provided a valid credentials object.
     */
    async handleSignup(credentials: Credentials) {
      try {
        const { email, password } = credentials;
        // prompt user if they have not filled populated their credentials
        if (!email || !password) {
          Notify.create({
            message: 'Please provide both your email and password.',
            color: 'negative',
            timeout: 5000,
          });
          return;
        }
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          Notify.create({
            message: error.message,
            color: 'negative',
            timeout: 5000,
          });
          console.error(error, error.message);
          return;
        } else {
          Notify.create({
            message:
              'Signup successful, confirmation mail should be sent soon!',
            color: 'positive',
            timeout: 2000,
          });
        }
      } catch (err) {
        alert('Fatal error signing up');
        console.error('signup error', err);
      }
    },

    /**
     * Handles signup via Third Party Login.
     * https://supabase.com/docs/guides/auth#third-party-logins
     *
     */
    async handleOAuthLogin(provider: Provider) {
      const { error } = await supabase.auth.signIn({ provider });
      if (error) console.error('Error: ', error.message);
    },

    /**
     * Handles password reset. Will send an email to the given email address.
     */
    async handlePasswordReset(credentials: Credentials) {
      if (!credentials.email) {
        window.alert('Email address is required.');
      } else {
        const { error } = await supabase.auth.api.resetPasswordForEmail(
          credentials.email
        );
        if (error) {
          Notify.create({
            message: error.message,
            color: 'negative',
            timeout: 5000,
          });
        } else {
          Notify.create({
            message:
              'Password reset email sent, please check your email for instructions.',
            color: 'positive',
            timeout: 2000,
          });
        }
      }
    },

    async handleUpdateUser(credentials: Credentials) {
      try {
        const { error } = await supabase.auth.update(credentials);
        if (error) {
          alert('Error updating user info: ' + error.message);
        } else {
          alert('Successfully updated user info!');
          window.location.href = '/';
        }
      } catch (error) {
        alert('Error updating user info: ' + error);
      }
    },

    /**
     * Handles logging a user out of a supabase session
     */
    async handleLogout() {
      console.log('logging out');
      try {
        const { error } = await supabase.auth.signOut();

        if (error) {
          Notify.create({
            message: error.message,
            color: 'negative',
          });
          console.error('Error', error);
          return;
        }

        Notify.create({
          message: 'Successfully logged out!',
          color: 'positive',
        });
      } catch (err) {
        alert('Unknown error signing out');
        console.error('Error', err);
      }
    },
  },
});
