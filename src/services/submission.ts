import { axiosInstance } from '../lib/axios';
import type {
  SubmissionRequest,
  SubmissionResponse,
} from '../types/submission';

export const submissionService = {
  async submit(data: SubmissionRequest): Promise<SubmissionResponse> {
    const response = await axiosInstance.post<SubmissionResponse>(
      '/api/v1/submission/submit',
      data
    );
    return response.data;
  },

  async getSubmissions(): Promise<SubmissionResponse[]> {
    const response = await axiosInstance.get<SubmissionResponse[]>(
      '/api/v1/submission/list'
    );
    return response.data;
  },

  async getMySubmissions(): Promise<SubmissionResponse> {
    const response = await axiosInstance.get<SubmissionResponse>(
      '/api/v1/submissions/me'
    );
    return response.data;
  },

  async getSubmissionDetail(submissionId: string): Promise<SubmissionResponse> {
    const response = await axiosInstance.get<SubmissionResponse>(
      `/api/v1/submissions/${submissionId}`
    );
    return response.data;
  },
};
