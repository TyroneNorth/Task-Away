<template>
  <q-page class="row items-center justify-evenly">
    <settings-page v-if="user.data?.id === null" />
    <login-form v-else />
  </q-page>
</template>

<script setup lang="ts">
import LoginForm from 'components/auth/LoginForm.vue';
import SettingsPage from './auth/SettingsPage.vue';
import supabase from 'src/boot/supabase';
import { ref } from 'vue';

//const user = ref(supabase.auth.user());
const user = ref(supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session)


  return session
}));




</script>
