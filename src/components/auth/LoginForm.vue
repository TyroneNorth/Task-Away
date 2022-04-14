<template>
  <div class="col-md-5">

    <h4>Login</h4>

    <div class="q-mb-md">
      <q-item-label class="form-label">Full name</q-item-label>
      <q-input v-model="properties.full_name" filled />
    </div>
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
      <login-btn @click="handleSignIn" />
      <register-btn @click="handleRegister" />
    </div>

    <div class="q-mb-md">
      <div class="alert alert-danger" v-if="properties.errMsg" role="alert">
        {{ properties.errMsg }}
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { register } from 'src/auth/sb_add_new_user';
import { reactive } from 'vue';
import RegisterBtn from './RegisterBtn.vue';
//import { useQuasar } from 'quasar';
//import supabase from 'src/boot/supabase';
//import { useRouter } from 'vue-router';
import LoginBtn from './LoginBtn.vue';
import stores from 'src/stores/auth';
//import { createUserData } from 'src/db/createuser';
import supabase from 'src/boot/supabase';
import { login } from 'src/auth/sb_sign_in';
//import {createUserData} from 'src/db/createuser';


//const $q = useQuasar();
//const $router = useRouter();
const properties = reactive({
  isLoading: false,
  isPwd: false,
  email: '',
  password: '',
  full_name: '',
  errMsg: 'User already registered',
  show: false,

});

const handleRegister = async () => {
  register(properties.email, properties.password, properties.full_name);
  //createUserData(properties.email);






}


//const user = stores.getters.user;


function handleSignIn() {
  login(properties.email, properties.password);
}
</script>


<style scoped>
</style>
