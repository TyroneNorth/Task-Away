<template>
  <div class="col-md-5">

    <h4>Login</h4>


    <div class="q-mb-md">
      <q-item-label class="form-label">Email</q-item-label>
      <q-input v-model="properties.email" filled type="email" />
    </div>
    <div class="q-mb-md">
      <q-item-label class="form-label">Password</q-item-label>
      <q-input v-model="properties.password" filled :type="properties.isPwd ? 'text' : 'password'">
        <template v-slot:append>
          <q-icon :name="properties.isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer"
            @click="properties.isPwd = !properties.isPwd">
            <q-tooltip>
              <span>{{ properties.isPwd ? 'Hide' : 'Show' }}</span>
            </q-tooltip>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="row q-gutter-md">

      <q-btn>

        <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">Log In</q-tooltip>
        Log In

      </q-btn>

      <q-btn>
        <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">Log In</q-tooltip>
        Sign Up
      </q-btn>

    </div>

    <div class="q-mb-md">

    </div>

  </div>
</template>

<script setup lang="ts">














</script>

<script lang="ts">


import { reactive } from 'vue';


const properties = reactive({
  email: '',
  password: '',
  isPwd: false
});






</script>


<style scoped>
</style>
