export interface Users {
  id?: string;
  email: string | null | undefined;
  name: string;
  password: string;
  role?: 'admin' | 'project_admin' | 'member';
}

export interface User {
  email: string | null | undefined;
  password: string;
}

export interface AuthUser {
  id?: string;
  email: string | null | undefined;
  name: string;
  role: 'admin' | 'project_admin' | 'member';
}

export interface AuthResponse {
  token: string;
  user?: AuthUser;
}
