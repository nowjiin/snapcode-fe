import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import { SubmissionCard } from '../../components/submissions/SubmissionCard';
import { SubmissionDetail } from '../../components/submissions/SubmissionDetail';
import {
  submissionService,
  type Submission,
  type SubmissionListItem,
} from '../../services/submissionService';

export function MyPage() {
  const navigate = useNavigate();
  const { submissionId } = useParams();
  const [submissions, setSubmissions] = useState<SubmissionListItem[]>([]);
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (submissionId) {
      fetchSubmissionDetail(submissionId);
    }
  }, [submissionId]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await submissionService.getMySubmissions();

      // API 응답 처리: 배열 또는 단일 객체
      if (Array.isArray(response)) {
        // 배열인 경우 그대로 설정
        setSubmissions(response);
      } else if (
        response &&
        typeof response === 'object' &&
        'submission_id' in response
      ) {
        // 단일 제출 객체인 경우 배열로 감싸기
        setSubmissions([response as SubmissionListItem]);
      } else {
        // 에러 메시지나 다른 형태의 응답인 경우 빈 배열
        setSubmissions([]);
      }
      setHasFetched(true);
    } catch (err: unknown) {
      // 404나 다른 에러 응답에서 메시지가 있는 경우 처리
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        if (axiosError.response?.data?.message?.includes('아직 제출한')) {
          // "아직 제출한 프로젝트가 없습니다" 메시지인 경우
          setSubmissions([]);
          setHasFetched(true);
          return;
        }
      }
      setError('제출 내역을 불러오는데 실패했습니다.');
      console.error('Failed to fetch submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissionDetail = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await submissionService.getSubmissionDetail(
        parseInt(id)
      );
      setSelectedSubmission(response);
    } catch (err) {
      setError('제출 상세 정보를 불러오는데 실패했습니다.');
      console.error('Failed to fetch submission detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/mypage');
    setSelectedSubmission(null);
  };

  if (loading) {
    return (
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='text-center text-[#6473A0]'>로딩 중...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='text-center text-red-500'>{error}</div>
      </main>
    );
  }

  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <div className='space-y-8'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
          <Title>마이페이지</Title>
          <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
            <Button
              onClick={fetchSubmissions}
              className='w-full sm:w-[180px] h-[60px] text-[20px]'
            >
              제출 내역 조회
            </Button>
            <Button
              onClick={() => navigate('/personal')}
              className='w-full sm:w-[180px] h-[60px] text-[20px]'
            >
              새로운 제출하기
            </Button>
          </div>
        </div>

        {selectedSubmission ? (
          <SubmissionDetail
            submission={selectedSubmission}
            onBack={handleBack}
          />
        ) : (
          <div className='space-y-6'>
            <h2 className='font-pretendard text-[24px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
              제출 내역
            </h2>
            {!hasFetched ? (
              <div className='text-center text-[#6473A0] py-8'>
                제출 내역 조회 버튼을 눌러주세요.
              </div>
            ) : submissions.length === 0 ? (
              <div className='text-center text-[#6473A0] py-8'>
                아직 제출한 내역이 없습니다.
              </div>
            ) : (
              <div className='space-y-4'>
                {submissions.map((submission) => (
                  <SubmissionCard
                    key={submission.submission_id}
                    submission={submission}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
