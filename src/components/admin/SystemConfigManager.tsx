import { useState } from 'react';
import { Button } from '../common/Button';
import { adminService } from '../../services/openai/opneaiService';

export function SystemConfigManager() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleClearCache = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);
      await adminService.clearConfigCache();
      setSuccessMessage('시스템 설정 캐시가 성공적으로 클리어되었습니다.');
    } catch (err) {
      setError('캐시 클리어에 실패했습니다.');
      console.error('Failed to clear config cache:', err);
    } finally {
      setLoading(false);
    }
  };

  // Clear messages after 5 seconds
  const clearMessages = () => {
    setTimeout(() => {
      setError(null);
      setSuccessMessage(null);
    }, 5000);
  };

  // Clear messages when success or error occurs
  if (successMessage || error) {
    clearMessages();
  }

  return (
    <div className='space-y-6'>
      <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
        시스템 설정 관리
      </h3>

      <div className='p-6 rounded-lg border-[0.702px] border-[#6473A0] bg-[rgba(67,67,67,0.04)]'>
        <div className='mb-4'>
          <h4 className='font-pretendard text-[18px] font-medium text-[#6473A0] mb-2'>
            캐시 관리
          </h4>
          <p className='text-[#6473A0] text-sm mb-4'>
            시스템 설정 캐시를 클리어하여 최신 설정을 반영할 수 있습니다. 새로운
            설정이 적용되지 않을 때 사용하세요.
          </p>
        </div>

        <div className='flex items-center gap-4'>
          <Button
            onClick={handleClearCache}
            disabled={loading}
            className='w-[160px] h-[50px] text-[16px]'
          >
            {loading ? '처리 중...' : '캐시 클리어'}
          </Button>

          {error && (
            <div className='text-red-500 text-sm font-medium'>{error}</div>
          )}

          {successMessage && (
            <div className='text-green-600 text-sm font-medium'>
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
