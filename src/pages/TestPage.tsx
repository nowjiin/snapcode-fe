import { useState } from 'react';
import {
  testService,
  type TestUser,
  type TestSubmission,
  type GradingQueueItem,
} from '../services/test';

export function TestPage() {
  const [users, setUsers] = useState<TestUser[]>([]);
  const [submissions, setSubmissions] = useState<TestSubmission[]>([]);
  const [queue, setQueue] = useState<GradingQueueItem[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // User operations
  const handleGetUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await testService.getUsers();
      setUsers(data);
    } catch (error: unknown) {
      console.error('Failed to fetch users:', error);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    try {
      setLoading(true);
      setError('');
      const newUser = await testService.createUser({
        username: 'testuser',
        email: 'test@example.com',
        role: 'user',
      });
      setUsers([...users, newUser]);
    } catch (error: unknown) {
      console.error('Failed to create user:', error);
      setError('Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  // Admin operations
  const handleGetAdminUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await testService.getAdminUsers();
      setUsers(data);
    } catch (error: unknown) {
      console.error('Failed to fetch admin users:', error);
      setError('Failed to fetch admin users');
    } finally {
      setLoading(false);
    }
  };

  const handleGetAdminSubmissions = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await testService.getAdminSubmissions();
      setSubmissions(data);
    } catch (error: unknown) {
      console.error('Failed to fetch admin submissions:', error);
      setError('Failed to fetch admin submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleGetGradingQueue = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await testService.getGradingQueue();
      setQueue(data);
    } catch (error: unknown) {
      console.error('Failed to fetch grading queue:', error);
      setError('Failed to fetch grading queue');
    } finally {
      setLoading(false);
    }
  };

  // Test data operations
  const handleCreateTestUsers = async () => {
    try {
      setLoading(true);
      setError('');
      await testService.createTestUsers();
      await handleGetUsers();
    } catch (error: unknown) {
      console.error('Failed to create test users:', error);
      setError('Failed to create test users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTestSubmissions = async () => {
    try {
      setLoading(true);
      setError('');
      await testService.createTestSubmissions();
      await handleGetAdminSubmissions();
    } catch (error: unknown) {
      console.error('Failed to create test submissions:', error);
      setError('Failed to create test submissions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>Test Page</h1>

        {error && (
          <div className='mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative'>
            {error}
          </div>
        )}

        <div className='space-y-8'>
          {/* User Operations Section */}
          <section className='bg-white shadow rounded-lg p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>
              User Operations
            </h2>
            <div className='space-y-4'>
              <button
                onClick={handleGetUsers}
                disabled={loading}
                className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Get Users
              </button>
              <button
                onClick={handleCreateUser}
                disabled={loading}
                className='ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              >
                Create User
              </button>
            </div>
          </section>

          {/* Admin Operations Section */}
          <section className='bg-white shadow rounded-lg p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>
              Admin Operations
            </h2>
            <div className='space-y-4'>
              <button
                onClick={handleGetAdminUsers}
                disabled={loading}
                className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Get Admin Users
              </button>
              <button
                onClick={handleGetAdminSubmissions}
                disabled={loading}
                className='ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Get Admin Submissions
              </button>
              <button
                onClick={handleGetGradingQueue}
                disabled={loading}
                className='ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Get Grading Queue
              </button>
            </div>
          </section>

          {/* Test Data Operations Section */}
          <section className='bg-white shadow rounded-lg p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>
              Test Data Operations
            </h2>
            <div className='space-y-4'>
              <button
                onClick={handleCreateTestUsers}
                disabled={loading}
                className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              >
                Create Test Users
              </button>
              <button
                onClick={handleCreateTestSubmissions}
                disabled={loading}
                className='ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              >
                Create Test Submissions
              </button>
            </div>
          </section>

          {/* Results Display */}
          {users.length > 0 && (
            <section className='bg-white shadow rounded-lg p-6'>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                Users
              </h2>
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        ID
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Username
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Email
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {user.id}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {user.username}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {user.email}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {user.role}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {submissions.length > 0 && (
            <section className='bg-white shadow rounded-lg p-6'>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                Submissions
              </h2>
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        ID
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Title
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Status
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Team
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {submissions.map((submission) => (
                      <tr key={submission.id}>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {submission.id}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {submission.title}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {submission.status}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {submission.team_name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {queue.length > 0 && (
            <section className='bg-white shadow rounded-lg p-6'>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                Grading Queue
              </h2>
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Submission ID
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {queue.map((item) => (
                      <tr key={item.submission_id}>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {item.submission_id}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {item.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
