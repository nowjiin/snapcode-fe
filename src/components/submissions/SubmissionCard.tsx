import { format } from 'date-fns';

interface Repository {
  type: string;
  repo_url: string;
}

interface SubmissionCardProps {
  submission: {
    submission_id: number;
    team_name: string;
    title: string;
    description: string;
    submitted_at: string;
    status: string;
    repositories: Repository[];
  };
}

export function SubmissionCard({ submission }: SubmissionCardProps) {
  const getStatusColor = (status: string) => {
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

  return (
    <div className='bg-white rounded-lg shadow-md p-6 mb-4'>
      <div className='flex justify-between items-start mb-4'>
        <div>
          <h3 className='text-xl font-semibold text-gray-900'>
            {submission.title}
          </h3>
          <p className='text-sm text-gray-500'>팀: {submission.team_name}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            submission.status
          )}`}
        >
          {getStatusText(submission.status)}
        </span>
      </div>

      <p className='text-gray-700 mb-4'>{submission.description}</p>

      <div className='mb-4'>
        <h4 className='text-sm font-medium text-gray-900 mb-2'>저장소:</h4>
        <div className='space-y-2'>
          {submission.repositories.map((repo, index) => (
            <a
              key={index}
              href={repo.repo_url}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center text-sm text-blue-600 hover:text-blue-800'
            >
              <span className='mr-2'>{repo.type}</span>
              <span className='truncate'>{repo.repo_url}</span>
            </a>
          ))}
        </div>
      </div>

      <div className='text-sm text-gray-500'>
        제출일: {format(new Date(submission.submitted_at), 'PPP')}
      </div>
    </div>
  );
}
