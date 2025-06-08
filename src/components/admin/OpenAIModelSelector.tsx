import { useState } from 'react';
import { Button } from '../common/Button';
import {
  adminService,
  type OpenAIModel,
} from '../../services/openai/opneaiService';

interface OpenAIModelSelectorProps {
  onModelChange?: (model: OpenAIModel) => void;
}

export function OpenAIModelSelector({
  onModelChange,
}: OpenAIModelSelectorProps) {
  const [models, setModels] = useState<OpenAIModel[]>([]);
  const [currentModelName, setCurrentModelName] = useState<string>('');
  const [selectedModelName, setSelectedModelName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetchedModels, setHasFetchedModels] = useState(false);

  const fetchModels = async () => {
    try {
      setLoading(true);
      setError(null);
      const modelsData = await adminService.getOpenAIModels();
      setModels(modelsData.available_models);
      setCurrentModelName(modelsData.current_model);
      setSelectedModelName(modelsData.current_model);
      setHasFetchedModels(true);
    } catch (err) {
      setError('모델 정보를 불러오는데 실패했습니다.');
      console.error('Failed to fetch OpenAI models:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleModelChange = async () => {
    if (!selectedModelName || selectedModelName === currentModelName) return;

    try {
      setLoading(true);
      setError(null);
      await adminService.changeOpenAIModel(selectedModelName);

      const newCurrentModel = models.find(
        (model) => model.model_name === selectedModelName
      );
      if (newCurrentModel) {
        setCurrentModelName(selectedModelName);
        onModelChange?.(newCurrentModel);
      }

      alert('모델이 성공적으로 변경되었습니다.');
    } catch (err) {
      setError('모델 변경에 실패했습니다.');
      console.error('Failed to change OpenAI model:', err);
    } finally {
      setLoading(false);
    }
  };

  const isModelChanged = selectedModelName !== currentModelName;
  const currentModel = models.find(
    (model) => model.model_name === currentModelName
  );

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
          OpenAI 모델 관리
        </h3>
        <Button
          onClick={fetchModels}
          disabled={loading}
          className='w-[150px] h-[50px] text-[16px]'
        >
          모델 조회
        </Button>
      </div>

      {!hasFetchedModels ? (
        <div className='text-center text-[#6473A0] py-8'>
          모델 조회 버튼을 눌러주세요.
        </div>
      ) : error ? (
        <div className='text-center text-red-500 py-8'>{error}</div>
      ) : (
        <div className='space-y-4'>
          <div className='p-4 rounded-lg border-[0.702px] border-[#6473A0] bg-[rgba(67,67,67,0.04)]'>
            <div className='mb-4'>
              <label className='block text-[#6473A0] font-medium mb-2'>
                현재 모델: {currentModel?.display_name || '알 수 없음'}
              </label>
            </div>

            <div className='mb-4'>
              <label className='block text-[#6473A0] font-medium mb-2'>
                변경할 모델 선택:
              </label>
              <select
                value={selectedModelName}
                onChange={(e) => setSelectedModelName(e.target.value)}
                disabled={loading}
                className='w-full p-3 border border-[#6473A0] rounded-md bg-white text-[#6473A0] focus:outline-none focus:ring-2 focus:ring-[#6473A0]'
              >
                {models.map((model) => (
                  <option key={model.model_name} value={model.model_name}>
                    {model.display_name}{' '}
                    {model.description && `- ${model.description}`}
                  </option>
                ))}
              </select>
            </div>

            <Button
              onClick={handleModelChange}
              disabled={loading || !isModelChanged}
              className='w-[140px] h-[50px] text-[16px]'
            >
              모델 변경
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
