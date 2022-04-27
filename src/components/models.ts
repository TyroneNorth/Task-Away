declare interface Credentials {
  email?: string | undefined;
  password?: string | undefined;
  provider?: 'bitbucket' | 'github' | 'gitlab' | 'google' | undefined;
}

declare interface Tasks {
  id: number;
  title: string;
  content: string;
  is_completed: boolean;
}

declare interface PartialTasks {
  title: string;
}

declare interface UpdatePartialTasks {
  id: number;
  title: string;
  content: string;
}

export type { Credentials, Tasks, PartialTasks, UpdatePartialTasks };
