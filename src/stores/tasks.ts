import { defineStore } from 'pinia';
import supabase from 'src/boot/supabase';
import { Tasks, PartialTasks } from 'src/components/models';
import { ref } from 'vue';

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    /** @type {unknown[{}]} */
    tasks: ref<Tasks[]>([]),
    meta: {
      totalCount: 0,
    },
  }),

  getters: {
    /**
     * Retrieve all task for the signed in user
     */
    async fetchTasks() {
      try {
        const { data: tasks, error } = await supabase
          .from('tasks')
          .select('*')
          .order('id');

        if (error) {
          console.log('error', error);
          return;
        }
        // handle for when no tasks are returned
        if (tasks === null) {
          this.tasks = [];
          return;
        }
        // store response to tasks
        this.tasks = tasks;
        console.log('got tasks!', tasks);
        return tasks;
      } catch (err) {
        console.error('Error retrieving data from db', err);
      }
    },
    /**
     * Retrieve local store task id
     */
  },

  actions: {
    /**
     *  Add a new tasks to supabase
     */
    async addTasks(task: Tasks) {
      try {
        const { data, error } = await supabase.from('tasks').insert(task);

        if (error) {
          alert(error.message);
          console.error('There was an error inserting', error);
        }
        // store response to tasks
        this.tasks.push({ ...task });
        console.log('created a new tasks');
        return data;
      } catch (err) {
        alert('Error');
        console.error('Unknown problem inserting to db', err);
        return null;
      }
    },

    /**
     * Targets a specific task via its record id and updates the is_completed attribute.
     */
    async updateTaskCompletion(task: Tasks) {
      try {
        const { error } = await supabase
          .from('tasks')
          .update({ is_completed: !!task.is_completed })
          .eq('id', task.id);

        if (error) {
          alert(error.message);
          console.error('There was an error updating', error);
          return;
        }

        console.log('Updated task', task.id);
      } catch (err) {
        alert('Error');
        console.error('Unknown problem updating record', err);
      }
    },

    /**
     * Targets a specific task via its record id and updates the task description.
     *
     */
    async updateTask(task: Tasks) {
      try {
        const { error } = await supabase
          .from('tasks')
          .update({ title: task.title, content: task.content })
          .eq('id', task.id);

        this.fetchTasks;
        if (error) {
          alert(error.message);
          console.error('There was an error updating', error);
          return;
        }

        console.log('Updated task', task.id);
      } catch (err) {
        alert('Error');
        console.error('Unknown problem updating record', err);
      }
    },

    /**
     *  Deletes a task via its id
     */
    async deleteTask(task: Tasks) {
      try {
        await supabase.from('tasks').delete().eq('id', task.id);
        console.log('deleted task', task.id);
        this.fetchTasks;
      } catch (error) {
        console.error('error', error);
      }
    },
  },
});
