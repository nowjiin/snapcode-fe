export interface Repository {
  type: string;
  repo_url: string;
}

export interface EvaluationCriteria {
  id: number;
  name: string;
}

export interface SubmissionRequest {
  team_name?: string;
  title: string;
  description: string;
  competition_name?: string;
  repositories: Repository[];
  evaluation_criteria: string[];
}

export interface SubmissionResponse {
  submission_id: number;
  team_name: string;
  title: string;
  description: string;
  competition_name: string;
  submitted_at: string;
  status: string;
  score: number | null;
  feedback: string | null;
  repositories: Repository[];
  evaluation_criteria: EvaluationCriteria[];
}
