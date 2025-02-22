import { api } from 'src/boot/axios'

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface Task {
  id?: number
  title: string
  description: string
  status: TaskStatus
  createdAt?: string
  updatedAt?: string
}

export type CreateTaskDTO = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>

class TaskService {
  async getTaskById(id: number): Promise<Task> {
    return (await api.get<Task>(`/integrator-api/api/tasks/${id}`)).data
  }

  async updateTask(id: number, data: Partial<Task>): Promise<Task> {
    return (await api.put<Task>(`/integrator-api/api/tasks/${id}`, data)).data
  }

  async deleteTask(id: number): Promise<void> {
    await api.delete(`/integrator-api/api/tasks/${id}`)
  }

  async getAllTasks(): Promise<Task[]> {
    return (await api.get<Task[]>(`/integrator-api/api/tasks`)).data
  }

  async createTask(data: CreateTaskDTO): Promise<Task> {
    return (await api.post<Task>(`/integrator-api/api/tasks`, data)).data
  }
}

export default new TaskService()
