declare interface Credentials {
  email?: string | undefined;
  password?: string | undefined;
  full_name?: string | undefined;
  provider?: 'bitbucket' | 'github' | 'gitlab' | 'google' | undefined;
}

declare interface Tasks {
  task_id?: number;
  title: string;
  content: string;
  is_completed?: boolean;
}

declare interface Identity {
  created_at?: unknown;
  id?: string;
  identity_data?: { sub: string };
  last_sign_in_at?: unknown;
  provider?: string;
  updated_at?: unknown;
  user_id?: string;
}
declare interface User {
  id?: string;
  aud?: string;
  email?: string;
  full_name?: string;
  role?: string;
  email_confirmed_at?: unknown;
  phone?: string;
  confirmed_at?: unknown;
  last_sign_in_at?: unknown;
  identities?: Identity[];
  updated_at?: unknown;
  tasks?: Tasks[];
}

export type { Credentials, Tasks, Identity, User };
