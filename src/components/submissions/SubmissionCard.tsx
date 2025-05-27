import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import type { SubmissionListItem } from '../../services/submissionService';

interface SubmissionCardProps {
  submission: SubmissionListItem;
}

export function SubmissionCard({ submission }: SubmissionCardProps) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    if (!status || typeof status !== 'string') {
      return 'bg-gray-100 text-gray-800';
    }
    switch (status.toLowerCase()) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'grading':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    if (!status || typeof status !== 'string') {
      return '알 수 없음';
    }
    switch (status.toLowerCase()) {
      case 'submitted':
        return '제출됨';
      case 'grading':
        return '평가 중';
      case 'completed':
        return '완료됨';
      case 'failed':
        return '실패';
      default:
        return status;
    }
  };

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
    <div className='p-6 rounded-lg border-[0.702px] border-[#6473A0] bg-[rgba(67,67,67,0.04)] space-y-4'>
      <div className='flex justify-between items-start'>
        <div className='flex-1'>
          <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
            {submission.title}
          </h3>
          <div className='mt-1 space-y-1'>
            {submission.team_name && (
              <p className='text-[#6473A0]'>팀: {submission.team_name}</p>
            )}
            {submission.competition_name &&
              submission.competition_name !== 'default' && (
                <p className='text-[#6473A0] text-sm'>
                  대회: {submission.competition_name}
                </p>
              )}
          </div>
        </div>
        <div className='flex flex-col items-end gap-2'>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              submission.status
            )}`}
          >
            {getStatusText(submission.status)}
          </span>
          {submission.score !== null && (
            <span className='text-[#6473A0] font-medium text-lg'>
              점수: {submission.score}점
            </span>
          )}
        </div>
      </div>

      <p className='text-[#6473A0] line-clamp-2'>{submission.description}</p>

      <div className='flex justify-between items-center'>
        <div className='space-y-1'>
          <p className='text-[#6473A0] text-sm'>
            제출일: {formatDate(submission.submitted_at)}
          </p>
          {submission.repositories && submission.repositories.length > 0 && (
            <p className='text-[#6473A0] text-sm'>
              저장소: {submission.repositories.length}개
            </p>
          )}
        </div>
        <Button
          onClick={() =>
            navigate(`/mypage/submissions/${submission.submission_id}`)
          }
          className='w-[120px] h-[40px] text-[16px]'
        >
          상세보기
        </Button>
      </div>
    </div>
  );
}
