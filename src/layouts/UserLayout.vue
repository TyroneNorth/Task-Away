<template>
  <q-layout view="lHh Lpr lFf">
    <q-header q-ml-200>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">Task Away</div>
        <div class="text-subtitle1">{{ todaysDate() }}</div>
      </div>
      <q-img src="../static/mountains.png" class="header-image absolute-top" />
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="250" :breakpoint="600">
      <q-scroll-area style="
          height: calc(100% - 192px);
          margin-top: 192px;
          border-right: 1px solid #ddd;
        ">
        <q-list padding>




          <q-item to="/user/tasks" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="task" />
            </q-item-section>

            <q-item-section>
              Tasks
            </q-item-section>
          </q-item>


          <q-item to="/user/help" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section> Help </q-item-section>
          </q-item>

          <q-item to="/user/settings" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>

            <q-item-section> Settings </q-item-section>
          </q-item>


        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="../static/mountains.svg" style="height: 192px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="user avatar icon/gravatar" />
          </q-avatar>
          <div class="text-weight-bold">
            {{ user.email }}
            <!--TODO: Add @username
            <div class="text-weight-regular">@ {{ user.id }}</div>
            -->
          </div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <h3 class="q-ma-md">Welcome to the Task Away app!</h3>


      <router-view v-slot="{ Component }">
        <keep-alive>
          <Component :is="Component" />
        </keep-alive>
      </router-view>

    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { date } from 'quasar';
import { ref, reactive } from 'vue';
import supabase from 'src/boot/supabase';



const user = reactive({
  id: supabase.auth.user()?.id,
  email: supabase.auth.user()?.email,
})
//stores.state.user = user;
//const displayName = stores.state.user?.email;

ref(supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_IN') {
    user.id = supabase.auth.user()?.id;
    user.email = supabase.auth.user()?.email;
  }
}));

const leftDrawerOpen = ref(false);
const timestamp = ref(Date.now());

function todaysDate() {
  return date.formatDate(timestamp.value, 'dddd D MMMM  YYYY');
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

</script>



<style lang="scss">
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.2;
  filter: grayscale(100%);
}

q-page-container {
  min-height: calc(100vh - 248px);
  max-width: 50%;
}
</style>
