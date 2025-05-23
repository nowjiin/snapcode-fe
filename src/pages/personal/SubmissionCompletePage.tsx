import { useLocation, useNavigate } from 'react-router-dom';
import { Title } from '../../components/Title';
import { GuidingBox } from '../../components/GuidingBox';
import { Button } from '../../components/Button';
import { EvaluateButton } from '../../components/EvaluateButton';
import type { CreateSubmissionRequest } from '../../services/submissionService';

export function SubmissionCompletePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const submissionData = location.state
    ?.submissionData as CreateSubmissionRequest;

  if (!submissionData) {
    navigate('/personal');
    return null;
  }

  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <div className='space-y-8'>
        <Title>제출이 완료되었습니다!</Title>

        <GuidingBox>
          제출하신 내용이 성공적으로 저장되었습니다.
          <br />
          평가 결과는 마이페이지에서 확인하실 수 있습니다.
        </GuidingBox>

        <div className='max-w-2xl space-y-6'>
          <div className='space-y-4'>
            <div>
              <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
                서비스명
              </h3>
              <p className='mt-1 text-[#6473A0]'>{submissionData.title}</p>
            </div>

            <div>
              <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
                서비스 설명
              </h3>
              <p className='mt-1 text-[#6473A0] whitespace-pre-wrap'>
                {submissionData.description}
              </p>
            </div>

            <div>
              <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
                평가 항목
              </h3>
              <div className='mt-2 flex gap-4'>
                {submissionData.evaluation_criteria.map((criteria) => (
                  <EvaluateButton
                    key={criteria}
                    text={criteria}
                    isActive={true}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
                레포지토리
              </h3>
              <div className='mt-2 space-y-2'>
                {submissionData.repositories.map((repo, index) => (
                  <div
                    key={index}
                    className='p-4 rounded-lg border-[0.702px] border-[#6473A0] bg-[rgba(67,67,67,0.04)]'
                  >
                    <p className='text-[#6473A0]'>타입: {repo.type}</p>
                    <p className='text-[#6473A0] break-all'>
                      URL: {repo.repo_url}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='flex gap-4 mt-8'>
            <Button onClick={() => navigate('/personal')}>
              새로운 제출하기
            </Button>
            <Button onClick={() => navigate('/mypage')}>
              마이페이지로 이동
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
