import supabase from 'src/boot/supabase'

// Tasks Store
export default {
  namespaced: true,

  state: {
    user: supabase.auth.user(),
    tasks: [
      {
        taskId: null,
        taskTitle: null,
        taskContent: null,
        taskStatus: false
      }
    ],
  },

  getters: {
    user(state: { user: any }) {
      return state.user;
    },
    getTasks(state: { tasks: any }) {
      return state.tasks;
    },
    getTaskByTasks(state: { tasks: any }) {
      return state.tasks.find((task: any) => task.taskId === state.tasks.taskId);
    }

  },



  actions: {
    async createTask(context: any, payload: any) {

      const { error } = await supabase
        .from('tasks')
        .insert({
          title: payload.title,
          content: payload.content,
        });
      if (error) {
        console.log('Error creating task ', + error);
      }
      else {
        console.log('Task created');
      }
    },

    async updateTask(context: any, payload: any) {
      const { error } = await supabase
        .from('tasks')
        .update({
          title: payload.title,
          content: payload.content,
        })
        .match({
          id: payload.id,
        });
      if (error) {
        console.log('Error updating task ', + error);
      }
      else {
        console.log('Task updated');
      }
    },

    async deleteTask(context: any, payload: any) {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .match({
          id: payload.id,
        });
      if (error) {
        console.log('Error deleting task ', + error);
      }
      else {
        console.log('Task deleted');
      }
    },

    async addTaskLocal(context: any, payload: any) {
      context.commit('ADD_TASK', payload);
    }
  },



}
