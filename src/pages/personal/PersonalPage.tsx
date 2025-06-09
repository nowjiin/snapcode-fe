import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  submissionService,
  type CreateSubmissionRequest,
  type Repository,
} from '../../services/submission/submissionService';
import { Title } from '../../components/submissions/Title';
import { InputBox } from '../../components/submissions/InputBox';
import { DescriptionInput } from '../../components/submissions/DescriptionInput';
import { GuidingBox } from '../../components/submissions/GuidingBox';
import { EvaluateButton } from '../../components/submissions/EvaluateButton';
import { Button } from '../../components/common/Button';
import { TerminalLoader } from '../../components/loaders/TerminalLoader';

// 평가 기준 매핑 (한글 표시 -> 영어 전송)
const EVALUATION_CRITERIA = [
  {
    display: '혁신성 & 시장 파괴력',
    value: 'Innovation & Market Disruption',
  },
  {
    display: '기술 우수성 & 코드 품질',
    value: 'Technical Excellence & Code Quality',
  },
  {
    display: '확장성 & 성장 잠재력',
    value: 'Scalability & Growth Potential',
  },
  {
    display: '제품 우수성 & 사용성',
    value: 'Product Excellence & UX',
  },
  {
    display: '경쟁 우위 & 경쟁력',
    value: 'Competitive Advantage & Moats',
  },
] as const;

export function PersonalPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateSubmissionRequest>({
    team_name: null,
    title: '',
    description: '',
    competition_name: 'default',
    repositories: [{ type: '', repo_url: '' }],
    evaluation_criteria: [],
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [activeButtons, setActiveButtons] = useState<Set<string>>(new Set());

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleButtonClick = (criteriaValue: string) => {
    setActiveButtons((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(criteriaValue)) {
        newSet.delete(criteriaValue);
      } else {
        newSet.add(criteriaValue);
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

      // Validate repository URLs
      const invalidRepo = formData.repositories.find(
        (repo) => !isValidUrl(repo.repo_url)
      );
      if (invalidRepo) {
        setError('올바른 URL 형식을 입력해주세요.');
        setLoading(false);
        return;
      }

      // Convert Set to Array for evaluation_criteria
      const evaluationCriteria = Array.from(activeButtons);

      const submissionData = {
        team_name: null,
        title: formData.title,
        description: formData.description,
        competition_name: 'default',
        repositories: formData.repositories.map((repo) => ({
          type: repo.type || 'string',
          repo_url: repo.repo_url,
        })),
        evaluation_criteria: evaluationCriteria,
      };

      // Create a minimum delay promise
      const minimumDelay = new Promise((resolve) => setTimeout(resolve, 1000));

      // Create the submission promise
      const submissionPromise =
        submissionService.createSubmission(submissionData);

      // Wait for both the minimum delay and submission to complete
      await Promise.all([minimumDelay, submissionPromise]);

      // Navigate to complete page with submission data
      navigate('/personal/complete', { state: { submissionData } });
    } catch (error: unknown) {
      console.error('Failed to submit:', error);
      setError('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <div className='space-y-8 pt-24'>
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

        {loading && <TerminalLoader status='제출중' />}

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

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4'>
              {EVALUATION_CRITERIA.map((criteria) => (
                <EvaluateButton
                  key={criteria.value}
                  onClick={() => handleButtonClick(criteria.value)}
                  text={criteria.display}
                  isActive={activeButtons.has(criteria.value)}
                />
              ))}
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
                className='inline-flex p-[11.226px_16.839px] items-center gap-[14.032px] rounded-[140.323px] border-[0.702px] border-[#6473A0] bg-[rgba(67,67,67,0.04)] text-[#6473A0] hover:bg-[rgba(67,67,67,0.08)] transition-all duration-200'
              >
                <div className='flex items-center gap-2'>
                  <div className='w-6 h-6 rounded-full border-[0.702px] border-[#6473A0] flex items-center justify-center transition-transform duration-300 group-hover:rotate-90'>
                    <svg
                      width='12'
                      height='12'
                      viewBox='0 0 12 12'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='transition-transform duration-300'
                    >
                      <path
                        d='M6 2.5V9.5M2.5 6H9.5'
                        stroke='#6473A0'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                  <span className='font-pretendard text-[15.435px] font-bold leading-[22.452px] tracking-[-0.386px] text-[#6473A0]'>
                    저장소 추가
                  </span>
                </div>
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
                      placeholder='https://example.com/'
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
            <Button
              type='submit'
              disabled={loading}
              onClick={handleSubmit}
              className='w-[180px] h-[60px] text-[20px] p-[10px]'
            >
              {loading ? '제출 중...' : 'Snap my code!'}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
