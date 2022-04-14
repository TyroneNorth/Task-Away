<script setup lang="ts">
import { useQuasar } from 'quasar';
import { reactive, ref } from 'vue';
import supabase from 'src/boot/supabase';
import taskStore from 'src/stores/tasks';


const tasks = reactive({
  taskId: null,
  taskTitle: null,
  taskContent: null,
  taskStatus: false,

})



const fetchTasks = async () => {
  const { data } = await supabase.from('tasks').select('*');
  data?.forEach((task) => {
    tasks.taskId = task.id;
    tasks.taskTitle = task.title;
    tasks.taskContent = task.content;
    tasks.taskStatus = task.status;
  });

};



const $q = useQuasar();
const newTaskTitle = ref('');

const getTasks = async () => {
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('id, user_id, title, content, completed')
  if (error) {
    $q.notify({
      message: 'Error getting tasks: ' + error,
      color: 'negative',
    })
    console.error('Error getting tasks: ', error)
  }
  else {
    $q.notify({
      message: 'Got tasks',
      color: 'positive',
    })

    taskStore.state.tasks = tasks


  }
}




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
  <q-tabs dense class="text-grey q-ml-md q-mr-md" active-color="primary" indicator-color="primary" align="justify">

    <!--Tab Baar-->
    <q-btn @click="addTab" flat dense round side="left" color="primary" icon="add">
      <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">Add List</q-tooltip>
    </q-btn>

    <q-btn flat dense round color="primary" icon="more_horiz" side="right">
      <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">Options</q-tooltip>
    </q-btn>
  </q-tabs>
  <!--End tab bar-->

  <!--Task View-->
  <q-page>
    <div>
      <q-btn @click="fetchTasks">
        get Tasks
      </q-btn>
    </div>
    <div>
      <q-list bordered seperator>
        <q-item>
          <q-checkbox v-model="tasks.taskStatus"></q-checkbox>

          <q-item-section>
            <q-item-label>
              {{ tasks.taskTitle }} </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ tasks.taskContent }}</q-item-label>
          </q-item-section>





        </q-item>
      </q-list>

    </div>
  </q-page>

  <q-page class="bg-gray-3 column">
    <q-footer elevated>
      <div>
        <q-btn flat dense round color="tertiary" icon="delete">
          <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">Clear All</q-tooltip>
        </q-btn>
      </div>

      <div class="row q-pa-sm bg-primary">
        <q-input v-model="newTaskTitle" class="col" square filled bg-color="white" placeholder="Add task" dense>
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
