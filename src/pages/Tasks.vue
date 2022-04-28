<script setup lang="ts">
import { useQuasar } from 'quasar';
import { onMounted, onUpdated, reactive, ref } from 'vue';
import { useTaskStore } from 'src/stores/tasks';
import supabase from 'src/boot/supabase';
import { useRouter } from 'vue-router';
import { Tasks, } from 'src/components/models';



const $q = useQuasar();

const is_authenticated = ref(false);
const user = ref(supabase.auth.user());

const updateProps = reactive({
  task: <Tasks>{},
})

const newTaskProps = reactive({
  newTask: <Tasks>{},
})

const taskArray = reactive({
  tasks: <Tasks[]>[]
})
const taskStore = ref(useTaskStore());
const $router = useRouter();

const show = ref(false);
const show2 = ref(false);

function onSubmit() {
  console.log('onSubmit');
  show.value = false;
  newTaskProps.newTask.content = '';
  newTaskProps.newTask.title = '';
}

function onReset() {
  newTaskProps.newTask.content = '';
  newTaskProps.newTask.title = '';
}

function onSubmitUpdate() {
  console.log('firing onSubmitUpdate');
  console.log(updateProps, updateNovelTask(updateProps.task, updateProps.task.id));
  show2.value = false;
  //wait 2 seconds
  setTimeout(() => {
    $router.push('/tasks');
  }, 2000);
  updateProps.task.title = '';
  updateProps.task.content = '';

}

function onResetUpdate() {
  updateProps.task.title = '';
  updateProps.task.content = '';
}





const initMount = () => {
  onMounted(() => {
    if (is_authenticated.value) {
      taskStore.value.fetchTasks;
      taskArray.tasks.push(...taskStore.value.tasks);
    }
  });

}
initMount();
onUpdated(() => {


  taskStore.value.fetchTasks;
  taskArray.tasks = [];
  taskArray.tasks.push(...taskStore.value.tasks);
})


if (user.value != null) {
  is_authenticated.value = true;
}
else {
  is_authenticated.value = false;
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

  return taskStore.value.fetchTasks;
}

async function addNovelTask(title: string, content: string) {
  await taskStore.value.addTasks(title, content);

  console.log(title, content);
  $q.notify({
    message: 'Task Added',
    color: 'positive',
    icon: 'check'
  })


  if ({ title, content } === null || { title, content } === undefined) {
    console.log('data is null');
  }
  else {
    console.log('payload is loaded');
  }

  taskStore.value.fetchTasks;
}

async function updateNovelTask(task: Tasks, id: number) {

  await taskStore.value.updateTask(task, id);


  $q.notify({
    message: 'Task upated',
    color: 'positive',
    icon: 'check'
  })

  if (task === null || task === undefined) {
    console.log('payload is /null/undefined');
  }
  else {
    console.log('payload is loaded');
  }

  taskStore.value.fetchTasks;
}

/**
 *  Helper function needed to pass task id to updateNovelTask
 * @param task
 */
function logID(task: Tasks) {
  console.log(task.id);
  updateProps.task.id = task.id;
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
            <q-item :class="{ 'true': task.is_completed }">
              <q-item-section>
                <q-checkbox v-on:click="taskStore.updateTaskCompletion(task)" v-model="task.is_completed">
                  <div class="row">

                    <q-item-label class="task_title">{{ task.title }} </q-item-label>
                  </div>
                  <q-tooltip class="bg-primary" anchor="center left" self="center right" :offset="[-10, 0]">Toggle
                    Complete</q-tooltip>
                </q-checkbox>
              </q-item-section>
            </q-item>
          </div>




          <div class="col-6 items-center">
            <q-item>
              <q-item-section clickable v-on:click="logID(task)" @click="show2 = true"
                :class="{ 'true': task.is_completed }" class="cursor-pointer">

                <q-tooltip class="bg-primary" anchor="center right" self="center left" :offset="[-20, -20]">Edit
                </q-tooltip>
                <q-item-label clickable class="cursor-pointer" v-on:click="logID(task)" @click="show2 = true">{{
                    task.content
                }}
                </q-item-label>



              </q-item-section>
            </q-item>
          </div>

          <div class="col-3 items-center">
            <q-item>
              <q-item-section :class="{ 'true': task.is_completed }">
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
          <div>
            <q-dialog v-model="show2">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Update Task</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="q-gutter-md">
                    <q-input filled v-model="updateProps.task.title" label="Task title" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Cannot be blank!']" />

                    <q-input filled v-model="updateProps.task.content" label="Description" />



                    <div>
                      <q-btn label="Submit" type="submit" color="primary" />
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
                <q-input filled v-model="newTaskProps.newTask.title" label="Task title" hint="Name of new task"
                  lazy-rules :rules="[val => val && val.length > 0 || 'Cannot be blank!']" />

                <q-input filled v-model="newTaskProps.newTask.content" label="Description" />



                <div>
                  <q-btn @click="addNovelTask(newTaskProps.newTask.title, newTaskProps.newTask.content)" label="Submit"
                    type="submit" color="primary" />
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
