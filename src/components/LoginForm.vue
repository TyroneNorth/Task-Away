<template>
  <div class="row justify-center">
    <div class="card col-md-5">
      <div class="card-body">
        <h5 class="card-title">Login</h5>
        <div class="q-mb-md">
          <q-item-label for="exampleInputPassword1" class="form-label"
            >Email</q-item-label
          >
          <q-input v-model="properties.email" filled type="email" />
        </div>
        <div class="q-mb-md">
          <q-item-label for="exampleInputPassword1" class="form-label"
            >Password</q-item-label
          >
          <q-input
            v-model="properties.password"
            filled
            :type="properties.isPwd ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="properties.isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="properties.isPwd = !properties.isPwd"
              >
                <q-tooltip>
                  <span>{{ properties.isPwd ? 'Hide' : 'Show' }}</span>
                </q-tooltip>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="row">
          <div class="col q-mb-md q-gutter-md">
            <q-btn type="submit" :disabled="properties.isLoading">
              Sign In
            </q-btn>
            <register-btn />
          </div>
        </div>

        <div class="q-mb-md">
          <div class="alert alert-danger" v-if="properties.errMsg" role="alert">
            {{ properties.errMsg }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import RegisterBtn from './RegisterBtn.vue';

const properties = reactive({
  isLoading: false,
  isPwd: false,
  email: '',
  password: '',
  errMsg: '',
  show: false,
});
</script>

<style scoped></style>
