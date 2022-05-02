<template>
  <q-page class="row items-center justify-evenly">
    <settings-page v-if="user === null" />
    <template v-else>
      <div class="col-md-5">
        <h4>Register</h4>
        <q-card class="q-pa-lg">


          <div class="q-mb-md">
            <q-item-label class="form-label">Full Name</q-item-label>
            <q-input v-model="properties.name" filled type="email" />
          </div>
          <div class="q-mb-md">
            <q-item-label class="form-label">Email</q-item-label>
            <q-input v-model="properties.email" filled type="email" />
          </div>
          <div class="q-mb-md">
            <q-item-label class="form-label">Password</q-item-label>
            <q-input v-model="properties.password" filled :type="isPwd ? 'text' : 'password'">
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer" @click="isPwd = !isPwd">
                  <q-tooltip>
                    <span>{{ isPwd ? 'Hide' : 'Show' }}</span>
                  </q-tooltip>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="row">

            <q-card-actions class="col-12">


              <q-btn label="Register" class="q-mr-md" color="primary" to="/" v-model="properties.email"
                @click="handleSignUp">
                <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">Create Account</q-tooltip>

              </q-btn>
              <q-btn label="Need Help?" flat class="cursor-pointer" @click="show = true">
                <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">Reset Password</q-tooltip>

              </q-btn>
            </q-card-actions>



          </div>
          <div class="row q-ml-lg">
            <q-card-actions class="col-12">

            </q-card-actions>
          </div>
        </q-card>
      </div>
    </template>
    <template>
      <div>
        <q-dialog v-model="show">
          <q-card>
            <q-card-section>
              <div class="text-h6">Password Reset Link</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                <q-input filled v-model="properties.email" label="Email" hint="Email associated with account" lazy-rules
                  :rules="[val => val && val.length > 0 || 'Cannot be blank!']" />






              </q-form>
            </q-card-section>

            <q-card-actions align="left" class="text-primary">

              <q-btn flat label="Close" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

      </div>



    </template>
  </q-page>
</template>

<script setup lang="ts">
import SettingsPage from './SettingsPage.vue';
import { useUserStore } from 'src/stores/auth';
import { reactive, ref } from 'vue';
import supabase from 'src/boot/supabase';


const show = ref(false);
const userStore = useUserStore();
const user = reactive({
  id: supabase.auth.user()?.id,
  email: supabase.auth.user()?.email,
})


const properties = reactive({
  email: '',
  password: '',
  name: '',

});





const isPwd = ref(false);


const handleSignUp = () => {

  userStore.handleSignup(properties);
}




function onSubmit() {

  show.value = false;
  properties.email = '';

}

function onReset() {

  properties.email = '';
}





</script>

