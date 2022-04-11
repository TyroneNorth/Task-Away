export type Tasks = {
  id: number;
  name: string;
  description: string;
  completed: boolean;
}

export type Tab = {
  id: number;
  name: string;
  tasks: Tasks[];
};

export type User = {
  id: number
  email: string;
  tabs: Tab[];
};
