import { axiosInstance } from '../lib/axios';

export interface User {
  id: number;
  email: string;
  role: string;
  created_at: string;
}

export interface GradingQueueItem {
  submission_id: number;
  team_name: string;
  title: string;
  status: string;
  queued_at: string;
  user_id: number;
}

export interface GradingQueueResponse {
  total: number;
  queue: GradingQueueItem[];
}

class AdminService {
  private baseUrl = '/api/v1/admin';

  async getUsers(): Promise<User[]> {
    const response = await axiosInstance.get<User[]>(`${this.baseUrl}/users`);
    return response.data;
  }

  async startGradingAll(): Promise<void> {
    await axiosInstance.post(`${this.baseUrl}/start-grading-all`);
  }

  async startEvaluation(): Promise<void> {
    await axiosInstance.post(`${this.baseUrl}/evaluation/start`);
  }

  async getGradingQueue(): Promise<GradingQueueResponse> {
    const response = await axiosInstance.get<GradingQueueResponse>(
      `${this.baseUrl}/admin/grading-queue`
    );
    return response.data;
  }
}

export const adminService = new AdminService();
