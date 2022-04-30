<template>
  <q-page class="row items-center justify-evenly">
    <settings-page v-if="user === null" />
    <template v-else>
      <div class="col-md-5">

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

          <q-btn to="/user/tasks" v-model="properties.email" @click="handleSignIn">

            <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">Log In</q-tooltip>
            Log In

          </q-btn>

          <q-btn @click="handleRegister">
            <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">Log In</q-tooltip>
            Sign Up
          </q-btn>

        </div>

        <div class="q-mb-md">

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



const handleRegister = () => {
  userStore.handleSignup(properties);
  //Create user data to profile




}


const handleSignIn = () => {

  userStore.handleLogin(properties);
}



</script>
