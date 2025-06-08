import { axiosInstance } from '../../lib/axios';

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

export interface OpenAIModel {
  model_name: string;
  display_name: string;
  description?: string;
  max_tokens: number;
  is_default: boolean;
}

export interface OpenAIModelsResponse {
  success: boolean;
  current_model: string;
  available_models: OpenAIModel[];
  total_count: number;
}

export interface ModelStats {
  model_name: string;
  usage_count: number;
  avg_score: number;
  avg_tokens: number;
  avg_processing_time: number;
  total_tokens: number;
  first_used: string;
  last_used: string;
}

export interface OpenAIUsageStats {
  success: boolean;
  overall_stats: {
    total_evaluations: number;
    total_tokens_used: number;
    unique_models_used: number;
  };
  model_stats: ModelStats[];
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
    await axiosInstance.post(`${this.baseUrl}/start-evaluation`);
  }

  async getGradingQueue(): Promise<GradingQueueResponse> {
    const response = await axiosInstance.get<GradingQueueResponse>(
      `${this.baseUrl}/grading-queue`
    );
    return response.data;
  }

  // OpenAI related methods
  async getOpenAIModels(): Promise<OpenAIModelsResponse> {
    const response = await axiosInstance.get<OpenAIModelsResponse>(
      `${this.baseUrl}/openai/models`
    );
    return response.data;
  }

  async getCurrentOpenAIModel(): Promise<OpenAIModelsResponse> {
    const response = await axiosInstance.get<OpenAIModelsResponse>(
      `${this.baseUrl}/openai/current-model`
    );
    return response.data;
  }

  async changeOpenAIModel(modelName: string): Promise<void> {
    await axiosInstance.put(`${this.baseUrl}/openai/model`, {
      model_name: modelName,
    });
  }

  async clearConfigCache(): Promise<void> {
    await axiosInstance.post(`${this.baseUrl}/config/clear-cache`);
  }

  async getOpenAIUsageStats(): Promise<OpenAIUsageStats> {
    const response = await axiosInstance.get<OpenAIUsageStats>(
      `${this.baseUrl}/openai/usage-stats`
    );
    return response.data;
  }
}

export const adminService = new AdminService();
