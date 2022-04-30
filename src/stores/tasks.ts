import { defineStore } from 'pinia';
import supabase from 'src/boot/supabase';
import { Tasks } from 'src/components/models';
import { ref } from 'vue';

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    /** @type {unknown[{}]} */
    tasks: ref(<Tasks[]>[]),
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
          .order('task_id');

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
  },

  actions: {
    /**
     *  fetch task by id
     */
    async fetchTaskById(id: number) {
      const { data: tasks, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('task_id', id);

      if (error) {
        console.log('error', error);
        return;
      }
      // handle for when no tasks are returned
      if (tasks === null) {
        return;
      }
      // return task
      return tasks;
    },
    /**
     *  Add a new tasks to supabase
     */
    async addTasks(title: string, content: string) {
      const { data, error } = await supabase.from('tasks').insert([
        {
          title: title,
          content: content,
          user_id: supabase.auth.user()?.id,
        },
      ]);

      if (error) {
        alert(error.message);
        console.error('There was an error inserting', error);
      }
      // store response to tasks
      data?.forEach((task: Tasks) => {
        this.tasks.push(task);
      });

      console.log('created a new tasks');
      return data;
    },

    /**
     * Targets a specific task via its record id and updates the is_completed attribute.
     */
    async updateTaskCompletion(task: Tasks) {
      const { error } = await supabase
        .from('tasks')
        .update({ is_completed: task.is_completed })
        .eq('task_id', task.task_id);

      if (error) {
        alert(error.message);
        console.error('There was an error updating', error);
        return;
      }

      console.log('Updated task', task.task_id);
      return;
    },

    /**
     * Targets a specific task via its record id and updates the task description.
     *
     */
    async updateTask(task: Tasks, id: number) {
      const { data, error } = await supabase
        .from('tasks')
        .update({ title: task.title, content: task.content })
        .eq('task_id', id);

      if (error) {
        alert(error.message);
        console.error('There was an error updating', error);
        return;
      }
      // update local store by task id
      this.tasks.forEach((t: Tasks) => {
        if (t.task_id === id) {
          t.title = task.title;
          t.content = task.content;
        }
      });

      console.log(
        'Updated task',
        task.task_id,
        'new data: ',
        data[0].title,
        data[0].content
      );
    },

    /**
     *  Deletes a task via its id
     */
    async deleteTask(task: Tasks) {
      const { data, error } = await supabase
        .from('tasks')
        .delete()
        .eq('task_id', task.task_id);
      console.log('deleted task', task.task_id);
      // update local store
      this.tasks.splice(
        this.tasks.findIndex((t) => t.task_id === task.task_id),
        1
      );

      if (error) {
        alert(error.message);
        console.error('There was an error deleting', error);
        return;
      }

      return data;
    },
  },
});
