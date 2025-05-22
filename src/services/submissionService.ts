import { axiosInstance } from '../lib/axios';

export interface Repository {
  type: string;
  repo_url: string;
}

export interface Submission {
  id: number;
  team_name: string;
  title: string;
  description: string;
  competition_name: string;
  repositories: Repository[];
  evaluation_criteria: string[];
  status: string;
  score?: number;
  submitted_at: string;
}

export interface CreateSubmissionRequest {
  team_name: string;
  title: string;
  description: string;
  competition_name: string;
  repositories: Repository[];
  evaluation_criteria: string[];
}

export const submissionService = {
  async createSubmission(data: CreateSubmissionRequest): Promise<Submission> {
    const response = await axiosInstance.post<Submission>(
      '/api/v1/submission/submit',
      data
    );
    return response.data;
  },

  async getMySubmissions(): Promise<Submission[]> {
    const response = await axiosInstance.get<Submission[]>(
      '/api/v1/submissions/me'
    );
    return response.data;
  },
};
