import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Title } from '../../components/submissions/Title';
import { Button } from '../../components/common/Button';
import { SubmissionCard } from '../../components/submissions/SubmissionCard';
import { SubmissionDetail } from '../../components/submissions/SubmissionDetail';
import {
  submissionService,
  type Submission,
  type SubmissionListItem,
} from '../../services/submission/submissionService';

export function MyPage() {
  const navigate = useNavigate();
  const { submissionId } = useParams();
  const location = useLocation();
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

  // 페이지로 새로 이동할 때마다 상태 초기화 (헤더에서 마이페이지 클릭시)
  useEffect(() => {
    // URL 파라미터가 없고, 새로운 네비게이션인 경우 상태 초기화
    if (!submissionId) {
      setSubmissions([]);
      setSelectedSubmission(null);
      setHasFetched(false);
      setError(null);
    }
  }, [location.key, submissionId]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await submissionService.getMySubmissions();

      // 새로운 API 응답 구조: { submissions: [...] }
      if (
        response &&
        response.submissions &&
        Array.isArray(response.submissions)
      ) {
        setSubmissions(response.submissions);
      } else {
        // 응답이 예상한 형태가 아닌 경우 빈 배열
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
      <div className='space-y-8 pt-24'>
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
