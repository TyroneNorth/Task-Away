<script lang="ts" setup>
import { useUserStore } from 'src/stores/auth';
import { useRouter, useRoute } from 'vue-router';

import { ref, reactive } from 'vue';
const route = useRoute();
/* Parse the route hash into a dictionary so we can pick out the access_token provided */
const hashDictionary = {} as any;
// first remove the actual '#' character
const hash = route.hash.replace('#', '');
// split hash into key-value pairs
hash.split('&').forEach((item) => {
  // split 'key=value' into [key, value]
  const [key, value] = item.split('=');
  // add to results
  hashDictionary[key] = value;
});
const resetToken = hashDictionary.access_token;

const loading = ref(false);
const properties = reactive({
  email: '',
  password: '',
  isPwd: false
});
async function onSubmit() {

  loading.value = true;
  useUserStore().handleUpdateUser(properties);

  loading.value = false;
}
</script>
<template>
  <div class="q-ma-lg">
    <h2>Reset Password</h2>
    <p>Choose a new password below</p>
    <form class="flex w-full flex-col items-center" @submit.prevent="onSubmit">
      <q-label class="q-mr-lg">Password</q-label>

      <q-input class="q-mr-lg" v-model="properties.password" filled :type="properties.isPwd ? 'text' : 'password'">
        <template v-slot:append>
          <q-icon :name="properties.isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer"
            @click="properties.isPwd = !properties.isPwd">
            <q-tooltip>
              <span>{{ properties.isPwd ? 'Hide' : 'Show' }}</span>
            </q-tooltip>
          </q-icon>
        </template>
      </q-input>

      <q-btn color="primary" :loading="loading" type="submit">
        Reset
      </q-btn>
    </form>
  </div>
</template>
