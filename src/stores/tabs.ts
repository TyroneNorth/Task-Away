import { defineStore } from 'pinia';
import { useQuasar } from 'quasar';

export const useTabStore = defineStore('tabs', {
  state: () => ({
    tabs: [
      {
        id: 1,
        title: 'Tab 1',
        tasks: [
          {
            id: 1,
            title: 'Task 1',
            description: 'This is a task', //optional
            done: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
      {
        id: 2,
        title: 'Tab 2',
        tasks: [
          {
            id: 1,
            title: 'Task 1',
            description: 'This is the first tab 2 task', //optional
            done: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            title: 'Task 2',
            description: 'This is the second tab 2 task', //optional
            done: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
    ],
  }),
  getters: {
    getTabs: (state) => {
      return state.tabs;
    },
    getTabById: (state) => (id: number) => {
      return state.tabs.find((tab) => tab.id === id);
    },
    getTasksByTabId: (state) => (id: number) => {
      // Check if tasks on tab exist
      const tab = state.tabs.find((tab) => tab.id === id);
      if (tab) {
        return tab.tasks;
      }
    },
    getTaskById: (state) => (tabId: number, taskId: number) => {
      // Check if tasks on tab exist
      const tab = state.tabs.find((tab) => tab.id === tabId);
      if (tab) {
        return tab.tasks.find((task) => task.id === taskId);
      }
    },
  },
  actions: {
    // Add a new tab, takes title as a string
    addTab: (state: { tabs: { id: number; title: string; tasks: never[]; }[]; }) => (title: string) => {
      const newTab = {
        id: state.tabs.length + 1,
        title,
        tasks: [],
      };
      state.tabs.push(newTab);
      const $q = useQuasar();
      $q.notify({
        message: `Tab ${title} added`,
        color: 'success',
      });
    },
    addTask: (state: { tabs: { id: number; title: string; tasks: { id: number; title: string; description: string; done: boolean; createdAt: Date; updatedAt: Date; }[]; }[]; }, tabId: number, title: string, description: string) => {
      const newTask = {
        id: state.tabs.length + 1,
        title,
        description,
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const tab = state.tabs.find((tab) => tab.id === tabId);
      if (tab) {
        tab.tasks.push(newTask);
      }
    },
    updateTask: (state: { tabs: { id: number; title: string; tasks: { id: number; title: string; description: string; createdAt: Date; updatedAt: Date; }[]; }[]; }, tabId: number, taskId: number, title: string, description: string) => {
      const tab = state.tabs.find((tab) => tab.id === tabId);
      if (tab) {
        const task = tab.tasks.find((task) => task.id === taskId);
        if (task) {
          task.title = title;
          task.description = description;

          task.updatedAt = new Date();
        }
      }
    },
    updateTab: (state: { tabs: { id: number; title: string; tasks: never[]; }[]; }, tabId: number, title: string) => {
      const tab = state.tabs.find((tab) => tab.id === tabId);
      if (tab) {
        tab.title = title;
      }
    },
    deleteTab: (state: { tabs: { id: number; title: string; tasks: never[]; }[]; }, tabId: number) => {
      const tabIndex = state.tabs.findIndex((tab) => tab.id === tabId);
      if (tabIndex > -1) {
        state.tabs.splice(tabIndex, 1);
      }
    },
    deleteTask: (state: { tabs: { id: number; title: string; tasks: { id: number; title: string; description: string; done: boolean; createdAt: Date; updatedAt: Date; }[]; }[]; }, tabId: number, taskId: number) => {
      const tab = state.tabs.find((tab) => tab.id === tabId);
      if (tab) {
        const taskIndex = tab.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex > -1) {
          tab.tasks.splice(taskIndex, 1);
        }
      }
    },
    toggleTaskCompleted: (state: { tabs: { id: number; title: string; tasks: { id: number; title: string; description: string; done: boolean; createdAt: Date; updatedAt: Date; }[]; }[]; }, tabId: number, taskId: number) => {
      const tab = state.tabs.find((tab) => tab.id === tabId);
      if (tab) {
        const task = tab.tasks.find((task) => task.id === taskId);
        if (task) {
          task.done = !task.done;
          task.updatedAt = new Date();
        }
      }
    },
    clearTasks: (state: { tabs: { id: number; title: string; tasks: { id: number; title: string; description: string; done: boolean; createdAt: Date; updatedAt: Date; }[]; }[]; }, tabId: number) => {
      const tab = state.tabs.find((tab) => tab.id === tabId);
      if (tab) {
        tab.tasks = [];
      }
    },
  },
});
