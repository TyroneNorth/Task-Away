<template>
  <q-page class="q-pa-lg">
    <q-btn icon="dark_mode" @click="$q.dark.toggle">
      <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">Toggle Theme</q-tooltip>
    </q-btn>
    <div class="justify-center">
      <h5 class="q-mt-none">Settings</h5>
      <q-btn color="primary" @click="logOff" label="log off" to="/">
        <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">Sign Out</q-tooltip>

      </q-btn>

    </div>
  </q-page>
</template>

<script setup lang="ts">
import { logOff } from 'src/auth/sb_log_off';
import supabase from 'src/boot/supabase';
import { ref, watch } from 'vue';
import { useTaskStore } from 'src/stores/tasks';
import { Notify, useQuasar } from 'quasar';

const taskStore = ref(useTaskStore());



ref(supabase.auth.onAuthStateChange(async (event) => {
  if (event === 'SIGNED_OUT') {
    taskStore.value.$reset()
    Notify.create({
      message: 'You have been signed out',
      color: 'negative',
      position: 'top',
      timeout: 3000
    });
  }
}));

const $q = useQuasar()



watch(() => $q.dark.isActive, val => {
  console.log(val ? 'On dark mode' : 'On light mode')
})


</script>
