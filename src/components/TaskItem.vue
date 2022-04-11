<template>
  <q-list
    v-for="(task, index) in tabStore.getTasksByTabId(
      tabStore.getTabs[tabStore.getTabs.length - 1].id
    )"
    :key="task.id"
    class="bg-white"
    separator
    bordered
  >
    <!--render active tab tasks-->
    <q-item
      @click="task.done ? (task.done = true) : (task.done = false)"
      clickable
      :class="{ done: task.done }"
      v-ripple
    >
      <q-item-section avatar>
        <q-checkbox v-model="task.done" color="primary" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ task.title }}</q-item-label>
        <q-expansion-item
          v-if="task.description"
          :key="index"
          :label="task.title"
          expand-separator
          icon="description"
          caption=""
        >
          {{ task.description }}
        </q-expansion-item>
      </q-item-section>
      <q-item-section side>
        <q-btn flat dense round color="primary" icon="delete"></q-btn>
      </q-item-section>
    </q-item>
    <div
      v-if="tabStore.getTasksByTabId.length === 0"
      class="no-task absolute-center"
    >
      <q-icon name="check" size="100px" color="primary"></q-icon>
      <div class="text-h5 text-primary text-center">No tasks</div>
    </div>
  </q-list>
</template>

<script setup lang="ts">
import { useTabStore } from 'src/stores/tabs';
const tabStore = useTabStore();
</script>

<style scoped lang="scss">
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
