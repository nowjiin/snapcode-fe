import { Header } from './Header';

// Layout.tsx가 필요한 이유는 다음과 같습니다:
// Fast Refresh 문제 해결
// React의 Fast Refresh는 파일이 컴포넌트만 export할 때 제대로 작동합니다
// routes/index.tsx는 router를 export하고 있어서, 여기에 컴포넌트를 정의하면 Fast Refresh가 작동하지 않습니다
// 레이아웃 재사용성
// Layout 컴포넌트는 여러 페이지에서 공통으로 사용되는 Header를 포함합니다
// 로그인/회원가입 페이지를 제외한 모든 페이지에 동일한 레이아웃을 적용하고 있습니다
// 별도의 파일로 분리함으로써 레이아웃 관련 수정이 필요할 때 한 곳에서만 수정하면 됩니다
// 관심사의 분리
// routes/index.tsx는 라우팅 설정에만 집중할 수 있습니다
// Layout.tsx는 레이아웃 관련 로직에만 집중할 수 있습니다
// 이렇게 분리함으로써 코드의 유지보수성이 향상됩니다
// 만약 Layout 컴포넌트를 routes/index.tsx에 직접 정의한다면:
// Fast Refresh가 작동하지 않아 개발 시 실시간 변경사항이 반영되지 않습니다
// 레이아웃 관련 수정이 필요할 때 라우팅 파일을 수정해야 합니다
// 코드의 관심사가 섞여 있어 유지보수가 어려워집니다
// 따라서 Layout.tsx를 별도 파일로 분리하는 것이 React의 best practice에 더 부합합니다.

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
