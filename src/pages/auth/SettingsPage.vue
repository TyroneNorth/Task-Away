<template>
  <q-page class="q-pa-lg">
    <div class="justify-center">
      <h5 class="q-mt-none">Settings</h5>
      <signout-btn @click="handleSignOut" />
      <form class="form-widget" @submit.prevent="updateProfile">
        <div>
          <label for="email">Email</label>
          <input id="email" type="text" :value="store.state.user?.email" disabled />
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
          <button class="button block" @click="handleSignOut" :disabled="loading">
            Sign Out
          </button>
        </div>
      </form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import SignoutBtn from 'src/components/auth/SignoutBtn.vue';
import supabase from 'src/boot/supabase';
import store from 'src/stores/auth'
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import stores from 'src/stores/auth';


const loading = ref(true)
const username = ref('')
const website = ref('')
const avatar_url = ref('')
const $q = useQuasar()
const $router = useRouter()


async function getProfile() {
  try {
    loading.value = true


    let { data, error, status } = await supabase
      .from('profiles')
      .select('username, avatar_url')
      //.eq('id', store.user.id)
      .single()

    if (error && status !== 406) throw error

    if (data) {
      username.value = data.username
      avatar_url.value = data.avatar_url
    }
  } catch (error) {
    $q.notify({
      message: 'Error getting profile: ' + error,
      color: 'negative',
    })
  } finally {
    loading.value = false
  }
}

async function updateProfile() {
  try {
    loading.value = true
    store.state.user = supabase.auth.user()

    const updates = {
      //id: store.user.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_url.value,
      updated_at: new Date(),
    }

    let { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    })

    if (error) throw error
  } catch (error) {
    $q.notify({
      message: 'Error updating profile: ' + error,
      color: 'negative',
    })
  } finally {
    loading.value = false
  }
}

async function handleSignOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    $q.notify({
      message: 'Error signing out: ' + error,
      color: 'negative',
    })
    console.error('Error signing out: ', error)
  }
  else {
    stores.mutations.RESET_USER
    $router.push('/')
  }
}

onMounted(() => {
  getProfile()
})
</script>
