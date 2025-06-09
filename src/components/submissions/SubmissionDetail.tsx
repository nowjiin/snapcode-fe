import { Button } from '../common/Button';
import { EvaluateButton } from './EvaluateButton';
import type { Submission } from '../../services/submission/submissionService';

interface SubmissionDetailProps {
  submission: Submission;
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

  const hasEvaluationResults =
    submission.evaluation_result?.criteria_results &&
    submission.evaluation_result.criteria_results.length > 0;

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

      <div className='space-y-6'>
        <div>
          <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
            서비스명
          </h3>
          <p className='mt-1 text-[#6473A0]'>{submission.title}</p>
        </div>

        {submission.team_name && (
          <div>
            <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
              팀명
            </h3>
            <p className='mt-1 text-[#6473A0]'>{submission.team_name}</p>
          </div>
        )}

        {submission.competition_name &&
          submission.competition_name !== 'default' && (
            <div>
              <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
                대회명
              </h3>
              <p className='mt-1 text-[#6473A0]'>
                {submission.competition_name}
              </p>
            </div>
          )}

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
                <div className='flex items-center gap-2 mb-2'>
                  <span className='px-2 py-1 text-xs rounded bg-[#6473A0] text-white font-medium'>
                    {repo.type}
                  </span>
                </div>
                <a
                  href={repo.repo_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-[#6473A0] break-all hover:underline'
                >
                  {repo.repo_url}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* 평가 상태 */}
        {submission.evaluation_result?.status && (
          <div>
            <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
              평가 상태
            </h3>
            <p className='mt-1 text-[#6473A0]'>
              {submission.evaluation_result.status === 'waiting'
                ? '평가 대기중'
                : submission.evaluation_result.status === 'completed'
                ? '평가 완료'
                : submission.evaluation_result.status}
            </p>
          </div>
        )}

        {/* 총 점수 */}
        {(submission.score !== null ||
          submission.evaluation_result?.total_score !== null) && (
          <div>
            <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
              총 점수
            </h3>
            <p className='mt-1 text-[#6473A0] text-2xl font-semibold'>
              {submission.score || submission.evaluation_result?.total_score}점
            </p>
          </div>
        )}

        {/* 코드 요약 */}
        {submission.evaluation_result?.code_summary && (
          <div>
            <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
              코드 요약
            </h3>
            <div className='mt-2 p-4 rounded-lg border border-[#6473A0] bg-gray-50/50'>
              <p className='text-[#6473A0] leading-relaxed'>
                {submission.evaluation_result.code_summary}
              </p>
            </div>
          </div>
        )}

        {/* 상세 평가 결과 */}
        {hasEvaluationResults && (
          <div>
            <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0] mb-4'>
              상세 평가 결과
            </h3>
            <div className='space-y-4'>
              {submission.evaluation_result!.criteria_results.map(
                (result, index) => (
                  <div
                    key={index}
                    className='p-4 rounded-lg border border-[#6473A0] bg-white/50'
                  >
                    <div className='flex justify-between items-center mb-3'>
                      <h4 className='font-pretendard text-[18px] font-medium text-[#6473A0]'>
                        {result.name}
                      </h4>
                      <span className='px-3 py-1 rounded-full bg-[#6473A0] text-white font-medium'>
                        {result.score}점
                      </span>
                    </div>

                    {result.feedback && (
                      <div className='mb-3'>
                        <h5 className='font-medium text-[#6473A0] mb-1'>
                          총평
                        </h5>
                        <p className='text-[#6473A0] text-sm leading-relaxed'>
                          {result.feedback}
                        </p>
                      </div>
                    )}

                    {result.strengths && result.strengths.length > 0 && (
                      <div className='mb-3'>
                        <h5 className='font-medium text-green-600 mb-2'>
                          ✅ 강점
                        </h5>
                        <ul className='space-y-1'>
                          {result.strengths.map((strength, idx) => (
                            <li
                              key={idx}
                              className='text-sm text-[#6473A0] leading-relaxed pl-2 border-l-2 border-green-200'
                            >
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.weaknesses && result.weaknesses.length > 0 && (
                      <div className='mb-3'>
                        <h5 className='font-medium text-orange-600 mb-2'>
                          ⚠️ 개선점
                        </h5>
                        <ul className='space-y-1'>
                          {result.weaknesses.map((weakness, idx) => (
                            <li
                              key={idx}
                              className='text-sm text-[#6473A0] leading-relaxed pl-2 border-l-2 border-orange-200'
                            >
                              {weakness}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.improvements && result.improvements.length > 0 && (
                      <div>
                        <h5 className='font-medium text-blue-600 mb-2'>
                          💡 개선 제안
                        </h5>
                        <ul className='space-y-1'>
                          {result.improvements.map((improvement, idx) => (
                            <li
                              key={idx}
                              className='text-sm text-[#6473A0] leading-relaxed pl-2 border-l-2 border-blue-200'
                            >
                              {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* 전체 피드백 (관리자가 허용한 경우에만 표시) */}
        {submission.feedback && (
          <div>
            <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
              전체 피드백
            </h3>
            <div className='mt-2 p-4 rounded-lg border border-[#6473A0] bg-blue-50/50'>
              <p className='text-[#6473A0] whitespace-pre-wrap leading-relaxed'>
                {submission.feedback}
              </p>
            </div>
          </div>
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
