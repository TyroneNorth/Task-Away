<template>
  <q-page class="q-pa-lg">
    <div>
      <router-link to="/tasks">
        <q-btn>
          <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">Sign Out</q-tooltip>
          logOff
        </q-btn>
      </router-link>
    </div>
  </q-page>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
