<script setup lang="ts">
import { useQuasar } from 'quasar';
import { reactive, ref } from 'vue';
import { useTaskStore } from 'src/stores/tasks';
import { Tasks, Car } from 'src/components/models';
import supabase from 'src/boot/supabase';


ref(supabase.auth.onAuthStateChange(async (event) => {
  if (event === 'SIGNED_IN') {

    user.id = supabase.auth.user()?.id;
    user.email = supabase.auth.user()?.email;
    const { data: tasks } = await supabase
      .from('tasks')
      .select('*')
      .order('task_id');

    taskStore.value.$reset()
    tasks?.forEach((task) => {
      //taskStores.taskStore.push(task);
      taskStore.value.tasks.push(task);
    });


  }
}));






const $q = useQuasar();


const user = reactive({
  id: supabase.auth.user()?.id,
  email: supabase.auth.user()?.email,
});


const tempTask = ref(<Tasks>{});



const newTaskProps = reactive({
  newTask: <Tasks>{},
})


const taskStore = ref(useTaskStore());
const display = reactive({
  show: false,
  show2: false,
})


function onSubmit() {

  display.show = false;

}

function onReset() {
  newTaskProps.newTask.content = '';
  newTaskProps.newTask.title = '';
}

function onSubmitUpdate() {

  tempTask.value.title = '';
  tempTask.value.content = '';
  display.show2 = false;
  //wait 2 seconds



}

function onResetUpdate() {
  var temp = tempTask;
  tempTask.value.title = '';
  tempTask.value.content = '';
  return temp;
}








function deleteTask(task: Tasks) {
  $q.dialog({
    title: 'Delete Task',
    message: 'Are you sure you want to delete? This cannot be undone.',
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
  display.show = true;

  taskStore.value.addTasks(title, content);


  $q.notify({
    message: 'Task Added',
    color: 'positive',
    icon: 'check'
  })


  if ({ title, content } === null || { title, content } === undefined) {

  }
  else {

  }

  taskStore.value.fetchTasks;
}




async function updateNovelTask(task: Tasks, id: Tasks['task_id']) {

  await taskStore.value.updateTask(task, id);


  $q.notify({
    message: 'Task upated',
    color: 'positive',
    icon: 'check'
  })

  if (task === null || task === undefined) {

  }
  else {

  }
}

/**
 *  Helper function needed to pass task id to updateNovelTask
 * @param task
 */
function logID(task: Tasks) {

  return tempTask.value.task_id = task.task_id;
}










</script>
<template>
  <q-page>
    <q-tabs dense class="text-grey q-ml-md q-mr-md" active-color="primary" indicator-color="primary" align="justify">

      <!--Tab Bar-->
      <q-btn size="xl" @click="display.show = !display.show" flat dense round side="left" color="primary" icon="add">
        <q-tooltip class="bg-primary" anchor="center right" self="center left" :offset="[10, 10]">Add Task</q-tooltip>
      </q-btn>

      <!--TODO: Options Button

<q-btn flat dense round color="primary" icon="more_horiz" side="right">
        <q-tooltip class="bg-primary" anchor="center right" self="center left" :offset="[10, 10]">Options</q-tooltip>
      </q-btn>




Options Button-->
    </q-tabs>
    <!--End tab bar-->

    <!--Task View-->
    <q-page>


      <div>
        <q-list class="row items-end" bordered seperator v-for=" (task, id) in taskStore.$state.tasks" :key="id">





          <div class="col col-md-3 col-xs-12">
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




          <div class="col col-md-8 col-xs-12">
            <q-item>
              <q-item-section clickable v-on:click="logID(task)" @click="display.show2 = true"
                :class="{ 'true': task.is_completed }" class="cursor-pointer">

                <q-tooltip class="bg-primary" anchor="center right" self="center left" :offset="[-20, -20]">Edit
                </q-tooltip>
                <q-item-label clickable class="cursor-pointer" v-on:click="logID(task)" @click="display.show2 = true">{{
                    task.content
                }}
                </q-item-label>



              </q-item-section>
            </q-item>
          </div>

          <div class="col col-md-1 col-xs-12 ">
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






        </q-list>
        <div>
          <q-dialog v-model="display.show2">
            <q-card>
              <q-card-section>
                <div class="text-h6">Update Task</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="q-gutter-md">
                  <q-input filled v-model="tempTask.title" label="Task title" />

                  <q-input type="textarea" filled v-model="tempTask.content" label="Description" />



                  <div>
                    <q-btn @click="updateNovelTask(tempTask, tempTask.task_id)" label="Submit" type="submit"
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

        <div>
          <q-dialog transition-show="fade" v-model="display.show">
            <q-card>
              <q-card-section>
                <div class="text-h6">Add Task</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                  <q-input filled v-model="newTaskProps.newTask.title" label="Task title" hint="Name of new task" />

                  <q-input type="textarea" filled v-model="newTaskProps.newTask.content" label="Description" />



                  <div>
                    <q-btn @click="addNovelTask(newTaskProps.newTask.title, newTaskProps.newTask.content)"
                      label="Submit" type="submit" color="primary" />
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

body.body--dark {
  background-color: $dark;
  color: #fff;
}


body {
  font-family: 'Georgia', Times;
}



.true {
  .q-item__label {
    text-decoration: line-through;
    color: $primary;

  }
}
</style>
