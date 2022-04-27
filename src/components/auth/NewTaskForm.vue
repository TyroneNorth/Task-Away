<template>
  <q-dialog v-model="addTaskForm">
    <q-card>
      <q-card-section>
        <div class="text-h6">addTaskForm</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis laudantium minus earum totam modi
        laborum illo, corporis fuga saepe animi aliquam ea enim assumenda ut nulla natus aperiam quis. Iste.
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Open another dialog" @click="secondDialog = true" />
        <q-btn flat label="Close" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="secondDialog" persistent transition-show="scale" transition-hide="scale">
    <q-card class="bg-teal text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Persistent</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Click/Tap on the backdrop.
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const addTaskForm = ref(false);
const secondDialog = ref(false);

function onSubmit() {
  console.log('onSubmit');
}

function onReset() {
  properties.title = '';
  properties.content = '';
}

//const $router = useRouter();

const properties = reactive({
  title: '',
  content: '',
});




</script>


<style scoped>
</style>
