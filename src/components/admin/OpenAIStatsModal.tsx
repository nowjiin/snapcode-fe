import { type OpenAIUsageStats } from '../../services/openai/opneaiService';
import { PieChart } from './PieChart';

interface OpenAIStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: OpenAIUsageStats | null;
}

export function OpenAIStatsModal({
  isOpen,
  onClose,
  stats,
}: OpenAIStatsModalProps) {
  if (!isOpen || !stats) return null;

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
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black bg-opacity-50'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='relative bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex justify-between items-center p-6 border-b border-gray-200'>
          <h2 className='font-pretendard text-[24px] font-bold text-[#6473A0]'>
            OpenAI 사용량 상세 통계
          </h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 text-2xl font-bold'
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className='p-6 space-y-8'>
          {/* Overall Statistics */}
          <div>
            <h3 className='font-pretendard text-[20px] font-semibold text-[#6473A0] mb-4'>
              전체 통계
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
              <div className='p-4 rounded-lg border-[0.702px] border-[#6473A0] bg-[rgba(67,67,67,0.04)]'>
                <h4 className='font-pretendard text-[16px] font-medium text-[#6473A0] mb-2'>
                  전체 평가 수
                </h4>
                <div className='text-[#6473A0] font-bold text-2xl'>
                  {formatNumber(stats.overall_stats.total_evaluations)}
                </div>
              </div>

              <div className='p-6 rounded-lg border-[0.702px] border-[#6473A0] bg-[rgba(67,67,67,0.04)] flex flex-col items-center'>
                <h4 className='font-pretendard text-[16px] font-medium text-[#6473A0] mb-3 text-center'>
                  총 토큰 사용량
                </h4>
                <PieChart
                  usedTokens={stats.overall_stats.total_tokens_used}
                  totalTokens={Math.max(
                    50000,
                    stats.overall_stats.total_tokens_used * 1.2
                  )}
                  unit='tokens'
                />
              </div>

              <div className='p-4 rounded-lg border-[0.702px] border-[#6473A0] bg-[rgba(67,67,67,0.04)]'>
                <h4 className='font-pretendard text-[16px] font-medium text-[#6473A0] mb-2'>
                  사용된 모델 수
                </h4>
                <div className='text-[#6473A0] font-bold text-2xl'>
                  {formatNumber(stats.overall_stats.unique_models_used)}
                </div>
              </div>

              <div className='p-4 rounded-lg border-[0.702px] border-[#6473A0] bg-[rgba(67,67,67,0.04)]'>
                <h4 className='font-pretendard text-[16px] font-medium text-[#6473A0] mb-2'>
                  평균 토큰/평가
                </h4>
                <div className='text-[#6473A0] font-bold text-2xl'>
                  {formatNumber(
                    Math.round(
                      stats.overall_stats.total_tokens_used /
                        stats.overall_stats.total_evaluations
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Model Statistics */}
          <div>
            <h3 className='font-pretendard text-[20px] font-semibold text-[#6473A0] mb-4'>
              모델별 상세 통계
            </h3>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {stats.model_stats.map((modelStat) => (
                <div
                  key={modelStat.model_name}
                  className='p-6 rounded-lg border-[0.702px] border-[#6473A0] bg-[rgba(67,67,67,0.04)]'
                >
                  <div className='flex justify-between items-start mb-4'>
                    <h4 className='font-pretendard text-[18px] font-semibold text-[#6473A0]'>
                      {modelStat.model_name}
                    </h4>
                    <div className='text-right'>
                      <div className='text-[#6473A0] text-sm'>총 토큰</div>
                      <div className='text-[#6473A0] font-bold text-lg'>
                        {formatNumber(modelStat.total_tokens)}
                      </div>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4 mb-4'>
                    <div className='bg-white/50 p-3 rounded'>
                      <span className='text-[#6473A0] text-sm block'>
                        사용 횟수
                      </span>
                      <span className='text-[#6473A0] font-semibold text-lg'>
                        {formatNumber(modelStat.usage_count)}회
                      </span>
                    </div>
                    <div className='bg-white/50 p-3 rounded'>
                      <span className='text-[#6473A0] text-sm block'>
                        평균 점수
                      </span>
                      <span className='text-[#6473A0] font-semibold text-lg'>
                        {modelStat.avg_score.toFixed(1)}점
                      </span>
                    </div>
                    <div className='bg-white/50 p-3 rounded'>
                      <span className='text-[#6473A0] text-sm block'>
                        평균 토큰
                      </span>
                      <span className='text-[#6473A0] font-semibold text-lg'>
                        {formatNumber(Math.round(modelStat.avg_tokens))}
                      </span>
                    </div>
                    <div className='bg-white/50 p-3 rounded'>
                      <span className='text-[#6473A0] text-sm block'>
                        평균 처리 시간
                      </span>
                      <span className='text-[#6473A0] font-semibold text-lg'>
                        {formatProcessingTime(modelStat.avg_processing_time)}
                      </span>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200'>
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

        {/* Footer */}
        <div className='p-6 border-t border-gray-200 flex justify-end'>
          <button
            onClick={onClose}
            className='px-6 py-2 bg-[#6473A0] text-white rounded-lg hover:bg-[#5a6696] transition-colors font-pretendard'
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
