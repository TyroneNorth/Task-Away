<template>
  <div class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Nothing here...
      </div>

      <q-btn v-if="!supabase.auth.session()" class="q-mt-xl" color="white" text-color="primary" unelevated to="/"
        label="Go Home" no-caps />
      <q-btn v-else class="q-mt-xl" color="white" text-color="primary" unelevated to="/user/settings" label="Go Home"
        no-caps />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted } from 'vue';
import supabase from 'src/boot/supabase';


onMounted(() => {
  console.log('supabase', supabase.auth.user(), '2', supabase.auth.session());
});
defineComponent({
  name: 'ErrorNotFound'
});
</script>
