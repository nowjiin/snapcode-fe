import { useState, useEffect } from 'react';
import {
  submissionService,
  type Submission,
} from '../services/submissionService';

export function MyPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await submissionService.getMySubmissions();
      setSubmissions(data);
    } catch (error: unknown) {
      console.error('Failed to fetch submissions:', error);
      setError('Failed to fetch submissions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center'>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-900'>My Submission</h1>

        {error && (
          <div className='mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative'>
            {error}
          </div>
        )}

        <div className='mt-6 space-y-6'>
          {/* Submission List */}
          <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
            <div className='px-4 py-5 sm:px-6'>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                Your Submission
              </h3>
            </div>
            <div className='border-t border-gray-200'>
              {submissions.length === 0 ? (
                <div className='px-4 py-5 sm:px-6 text-gray-500'>
                  No submission yet
                </div>
              ) : (
                <div className='px-4 py-5 sm:px-6'>
                  {submissions.map((submission) => (
                    <div
                      key={submission.id}
                      className='w-full text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50'
                    >
                      <div className='flex items-center justify-between'>
                        <div>
                          <p className='text-sm font-medium text-indigo-600'>
                            {submission.title}
                          </p>
                          <p className='mt-1 text-sm text-gray-500'>
                            Submitted on{' '}
                            {new Date(
                              submission.submitted_at
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div className='ml-2 flex-shrink-0 flex'>
                          <p className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                            {submission.status}
                          </p>
                        </div>
                      </div>
                      <div className='mt-4'>
                        <dl>
                          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                            <dt className='text-sm font-medium text-gray-500'>
                              Description
                            </dt>
                            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                              {submission.description}
                            </dd>
                          </div>
                          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                            <dt className='text-sm font-medium text-gray-500'>
                              Team Name
                            </dt>
                            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                              {submission.team_name}
                            </dd>
                          </div>
                          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                            <dt className='text-sm font-medium text-gray-500'>
                              Repositories
                            </dt>
                            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                              <ul className='border border-gray-200 rounded-md divide-y divide-gray-200'>
                                {submission.repositories.map((repo, index) => (
                                  <li
                                    key={index}
                                    className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'
                                  >
                                    <div className='w-0 flex-1 flex items-center'>
                                      <span className='ml-2 flex-1 w-0 truncate'>
                                        {repo.type}: {repo.repo_url}
                                      </span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </dd>
                          </div>
                          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                            <dt className='text-sm font-medium text-gray-500'>
                              Evaluation Criteria
                            </dt>
                            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                              <ul className='border border-gray-200 rounded-md divide-y divide-gray-200'>
                                {submission.evaluation_criteria.map(
                                  (criteria, index) => (
                                    <li
                                      key={index}
                                      className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'
                                    >
                                      <div className='w-0 flex-1 flex items-center'>
                                        <span className='ml-2 flex-1 w-0 truncate'>
                                          {criteria}
                                        </span>
                                      </div>
                                    </li>
                                  )
                                )}
                              </ul>
                            </dd>
                          </div>
                          {submission.score !== undefined && (
                            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                              <dt className='text-sm font-medium text-gray-500'>
                                Score
                              </dt>
                              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                {submission.score}
                              </dd>
                            </div>
                          )}
                        </dl>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
