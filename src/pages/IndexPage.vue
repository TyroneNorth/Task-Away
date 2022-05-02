<template>
  <q-page class="row items-center justify-evenly">
    <settings-page v-if="user === null" />
    <template v-else>
      <div class="col-md-5">

        <q-card class="q-pa-lg">
          <h4>Login</h4>


          <div class="q-mb-md">
            <q-item-label class="form-label">Email</q-item-label>
            <q-input v-model="properties.email" filled type="email" />
          </div>
          <div class="q-mb-md">
            <q-item-label class="form-label">Password</q-item-label>
            <q-input v-model="properties.password" filled :type="isPwd ? 'text' : 'password'">
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer" @click="isPwd = !isPwd">
                  <q-tooltip>
                    <span>{{ isPwd ? 'Hide' : 'Show' }}</span>
                  </q-tooltip>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="row q-gutter-md">

            <q-card-actions>
              <q-btn color="primary" to="/user/tasks" v-model="properties.email" @click="handleSignIn">

                <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">Log In</q-tooltip>
                Log In

              </q-btn>

              <q-btn to="/register">
                <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">Register</q-tooltip>
                Sign Up
              </q-btn>
            </q-card-actions>



          </div>
          <div class="q-mt-md">
            <a class="cursor-pointer  " @click="show = true">
              <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">Reset Password</q-tooltip>
              Forgot Password?
            </a>
          </div>
        </q-card>

        <div>
          <q-dialog v-model="show">
            <q-card>
              <q-card-section>
                <div class="text-h6">Password Reset Link</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                  <q-input filled v-model="properties.email" label="Email" hint="Email associated with account"
                    lazy-rules :rules="[val => val && val.length > 0 || 'Cannot be blank!']" />





                  <div>
                    <q-btn @click="handleReset" label="Submit" type="submit" color="primary" />
                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                  </div>
                </q-form>
              </q-card-section>

              <q-card-actions align="left" class="text-primary">

                <q-btn flat label="Close" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

        </div>

      </div>
    </template>
  </q-page>
</template>

<script setup lang="ts">
import SettingsPage from './auth/SettingsPage.vue';

import { reactive, ref } from 'vue';
import { useUserStore } from 'src/stores/auth';
import supabase from 'src/boot/supabase';

const show = ref(false);
const userStore = useUserStore();

const user = reactive({
  id: supabase.auth.user()?.id,
  email: supabase.auth.user()?.email,
})


const properties = reactive({
  email: '',
  password: '',

});

const isPwd = ref(false);





const handleSignIn = () => {

  userStore.handleLogin(properties);
}

const handleReset = () => {
  userStore.handlePasswordReset(properties);
}

function onSubmit() {

  show.value = false;
  properties.email = '';

}

function onReset() {

  properties.email = '';
}




</script>
