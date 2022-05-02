// Pinia User Store for Authoriation and Authentication
import supabase from 'src/boot/supabase';
import { Session, Provider } from '@supabase/gotrue-js/dist/main/lib/types';
import { defineStore } from 'pinia';
import { Credentials, User } from 'src/components/models';
import { ref } from 'vue';
import { Notify } from 'quasar';
export const userSession = ref<Session | null>(null);

export const useUserStore = defineStore('auth', {
  state: () => ({
    /** @type {unknown} */
    user: ref(<User>{}),
    /** @type {unknown} */
    //session: ref(<Session>{}),
    /** @type {bool} */
    is_loggedIn: ref(false),
  }),

  getters: {
    /**
     * Retrieve the current user from supabase await the response
     * @returns {unknown}
     */
    getUser() {
      const temp = supabase.auth.user();
      //map user data to our user model
      if (temp) {
        this.is_loggedIn = true;
        this.user = {
          id: temp.id,
          email: temp.email,
          role: temp.role,
          email_confirmed_at: temp.email_confirmed_at,
          phone: temp.phone,
          confirmed_at: temp.confirmed_at,
          last_sign_in_at: temp.last_sign_in_at,
          updated_at: temp.updated_at,
        };
      }
    },
    /**
     * Retrieve the current session
     * @returns {unknown}
     */
  },

  actions: {
    /*
     * Handles user login via email + password into a supabase session.
     * If not password is empty, it will send a magic link to the users email address.
     */
    async handleLogin(credentials: Credentials) {
      try {
        const { error, user } = await supabase.auth.signIn({
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
        this.is_loggedIn = true;
        this.user = {
          id: user?.id,
          email: user?.email,
          role: user?.role,
          email_confirmed_at: user?.email_confirmed_at,
          phone: user?.phone,
          confirmed_at: user?.confirmed_at,
          last_sign_in_at: user?.last_sign_in_at,
          updated_at: user?.updated_at,
        };
      } catch (error) {
        console.error('Error thrown:', error);
        alert(error);
        return error;
      }
    },

    /*
     * Handles signup provided a valid credentials object.
     */
    async handleSignup(credentials: Credentials) {
      try {
        // prompt user if they have not filled populated their credentials

        const { user, error } = await supabase.auth.signUp({
          email: credentials.email,
          password: credentials.password,
        });
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
        this.is_loggedIn = true;
        this.user = {
          id: user?.id,
          email: user?.email,
          role: user?.role,
          email_confirmed_at: user?.email_confirmed_at,
          phone: user?.phone,
          confirmed_at: user?.confirmed_at,
          last_sign_in_at: user?.last_sign_in_at,
          updated_at: user?.updated_at,
        };
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
      const { user, error } = await supabase.auth.signIn({ provider });
      if (error) console.error('Error: ', error.message);
      else this.is_loggedIn = true;
      this.user = {
        id: user?.id,
        email: user?.email,
        role: user?.role,
        email_confirmed_at: user?.email_confirmed_at,
        phone: user?.phone,
        confirmed_at: user?.confirmed_at,
        last_sign_in_at: user?.last_sign_in_at,
        updated_at: user?.updated_at,
      };
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
          this.user = {
            email: credentials.email,
          };
          alert('Successfully updated user info!');
          window.location.href = '/settings';
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
        this.is_loggedIn = false;
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
