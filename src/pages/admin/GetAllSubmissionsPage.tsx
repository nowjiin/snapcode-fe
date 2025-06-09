import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { Title } from '../../components/submissions/Title';
import { Button } from '../../components/common/Button';
import { Container } from '../../components/common/Container';

// Updated interface to match actual API response
interface Submission {
  submission_id: number;
  team_name: string;
  title: string;
  description: string;
  competition_name: string;
  submitted_at: string;
  status: string;
  user_id: number;
  repositories: Array<{
    type: string;
    repo_url: string;
  }>;
  evaluation_criteria: string[];
  evaluation_result: {
    status: string;
    total_score: number | null;
    criteria_results: Array<{
      name: string;
      score: number;
    }>;
  };
}

export function GetAllSubmissionsPage() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  // Mock function - replace with actual service call
  const fetchAllSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Mock data matching actual API response structure
      // const response = await adminService.getAllSubmissions();
      const mockSubmissions: Submission[] = [
        {
          submission_id: 11,
          team_name: 'personal',
          title: 'On-device-AI',
          description:
            '한글 데이터로 파인튜닝한 RAG(Retrieval-Augmented Generation) 모델을 Ollama를 활용해 온디바이스에서 실행 가능한 형태로 구현한 생성형 AI 프로그램입니다.\n외부 서버나 클라우드 환경 없이도 개인 PC나 로컬 장비에서 빠르고 안전하게 생성형 AI를 사용할 수 있도록 하였으며, \n검색 기반의 정밀한 정보 응답과 자연스러운 한글 생성 능력을 동시에 제공합니다.\n개인화된 지식 검색, 문서 요약, 질의응답 등 다양한 용도로 활용 가능합니다.',
          competition_name: 'default',
          submitted_at: '2025-06-07T20:30:15.462598',
          status: 'submitted',
          user_id: 6,
          repositories: [
            {
              type: 'backend',
              repo_url: 'https://github.com/nowjiin/on-device-ai',
            },
          ],
          evaluation_criteria: [],
          evaluation_result: {
            status: 'waiting',
            total_score: null,
            criteria_results: [],
          },
        },
        {
          submission_id: 10,
          team_name: 'personal',
          title: 'On Device AI',
          description:
            '한글 데이터로 파인튜닝한 RAG(Retrieval-Augmented Generation) 모델을 Ollama를 활용해 온디바이스에서 실행 가능한 형태로 구현한 생성형 AI 프로그램입니다. 외부 서버나 클라우드 환경 없이도 개인 PC나 로컬 장비에서 빠르고 안전하게 생성형 AI를 사용할 수 있도록 하였으며, 검색 기반의 정밀한 정보 응답과 자연스러운 한글 생성 능력을 동시에 제공합니다. 개인화된 지식 검색, 문서 요약, 질의응답 등 다양한 용도로 활용 가능합니다.',
          competition_name: 'default',
          submitted_at: '2025-05-30T14:05:44.942940',
          status: 'completed',
          user_id: 9,
          repositories: [
            {
              type: 'backend',
              repo_url: 'https://github.com/nowjiin/on-device-ai',
            },
          ],
          evaluation_criteria: [
            'Technical Excellence & Code Quality',
            'Competitive Advantage & Moats',
            'Innovation & Market Disruption',
          ],
          evaluation_result: {
            status: 'completed',
            total_score: 85,
            criteria_results: [
              {
                name: 'Innovation & Market Disruption',
                score: 90,
              },
              {
                name: 'Competitive Advantage & Moats',
                score: 80,
              },
              {
                name: 'Technical Excellence & Code Quality',
                score: 85,
              },
            ],
          },
        },
      ];

      setSubmissions(mockSubmissions);
      setHasFetched(true);
      // Reset selections when new data is fetched
      setSelectedItems(new Set());
      setSelectAll(false);
    } catch (err) {
      setError('제출 내역을 불러오는데 실패했습니다.');
      console.error('Failed to fetch submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/admin');
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedItems(new Set(submissions.map((item) => item.submission_id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedItems(newSelected);
    setSelectAll(
      newSelected.size === submissions.length && submissions.length > 0
    );
  };

  const handleExportSelected = () => {
    const selectedSubmissions = submissions.filter((item) =>
      selectedItems.has(item.submission_id)
    );

    if (selectedSubmissions.length === 0) {
      alert('내보낼 항목을 선택해주세요.');
      return;
    }

    // Prepare data for Excel export
    const exportData = selectedSubmissions.map((submission) => ({
      제출ID: submission.submission_id,
      프로젝트명: submission.title,
      팀명: submission.team_name,
      사용자ID: submission.user_id,
      대회명: submission.competition_name,
      제출일: new Date(submission.submitted_at).toLocaleString('ko-KR'),
      상태: submission.status,
      평가상태: submission.evaluation_result.status,
      총점: submission.evaluation_result.total_score || '평가 전',
      설명: submission.description,
      저장소개수: submission.repositories.length,
      첫번째저장소: submission.repositories[0]?.repo_url || '없음',
      평가항목개수: submission.evaluation_criteria.length,
      평가세부점수:
        submission.evaluation_result.criteria_results
          .map((result) => `${result.name}: ${result.score}점`)
          .join(', ') || '평가 전',
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Set column widths for better readability
    const columnWidths = [
      { wch: 10 }, // 제출ID
      { wch: 30 }, // 프로젝트명
      { wch: 15 }, // 팀명
      { wch: 10 }, // 사용자ID
      { wch: 15 }, // 대회명
      { wch: 20 }, // 제출일
      { wch: 12 }, // 상태
      { wch: 12 }, // 평가상태
      { wch: 10 }, // 총점
      { wch: 50 }, // 설명
      { wch: 12 }, // 저장소개수
      { wch: 40 }, // 첫번째저장소
      { wch: 12 }, // 평가항목개수
      { wch: 50 }, // 평가세부점수
    ];

    worksheet['!cols'] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, '제출내역');

    // Generate filename with current date
    const now = new Date();
    const dateString = now
      .toLocaleDateString('ko-KR')
      .replace(/\./g, '')
      .replace(/\s/g, '');
    const filename = `제출내역_${dateString}_${selectedSubmissions.length}건.xlsx`;

    // Save the file
    XLSX.writeFile(workbook, filename);

    alert(
      `${selectedSubmissions.length}개의 항목을 Excel 파일로 내보냈습니다.`
    );
  };

  const getStatusBadge = (status: string, evaluationStatus?: string) => {
    // Handle both submission status and evaluation status
    const statusConfig = {
      submitted: { color: 'bg-blue-100 text-blue-800', text: '제출됨' },
      completed: { color: 'bg-green-100 text-green-800', text: '평가완료' },
      waiting: { color: 'bg-yellow-100 text-yellow-800', text: '평가대기' },
      pending: { color: 'bg-gray-100 text-gray-800', text: '대기중' },
    };

    // Use evaluation status if available, otherwise use submission status
    const displayStatus = evaluationStatus === 'waiting' ? 'waiting' : status;
    const config =
      statusConfig[displayStatus as keyof typeof statusConfig] ||
      statusConfig.pending;

    return (
      <span className={`px-2 py-1 rounded-full text-xs ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const getRepositoryDisplay = (repositories: Submission['repositories']) => {
    if (!repositories || repositories.length === 0) {
      return <span className='text-gray-400 text-sm'>저장소 없음</span>;
    }

    const firstRepo = repositories[0];
    const additionalCount = repositories.length - 1;

    return (
      <div className='flex flex-col gap-1'>
        <a
          href={firstRepo.repo_url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 hover:underline text-sm truncate max-w-[200px] block'
          title={firstRepo.repo_url}
        >
          {firstRepo.type} 저장소
        </a>
        {additionalCount > 0 && (
          <span className='text-xs text-gray-500'>+{additionalCount}개 더</span>
        )}
      </div>
    );
  };

  const getScoreDisplay = (
    evaluation_result: Submission['evaluation_result']
  ) => {
    if (
      evaluation_result.status === 'completed' &&
      evaluation_result.total_score !== null
    ) {
      return (
        <div className='text-sm'>
          <div className='font-medium text-[#6473A0]'>
            {evaluation_result.total_score}점
          </div>
          <div className='text-xs text-gray-500'>
            {evaluation_result.criteria_results.length}개 항목
          </div>
        </div>
      );
    }
    return <span className='text-gray-400 text-sm'>평가 전</span>;
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
          <Title>모든 제출 내역</Title>
          <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
            <Button
              onClick={handleBack}
              className='w-full sm:w-[180px] h-[60px] text-[20px] bg-gray-600 hover:bg-gray-700'
            >
              관리자 페이지로
            </Button>
            <Button
              onClick={fetchAllSubmissions}
              className='w-full sm:w-[180px] h-[60px] text-[20px]'
            >
              전체 조회
            </Button>
          </div>
        </div>

        <Container>
          <div className='space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='font-pretendard text-[24px] font-medium leading-[28px] tracking-[-0.386px] text-[#6473A0]'>
                제출 내역 목록
              </h2>

              <Button
                onClick={handleExportSelected}
                className='h-[40px] text-[16px] bg-green-600 hover:bg-green-700'
                disabled={selectedItems.size === 0}
              >
                선택 항목 액셀로 내보내기 ({selectedItems.size})
              </Button>
            </div>

            {!hasFetched ? (
              <div className='text-center text-[#6473A0] py-8'>
                전체 조회 버튼을 눌러주세요.
              </div>
            ) : submissions.length === 0 ? (
              <div className='text-center text-[#6473A0] py-8'>
                제출된 내역이 없습니다.
              </div>
            ) : (
              <div className='space-y-4'>
                <div className='text-[#6473A0] mb-4'>
                  총 {submissions.length}개의 제출 내역이 있습니다.
                </div>

                {/* Table */}
                <div className='overflow-x-auto border border-[#6473A0] rounded-lg'>
                  <table className='min-w-full divide-y divide-[#6473A0]'>
                    <thead className='bg-[rgba(67,67,67,0.04)]'>
                      <tr>
                        <th className='px-4 py-3 text-left text-xs font-medium text-[#6473A0] uppercase tracking-wider'>
                          <input
                            type='checkbox'
                            checked={selectAll}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                            className='rounded border-[#6473A0] text-[#6473A0] focus:ring-[#6473A0]'
                          />
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-[#6473A0] uppercase tracking-wider'>
                          프로젝트명
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-[#6473A0] uppercase tracking-wider'>
                          팀명
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-[#6473A0] uppercase tracking-wider'>
                          상태
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-[#6473A0] uppercase tracking-wider'>
                          점수
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-[#6473A0] uppercase tracking-wider'>
                          제출일
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-[#6473A0] uppercase tracking-wider'>
                          저장소
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-[#6473A0] uppercase tracking-wider'>
                          작업
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-[#6473A0]'>
                      {submissions.map((submission) => (
                        <tr
                          key={submission.submission_id}
                          className={`hover:bg-[rgba(67,67,67,0.04)] transition-colors duration-200 ${
                            selectedItems.has(submission.submission_id)
                              ? 'bg-[rgba(100,115,160,0.1)]'
                              : ''
                          }`}
                        >
                          <td className='px-4 py-4 whitespace-nowrap'>
                            <input
                              type='checkbox'
                              checked={selectedItems.has(
                                submission.submission_id
                              )}
                              onChange={(e) =>
                                handleSelectItem(
                                  submission.submission_id,
                                  e.target.checked
                                )
                              }
                              className='rounded border-[#6473A0] text-[#6473A0] focus:ring-[#6473A0]'
                            />
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm font-medium text-[#6473A0]'>
                              {submission.title}
                            </div>
                            <div className='text-sm text-gray-500'>
                              ID: {submission.submission_id}
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm text-[#6473A0]'>
                              {submission.team_name}
                            </div>
                            <div className='text-xs text-gray-500'>
                              User ID: {submission.user_id}
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            {getStatusBadge(
                              submission.status,
                              submission.evaluation_result.status
                            )}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            {getScoreDisplay(submission.evaluation_result)}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm text-[#6473A0]'>
                              {new Date(
                                submission.submitted_at
                              ).toLocaleDateString('ko-KR')}
                            </div>
                            <div className='text-sm text-gray-500'>
                              {new Date(
                                submission.submitted_at
                              ).toLocaleTimeString('ko-KR')}
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            {getRepositoryDisplay(submission.repositories)}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm'>
                            <div className='flex gap-2'>
                              <button className='px-3 py-1 text-xs bg-[#6473A0] text-white rounded hover:bg-[#5a6a95] transition-colors duration-200'>
                                상세보기
                              </button>
                              {submission.evaluation_result.status ===
                                'completed' && (
                                <button className='px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200'>
                                  평가결과
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </main>
  );
}
