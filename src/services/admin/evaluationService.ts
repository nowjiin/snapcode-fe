import { axiosInstance } from '../../lib/axios';

export interface Ranking {
  team_name: string;
  score: number;
  rank: number;
}

export interface Statistics {
  total_submissions: number;
  graded_submissions: number;
  average_score: number;
  highest_score: number;
  lowest_score: number;
}

export const adminEvaluationService = {
  async startEvaluation(): Promise<void> {
    await axiosInstance.post('/api/v1/admin/admin/evaluation/start');
  },

  async getRankings(): Promise<Ranking[]> {
    const response = await axiosInstance.get<Ranking[]>(
      '/api/v1/admin/admin/evaluation/rankings'
    );
    return response.data;
  },

  async getStatistics(): Promise<Statistics> {
    const response = await axiosInstance.get<Statistics>(
      '/api/v1/admin/admin/evaluation/statistics'
    );
    return response.data;
  },
};
