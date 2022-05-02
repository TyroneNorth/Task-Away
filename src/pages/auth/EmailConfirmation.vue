<template>
  <div v-if="!verified">
    <h2 class="text-3xl">Thanks for registering!</h2>
    <h4>
      Please confirm your email to finishing registering:



      <!--TODO: display users email-->
      {{ userEmail }}
    </h4>
  </div>

  <div v-else>
    <h2 class="text-3xl">Thanks for registering!</h2>
    <h4>
      Thank you for verifying your email! You will now be redirected.




      <!--TODO: display users email-->
      {{ userEmail }}
    </h4>
  </div>
</template>

<script setup lang="ts">
import supabase from 'src/boot/supabase';
import { ref } from 'vue';

const userEmail = ref(supabase.auth.user()?.email);
const verified = ref(false);
if (supabase.auth.user()?.email_confirmed_at !== undefined) {
  verified.value = true;
  //send user to task after 5 seconds
  setTimeout(() => {
    window.location.href = '/tasks';
  }, 5000);

}

</script>

<style scoped>
</style>
