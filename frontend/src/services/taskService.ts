import api from './api';

export type TaskOperation = 'uppercase' | 'lowercase' | 'reverse_string' | 'word_count';
export type TaskStatus = 'pending' | 'running' | 'success' | 'failed';

export interface Task {
  _id: string;
  title: string;
  inputText: string;
  operation: TaskOperation;
  status: TaskStatus;
  result?: string;
  logs: Array<{ message: string; timestamp: string }>;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskPayload {
  title: string;
  inputText: string;
  operation: TaskOperation;
}

export const taskService = {
  async createTask(data: CreateTaskPayload): Promise<Task> {
    const res = await api.post('/tasks', data);
    return res.data;
  },

  async getTasks(): Promise<Task[]> {
    const res = await api.get('/tasks');
    return res.data;
  },

  async getTask(id: string): Promise<Task> {
    const res = await api.get(`/tasks/${id}`);
    return res.data;
  },

  async runTask(id: string): Promise<Task> {
    const res = await api.post(`/tasks/${id}/run`);
    return res.data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};
