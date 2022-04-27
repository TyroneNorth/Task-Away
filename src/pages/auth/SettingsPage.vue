<template>
  <q-page class="q-pa-lg">
    <div class="justify-center">
      <h5 class="q-mt-none">Settings</h5>
      <signout-btn @click="logOff" />
      <form class="form-widget">
        <div>
          <label for="email">Email</label>
          <input id="email" type="text" :value="store.$state.user?.email" disabled />
        </div>
        <div>
          <label for="username">Name</label>
          <input id="username" type="text" v-model="username" />
        </div>
        <div>
          <label for="website">Website</label>
          <input id="website" type="website" v-model="website" />
        </div>

        <div>
          <input type="submit" class="button block primary" :value="loading ? 'Loading ...' : 'Update'"
            :disabled="loading" />
        </div>

        <div>
          <button class="button block" @click="logOff" :disabled="loading">
            Sign Out
          </button>
        </div>
      </form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import SignoutBtn from 'src/components/auth/SignoutBtn.vue';
import { logOff } from 'src/auth/sb_log_off';
import { ref } from 'vue';
import stores from 'src/stores/auth';

const store = stores();
const loading = ref(true)
const username = ref('')
const website = ref('')




</script>
