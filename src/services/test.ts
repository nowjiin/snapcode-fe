import { axiosInstance } from '../lib/axios';

export interface TestUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface TestSubmission {
  id: number;
  title: string;
  status: string;
  team_name: string;
}

export interface GradingQueueItem {
  submission_id: number;
  status: string;
}

export const testService = {
  // User operations
  async getUsers(): Promise<TestUser[]> {
    const response = await axiosInstance.get<TestUser[]>('/api/v1/test/users');
    return response.data;
  },

  async createUser(data: Omit<TestUser, 'id'>): Promise<TestUser> {
    const response = await axiosInstance.post<TestUser>(
      '/api/v1/test/users',
      data
    );
    return response.data;
  },

  async getUser(userId: number): Promise<TestUser> {
    const response = await axiosInstance.get<TestUser>(
      `/api/v1/test/users/${userId}`
    );
    return response.data;
  },

  async updateUser(userId: number, data: Partial<TestUser>): Promise<TestUser> {
    const response = await axiosInstance.put<TestUser>(
      `/api/v1/test/users/${userId}`,
      data
    );
    return response.data;
  },

  async deleteUser(userId: number): Promise<void> {
    await axiosInstance.delete(`/api/v1/test/users/${userId}`);
  },

  // Admin operations
  async getAdminUsers(): Promise<TestUser[]> {
    const response = await axiosInstance.get<TestUser[]>(
      '/api/v1/test/admin/users'
    );
    return response.data;
  },

  async getAdminSubmissions(): Promise<TestSubmission[]> {
    const response = await axiosInstance.get<TestSubmission[]>(
      '/api/v1/test/admin/submissions'
    );
    return response.data;
  },

  async getGradingQueue(): Promise<GradingQueueItem[]> {
    const response = await axiosInstance.get<GradingQueueItem[]>(
      '/api/v1/test/admin/queue'
    );
    return response.data;
  },

  async addToGradingQueue(submissionId: number): Promise<void> {
    await axiosInstance.post(`/api/v1/test/admin/queue/${submissionId}`);
  },

  async updateSubmissionStatus(
    submissionId: number,
    status: string
  ): Promise<void> {
    await axiosInstance.put(
      `/api/v1/test/admin/submissions/${submissionId}/status`,
      { status }
    );
  },

  // Test data operations
  async createTestUsers(): Promise<void> {
    await axiosInstance.post('/api/v1/test/test-data/users');
  },

  async createTestSubmissions(): Promise<void> {
    await axiosInstance.post('/api/v1/test/test-data/submissions');
  },
};
