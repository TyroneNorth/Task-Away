<template>
  <div>
    <router-link to="/tasks">
      <q-btn @click="handleRegister">
        <q-tooltip anchor="center right" self="center left" :offset="[10, 10]"
          >Create acount</q-tooltip
        >
        SignUp
      </q-btn>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { register } from 'src/db/sb_add_new_user';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const $router = useRouter();

const handleRegister = async () => {
  try {
    register;

    $q.notify({
      color: 'positive',
      textColor: 'white',
      message: 'Account created',
    });
    $router.push('/tasks');
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
