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
      <login-btn @click="handleSignIn" />
      <register-btn @click="handleRegister" />
    </div>

    <div class="q-mb-md">

    </div>

  </div>
</template>

<script setup lang="ts">
import { register } from 'src/auth/sb_add_new_user';
import { reactive, ref } from 'vue';
import RegisterBtn from './RegisterBtn.vue';
import LoginBtn from './LoginBtn.vue';
import { useRouter } from 'vue-router';
import { login } from 'src/auth/sb_sign_in';
import supabase from 'src/boot/supabase';



//const $router = useRouter();

const properties = reactive({
  email: '',
  password: '',
  isPwd: false
});

const $router = useRouter();
const user = ref(supabase.auth.user());


const handleRegister = async () => {
  register(properties.email, properties.password);

}

const handleSignIn = async () => {
  login(properties.email, properties.password);
  if (user.value != null) {
    $router.push('/');
  }
}
</script>


<style scoped>
</style>
