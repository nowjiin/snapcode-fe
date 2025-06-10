import { axiosInstance } from '../../lib/axios';

export interface AdminSubmission {
  submission_id: number;
  team_name: string;
  title: string;
  description: string;
  competition_name: string;
  submitted_at: string;
  status: string;
  user_id: number;
  repositories: Array<{
    type: string;
    repo_url: string;
  }>;
  evaluation_criteria: string[];
  evaluation_result: {
    status: string;
    total_score: number | null;
    criteria_results: Array<{
      name: string;
      score: number;
    }>;
  };
}

export interface GradingQueueItem {
  submission_id: number;
  status: string;
}

const baseUrl = '/api/v1/admin';

export const adminSubmissionService = {
  async getAllSubmissions(): Promise<AdminSubmission[]> {
    const response = await axiosInstance.get<AdminSubmission[]>(
      `${baseUrl}/submissions`
    );
    return response.data;
  },

  // Keep the old method for backward compatibility
  async getSubmissions(): Promise<AdminSubmission[]> {
    return this.getAllSubmissions();
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
