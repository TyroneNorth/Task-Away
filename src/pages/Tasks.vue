<script setup lang="ts">
import { useQuasar } from 'quasar';
import { onMounted, onUpdated, reactive, ref, shallowReactive } from 'vue';
import { useTaskStore } from 'src/stores/tasks';
import supabase from 'src/boot/supabase';
import { useRouter } from 'vue-router';
import { Tasks, } from 'src/components/models';
import insertRow from 'src/db/sb_insert_row';



const $router = useRouter();

const show = ref(false);
const secondDialog = ref(false);

function onSubmit() {
  console.log('onSubmit');

  show.value = false;
  newTaskTitle.value = '';
  newTaskContent.value = '';
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



const taskStore = ref(useTaskStore());
const TasksList = ref<Tasks[]>([]);
TasksList.value = taskStore.value.tasks;

onMounted(() => {
  taskStore.value.fetchTasks;

})

onUpdated(() => {
  TasksList.value.push({
    title: properties.title,
    content: properties.content,
  });

  taskStore.value.fetchTasks;
})

const $q = useQuasar();
const newTaskTitle = ref('');
const newTaskContent = ref('')
const isAuthenticated = ref(false);
let user = supabase.auth.user();
if (user != null) {
  isAuthenticated.value = true;
}
else {
  isAuthenticated.value = false;
  $router.push('/');
}

function deleteTask(task: Tasks) {
  $q.dialog({
    title: 'Delete Task',
    message: 'Are you sure you want to delete? /This cannot be undone.',
    ok: 'Delete',
    cancel: 'Cancel',
    persistent: true,
  }).onOk(() => {
    taskStore.value.deleteTask(task);
    $q.notify({
      message: 'Task Deleted',
      color: 'positive',
      icon: 'check'
    })

  })
}

async function addNovelTask(title: string, content: string) {
  const { data, error } = await supabase.from('tasks').insert([
    {
      title: title,
      content: content,
      user_id: supabase.auth.user()?.id,
    },
  ]);
  if (error) {
    console.log(error);
    $q.notify({
      message: 'Error adding task',
      color: 'negative',
      icon: 'error'
    })
  }
  else {
    console.log(data);
    $q.notify({
      message: 'Task Added',
      color: 'positive',
      icon: 'check'
    })
  }

  if (data === null || data === undefined) {
    console.log('data is null');
  }
  else {
    console.log('payload is loaded');
  }
}

async function handleUpdateTask(task: Tasks) {
  console.log(task);
  $q.dialog({
    title: 'Delete Task',
    message: 'Enter the descriopton for the task.',
    prompt: {
      model: newTaskContent.value,
      type: 'text',
    },
    ok: 'Ok',
    cancel: 'Cancel',
    persistent: true,
  }).onOk((task) => {
    taskStore.value.updateTask(task);
    //updateRowContent(task);
    console.log(task.id, task.title, task.content);
    taskStore.value.$state.tasks.forEach(task => {
      if (task.id == task.id) {
        task.content = task.content;
      }
    })
    $q.notify({
      message: 'Task Updated',
      color: 'positive',
      icon: 'check'
    })

  })
}

function addTask() {
  $q.dialog({
    title: 'Add a new task',
    message: 'Enter a name for the new task',
    prompt: {
      model: newTaskTitle.value,
      type: 'text',
    },
    ok: 'Next',
    cancel: 'Cancel',
    persistent: true,
  }).onOk((data) => {
    insertRow(data);
    console.log(data);
    taskStore.value.$state.tasks.push({ id: Number(), title: data.title, content: data.content, is_completed: false });
    $q.notify({
      message: 'Task Created',
      color: 'positive',
      icon: 'check'
    })
  })



}






</script>
<template>
  <q-page>
    <q-tabs dense class="text-grey q-ml-md q-mr-md" active-color="primary" indicator-color="primary" align="justify">

      <!--Tab Bar-->
      <q-btn @click="show = true" flat dense round side="left" color="primary" icon="add">
        <q-tooltip class="bg-primary" anchor="center right" self="center left" :offset="[10, 10]">Add List</q-tooltip>
      </q-btn>

      <q-btn flat dense round color="primary" icon="more_horiz" side="right">
        <q-tooltip class="bg-primary" anchor="center right" self="center left" :offset="[10, 10]">Options</q-tooltip>
      </q-btn>
    </q-tabs>
    <!--End tab bar-->

    <!--Task View-->
    <q-page>


      <div>
        <q-list class="row items-center" bordered seperator v-for=" (task, id) in taskStore.$state.tasks" :key="id">





          <div class="col-3 items-center ">
            <q-item clickable>
              <q-item-section>
                <q-checkbox v-on:click="taskStore.updateTaskCompletion(task)" v-model="task.is_completed">
                  <q-item-label class="task_title">{{ task.title }} </q-item-label>
                  <q-tooltip class="bg-primary" anchor="center left" self="center right" :offset="[-10, 0]">Toggle
                    Complete</q-tooltip>
                </q-checkbox>
              </q-item-section>
            </q-item>
          </div>




          <div class="col-6 items-center">
            <q-item clickable>
              <q-item-section clickable @click="handleUpdateTask(task)">

                <q-tooltip class="bg-primary" anchor="center right" self="center left" :offset="[-20, -20]">Edit
                </q-tooltip>
                <q-item-label>{{ task.content }}
                </q-item-label>



              </q-item-section>
            </q-item>
          </div>

          <div class="col-3 items-center">
            <q-item clickable>
              <q-item-section>
                <q-item-label id="removeTask">
                  <div>
                    <q-btn v-on:click="deleteTask(task)" flat dense round color="tertiary" icon="delete">
                      <q-tooltip class="bg-primary" anchor="center right" self="center left" :offset="[-2, 0]">Delete
                        Task
                      </q-tooltip>
                    </q-btn>
                  </div>
                </q-item-label>

              </q-item-section>
            </q-item>
          </div>


        </q-list>
      </div>

      <div>
        <q-dialog v-model="show">
          <q-card>
            <q-card-section>
              <div class="text-h6">Add Task</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                <q-input filled v-model="newTaskTitle" label="Task title" hint="Name of new task" lazy-rules
                  :rules="[val => val && val.length > 0 || 'Cannot be blank!']" />

                <q-input filled v-model="newTaskContent" label="Description" />



                <div>
                  <q-btn @click="addNovelTask(newTaskTitle, newTaskContent)" label="Submit" type="submit"
                    color="primary" />
                  <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
              </q-form>
            </q-card-section>

            <q-card-actions align="left" class="text-primary">

              <q-btn flat label="Close" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

      </div>




    </q-page>

    <q-page class="bg-gray-3 column">
      <q-footer elevated>
        <div>
          <q-btn flat dense round color="tertiary" icon="delete">
            <q-tooltip class="bg-primary" anchor="center right" self="center left" :offset="[10, 10]">Clear All
            </q-tooltip>
          </q-btn>
        </div>

        <div class="row q-pa-sm bg-primary">
          <q-input v-model="newTaskTitle" class="col" square filled bg-color="white" placeholder="Add task" dense>
            <template v-slot:append>
              <q-btn round dense flat icon="add" @click="addTask" />
            </template>
          </q-input>
        </div>
      </q-footer>
    </q-page>
  </q-page>


</template>

<style lang="scss">
.no-task {
  opacity: 0.5;
}

.q-btn {
  margin: 10;
}







.true {
  .q-item__label {
    text-decoration: line-through;
    color: rgb(129, 129, 129);
  }
}
</style>
