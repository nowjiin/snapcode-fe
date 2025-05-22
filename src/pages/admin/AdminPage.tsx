import { useState } from 'react';
import { UserManagementPage } from './UserManagementPage';

type AdminSection = 'users' | 'submissions' | 'settings';

export function AdminPage() {
  const [currentSection, setCurrentSection] = useState<AdminSection>('users');

  const renderContent = () => {
    switch (currentSection) {
      case 'users':
        return <UserManagementPage />;
      case 'submissions':
        return <div>제출 관리 (준비 중)</div>;
      case 'settings':
        return <div>설정 (준비 중)</div>;
      default:
        return null;
    }
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Admin Navigation */}
      <nav className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex'>
              <div className='flex-shrink-0 flex items-center'>
                <h1 className='text-xl font-bold text-gray-900'>
                  관리자 페이지
                </h1>
              </div>
              <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
                <button
                  onClick={() => setCurrentSection('users')}
                  className={`${
                    currentSection === 'users'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  사용자 관리
                </button>
                <button
                  onClick={() => setCurrentSection('submissions')}
                  className={`${
                    currentSection === 'submissions'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  제출 관리
                </button>
                <button
                  onClick={() => setCurrentSection('settings')}
                  className={`${
                    currentSection === 'settings'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  설정
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className='sm:hidden'>
          <div className='pt-2 pb-3 space-y-1'>
            <button
              onClick={() => setCurrentSection('users')}
              className={`${
                currentSection === 'users'
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              사용자 관리
            </button>
            <button
              onClick={() => setCurrentSection('submissions')}
              className={`${
                currentSection === 'submissions'
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              제출 관리
            </button>
            <button
              onClick={() => setCurrentSection('settings')}
              className={`${
                currentSection === 'settings'
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              설정
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className='py-6'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
