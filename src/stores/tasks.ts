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
        this.meta.totalCount = tasks.length;
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
     *  fetch task title by id
     */
    async fetchTaskTitleById(id: number) {
      const { data: title, error } = await supabase
        .from('tasks')
        .select('title')
        .eq('task_id', id);

      if (error) {
        console.log('error', error);
        return;
      }
      // handle for when no tasks are returned
      if (title === null) {
        return;
      }
      // return title to string
      return title.toString();
    },
    /**
     * fetch task content by id
     */
    async fetchTaskContentById(id: number) {
      const { data: content, error } = await supabase
        .from('tasks')
        .select('content')
        .eq('task_id', id);

      if (error) {
        console.log('error', error);
        return;
      }
      // handle for when no tasks are returned
      if (content === null) {
        return;
      }
      // return coontent
      return content.toString();
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
      data?.forEach((task) => {
        this.tasks.push(task);
      });

      this.meta.totalCount = this.tasks.length;

      console.log('created a new task');
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
    async updateTask(task: Tasks, id: Tasks['task_id']) {
      const { data, error } = await supabase
        .from('tasks')
        .update({ title: task.title, content: task.content })
        .eq('task_id', task.task_id);

      if (error) {
        alert(error.message);
        console.error('There was an error updating', error);
        return;
      }
      // create new Task object to replace old one via id
      data.forEach((task) => {
        const index = this.tasks.findIndex((t) => t.task_id === id);
        this.tasks.splice(index, 1, task);
      });
      // replace old task with new task

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
      this.meta.totalCount = this.tasks.length;

      if (error) {
        alert(error.message);
        console.error('There was an error deleting', error);
        return;
      }

      return data;
    },
  },
});
