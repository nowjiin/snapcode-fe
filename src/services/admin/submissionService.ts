import { axiosInstance } from '../../lib/axios';

export interface AdminSubmission {
  id: number;
  title: string;
  status: string;
  team_name: string;
  submitted_at: string;
  score?: number;
}

export interface GradingQueueItem {
  submission_id: number;
  status: string;
}

export const adminSubmissionService = {
  async getSubmissions(): Promise<AdminSubmission[]> {
    const response = await axiosInstance.get<AdminSubmission[]>(
      '/api/v1/admin/admin/submissions'
    );
    return response.data;
  },

  async getGradingQueue(): Promise<GradingQueueItem[]> {
    const response = await axiosInstance.get<GradingQueueItem[]>(
      '/api/v1/admin/admin/grading-queue'
    );
    return response.data;
  },

  async startGradingAll(): Promise<void> {
    await axiosInstance.post('/api/v1/admin/admin/start-grading-all');
  },

  async updateSubmissionStatus(
    submissionId: number,
    status: string
  ): Promise<void> {
    await axiosInstance.put(
      `/api/v1/admin/admin/submissions/${submissionId}/status`,
      { status }
    );
  },
};
