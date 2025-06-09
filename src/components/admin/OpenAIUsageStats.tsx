import { useState, useEffect } from 'react';
import {
  adminService,
  type OpenAIUsageStats,
} from '../../services/openai/opneaiService';
import { PieChart } from './PieChart';

export function OpenAIUsageStats() {
  const [stats, setStats] = useState<OpenAIUsageStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch stats automatically on mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setError(null);
        const data = await adminService.getOpenAIUsageStats();
        setStats(data);
      } catch (err) {
        setError('사용량 통계를 불러오는데 실패했습니다.');
        console.error('Failed to fetch OpenAI usage stats:', err);
      }
    };

    fetchStats();
  }, []);

  const formatNumber = (num: number | undefined): string => {
    if (num === undefined) return '0';
    return num.toLocaleString();
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatProcessingTime = (time: number): string => {
    return `${time.toFixed(2)}초`;
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
          OpenAI 사용량 통계
        </h3>
      </div>

      {error ? (
        <div className='text-center text-red-500 py-8'>{error}</div>
      ) : stats ? (
        <div className='space-y-6'>
          {/* Overall Statistics */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div className='p-4 rounded-lg border-[0.702px] border-[#6473A0] bg-[rgba(67,67,67,0.04)]'>
              <h4 className='font-pretendard text-[18px] font-medium text-[#6473A0] mb-3'>
                전체 평가 수
              </h4>
              <div className='text-[#6473A0] font-medium text-2xl'>
                {formatNumber(stats.overall_stats.total_evaluations)}
              </div>
            </div>

            <div className='p-6 rounded-lg border-[0.702px] border-[#6473A0] bg-[rgba(67,67,67,0.04)] flex flex-col items-center'>
              <h4 className='font-pretendard text-[18px] font-medium text-[#6473A0] mb-4 text-center'>
                총 토큰 사용량
              </h4>
              <PieChart
                usedTokens={stats.overall_stats.total_tokens_used}
                totalTokens={Math.max(
                  100000,
                  stats.overall_stats.total_tokens_used * 1.2
                )}
                unit='tokens'
              />
            </div>

            <div className='p-4 rounded-lg border-[0.702px] border-[#6473A0] bg-[rgba(67,67,67,0.04)]'>
              <h4 className='font-pretendard text-[18px] font-medium text-[#6473A0] mb-3'>
                사용된 모델 수
              </h4>
              <div className='text-[#6473A0] font-medium text-2xl'>
                {formatNumber(stats.overall_stats.unique_models_used)}
              </div>
            </div>

            <div className='p-4 rounded-lg border-[0.702px] border-[#6473A0] bg-[rgba(67,67,67,0.04)]'>
              <h4 className='font-pretendard text-[18px] font-medium text-[#6473A0] mb-3'>
                평균 토큰/평가
              </h4>
              <div className='text-[#6473A0] font-medium text-2xl'>
                {formatNumber(
                  Math.round(
                    stats.overall_stats.total_tokens_used /
                      stats.overall_stats.total_evaluations
                  )
                )}
              </div>
            </div>
          </div>

          {/* Model Statistics */}
          <div>
            <h4 className='font-pretendard text-[20px] font-medium text-[#6473A0] mb-4'>
              모델별 상세 통계
            </h4>
            <div className='space-y-4'>
              {stats.model_stats.map((modelStat) => (
                <div
                  key={modelStat.model_name}
                  className='p-6 rounded-lg border-[0.702px] border-[#6473A0] bg-[rgba(67,67,67,0.04)]'
                >
                  <div className='flex justify-between items-start mb-4'>
                    <h5 className='font-pretendard text-[18px] font-medium text-[#6473A0]'>
                      {modelStat.model_name}
                    </h5>
                  </div>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    <div>
                      <span className='text-[#6473A0] text-sm block'>
                        사용 횟수
                      </span>
                      <span className='text-[#6473A0] font-medium'>
                        {formatNumber(modelStat.usage_count)}회
                      </span>
                    </div>
                    <div>
                      <span className='text-[#6473A0] text-sm block'>
                        평균 점수
                      </span>
                      <span className='text-[#6473A0] font-medium'>
                        {modelStat.avg_score.toFixed(1)}점
                      </span>
                    </div>
                    <div>
                      <span className='text-[#6473A0] text-sm block'>
                        평균 토큰
                      </span>
                      <span className='text-[#6473A0] font-medium'>
                        {formatNumber(Math.round(modelStat.avg_tokens))}
                      </span>
                    </div>
                    <div>
                      <span className='text-[#6473A0] text-sm block'>
                        평균 처리 시간
                      </span>
                      <span className='text-[#6473A0] font-medium'>
                        {formatProcessingTime(modelStat.avg_processing_time)}
                      </span>
                    </div>
                  </div>
                  <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div>
                      <span className='text-[#6473A0] text-sm block'>
                        총 토큰
                      </span>
                      <span className='text-[#6473A0] font-medium'>
                        {formatNumber(modelStat.total_tokens)}
                      </span>
                    </div>
                    <div>
                      <span className='text-[#6473A0] text-sm block'>
                        첫 사용
                      </span>
                      <span className='text-[#6473A0] font-medium'>
                        {formatDate(modelStat.first_used)}
                      </span>
                    </div>
                    <div>
                      <span className='text-[#6473A0] text-sm block'>
                        최근 사용
                      </span>
                      <span className='text-[#6473A0] font-medium'>
                        {formatDate(modelStat.last_used)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='text-center text-[#6473A0] py-8'>
          통계를 불러오는 중...
        </div>
      )}
    </div>
  );
}
