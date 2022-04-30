<template>
  <q-page class="q-pa-lg">
    <div class="justify-center">
      <h5 class="q-mt-none">Settings</h5>
      <signout-btn @click="logOff" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import SignoutBtn from 'src/components/auth/SignoutBtn.vue';
import { logOff } from 'src/auth/sb_log_off';
import supabase from 'src/boot/supabase';
import { ref } from 'vue';
import { useTaskStore } from 'src/stores/tasks';

const taskStore = ref(useTaskStore());



ref(supabase.auth.onAuthStateChange(async (event) => {
  if (event === 'SIGNED_OUT') {
    taskStore.value.$reset()
  }
}));




</script>
