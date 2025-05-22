export function NoSubmissions() {
  return (
    <div className='text-center py-12'>
      <div className='mb-4'>
        <svg
          className='mx-auto h-12 w-12 text-gray-400'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      </div>
      <h3 className='text-lg font-medium text-gray-900 mb-2'>
        No Submissions Yet
      </h3>
      <p className='text-gray-500'>아직 제출한 프로젝트가 없습니다.</p>
    </div>
  );
}
