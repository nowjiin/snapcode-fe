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

const baseUrl = '/api/v1/admin';

export const adminSubmissionService = {
  async getSubmissions(): Promise<AdminSubmission[]> {
    const response = await axiosInstance.get<AdminSubmission[]>(
      `${baseUrl}/submissions`
    );
    return response.data;
  },

  async getGradingQueue(): Promise<GradingQueueItem[]> {
    const response = await axiosInstance.get<GradingQueueItem[]>(
      `${baseUrl}/grading-queue`
    );
    return response.data;
  },

  async startGradingAll(): Promise<void> {
    await axiosInstance.post(`${baseUrl}/start-grading-all`);
  },

  async updateSubmissionStatus(
    submissionId: number,
    status: string
  ): Promise<void> {
    await axiosInstance.put(`${baseUrl}/submissions/${submissionId}/status`, {
      status,
    });
  },
};
