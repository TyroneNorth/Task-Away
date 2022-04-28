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
      <q-btn @click="handleSignIn" to="/tasks">
        <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">Log In</q-tooltip>
        Log In
      </q-btn>
      <q-btn @click="handleRegister">
        <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">Log In</q-tooltip>
        Sign Up
      </q-btn>

    </div>

    <div class="q-mb-md">

    </div>

  </div>
</template>

<script setup lang="ts">
import { register } from 'src/auth/sb_add_new_user';
import { reactive } from 'vue';
import { login } from 'src/auth/sb_sign_in';





//const $router = useRouter();

const properties = reactive({
  email: '',
  password: '',
  isPwd: false
});




const handleRegister = async () => {
  register(properties.email, properties.password);

}

const handleSignIn = async () => {
  login(properties.email, properties.password);


}
</script>


<style scoped>
</style>
