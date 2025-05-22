import { useState } from 'react';
import {
  adminUserService,
  type AdminUser,
  type AssignRoleRequest,
} from '../services/admin/userService';
import {
  adminSubmissionService,
  type AdminSubmission,
  type GradingQueueItem,
} from '../services/admin/submissionService';
import {
  adminEvaluationService,
  type Ranking,
  type Statistics,
} from '../services/admin/evaluationService';

export function AdminPage() {
  // State
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [submissions, setSubmissions] = useState<AdminSubmission[]>([]);
  const [queue, setQueue] = useState<GradingQueueItem[]>([]);
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [newUser, setNewUser] = useState<Omit<AdminUser, 'id'>>({
    username: '',
    email: '',
    role: 'user',
  });

  // User Management
  const handleGetUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await adminUserService.getUsers();
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
      const createdUser = await adminUserService.createUser(newUser);
      setUsers([...users, createdUser]);
      setNewUser({ username: '', email: '', role: 'user' });
    } catch (error: unknown) {
      console.error('Failed to create user:', error);
      setError('Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (userId: number, data: Partial<AdminUser>) => {
    try {
      setLoading(true);
      setError('');
      const updatedUser = await adminUserService.updateUser(userId, data);
      setUsers(users.map((user) => (user.id === userId ? updatedUser : user)));
    } catch (error: unknown) {
      console.error('Failed to update user:', error);
      setError('Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      setLoading(true);
      setError('');
      await adminUserService.deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error: unknown) {
      console.error('Failed to delete user:', error);
      setError('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  const handleAssignRole = async (data: AssignRoleRequest) => {
    try {
      setLoading(true);
      setError('');
      await adminUserService.assignRole(data);
      await handleGetUsers(); // Refresh user list
    } catch (error: unknown) {
      console.error('Failed to assign role:', error);
      setError('Failed to assign role');
    } finally {
      setLoading(false);
    }
  };

  // Submission Management
  const handleGetSubmissions = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await adminSubmissionService.getSubmissions();
      setSubmissions(data);
    } catch (error: unknown) {
      console.error('Failed to fetch submissions:', error);
      setError('Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleGetGradingQueue = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await adminSubmissionService.getGradingQueue();
      setQueue(data);
    } catch (error: unknown) {
      console.error('Failed to fetch grading queue:', error);
      setError('Failed to fetch grading queue');
    } finally {
      setLoading(false);
    }
  };

  const handleStartGradingAll = async () => {
    try {
      setLoading(true);
      setError('');
      await adminSubmissionService.startGradingAll();
      await handleGetSubmissions();
    } catch (error: unknown) {
      console.error('Failed to start grading:', error);
      setError('Failed to start grading');
    } finally {
      setLoading(false);
    }
  };

  // Evaluation Management
  const handleStartEvaluation = async () => {
    try {
      setLoading(true);
      setError('');
      await adminEvaluationService.startEvaluation();
      await handleGetRankings();
      await handleGetStatistics();
    } catch (error: unknown) {
      console.error('Failed to start evaluation:', error);
      setError('Failed to start evaluation');
    } finally {
      setLoading(false);
    }
  };

  const handleGetRankings = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await adminEvaluationService.getRankings();
      setRankings(data);
    } catch (error: unknown) {
      console.error('Failed to fetch rankings:', error);
      setError('Failed to fetch rankings');
    } finally {
      setLoading(false);
    }
  };

  const handleGetStatistics = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await adminEvaluationService.getStatistics();
      setStatistics(data);
    } catch (error: unknown) {
      console.error('Failed to fetch statistics:', error);
      setError('Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>
          Admin Dashboard
        </h1>

        {error && (
          <div className='mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative'>
            {error}
          </div>
        )}

        <div className='space-y-8'>
          {/* User Management Section */}
          <section className='bg-white shadow rounded-lg p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>
              User Management
            </h2>
            <div className='space-y-4'>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <label
                    htmlFor='username'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Username
                  </label>
                  <input
                    type='text'
                    id='username'
                    value={newUser.username}
                    onChange={(e) =>
                      setNewUser({ ...newUser, username: e.target.value })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  />
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  />
                </div>
              </div>
              <div className='flex space-x-4'>
                <button
                  onClick={handleCreateUser}
                  disabled={loading}
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                >
                  Create User
                </button>
                <button
                  onClick={handleGetUsers}
                  disabled={loading}
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Get Users
                </button>
              </div>
            </div>

            {users.length > 0 && (
              <div className='mt-6 overflow-x-auto'>
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
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Actions
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
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className='text-red-600 hover:text-red-900'
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Submission Management Section */}
          <section className='bg-white shadow rounded-lg p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>
              Submission Management
            </h2>
            <div className='space-y-4'>
              <div className='flex space-x-4'>
                <button
                  onClick={handleGetSubmissions}
                  disabled={loading}
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Get Submissions
                </button>
                <button
                  onClick={handleStartGradingAll}
                  disabled={loading}
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                >
                  Start Grading All
                </button>
              </div>
            </div>

            {submissions.length > 0 && (
              <div className='mt-6 overflow-x-auto'>
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
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Score
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
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {submission.score || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Evaluation Management Section */}
          <section className='bg-white shadow rounded-lg p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>
              Evaluation Management
            </h2>
            <div className='space-y-4'>
              <div className='flex space-x-4'>
                <button
                  onClick={handleStartEvaluation}
                  disabled={loading}
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                >
                  Start Evaluation
                </button>
                <button
                  onClick={handleGetRankings}
                  disabled={loading}
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Get Rankings
                </button>
                <button
                  onClick={handleGetStatistics}
                  disabled={loading}
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Get Statistics
                </button>
              </div>
            </div>

            {rankings.length > 0 && (
              <div className='mt-6'>
                <h3 className='text-lg font-medium text-gray-900 mb-4'>
                  Rankings
                </h3>
                <div className='overflow-x-auto'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Rank
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Team
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Score
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {rankings.map((ranking) => (
                        <tr key={ranking.team_name}>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            {ranking.rank}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            {ranking.team_name}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            {ranking.score}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {statistics && (
              <div className='mt-6'>
                <h3 className='text-lg font-medium text-gray-900 mb-4'>
                  Statistics
                </h3>
                <dl className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                  <div className='bg-white overflow-hidden shadow rounded-lg'>
                    <div className='px-4 py-5 sm:p-6'>
                      <dt className='text-sm font-medium text-gray-500 truncate'>
                        Total Submissions
                      </dt>
                      <dd className='mt-1 text-3xl font-semibold text-gray-900'>
                        {statistics.total_submissions}
                      </dd>
                    </div>
                  </div>
                  <div className='bg-white overflow-hidden shadow rounded-lg'>
                    <div className='px-4 py-5 sm:p-6'>
                      <dt className='text-sm font-medium text-gray-500 truncate'>
                        Graded Submissions
                      </dt>
                      <dd className='mt-1 text-3xl font-semibold text-gray-900'>
                        {statistics.graded_submissions}
                      </dd>
                    </div>
                  </div>
                  <div className='bg-white overflow-hidden shadow rounded-lg'>
                    <div className='px-4 py-5 sm:p-6'>
                      <dt className='text-sm font-medium text-gray-500 truncate'>
                        Average Score
                      </dt>
                      <dd className='mt-1 text-3xl font-semibold text-gray-900'>
                        {statistics.average_score.toFixed(2)}
                      </dd>
                    </div>
                  </div>
                  <div className='bg-white overflow-hidden shadow rounded-lg'>
                    <div className='px-4 py-5 sm:p-6'>
                      <dt className='text-sm font-medium text-gray-500 truncate'>
                        Highest Score
                      </dt>
                      <dd className='mt-1 text-3xl font-semibold text-gray-900'>
                        {statistics.highest_score}
                      </dd>
                    </div>
                  </div>
                  <div className='bg-white overflow-hidden shadow rounded-lg'>
                    <div className='px-4 py-5 sm:p-6'>
                      <dt className='text-sm font-medium text-gray-500 truncate'>
                        Lowest Score
                      </dt>
                      <dd className='mt-1 text-3xl font-semibold text-gray-900'>
                        {statistics.lowest_score}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
