import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';
import { SubmissionCard, NoSubmissions } from '../../components/submissions';
import { TerminalLoader } from '../../components/loaders';

interface Repository {
  type: string;
  repo_url: string;
}

interface Submission {
  submission_id: number;
  team_name: string;
  title: string;
  description: string;
  submitted_at: string;
  status: string;
  repositories: Repository[];
}

interface SubmissionsResponse {
  submissions: Submission[];
}

interface NoSubmissionsResponse {
  message: string;
}

type ApiResponse = SubmissionsResponse | NoSubmissionsResponse;

export function MyPage() {
  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ['submissions'],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse>(
        '/api/v1/submissions/me'
      );
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <TerminalLoader status='제출 목록을 불러오는 중...' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-12'>
        <h3 className='text-lg font-medium text-red-600 mb-2'>
          제출 목록을 불러오는데 실패했습니다
        </h3>
        <p className='text-gray-500'>
          {error instanceof Error ? error.message : '오류가 발생했습니다'}
        </p>
      </div>
    );
  }

  // Check if the response is a no submissions message
  if (data && 'message' in data) {
    return <NoSubmissions />;
  }

  // If we have submissions, render them
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <h1 className='text-2xl font-bold text-gray-900 mb-6'>내 제출 목록</h1>
      <div className='space-y-4'>
        {data &&
          'submissions' in data &&
          data.submissions.map((submission) => (
            <SubmissionCard
              key={submission.submission_id}
              submission={submission}
            />
          ))}
      </div>
    </div>
  );
}
