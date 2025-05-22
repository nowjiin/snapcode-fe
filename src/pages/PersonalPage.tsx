import { useState } from 'react';
import {
  submissionService,
  type CreateSubmissionRequest,
  type Repository,
} from '../services/submissionService';
import { Title } from '../components/Title';
import { InputBox } from '../components/InputBox';
import { DescriptionInput } from '../components/DescriptionInput';
import { GuidingBox } from '../components/GuidingBox';
import { EvaluateButton } from '../components/EvaluateButton';
import { Button } from '../components/Button';

export function PersonalPage() {
  const [formData, setFormData] = useState<CreateSubmissionRequest>({
    team_name: '',
    title: '',
    description: '',
    competition_name: 'default',
    repositories: [{ type: '', repo_url: '' }],
    evaluation_criteria: [],
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeButtons, setActiveButtons] = useState<Set<string>>(new Set());

  const handleButtonClick = (buttonName: string) => {
    setActiveButtons((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(buttonName)) {
        newSet.delete(buttonName);
      } else {
        newSet.add(buttonName);
      }
      return newSet;
    });
  };

  const handleRepositoryChange = (
    index: number,
    field: keyof Repository,
    value: string
  ) => {
    const newRepositories = [...formData.repositories];
    newRepositories[index] = { ...newRepositories[index], [field]: value };
    setFormData({ ...formData, repositories: newRepositories });
  };

  const addRepository = () => {
    setFormData({
      ...formData,
      repositories: [...formData.repositories, { type: '', repo_url: '' }],
    });
  };

  const removeRepository = (index: number) => {
    const newRepositories = formData.repositories.filter((_, i) => i !== index);
    setFormData({ ...formData, repositories: newRepositories });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');
      const submissionData = {
        ...formData,
        evaluation_criteria: Array.from(activeButtons),
      };
      await submissionService.createSubmission(submissionData);
      setSuccess(true);
      // Reset form
      setFormData({
        team_name: '',
        title: '',
        description: '',
        competition_name: 'default',
        repositories: [{ type: '', repo_url: '' }],
        evaluation_criteria: [],
      });
      setActiveButtons(new Set());
    } catch (error: unknown) {
      console.error('Failed to submit:', error);
      setError('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <div className='space-y-8'>
        <Title>Snap your code!</Title>

        <GuidingBox>
          서비스의 개요를 작성할 수 있습니다.
          <br />
          설명은 구체적일수록 꼼꼼한 평가를 받을 수 있습니다.
        </GuidingBox>

        {error && (
          <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative'>
            {error}
          </div>
        )}

        {success && (
          <div className='bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded relative'>
            Submission successful!
          </div>
        )}

        <div className='max-w-2xl space-y-6'>
          <InputBox
            title='서비스명'
            value={formData.title}
            onChange={(value) => setFormData({ ...formData, title: value })}
            required
            placeholder='서비스명을 입력해주세요.(최대 100자)'
            maxLength={100}
          />

          <DescriptionInput
            title='서비스 설명'
            value={formData.description}
            onChange={(value) =>
              setFormData({ ...formData, description: value })
            }
            placeholder='서비스에 대한 간단한 설명을 입력해주세요.(최대 1000자)'
            maxLength={1000}
            required
          />

          <GuidingBox>
            평가 항목을 선택하고 1개 이상의 레포지토리 URL을 입력할 수 있습니다.
            <br />
            URL 형식이 올바른지 꼭 체크해주세요!
          </GuidingBox>

          <div className='space-y-4'>
            <div className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0] flex items-start'>
              <span className='align-top'>평가 항목</span>
              <span className='text-red-500 text-[8px] ml-1 leading-none align-top'>
                *
              </span>
            </div>

            <div className='flex gap-4'>
              <EvaluateButton
                onClick={() => handleButtonClick('codeQuality')}
                text='Code Quality'
                isActive={activeButtons.has('codeQuality')}
              />
              <EvaluateButton
                onClick={() => handleButtonClick('projectStructure')}
                text='Project Structure'
                isActive={activeButtons.has('projectStructure')}
              />
              <EvaluateButton
                onClick={() => handleButtonClick('creativity')}
                text='Creativity'
                isActive={activeButtons.has('creativity')}
              />
            </div>
          </div>

          <div className='space-y-6'>
            <div className='flex justify-between items-center'>
              <div className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0] flex items-start'>
                <span className='align-top'>레포지토리</span>
                <span className='text-red-500 text-[8px] ml-1 leading-none align-top'>
                  *
                </span>
              </div>
              <button
                type='button'
                onClick={addRepository}
                className='inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                저장소 추가
              </button>
            </div>

            <div className='space-y-4'>
              {formData.repositories.map((repo, index) => (
                <div key={index} className='flex gap-4'>
                  <div className='flex-1'>
                    <InputBox
                      title='저장소 타입'
                      value={repo.type}
                      onChange={(value) =>
                        handleRepositoryChange(index, 'type', value)
                      }
                      placeholder='저장소 타입을 입력해주세요.'
                      required
                    />
                  </div>
                  <div className='flex-1'>
                    <InputBox
                      title='저장소 URL'
                      value={repo.repo_url}
                      onChange={(value) =>
                        handleRepositoryChange(index, 'repo_url', value)
                      }
                      placeholder='저장소 URL을 입력해주세요.'
                      required
                    />
                  </div>
                  {formData.repositories.length > 1 && (
                    <button
                      type='button'
                      onClick={() => removeRepository(index)}
                      className='self-end mb-2 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                    >
                      삭제
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className='flex justify-start mt-8'>
            <Button type='submit' disabled={loading} onClick={handleSubmit}>
              {loading ? '제출 중...' : 'Snap my code!'}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
