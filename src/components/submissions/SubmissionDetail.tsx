import { Button } from '../Button';
import { EvaluateButton } from '../EvaluateButton';

interface SubmissionDetailProps {
  submission: {
    submission_id: number;
    team_name: string;
    title: string;
    description: string;
    competition_name: string;
    submitted_at: string;
    status: string;
    score: number | null;
    feedback: string | null;
    repositories: string[];
    evaluation_criteria: string[];
    evaluation_result: string[] | null;
  };
  onBack: () => void;
}

export function SubmissionDetail({
  submission,
  onBack,
}: SubmissionDetailProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='font-pretendard text-[24px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
          제출 상세 정보
        </h2>
        <Button onClick={onBack} className='w-[120px] h-[40px] text-[16px]'>
          돌아가기
        </Button>
      </div>

      <div className='space-y-4'>
        <div>
          <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
            서비스명
          </h3>
          <p className='mt-1 text-[#6473A0]'>{submission.title}</p>
        </div>

        <div>
          <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
            팀명
          </h3>
          <p className='mt-1 text-[#6473A0]'>{submission.team_name}</p>
        </div>

        <div>
          <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
            서비스 설명
          </h3>
          <p className='mt-1 text-[#6473A0] whitespace-pre-wrap'>
            {submission.description}
          </p>
        </div>

        <div>
          <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
            평가 항목
          </h3>
          <div className='mt-2 flex gap-4'>
            {submission.evaluation_criteria.map((criteria) => (
              <EvaluateButton key={criteria} text={criteria} isActive={true} />
            ))}
          </div>
        </div>

        <div>
          <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
            레포지토리
          </h3>
          <div className='mt-2 space-y-2'>
            {submission.repositories.map((repo, index) => (
              <div
                key={index}
                className='p-4 rounded-lg border-[0.702px] border-[#6473A0] bg-[rgba(67,67,67,0.04)]'
              >
                <a
                  href={repo}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-[#6473A0] break-all hover:underline'
                >
                  {repo}
                </a>
              </div>
            ))}
          </div>
        </div>

        {submission.status === 'completed' && (
          <>
            <div>
              <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
                평가 점수
              </h3>
              <p className='mt-1 text-[#6473A0]'>{submission.score}점</p>
            </div>

            {submission.feedback && (
              <div>
                <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
                  피드백
                </h3>
                <p className='mt-1 text-[#6473A0] whitespace-pre-wrap'>
                  {submission.feedback}
                </p>
              </div>
            )}
          </>
        )}

        <div>
          <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
            제출일
          </h3>
          <p className='mt-1 text-[#6473A0]'>
            {formatDate(submission.submitted_at)}
          </p>
        </div>
      </div>
    </div>
  );
}
