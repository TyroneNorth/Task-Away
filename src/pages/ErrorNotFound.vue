<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Nothing here...
      </div>

      <q-btn v-if="user.id" class="q-mt-xl" color="white" text-color="blue" unelevated to="/user/tasks" label="Go Home"
        no-caps />
      <q-btn v-else class="q-mt-xl" color="white" text-color="blue" unelevated to="/" label="Go Home" no-caps />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, reactive } from 'vue';
import supabase from 'src/boot/supabase';


const user = reactive({
  id: supabase.auth.user()?.id,
  email: supabase.auth.user()?.email,
})
defineComponent({
  name: 'ErrorNotFound'
});
</script>
