import { axiosInstance } from '../../lib/axios';

export interface Repository {
  type: string;
  repo_url: string;
}

export interface CreateSubmissionRequest {
  team_name: string | null;
  title: string;
  description: string;
  competition_name: string;
  repositories: Repository[];
  evaluation_criteria: string[];
}

export interface CriteriaResult {
  name: string;
  score: number;
  feedback?: string;
  improvements: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface EvaluationResult {
  status: string;
  total_score: number | null;
  code_summary: string;
  criteria_results: CriteriaResult[];
}

export interface Submission {
  submission_id: number;
  team_name: string | null;
  title: string;
  description: string;
  competition_name: string;
  submitted_at: string;
  status: string;
  score: number | null;
  feedback: string | null;
  repositories: Repository[];
  evaluation_criteria: string[];
  evaluation_result: EvaluationResult | null;
}

export interface SubmissionListItem {
  submission_id: number;
  team_name: string | null;
  title: string;
  description: string;
  competition_name: string;
  submitted_at: string;
  status: string;
  score: number | null;
  repositories: Repository[];
}

export interface MySubmissionsResponse {
  submissions: SubmissionListItem[];
}

class SubmissionService {
  private baseUrl = '/api/v1';

  async createSubmission(data: CreateSubmissionRequest): Promise<Submission> {
    const response = await axiosInstance.post<Submission>(
      `${this.baseUrl}/submission/submit`,
      data
    );
    return response.data;
  }

  async getMySubmissions(): Promise<MySubmissionsResponse> {
    const response = await axiosInstance.get<MySubmissionsResponse>(
      `${this.baseUrl}/submissions/me`
    );
    return response.data;
  }

  async getSubmissionDetail(submissionId: number): Promise<Submission> {
    const response = await axiosInstance.get<Submission>(
      `${this.baseUrl}/submissions/${submissionId}`
    );
    return response.data;
  }
}

export const submissionService = new SubmissionService();
