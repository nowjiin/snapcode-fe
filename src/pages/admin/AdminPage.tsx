import { useState } from 'react';
import { Title } from '../../components/submissions/Title';
import { Button } from '../../components/common/Button';
import {
  adminService,
  type User,
  type GradingQueueResponse,
} from '../../services/openai/opneaiService';
import { OpenAIManagementSection } from '../../components/admin/OpenAIManagementSection';
import { Container, ContainerGrid } from '../../components/common/Container';
import { BorderCard } from '../../components/admin/BorderCard';
import { SmallCard } from '../../components/admin/SmallCard';
import { CardTitle } from '../../components/admin/CardTitle';
import { CardDescription } from '../../components/admin/CardDescription';
import { CardButton } from '../../components/admin/CardButton';
import { PieChart } from '../../components/admin/PieChart';

type AdminSection = 'users' | 'settings' | 'grading' | 'openai';

export function AdminPage() {
  const [activeSection, setActiveSection] = useState<AdminSection>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [gradingQueue, setGradingQueue] = useState<GradingQueueResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetchedUsers, setHasFetchedUsers] = useState(false);
  const [hasFetchedQueue, setHasFetchedQueue] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getUsers();
      setUsers(response);
      setHasFetchedUsers(true);
    } catch (err) {
      setError('사용자 목록을 불러오는데 실패했습니다.');
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGradingQueue = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getGradingQueue();
      setGradingQueue(response);
      setHasFetchedQueue(true);
    } catch (err) {
      setError('평가 대기열을 불러오는데 실패했습니다.');
      console.error('Failed to fetch grading queue:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartGrading = async () => {
    try {
      setLoading(true);
      setError(null);
      await adminService.startGradingAll();
      alert('평가가 시작되었습니다.');
    } catch (err) {
      setError('평가 시작에 실패했습니다.');
      console.error('Failed to start grading:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartEvaluation = async () => {
    try {
      setLoading(true);
      setError(null);
      await adminService.startEvaluation();
      alert('평가 항목 처리가 시작되었습니다.');
    } catch (err) {
      setError('평가 항목 처리 시작에 실패했습니다.');
      console.error('Failed to start evaluation:', err);
    } finally {
      setLoading(false);
    }
  };

  // Render different sections based on activeSection
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'users':
        return (
          <div className='space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='font-pretendard text-[24px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
                사용자 목록
              </h2>
              <Button
                onClick={fetchUsers}
                className='w-[180px] h-[60px] text-[20px]'
              >
                사용자 조회
              </Button>
            </div>

            {!hasFetchedUsers ? (
              <div className='text-center text-[#6473A0] py-8'>
                사용자 조회 버튼을 눌러주세요.
              </div>
            ) : users.length === 0 ? (
              <div className='text-center text-[#6473A0] py-8'>
                등록된 사용자가 없습니다.
              </div>
            ) : (
              <div className='space-y-4'>
                {users.map((user) => (
                  <div
                    key={user.id}
                    className='p-6 rounded-lg border-[0.702px] border-[#6473A0] bg-[rgba(67,67,67,0.04)]'
                  >
                    <div className='flex justify-between items-start'>
                      <div>
                        <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
                          {user.email}
                        </h3>
                        <p className='mt-1 text-[#6473A0]'>역할: {user.role}</p>
                      </div>
                      <span className='text-[#6473A0] text-sm'>
                        가입일: {new Date(user.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'grading':
        return (
          <div className='space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='font-pretendard text-[24px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
                평가 대기열
              </h2>
              <Button
                onClick={fetchGradingQueue}
                className='w-[180px] h-[60px] text-[20px]'
              >
                대기열 조회
              </Button>
            </div>

            {!hasFetchedQueue ? (
              <div className='text-center text-[#6473A0] py-8'>
                대기열 조회 버튼을 눌러주세요.
              </div>
            ) : !gradingQueue || gradingQueue.queue.length === 0 ? (
              <div className='text-center text-[#6473A0] py-8'>
                대기 중인 평가 항목이 없습니다.
              </div>
            ) : (
              <div className='space-y-4'>
                <div className='text-[#6473A0] mb-4'>
                  총 {gradingQueue.total}개의 평가 항목이 대기 중입니다.
                </div>
                {gradingQueue.queue.map((item) => (
                  <div
                    key={item.submission_id}
                    className='p-6 rounded-lg border-[0.702px] border-[#6473A0] bg-[rgba(67,67,67,0.04)]'
                  >
                    <div className='flex justify-between items-start'>
                      <div>
                        <h3 className='font-pretendard text-[20px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
                          {item.title}
                        </h3>
                        <p className='mt-1 text-[#6473A0]'>
                          팀: {item.team_name}
                        </p>
                      </div>
                      <div className='text-right'>
                        <span className='text-[#6473A0] text-sm block'>
                          상태: {item.status}
                        </span>
                        <span className='text-[#6473A0] text-sm block'>
                          대기열 등록일:{' '}
                          {new Date(item.queued_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'openai':
        return <OpenAIManagementSection />;

      case 'settings':
        return (
          <div className='space-y-6'>
            <h2 className='font-pretendard text-[24px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
              평가 설정
            </h2>
            <div className='space-y-6'>
              <div className='p-6 rounded-lg border-[0.702px] border-[#6473A0] bg-[rgba(67,67,67,0.04)]'>
                <p className='text-[#6473A0] mb-4'>
                  대기 중인 모든 제출물에 대한 평가를 시작합니다.
                </p>
                <Button
                  onClick={handleStartGrading}
                  className='w-[180px] h-[60px] text-[20px]'
                >
                  평가 시작
                </Button>
              </div>

              <div className='p-6 rounded-lg border-[0.702px] border-[#6473A0] bg-[rgba(67,67,67,0.04)]'>
                <p className='text-[#6473A0] mb-4'>
                  대기 중인 평가 항목들을 처리합니다.
                </p>
                <Button
                  onClick={handleStartEvaluation}
                  className='w-[180px] h-[60px] text-[20px]'
                >
                  평가 항목 처리
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
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
        <div className='flex justify-between items-center'>
          <Title>관리자 페이지</Title>
        </div>

        <Container>
          <ContainerGrid columns={3}>
            <BorderCard>
              <CardTitle>AI 모델정보</CardTitle>
              <CardDescription>
                AI 모델정보를 조회할 수 있습니다.
              </CardDescription>

              <CardTitle>행사 진행일</CardTitle>
              <CardDescription>2025.08.26~2025.08.27</CardDescription>
            </BorderCard>
            <BorderCard>
              <CardTitle>AI 평가 시작하기</CardTitle>
              <CardDescription>
                해당 버튼은 제출 마감 후에 관리자 중 1분께서만 AI 평가 시작하기
                버튼을 누르시면 즉시 모든 레포지토리의 평가가 시작됩니다.
              </CardDescription>
              <div className='flex justify-end'>
                <CardButton>AI 평가 시작하기</CardButton>
              </div>
            </BorderCard>
            <BorderCard>
              <CardTitle>제출내역 조회하기</CardTitle>
              <CardDescription>
                모든 팀의 제출 내역을 실시간으로 조회할 수 있는 페이지입니다.
              </CardDescription>
              <div className='flex justify-end'>
                <CardButton>제출내역 조회하기</CardButton>
              </div>
            </BorderCard>
          </ContainerGrid>
        </Container>

        <Container>
          <ContainerGrid columns={3}>
            <BorderCard>
              <div className='space-y-3'>
                <SmallCard>
                  <CardTitle>All Products</CardTitle>
                  <CardDescription>45</CardDescription>
                </SmallCard>
                <SmallCard>
                  <CardTitle>All Users</CardTitle>
                  <CardDescription>100</CardDescription>
                </SmallCard>
              </div>
            </BorderCard>

            <BorderCard>
              <div className='flex justify-center'>
                <CardTitle>총 토큰 사용량</CardTitle>
              </div>
              <PieChart
                tokenCount={15000}
                usedTokens={8500}
                totalTokens={15000}
              />
              <div className='flex justify-center mt-auto pt-4'>
                <button
                  className='flex justify-center items-center transition-all duration-200 hover:opacity-90 active:scale-95'
                  style={{
                    width: 'clamp(10rem, 15vw, 10.7rem)',
                    padding: 'clamp(0.5rem, 1vw, 0.625rem)',
                    gap: 'clamp(0.5rem, 1vw, 0.625rem)',
                    borderRadius: 'clamp(0.25rem, 0.5vw, 0.31rem)',
                    background: 'rgba(255, 143, 58, 0.18)',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#FF8F3A',
                    fontFamily: 'Pretendard',
                    fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)',
                    fontWeight: '500',
                  }}
                >
                  Details
                </button>
              </div>
            </BorderCard>
          </ContainerGrid>
        </Container>

        <div className='flex gap-4 border-b border-[#6473A0]'>
          <button
            onClick={() => setActiveSection('users')}
            className={`px-4 py-2 font-pretendard text-[16px] ${
              activeSection === 'users'
                ? 'text-[#6473A0] border-b-2 border-[#6473A0]'
                : 'text-gray-500'
            }`}
          >
            사용자 관리
          </button>
          <button
            onClick={() => setActiveSection('grading')}
            className={`px-4 py-2 font-pretendard text-[16px] ${
              activeSection === 'grading'
                ? 'text-[#6473A0] border-b-2 border-[#6473A0]'
                : 'text-gray-500'
            }`}
          >
            평가 대기열
          </button>
          <button
            onClick={() => setActiveSection('openai')}
            className={`px-4 py-2 font-pretendard text-[16px] ${
              activeSection === 'openai'
                ? 'text-[#6473A0] border-b-2 border-[#6473A0]'
                : 'text-gray-500'
            }`}
          >
            OpenAI 관리
          </button>
          <button
            onClick={() => setActiveSection('settings')}
            className={`px-4 py-2 font-pretendard text-[16px] ${
              activeSection === 'settings'
                ? 'text-[#6473A0] border-b-2 border-[#6473A0]'
                : 'text-gray-500'
            }`}
          >
            설정
          </button>
        </div>

        {renderActiveSection()}
      </div>
    </main>
  );
}
