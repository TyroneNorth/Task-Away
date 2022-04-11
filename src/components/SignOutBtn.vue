<template>
  <q-page class="q-pa-lg">
    <div>
      <router-link to="/tasks">
        <q-btn @click="handleLogOff">
          <q-tooltip anchor="center right" self="center left" :offset="[10, 10]"
            >Sign Out</q-tooltip
          >
          logOff
        </q-btn>
      </router-link>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { logOff } from 'src/db/sb_log_off';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const $router = useRouter();

const handleLogOff = async () => {
  try {
    logOff;
    $q.notify({
      color: 'positive',
      textColor: 'white',
      message: 'Logged off successfully',
    });
    $router.push('/help');
  } catch (error) {
    $q.notify({
      color: 'negative',
      textColor: 'white',
      message: 'Error creating account',
    });
  }
};
</script>

<style scoped></style>
