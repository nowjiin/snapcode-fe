import { OpenAIModelSelector } from './OpenAIModelSelector';
import { OpenAIUsageStats } from './OpenAIUsageStats';
import { SystemConfigManager } from './SystemConfigManager';

export function OpenAIManagementSection() {
  return (
    <div className='space-y-8'>
      <h2 className='font-pretendard text-[24px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
        OpenAI 관리
      </h2>

      <div className='grid grid-cols-1 gap-8'>
        <OpenAIModelSelector />
        <OpenAIUsageStats />
        <SystemConfigManager />
      </div>
    </div>
  );
}
