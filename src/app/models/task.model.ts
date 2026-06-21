export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  assigneeId?: string;
  attachments?: Array<{ url: string; mime: string; size: number }>;
}
