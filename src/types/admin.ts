export type UserRole = 'admin' | 'user' | 'judge';

export interface User {
  id: number;
  email: string;
  username: string;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
}

export interface CreateUserRequest {
  email: string;
  username: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserRequest {
  email?: string;
  username?: string;
  password?: string;
  role?: UserRole;
}

export interface AssignRoleRequest {
  role: UserRole;
}

export interface UsersResponse {
  users: User[];
}

export interface UserResponse {
  user: User;
}

export interface AdminSubmission {
  id: number;
  user_id: number;
  problem_id: number;
  code: string;
  language: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: {
    score: number;
    execution_time: number;
    memory_usage: number;
    test_cases: {
      id: number;
      status: 'passed' | 'failed';
      execution_time: number;
      memory_usage: number;
      error_message?: string;
    }[];
  };
  created_at: string;
  updated_at: string;
}

export interface GradingQueueItem {
  id: number;
  submission_id: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface Ranking {
  user_id: number;
  username: string;
  total_score: number;
  solved_problems: number;
  rank: number;
}

export interface Statistics {
  total_users: number;
  total_submissions: number;
  total_problems: number;
  average_score: number;
  submissions_by_status: {
    pending: number;
    running: number;
    completed: number;
    failed: number;
  };
  submissions_by_language: {
    [key: string]: number;
  };
}
