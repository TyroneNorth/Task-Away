<template>
  <div>
    <h2 class="text-3xl">Thanks for registering!</h2>
    <h4>
      Please confirm your email to finishing registering:
      {{ useUserStore().user?.email }}

    </h4>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/auth';
</script>

<style scoped>
</style>
