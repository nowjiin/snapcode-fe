import { useEffect, useState } from 'react';
import { submissionService } from '../services/submission';
import type { SubmissionResponse } from '../types/submission';

export function MyPage() {
  const [submission, setSubmission] = useState<SubmissionResponse | null>(null);
  const [selectedSubmission, setSelectedSubmission] =
    useState<SubmissionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchSubmission();
  }, []);

  const fetchSubmission = async () => {
    try {
      setIsLoading(true);
      const data = await submissionService.getMySubmissions();
      setSubmission(data);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message: string } } };
      setError(error.response?.data?.message || 'Failed to fetch submission');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmissionClick = async (submissionId: number) => {
    try {
      setIsLoading(true);
      const data = await submissionService.getSubmissionDetail(
        submissionId.toString()
      );
      setSelectedSubmission(data);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message: string } } };
      setError(
        error.response?.data?.message || 'Failed to fetch submission details'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-900'>My Submission</h1>

        {error && (
          <div className='mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative'>
            {error}
          </div>
        )}

        {isLoading ? (
          <div className='mt-6 text-center'>Loading...</div>
        ) : (
          <div className='mt-6 space-y-6'>
            {/* Submission List */}
            <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
              <div className='px-4 py-5 sm:px-6'>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>
                  Your Submission
                </h3>
              </div>
              <div className='border-t border-gray-200'>
                {!submission ? (
                  <div className='px-4 py-5 sm:px-6 text-gray-500'>
                    No submission yet
                  </div>
                ) : (
                  <div className='px-4 py-5 sm:px-6'>
                    <button
                      onClick={() =>
                        handleSubmissionClick(submission.submission_id)
                      }
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
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Selected Submission Details */}
            {selectedSubmission && (
              <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
                <div className='px-4 py-5 sm:px-6'>
                  <h3 className='text-lg leading-6 font-medium text-gray-900'>
                    Submission Details
                  </h3>
                </div>
                <div className='border-t border-gray-200'>
                  <dl>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Title
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {selectedSubmission.title}
                      </dd>
                    </div>
                    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Description
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {selectedSubmission.description}
                      </dd>
                    </div>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Team Name
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {selectedSubmission.team_name}
                      </dd>
                    </div>
                    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Status
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {selectedSubmission.status}
                      </dd>
                    </div>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Submitted At
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        {new Date(
                          selectedSubmission.submitted_at
                        ).toLocaleString()}
                      </dd>
                    </div>
                    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Repositories
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        <ul className='border border-gray-200 rounded-md divide-y divide-gray-200'>
                          {selectedSubmission.repositories.map(
                            (repo, index) => (
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
                            )
                          )}
                        </ul>
                      </dd>
                    </div>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Evaluation Criteria
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                        <ul className='border border-gray-200 rounded-md divide-y divide-gray-200'>
                          {selectedSubmission.evaluation_criteria.map(
                            (criteria, index) => (
                              <li
                                key={index}
                                className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'
                              >
                                <div className='w-0 flex-1 flex items-center'>
                                  <span className='ml-2 flex-1 w-0 truncate'>
                                    {criteria.name}
                                  </span>
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                      </dd>
                    </div>
                    {selectedSubmission.score !== null && (
                      <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Score
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                          {selectedSubmission.score}
                        </dd>
                      </div>
                    )}
                    {selectedSubmission.feedback !== null && (
                      <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Feedback
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                          {selectedSubmission.feedback}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
