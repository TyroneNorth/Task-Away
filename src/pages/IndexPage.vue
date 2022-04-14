<template>
  <q-page class="row items-center justify-evenly">
    <settings-page v-if="stores.state.user" />
    <login-form v-else />
  </q-page>
</template>

<script setup lang="ts">
import LoginForm from 'components/auth/LoginForm.vue';
import SettingsPage from './auth/SettingsPage.vue';
import stores from 'src/stores/auth';

</script>
