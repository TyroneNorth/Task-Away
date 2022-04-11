<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import SignOutBtn from 'src/components/SignOutBtn.vue';

const $q = useQuasar();
const newTaskTitle = ref('');

function addTab() {
  $q.dialog({
    title: 'Add a new tab',
    message: 'Enter a name for the new tab',
    ok: 'Add',
    cancel: 'Cancel',
    persistent: true,
  });
}
</script>
<template>
  <q-tabs
    dense
    class="text-grey q-ml-md q-mr-md"
    active-color="primary"
    indicator-color="primary"
    align="justify"
  >
    <sign-out-btn></sign-out-btn>
    <!--Tab Baar-->
    <q-btn
      @click="addTab"
      flat
      dense
      round
      side="left"
      color="primary"
      icon="add"
    >
      <q-tooltip anchor="center right" self="center left" :offset="[10, 10]"
        >Add List</q-tooltip
      >
    </q-btn>

    <q-btn flat dense round color="primary" icon="more_horiz" side="right">
      <q-tooltip anchor="center right" self="center left" :offset="[10, 10]"
        >Options</q-tooltip
      >
    </q-btn>
  </q-tabs>
  <!--End tab bar-->

  <!--Task View-->

  <q-page class="bg-gray-3 column">
    <q-footer elevated>
      <div>
        <q-btn flat dense round color="tertiary" icon="delete">
          <q-tooltip anchor="center right" self="center left" :offset="[10, 10]"
            >Clear All</q-tooltip
          >
        </q-btn>
      </div>
      <div class="row q-pa-sm bg-primary">
        <q-input
          v-model="newTaskTitle"
          class="col"
          square
          filled
          bg-color="white"
          placeholder="Add task"
          dense
        >
          <template v-slot:append>
            <q-btn round dense flat icon="add" />
          </template>
        </q-input>
      </div>
    </q-footer>
  </q-page>
</template>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}
.no-task {
  opacity: 0.5;
}
</style>
