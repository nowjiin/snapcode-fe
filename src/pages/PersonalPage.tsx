import { Title } from '../components/Title';
import { InputBox } from '../components/InputBox';
import { DescriptionInput } from '../components/DescriptionInput';
import { GuidingBox } from '../components/GuidingBox';
import { EvaluateButton } from '../components/EvaluateButton';
import { Button } from '../components/Button';
import { useState } from 'react';
import { submissionService } from '../services/submission';
import type { SubmissionRequest, Repository } from '../types/submission';

export function PersonalPage() {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [activeButtons, setActiveButtons] = useState<Set<string>>(new Set());
  const [repositories, setRepositories] = useState<Repository[]>([
    { type: '', repo_url: '' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

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

  const handleAddRepository = () => {
    setRepositories([...repositories, { type: '', repo_url: '' }]);
  };

  const handleRemoveRepository = (index: number) => {
    if (repositories.length > 1) {
      setRepositories(repositories.filter((_, i) => i !== index));
    }
  };

  const handleRepositoryChange = (
    index: number,
    field: keyof Repository,
    value: string
  ) => {
    const newRepositories = [...repositories];
    newRepositories[index] = { ...newRepositories[index], [field]: value };
    setRepositories(newRepositories);
  };

  const isFormValid = () => {
    const hasValidRepositories = repositories.some(
      (repo) => repo.type.trim() !== '' && repo.repo_url.trim() !== ''
    );
    return (
      projectName.trim() !== '' &&
      description.trim() !== '' &&
      hasValidRepositories &&
      activeButtons.size > 0
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    setError('');
    setIsLoading(true);

    const data: SubmissionRequest = {
      team_name: 'default',
      title: projectName,
      description: description,
      competition_name: 'default',
      repositories: repositories.filter(
        (repo) => repo.type.trim() !== '' && repo.repo_url.trim() !== ''
      ),
      evaluation_criteria: Array.from(activeButtons),
    };

    try {
      await submissionService.submit(data);
      alert('프로젝트가 성공적으로 제출되었습니다!');
      // Reset form
      setProjectName('');
      setDescription('');
      setActiveButtons(new Set());
      setRepositories([{ type: '', repo_url: '' }]);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message: string } } };
      setError(
        error.response?.data?.message || '프로젝트 제출 중 오류가 발생했습니다.'
      );
    } finally {
      setIsLoading(false);
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

        <div className='max-w-2xl space-y-6'>
          <InputBox
            title='서비스명'
            value={projectName}
            onChange={setProjectName}
            required
            placeholder='서비스명을 입력해주세요.(최대 100자)'
            maxLength={100}
          />
        </div>

        <DescriptionInput
          title='서비스 설명'
          value={description}
          onChange={setDescription}
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
              onClick={handleAddRepository}
              className='inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              저장소 추가
            </button>
          </div>

          <div className='space-y-4'>
            {repositories.map((repo, index) => (
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
                {repositories.length > 1 && (
                  <button
                    type='button'
                    onClick={() => handleRemoveRepository(index)}
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
            disabled={!isFormValid() || isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? '제출 중...' : 'Snap my code!'}
          </Button>
        </div>
      </div>
    </main>
  );
}
